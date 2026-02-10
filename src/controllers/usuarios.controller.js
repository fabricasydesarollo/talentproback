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
import { Op, where } from "sequelize";

export const obtenerUnicoUsuario = async (req, res, next) => {
  try {
    const { idUsuario, nombre } = req.query;

    if (!idUsuario) {
      return res
        .status(400)
        .json({ message: "Faltan datos para procesar la solicitud" });
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
      `WITH r_min AS (
        SELECT 
          r.idEvaluacion,
          r.idEvaluador,
          r.idColaborador,
          DATE_FORMAT(r.createdAt, '%Y-%m-%d %H:%i') AS createdAtMinute,
          MAX(r.createdAt) AS createdAtMax
        FROM respuestas r
        WHERE r.idColaborador = :idUsuario
        GROUP BY 
          r.idEvaluacion, 
          r.idEvaluador, 
          r.idColaborador,
          DATE_FORMAT(r.createdAt, '%Y-%m-%d %H:%i')
      )
      SELECT 
        e.idEvaluacion,
        rm.idEvaluador,
        DATE_FORMAT(rm.createdAtMax, '%Y-%m-%d %H:%i') AS createdAt,
        e.activa, 
        e.nombre AS evaluacionNombre, 
        e.year,
        u.nombre AS evaluadorNombre, 
        CASE WHEN rm.idColaborador = rm.idEvaluador THEN '1' ELSE '2' END AS idTipoEvaluacion,
        CASE WHEN rm.idColaborador = rm.idEvaluador THEN 'AUTOEVALUACIÓN' ELSE 'EVALUACIÓN' END AS tipoEvaluacion, 
        CASE WHEN er.idEvalRealizada IS NULL THEN 'Pendiente' ELSE 'Registrado' END AS comentario
      FROM r_min rm
      JOIN Evaluaciones e 
        ON e.idEvaluacion = rm.idEvaluacion 
      JOIN usuarios u 
        ON u.idUsuario = rm.idEvaluador 
      LEFT JOIN EvaluacionesRealizadas er 
        ON er.idColaborador = rm.idColaborador 
       AND er.idEvaluador = rm.idEvaluador 
       AND er.idEvaluacion = rm.idEvaluacion
      ORDER BY e.idEvaluacion, rm.idEvaluador, rm.createdAtMax;`,
      { replacements: { idUsuario }, type: Sequelize.QueryTypes.SELECT }
    );

    const infoUsuario = {
      ...usuario,
      Empresas: empresas,
      Sedes: sedes,
      colaboradores,
    };

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
  try {
    // 1. Extraer idEvaluador, idUsuario, idEvaluación

    const { usuarios } = req.body ?? {};

    if (!Array.isArray(usuarios) || usuarios.length === 0) {
      return res
        .status(400)
        .json({ error: "El cuerpo de la solicitud debe contener usuarios." });
    }
    const { idEvaluador, idEvaluacion, idUsuario } = usuarios[0];
    const transaction = await Sequelize.transaction();
    // 2. Extraer los ids de usuarios
    const ids_usuarios = usuarios.map((u) => u.idUsuario);

    // 3. Si idusuario viene null entonces debe hacer un sof/delete de ese evaluador y esa evaluación (deletedAt: now Date())
    if (!idUsuario) {
      const [rowsAffected] = await UsuariosEvaluadores.update(
        { deletedAt: new Date() },
        { where: { idEvaluador, idEvaluacion } },
        transaction
      );
      return res
        .status(200)
        .json({ message: "Operación exitosa", rowsAffected });
    }
    // 4. Validar si el usuario existe y no esta eliminado
    // 5. Si existe y no esta eliminado (omitir)
    // 6. Si no existe se debe crear
    for (const user_d of usuarios) {
      const { idEvaluador, idEvaluacion, idUsuario } = user_d; // El punto 4, 5 y 6 lo logramos con el findOrCreate
      const [user] = await UsuariosEvaluadores.findOrCreate({
        where: { idEvaluador, idEvaluacion, idUsuario },
        defaults: user_d,
        transaction
      });

      // 7. si existe y esta eliminado se debe restaurar (deletedAt : null)
      if (user.deletedAt) {
        await UsuariosEvaluadores.update(
          {
            deletedAt: null,
          },
          { where: { idEvaluador, idEvaluacion, idUsuario } },
          transaction
        );
      }
    }
    
    // 8. Hacer un soft/delete con con los ids de usuarios en update({deletedAt: now Date()}, {where: NOT IN (ids_usuarios) AND idEvaluacion})
    await UsuariosEvaluadores.update(
      {
        deletedAt: new Date()
      },
      {
        where: {
          idUsuario: {
            [Op.notIn]: ids_usuarios
          },
          idEvaluacion,
          idEvaluador
        }
      }, transaction
    );

    transaction.commit()

    res.status(200).json({message: 'Usuarios procesados correctamente'});
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
              through: {
                attributes: ["idTipoEvaluacion", "attempt", "maxAttempts"],
              },
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
    res.status(200).json({
      message: "Solicitud procesada con exito",
      data: respuesta || [],
    });
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
    LEFT JOIN Empresas e2 ON e2.idEmpresa = ue2.idEmpresa;`;

    const resultados = await Sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT, // Indica que estamos obteniendo resultados.
    });
    res.status(200).json({ message: "OK", resultados });
  } catch (error) {
    next(error);
  }
};

export const buscarUsuarios = async (req, res, next) => {
  try {
    const { documento, nombre } = req.query;

    if (documento) {
      const usuarios = await Usuarios.findAll({
        where: { idUsuario: documento },
        attributes: ["idUsuario", "nombre", "correo"],
        include: [
          {
            model: Empresas,
            attributes: ["nombre"],
            through: { attributes: [], where: { principal: true } },
          },
        ],
      });

      if (usuarios.length > 0) {
        return res
          .status(200)
          .json({ message: "Usuario encontrado", usuarios });
      }
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (nombre) {
      const usuarios = await Usuarios.findAll({
        where: {
          nombre: {
            [Op.like]: `%${nombre}%`,
          },
        },
        attributes: ["idUsuario", "nombre", "correo"],
        include: [
          {
            model: Empresas,
            attributes: ["nombre"],
            through: { attributes: [], where: { principal: true } },
          },
        ],
      });

      if (usuarios.length > 0) {
        return res
          .status(200)
          .json({ message: "Usuario encontrado", usuarios });
      }
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si no se envió ni documento ni nombre
    return res.status(400).json({ message: "Debe enviar documento o nombre" });
  } catch (error) {
    next(error);
  }
};
