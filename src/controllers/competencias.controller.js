import { Competencias,  Descriptores, TipoCompetencia } from "../models/competencias.model.js"

export const crearDescriptor = async (req, res, next) => {
    try {
        const {nombre, descripcion } = req.body
        const respuesta = await Descriptores.create({nombre, descripcion})
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}


export const obtenerDescriptor = async (req, res, next) => {
    try {
        const respuesta = await Descriptores.findAll()
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const crearTipoCompetencia = async (req, res, next) => {
    try {
        const {nombre} = req.body
        const respuesta = await TipoCompetencia.create({nombre})
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const obtenerTipoCompetencia = async (req, res, next) => {
    try {
        const respuesta = await TipoCompetencias.findAll()
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}


export const asignarCompetenciaEvaluacion = async (req, res, next) => {
    try {
        const {idEvaluacion, idCompetencia} = req.body
        const respuesta = await CompetenciasEvaluaciones.create({idEvaluacion, idCompetencia})
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}
export const crearCompetencia = async (req, res, next) => {
    try {
        const {nombre, descripcion, idTipoCompetencia, idEmpresa} = req.body
        const respuesta = await Competencias.create({nombre, descripcion, idTipoCompetencia, idEmpresa})
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const obtenerCompetencia = async (req, res, next) => {
    try {
        const {idEmpresa} = req.query
        const respuesta = await Competencias.findAll({include: [{model: Descriptores, attributes:["idDescriptor","descripcion"]},{model: TipoCompetencias, attributes: ["nombre"]}],attributes:{exclude: ["createdAt", "updatedAt"]}, where: {idEmpresa}})
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const asignarCompetenciasCargo = async (req, res, next) => {
    try {
        const {idNivelCargo, idCompetencia} = req.body
        const respuesta = await CompetenciaCargo.create({idNivelCargo, idCompetencia})
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}


