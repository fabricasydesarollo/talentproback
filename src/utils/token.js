import jwt from "jsonwebtoken";
import  dontenv from "dotenv"
dontenv.config()

const SECRETWORD = process.env.SECRETWORD

export const generateToken = (usuario) => {
    return jwt.sign({
        idUsuario: usuario.idUsuario,
        correo: usuario.correo,
        idPerfil: usuario.idPerfil
    },SECRETWORD,{expiresIn: "1d"}) 
}

// jwt.verify() = (token,SECRETWORD,(err, decoce) => {
    
// })
