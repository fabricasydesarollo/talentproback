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
            { expiresIn: "6h" }
          );
    } catch (error) {
        return error
    }
};

export const validateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  try {
    const data = jwt.verify(token, process.env.SECRETWORD);
    res.status(200).json({ message: "Ok", data });
  } catch (error) {
    next(error);
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
