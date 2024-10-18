import { Ciudades, Departamentos } from "../models/ciudades.model.js"
import { Empresas, Hubs, Sedes } from "../models/empresas.model.js"

export const crearHubs = async (req, res, next) => {
    try {
        const { nombre } = req.body
        if (!nombre) res.status(400).json({ message: "Faltan datos." })
        const respuesta = await Hubs.create({ nombre })
        res.status(201).json({ message: "Creado", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const obtenerHubs = async (req, res, next) => {
    try {
        const respuesta = await Hubs.findAll()
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const crearEmpresa = async (req, res, next) => {
    try {
        const { nombre, siglas, urlLogo, idHub } = req.body
        const respuesta = await Empresas.create({ nombre, siglas, urlLogo, idHub })
        res.status(201).json({ message: "Creado", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const obtenerEmpresa = async (req, res, next) => {
    try {
        const respuesta = await Empresas.findAll({ include: Hubs })
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const obtenerSedes = async (req, res, next) => {
    try {
        const respuesta = await Sedes.findAll({ 
            include: [{ model: Empresas, as: "empresa", attributes: { exclude: ["createdAt", "updatedAt", "idHub"] },
            include: [{ model: Hubs, attributes: { exclude: ["createdAt", "updatedAt"] } }] },
                    { model: Ciudades, as: "ciudad", attributes: { exclude: ["createdAt", "updatedAt", "idDepartamento"] }, 
                    include: [{model: Departamentos, attributes:{exclude: ["createdAt", "updatedAt"]}}]}]
            , attributes: { exclude: ["createdAt", "updatedAt", "idEmpresa", "idCiudad"] } })
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const crearSedes = async (req, res, next) => {
    try {
        const { nombre, siglas, idEmpresa, idCiudad } = req.body
        const respuesta = await Sedes.create({ nombre, siglas, idEmpresa, idCiudad })
        res.status(201).json({ message: "Creado", data: respuesta })
    } catch (error) {
        next(error)
    }
}