import { Competencias, Descriptores } from "../models/competencias.model.js";
import { Empresas, Sedes } from "../models/empresas.model.js";
import {
  Evaluaciones,
  EvaluacionesRealizadas,
  TipoEvaluaciones,
} from "../models/evaluaciones.model.js";
import { Respuestas } from "../models/respuestas.model.js";
import {
  NivelCargo,
  Perfiles,
  Usuarios,
  UsuariosEmpresas,
  UsuariosEvaluadores,
  UsuariosSedes,
} from "../models/usuarios.model.js";
import { hashPassword } from "../utils/hashPassword.js";
import Sequelize from "../config/db.js";
import { Op } from "sequelize";

export const obtenerUnicoUsuario = async (req, res, next) => {
  try {
    const { idUsuario, nombre } = req.query;

    if (!idUsuario) {
      return res.status(400).json({message: "Faltan datos para procesar la solicitud"})
    }

    // 1. Usuario principal
    const [usuario] = await Sequelize.query(
      `SELECT u.idUsuario, u.nombre, u.cargo, u.area, u.correo, u.fechaIngreso,
      u.idNivelCargo, u.idPerfil, u.defaultContrasena, u.activo  
      FROM usuarios u 
        WHERE u.idUsuario = :idUsuario`,
      { replacements: { idUsuario }, type: Sequelize.QueryTypes.SELECT }
    );

    // 2. Empresas
    const empresas = await Sequelize.query(
      `SELECT e.idEmpresa, e.nombre, ue.principal, ue.reportes, 1 as activo 
       FROM UsuariosEmpresas ue
       JOIN Empresas e ON e.idEmpresa = ue.idEmpresa 
       WHERE ue.idUsuario = :idUsuario`,
      { replacements: { idUsuario }, type: Sequelize.QueryTypes.SELECT }
    );

    // 3. Sedes
    const sedes = await Sequelize.query(
      `SELECT s.idSede, s.nombre, s.idEmpresa, us.principal, us.reportes, 1 as activo 
       FROM UsuariosSedes us 
       JOIN Sedes s ON us.idSede = s.idSede 
       WHERE us.idUsuario = :idUsuario`,
      { replacements: { idUsuario }, type: Sequelize.QueryTypes.SELECT }
    );

    // 4. Colaboradores (usuarios evaluados por este evaluador)
    const colaboradores = await Sequelize.query(
      `SELECT u.idUsuario, ue.idEvaluador, ue.idEvaluacion, u.nombre
       FROM usuariosEvaluadores ue 
       JOIN usuarios u ON ue.idUsuario = u.idUsuario AND ue.deletedAt IS NULL
       WHERE ue.idEvaluador = :idUsuario`,
      { replacements: { idUsuario }, type: Sequelize.QueryTypes.SELECT }
    );

    // 5. Evaluaciones realizadas
    const evaluacion = await Sequelize.query(
      `SELECT er.idEvaluacion, er.idEvaluador, er.createdAt,
              te.idTipoEvaluacion, te.nombre as tipoEvaluacion,
              e.nombre as evaluacionNombre, e.year, e.activa,
              u.nombre as evaluadorNombre
       FROM EvaluacionesRealizadas er
       JOIN TipoEvaluaciones te ON te.idTipoEvaluacion = er.idTipoEvaluacion
       JOIN Evaluaciones e ON e.idEvaluacion = er.idEvaluacion
       JOIN usuarios u ON u.idUsuario = er.idEvaluador
       WHERE er.idColaborador = :idUsuario`,
      { replacements: { idUsuario }, type: Sequelize.QueryTypes.SELECT }
    );

    const infoUsuario = {
      ...usuario,
      Empresas: empresas,
      Sedes: sedes,
      colaboradores
    }

    res.status(200).json({ message: "Ok", data: infoUsuario, evaluacion });
  } catch (error) {
    next(error);
  }
};
export const obtenerColaboradores = async (req, res, next) => {
  try {
    const respuesta = await Usuarios.findAll({
      attributes: ["idUsuario", "nombre", "cargo"],
    });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};
export const asignarColaboradoresEvaluar = async (req, res, next) => {
  const { usuarios } = req.body;
  if (!usuarios || usuarios.length === 0) {
    return res
      .status(400)
      .json({ error: "El cuerpo de la solicitud debe contener usuarios." });
  }
  try {
    //1. Extraer todos los idUsuarios que existen de ese idEvaluador

    const idEvaluador = usuarios[0].idEvaluador;
    const idEvaluacion = usuarios[0].idEvaluacion
    const registro = await UsuariosEvaluadores.findAll({
      where: { idEvaluador, idEvaluacion },
    });
    const eliminar = registro.filter(
      (reg) => !usuarios.some((usuario) => usuario.idUsuario === reg.idUsuario)
    );

    if (eliminar.length > 0) {
      const idsEliminar = eliminar.map((reg) => reg.idUsuario); // Extraer IDs a eliminar
      if (idsEliminar.length > 0) {
        await UsuariosEvaluadores.update(
          { deletedAt: new Date() },
          { where: { idUsuario: { [Op.in]: idsEliminar }, idEvaluador } }
        );
      }
    }

    const resultados = await Promise.all(
      usuarios.map(async (usuario) => {
        const { idEvaluador, idUsuario, idEvaluacion } = usuario;
        if (!idUsuario && !idEvaluador && !idEvaluacion) {
          await UsuariosEvaluadores.destroy(
            { where: { idEvaluador, idUsuario, idEvaluacion } }
          );
          return { success: `Se elimina lista de usuarios ${idEvaluador}` };
        }
        if (idEvaluador && idUsuario && idEvaluacion) {
          try {
            // Verificar si ya existe
            const existe = await UsuariosEvaluadores.findOne({
              where: { idEvaluador, idUsuario, idEvaluacion },
            });
            if (existe) {
              await UsuariosEvaluadores.update(
                { deletedAt: null },
                { where: { idEvaluador, idUsuario, idEvaluacion } }
              );
            }
            if (!existe) {
              // Crear solo si no existe
              await UsuariosEvaluadores.create({ idEvaluador, idUsuario, idEvaluacion });
            }
            return {
              success: `Usuario ${idUsuario} asignado a evaluador ${idEvaluador}`,
            };
          } catch (error) {
            return {
              error: `Error al asignar usuario ${idUsuario} a evaluador ${idEvaluador}: ${error.message}`,
            };
          }
        } else {
          return {
            error: "idEvaluador e idUsuario son requeridos para la operación",
          };
        }
      })
    );
    const errores = resultados.filter((result) => result.error);
    const exitos = resultados.filter((result) => result.success);

    if (errores.length > 0) {
      return res.status(400).json({ errors: errores.map((e) => e.error) });
    }

    res
      .status(200)
      .json({ message: "Usuarios asignados correctamente", detalles: exitos });
  } catch (error) {
    next(error);
  }
};

export const actualizarUsuario = async (req, res, next) => {
  try {
    const { idUsuario } = req.params;
    const {
      nombre,
      cargo,
      correo,
      contrasena,
      idPerfil,
      idNivelCargo,
      fechaIngreso,
      area,
      activo,
      defaultContrasena,
    } = req.body;

    if (!nombre || !cargo || !correo || !idPerfil || !idNivelCargo || !area) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    let password;
    if (contrasena !== undefined) {
      password = await hashPassword(contrasena);
    }

    const camposActualizados = {
      nombre,
      cargo,
      correo,
      idPerfil,
      idNivelCargo,
      fechaIngreso,
      activo,
      area,
      defaultContrasena,
    };
    if (password) {
      camposActualizados.contrasena = password;
    }

    const respuesta = await Usuarios.update(camposActualizados, {
      where: { idUsuario },
    });

    if (respuesta[0] === 0) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado o sin cambios" });
    }

    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    next(error);
  }
};

