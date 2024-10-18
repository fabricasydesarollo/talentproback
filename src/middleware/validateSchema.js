
import Joi from "joi"


export const validateRequest = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body)
        if (error) {
            res.status(400).json({message: error.details[0].message})
        }
        next()
    }
}


export const schemaGen = Joi.object({
    nombre: Joi.string().min(5).required()
})

export const schemaUser = Joi.object({
    idUsuario: Joi.number().min(6).required(),
    nombre: Joi.string().min(5).required(),
    cargo: Joi.string().min(5).required(),
    correo: Joi.string().email().required(),
    contrasena: Joi.string().pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/).required(),
    idPerfil: Joi.number().required(),
    idNivelCargo: Joi.number().required()
})