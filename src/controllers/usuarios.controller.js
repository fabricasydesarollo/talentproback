import { Op } from "sequelize"
import { Competencias, Descriptores } from "../models/competencias.model.js"
import { Empresas, Sedes } from "../models/empresas.model.js"
import { Respuestas } from "../models/respuestas.model.js"
import { NivelCargo, Perfiles, Usuarios, UsuariosEvaluadores } from "../models/usuarios.model.js"
import { hashPassword } from "../utils/hashPassword.js"

export const obtenerUnicoUsuario = async (req, res, next) => {
    try {
        const {idUsuario, correo} = req.query
        const usuario = await Usuarios.findOne({
            where: {
                [Op.or]: [
                    { idUsuario: idUsuario || null },
                    { correo: correo || null }
                ]
            },
            include: [{model: Usuarios, as: 'colaboradores',
            attributes: ['idUsuario', "nombre", "cargo"],
            through: {attributes:[]}},{model: Empresas, through: {attributes: []}},{model: Sedes,through: {attributes: []}}]
        });
        res.status(200).json({ message: "Ok", data: usuario })
    } catch (error) {
        next(error)
    }
}
export const obtenerColaboradores = async (req, res, next) => {
    try {
        const respuesta = await Usuarios.findAll({attributes: ["idUsuario", "nombre", "cargo"]})
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}
export const asignarColaboradoresEvaluar = async (req, res, next) => {
    const { usuarios } = req.body;
    try {
      // Procesamos cada usuario en paralelo
      const resultados = await Promise.all(
        usuarios.map(async (usuario) => {
          const { idEvaluador, idUsuario } = usuario;
          if (idEvaluador && idUsuario) {
              try {
              await UsuariosEvaluadores.destroy({ where: { idEvaluador } });
              await UsuariosEvaluadores.create({ idEvaluador, idUsuario });
              return { success: `Usuario ${idUsuario} asignado a evaluador ${idEvaluador}` };
            } catch (error) {
              return { error: `Error al asignar usuario ${idUsuario} a evaluador ${idEvaluador}` };
            }
          } else {
            return { error: "idEvaluador es requerido para la operación" };
          }
        })
      );
  
      const errores = resultados.filter(result => result.error);
      const exitos = resultados.filter(result => result.success);
  
      if (errores.length > 0) {
        return res.status(400).json({ errors: errores.map(e => e.error) });
      }
  
      res.status(200).json({ message: "Usuarios asignados correctamente", detalles: exitos });
    } catch (error) {
      next(error);
    }
  };
  
  


  export const actualizarUsuario = async (req, res, next) => {
    try {
        const { idUsuario } = req.params;
        const { nombre, cargo, correo, contrasena, idPerfil, idNivelCargo, fechaIngreso, area, activo, defaultContrasena } = req.body;

        if (!nombre || !cargo || !correo || !idPerfil || !idNivelCargo) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        let password;
        if (contrasena !== undefined) {
            password = await hashPassword(contrasena);
        }

        const camposActualizados = { nombre, cargo, correo, idPerfil, idNivelCargo, fechaIngreso, activo, defaultContrasena };
        if (password) {
            camposActualizados.contrasena = password;
        }

        const respuesta = await Usuarios.update(camposActualizados, { where: { idUsuario } });

        if (respuesta[0] === 0) {
            return res.status(404).json({ message: "Usuario no encontrado o sin cambios" });
        }

        res.status(200).json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
        next(error);
    }
};


export const crearUsuario = async (req, res, next) => {
    try {
        const { idUsuario, nombre, cargo, correo, contrasena, idPerfil, idNivelCargo } = req.body
        const password = await hashPassword(contrasena)
        const respuesta = await Usuarios.create({ idUsuario, nombre, cargo, correo, contrasena: password, idPerfil, idNivelCargo })
        res.status(201).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const crearPerfil = async (req, res, next) => {
    try {
        const { nombre } = req.body
        const respuesta = await Perfiles.create({ nombre })
        res.status(201).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const obtenerPerfiles = async (req, res, next) => {
    try {
        const respuesta = await Perfiles.findAll()
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const crearNivelCargo = async (req, res, next) => {
    try {
        const { nombre } = req.body
        const respuesta = await NivelCargo.create({ nombre })
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const obtenerNivelCargos = async (req, res, next) => {
    try {
        const respuesta = await NivelCargo.findAll({
            include: [{model: Descriptores, through: {attributes: []}}, {model: Competencias, through: {attributes: []}}]
        })
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const obtenerUsuariosSedes = async (req, res, next) => {
    try {
        const { idUsuario } = req.query
        const respuesta = await Usuarios.findOne({
            where: { idUsuario }, attributes: ["idUsuario", "nombre", "idPerfil", "cargo"],

             include: [{ model: Sedes, attributes: ["idSede","nombre", "siglas"], through: { attributes: [], where: { reportes: true }}},
              {model: Empresas, attributes: ["idEmpresa","nombre", "urlLogo"], through: { attributes: [], where: { reportes: true }}}]
        })
        res.status(201).json({ message: "Ok", data: respuesta })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const asignarUsuariosSedes = async (req, res, next) => {
    try {
        const { idUsuario, idSede } = req.body
        const respuesta = await UsuarioSedeEmpresa.create({ idUsuario, idSede })
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}


export const usuariosEvaluar = async (req, res, next) => {
    try {
        const {idUsuario} = req.query
        const respuesta = await Usuarios.findOne({
            where: { idUsuario }, // ID del usuario a consultar
            attributes: ["idUsuario", "nombre", "cargo","fechaIngreso", "idNivelCargo", "idPerfil"],
            include: [
                {
                    model: Usuarios, // Relación con otros usuarios a través de evaluadores
                    as: 'colaboradores', // Usa el alias 'evaluadores' para identificar los evaluadores del usuario
                    attributes: ["idUsuario", "nombre", "cargo", "fechaIngreso", "idNivelCargo"],
                    where: {activo: true},
                    through: { attributes: ["estado"] }, include: [{model: Sedes, attributes: ["idSede", "nombre"], through: {attributes: []}}, {model: Empresas, attributes: ["idEmpresa", "nombre","urlLogo"], through: {attributes: []}}],
                },
                {model: Sedes, attributes: ["idSede", "nombre"], through: {attributes: []}},
                {model: Empresas, attributes: ["idEmpresa", "nombre", "urlLogo"], through: {attributes: []}}
            ],
        });
        if (respuesta) {
            respuesta.colaboradores.map(async colaborador => {
               const data = await Respuestas.findOne({
                    where: {
                        idColaborador: colaborador.idUsuario, idEvaluador: idUsuario
                    }
                })
        })}
        res.status(200).json({ message: "Ok", data: respuesta })    
    } catch (error) {
        next(error)
    }
}

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
            return res.status(500).json({ message: "Error al actualizar la contraseña" });
        }

    } catch (error) {
        next(error);
    }
};
