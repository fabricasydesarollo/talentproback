import { Op } from "sequelize"
import { Empresas, Sedes } from "../models/empresas.model.js"
import { NivelCargo, Perfiles, Usuarios } from "../models/usuarios.model.js"
import { hashPassword } from "../utils/hashPassword.js"

export const obtenerUsuarios = async (req, res, next) => {
    try {
        const {idUsuario, correo} = req.query
        const usuario = await Usuarios.findOne({
            where: {
                [Op.or]: [
                    { idUsuario: idUsuario || null }, // Si idUsuario está presente
                    { correo: correo || null }         // Si correo está presente
                ]
            },
        });

        const perfiles = await Perfiles.findAll()
        const nivelcargo = await NivelCargo.findAll()

        res.status(200).json({ message: "Ok", data: {usuario, perfiles, nivelcargo} })
    } catch (error) {
        next(error)
    }
}

export const actualizarUsuario = async (req, res, next) => {
    try {
        const { idUsuario } = req.params;
        const { nombre, cargo, correo, contrasena, idPerfil, idNivelCargo } = req.body
        const password = await hashPassword(contrasena)
        const respuesta = await Usuarios.update({ nombre, cargo, correo, contrasena: password, idPerfil, idNivelCargo }, {
            where: { idUsuario }
        });
        if (respuesta[0] === 0) {
            return res.status(404).json({ message: "Usuario no encontrado o sin cambios" });
        }
        res.status(200).json({ message: "Usuario actualizado exitosamente"});
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
        const respuesta = await NivelCargo.findAll()
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const obtenerUsuariosSedes = async (req, res, next) => {
    try {
        const { idUsuario } = req.query
        console.log(req.params)
        const respuesta = await Usuarios.findAll({
            where: { idUsuario }, attributes: ["idUsuario", "nombre", "idPerfil", "cargo"],

             include: [{ model: Sedes, attributes: ["nombre", "siglas"], through: { attributes: []}},
              {model: Empresas, attributes: ["nombre", "urlLogo"], through: { attributes: []}}]
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
            attributes: ["idUsuario", "nombre", "cargo", "idNivelCargo", "idPerfil"],
            include: [
                {
                    model: Usuarios, // Relación con otros usuarios a través de evaluadores
                    as: 'colaboradores', // Usa el alias 'evaluadores' para identificar los evaluadores del usuario
                    attributes: ["idUsuario", "nombre", "cargo", "idNivelCargo"],
                    through: { attributes: [] }, include: [{model: Sedes, attributes: ["idSede", "nombre"], through: {attributes: []}}, {model: Empresas, attributes: ["idEmpresa", "nombre"], through: {attributes: []}}],
                },
                {model: Sedes, attributes: ["idSede", "nombre"], through: {attributes: []}},
                {model: Empresas, attributes: ["idEmpresa", "nombre"], through: {attributes: []}}
            ],
        });
        res.status(200).json({ message: "Ok", data: respuesta })
        
    } catch (error) {
        next(error)
    }
}
