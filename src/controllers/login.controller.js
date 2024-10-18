import { Empresas, Sedes } from "../models/empresas.model.js"
import { Usuarios } from "../models/usuarios.model.js"
import { comparePassword } from "../utils/hashPassword.js"
import { generateToken } from "../utils/token.js"

export const loginUsuario = async (req, res, next) => {

    console.log(req.correo)
    try {

        const { correo, contrasena } = req.body
        const usuario = await Usuarios.findOne({ where: { correo } })
        if (usuario) {
            if (!usuario.activo) {
                res.status(200).json({ message: "Usuario inactivo" })
            }
            const idUsuario = usuario.idUsuario
            const usuarioSedes = await Usuarios.findOne({
                where: { idUsuario },  attributes: ["idUsuario", "nombre", "idPerfil", "idNivelCargo"], include: [{ model: Sedes, attributes: ["nombre", "siglas"], through: { attributes: []}}, {model: Empresas, attributes: {exclude: ["idHub", "createdAt", "updatedAt"]}, through: { attributes: []}}]
            })    
            const contrasenaValida = await comparePassword(contrasena, usuario.contrasena)
            if (contrasenaValida) {
                const token = generateToken(usuario)
                res.cookie("token", token, { httpOnly: false, path: "/", sameSite: 'Lax' });
                res.status(200).json({ message: "Inicio de sesión exitoso.", data: usuarioSedes })
            } else {
                res.status(400).json({ message: "Credenciales invalidas." })
            }
        } else {
            res.status(400).json({ message: "Error en el proceso de inicio de sesión" })
        }
    } catch (error) {
        next(error)
    }
}