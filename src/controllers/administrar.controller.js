import { ADMMenus, ADMRutas } from "../models/administrar.model.js";
import { Perfiles } from "../models/usuarios.model.js";

export const obtenerMenusPorUsuario = async (req, res, next) => {
  try {
    const { idPerfil } = req.query;
    const response = await ADMMenus.findAll({
      include: [
        {
          model: ADMRutas,
          include: [
            {
              model: Perfiles,
              through: { attributes: [] },
              where: { idPerfil },
              required: true
            },
          ],
          required: true
        },
      ],
    });
    res.status(200).json({ message: "ok", response });
  } catch (error) {
    next(error);
  }
};
