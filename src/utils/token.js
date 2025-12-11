import jwt from "jsonwebtoken";
import dontenv from "dotenv";
dontenv.config();

const SECRETWORD = process.env.SECRETWORD;

export const generateToken = async (usuario) => {
    try {
        return jwt.sign(
            {
              idUsuario: usuario.idUsuario,
              correo: usuario.correo,
              idPerfil: usuario.idPerfil,
            },
            SECRETWORD,
            { expiresIn: "12h" }
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
    return res.status(403).json({ message: "Acceso denegado" });
  }
  try {
    const data = jwt.verify(token, process.env.SECRETWORD);
    res.status(200).json({ message: "Sesión valida", data });
  } catch (error) {
    res.status(403).json({ message: "Token inválido o expirado" });
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
