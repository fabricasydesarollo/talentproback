import jwt from "jsonwebtoken";
import dontenv from "dotenv";
import { loadSecrets } from "../config/secrets.js";
dontenv.config();

const secretCache = await loadSecrets();

export const generateToken = async (usuario) => {
    try {
        return jwt.sign(
            {
              idUsuario: usuario.idUsuario,
              correo: usuario.correo,
              idPerfil: usuario.idPerfil,
            },
            secretCache.JWT_SECRET,
            { expiresIn: "6h" }
          );
    } catch (error) {
        return error
    }
};

export const validateToken = (req, res, next) => {
  let token;
  if (req.cookies?.token){
    token = req.cookies.token;
  }
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }
  if (!token) {
    return res.status(403).json({ message: "Acceso denegado", status: false });
  }
  try {
    const data = jwt.verify(token, secretCache.JWT_SECRET);
    res.status(200).json({ message: "Sesión valida", data });
  } catch (error) {
    res.status(403).json({ message: "Token inválido o expirado", status: false });
  }
};

export const logoutSession = (req, res, next) => {
  try {
    res.clearCookie("token", {
      path: "/",
      sameSite: "None",
      secure: true,
      httpOnly: false,
    });
    res.status(200).json({ message: "Logout success!" });
  } catch (error) {
    next(error);
  }
};
