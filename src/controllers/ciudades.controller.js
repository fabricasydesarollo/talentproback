import { Ciudades, Departamentos } from "../models/ciudades.model.js"

export const obtenerDepartamentos = async (req, res, next) => {

    try {
        const respuesta = await Departamentos.findAll()
        res.status(200).json({ message: "Lista de departamentos", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const crearDepartamentos = async (req, res, next) => {
    try {
        const { nombre } = req.body
        if (!nombre) res.status(400).json({message: "Faltan datos"})

        const respuesta = await Departamentos.create({ nombre })
        console.log(respuesta)
        res.status(201).json({ message: "Creación exitosa", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const obtenerCiudades = async (req, res, next) => {
    try {
        const respuesta = await Ciudades.findAll({include: Departamentos})
        res.status(200).json({ message: "Lista de Ciudades", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const crearCiudades = async (req, res, next) =>{
    try {
        const { nombre, idDepartamento } = req.body
        const respuesta = await Ciudades.create({nombre, idDepartamento})
        res.status(200).json({ message: "Lista de ciudades", data: respuesta })
        console.log(respuesta)
    } catch (error) {
        next(error)
    }
}