export const crearUsuario = async (req, res, next) => {
  try {
    const {
      idUsuario,
      nombre,
      cargo,
      correo,
      area,
      contrasena,
      idPerfil,
      fechaIngreso,
      idNivelCargo,
    } = req.body;

    if (
      !idUsuario ||
      !nombre ||
      !cargo ||
      !contrasena ||
      !idPerfil ||
      !idNivelCargo ||
      !area ||
      !fechaIngreso
    ) {
      res.status(400).json({ message: "Faltan datos necesarios" });
    }

    const password = await hashPassword(contrasena);
    const respuesta = await Usuarios.create({
      idUsuario,
      nombre,
      cargo,
      correo,
      contrasena: password,
      idPerfil,
      idNivelCargo,
      area,
      fechaIngreso,
      defaultContrasena: true,
      activo: true,
    });
    res.status(201).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const crearPerfil = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    const respuesta = await Perfiles.create({ nombre });
    res.status(201).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const obtenerPerfiles = async (req, res, next) => {
  try {
    const respuesta = await Perfiles.findAll();
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const crearNivelCargo = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    const respuesta = await NivelCargo.create({ nombre });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const obtenerNivelCargos = async (req, res, next) => {
  try {
    const respuesta = await NivelCargo.findAll({
      include: [
        { model: Descriptores, through: { attributes: [] } },
        { model: Competencias, through: { attributes: [] } },
      ],
    });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const obtenerUsuariosSedes = async (req, res, next) => {
  try {
    const { idUsuario } = req.query;
    const respuesta = await Usuarios.findOne({
      where: { idUsuario },
      attributes: ["idUsuario", "nombre", "idPerfil", "cargo"],

      include: [
        {
          model: Sedes,
          attributes: ["idSede", "nombre", "siglas", "idEmpresa"],
          through: { attributes: [], where: { reportes: true } },
        },
        {
          model: Empresas,
          attributes: ["idEmpresa", "nombre", "urlLogo"],
          through: { attributes: [], where: { reportes: true } },
        },
      ],
    });
    res.status(201).json({ message: "Ok", data: respuesta });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const asignarUsuariosSedes = async (req, res, next) => {
  try {
    const {
      idUsuario,
      idEmpresa,
      idSede,
      principal,
      repEmpresa,
      repSede,
      activo,
    } = req.body;

    if (
      [
        idUsuario,
        idEmpresa,
        idSede,
        principal,
        repEmpresa,
        repSede,
        activo,
      ].includes(null)
    ) {
      return res
        .status(400)
        .json({ message: "Faltan datos necesarios para el registro!" });
    }

    const empresaExiste = await UsuariosEmpresas.findOne({
      where: {
        [Op.and]: [{ idEmpresa }, { idUsuario }],
      },
    });
    if (!empresaExiste) {
      await UsuariosEmpresas.create({
        idUsuario,
        idEmpresa,
        principal,
        reportes: repEmpresa,
      });
    }

    const sedeExiste = await UsuariosSedes.findOne({
      where: {
        [Op.and]: [{ idSede }, { idUsuario }],
      },
    });

    if (!sedeExiste) {
      await UsuariosSedes.create({
        idUsuario,
        idSede,
        principal,
        reportes: repSede,
      });
    }

    res.status(200).json({ message: "Transacción ejecutada correctamente" });
  } catch (error) {
    next(error);
  }
};

export const usuariosEvaluar = async (req, res, next) => {
  try {
    const { idUsuario, idEvaluacion } = req.query;

    const respuesta = await Usuarios.findOne({
      where: { idUsuario }, // ID del usuario a consultar
      attributes: ["idUsuario"],
      include: [
        {
          model: Usuarios, // Relación con otros usuarios a través de evaluadores
          as: "colaboradores", // Usa el alias 'evaluadores' para identificar los evaluadores del usuario
          attributes: [
            "idUsuario",
            "nombre",
            "cargo",
            "fechaIngreso",
            "idNivelCargo",
          ],
          where: { activo: true },
          through: {
            where: {
              [Op.and]: [{ deletedAt: null, idEvaluacion: idEvaluacion }],
            },
          },
          include: [
            {
              model: Empresas,
              attributes: ["idEmpresa", "nombre", "urlLogo"],
              through: { attributes: [], where: { principal: true } },
            },
            {
              model: Evaluaciones,
              through: { attributes: ["idTipoEvaluacion","attempt", "maxAttempts"] },
            },
          ],
        },
        {
          model: Empresas,
          attributes: ["idEmpresa", "nombre", "urlLogo"],
          through: { attributes: [], where: { principal: true } },
        },
      ],
    });
    if (respuesta) {
      respuesta.colaboradores.map(async (colaborador) => {
        const data = await Respuestas.findOne({
          where: {
            idColaborador: colaborador.idUsuario,
            idEvaluador: idUsuario,
          },
        });
      });
    }
    res.status(200).json({ message: "Solicitud procesada con exito", data: respuesta || [] })
  } catch (error) {
    next(error);
  }
};

export const actualizarContraseña = async (req, res, next) => {
  const { idUsuario } = req.params;
  const { contrasena, defaultContrasena } = req.body;

  if (!idUsuario || !contrasena || defaultContrasena === undefined) {
    return res.status(400).json({ message: "Falta información" });
  }

  try {
    const usuario = await Usuarios.findByPk(idUsuario);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const hashContrasena = await hashPassword(contrasena);
    const [updated] = await Usuarios.update(
      { contrasena: hashContrasena, defaultContrasena },
      { where: { idUsuario } }
    );
    if (updated) {
      return res.status(200).json({ message: "Contraseña actualizada" });
    } else {
      return res
        .status(500)
        .json({ message: "Error al actualizar la contraseña" });
    }
  } catch (error) {
    next(error);
  }
};

export const obtenerListaUsuarios = async (req, res, next) => {
  try {
    const query = `SELECT u.idUsuario, u.nombre, e2.idEmpresa, e2.nombre as empresa
    FROM usuarios u
    LEFT JOIN UsuariosEmpresas ue2 ON ue2.idUsuario = u.idUsuario AND ue2.principal = true
    LEFT JOIN Empresas e2 ON e2.idEmpresa = ue2.idEmpresa;`

    const resultados = await Sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT, // Indica que estamos obteniendo resultados.
    });
    res.status(200).json({message: 'OK', resultados})
  } catch (error) {
    next(error)
  }
}

export const buscarUsuarios = async (req, res, next) => {
  try {
    const { documento, nombre } = req.query;

    if (documento) {
      const usuarios = await Usuarios.findAll({
        where: { idUsuario: documento },
        attributes: ['idUsuario', 'nombre', 'correo'],
        include: [
          {
            model: Empresas,
            attributes: ["nombre"],
            through: { attributes: [], where: { principal: true } },
          }
        ]
      });

      if (usuarios.length > 0) {
        return res.status(200).json({ message: "Usuario encontrado", usuarios });
      }
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (nombre) {
      const usuarios = await Usuarios.findAll({
        where: {
          nombre: {
            [Op.like]: `%${nombre}%`
          }
        },
        attributes: ['idUsuario', 'nombre', 'correo'],
        include: [
          {
            model: Empresas,
            attributes: ["nombre"],
            through: { attributes: [], where: { principal: true } },
          }
        ]
      });

      if (usuarios.length > 0) {
        return res.status(200).json({ message: "Usuario encontrado", usuarios });
      }
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si no se envió ni documento ni nombre
    return res.status(400).json({ message: "Debe enviar documento o nombre" });

  } catch (error) {
    next(error);
  }
};
