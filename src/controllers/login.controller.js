import { Empresas, Sedes } from "../models/empresas.model.js";
import { Evaluaciones } from "../models/evaluaciones.model.js";
import { Usuarios } from "../models/usuarios.model.js";
import { comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/token.js";

export const loginUsuario = async (req, res, next) => {
  const { documento, contrasena } = req.body;
  if (!documento && !contrasena) {
    res.status(400).json({ message: "Falta información" });
  }
  try {
    const usuario = await Usuarios.findOne({ where: { idUsuario: documento } });
    if (usuario) {
      if (!usuario.activo) {
        res.status(200).json({ message: "Usuario inactivo" });
      }
      const idUsuario = usuario.idUsuario;
      const usuarioSedes = await Usuarios.findOne({
        where: { idUsuario },
        attributes: [
          "idUsuario",
          "nombre",
          "idPerfil",
          "idNivelCargo",
          "cargo",
          "fechaIngreso"
        ],
        include: [
          {
            model: Empresas,
            attributes: { exclude: ["idHub", "createdAt", "updatedAt"] },
            through: { attributes: [], where: { principal: true }, },
          },
          {
            model: Evaluaciones,
            through: {attributes: ['idTipoEvaluacion','attempt','maxAttempts'], where: { idTipoEvaluacion: 1 }}
          }
        ],
      });
      const contrasenaValida = await comparePassword(
        contrasena,
        usuario.contrasena
      );
      const { defaultContrasena } = usuario;
      if (contrasenaValida) {
        const token = await generateToken(usuario);
        res.cookie("token", token, {
          path: "/",
          sameSite: "None",
          secure: true,
          httpOnly: false,
        });
        usuarioSedes.dataValues.defaultContrasena = defaultContrasena;
        res
          .status(200)
          .json({ message: "Inicio de sesión exitoso.", data: usuarioSedes, token });
      } else {
        res.status(400).json({ message: "Credenciales invalidas." });
      }
    } else {
      res
        .status(400)
        .json({ message: "El usuario no existe." });
    }
  } catch (error) {
    next(error);
  }
};

export const obtenerAutoevaluaciones = async (req, res, next) => {
  try {
    const { idUsuario } = req.query

    if (!idUsuario){
      return res.status(400).json({message: 'Hace falta información para procesar la solicitud'})
    }

    const evaluaciones = await Usuarios.findOne({
      where: { idUsuario },
      attributes:[],
      include: [
        {
          model: Evaluaciones,
          through: {attributes: ['idTipoEvaluacion','attempt','maxAttempts'], where: { idTipoEvaluacion: 1 }}
        }
      ]
    })

          model: Evaluaciones,
          res.status(200).json({message: 'Autorvaluaciones obtenidas correctamente', evaluaciones})


  } catch (error) {
    next(error)
  }
}