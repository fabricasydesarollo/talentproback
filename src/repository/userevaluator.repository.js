import { Op } from "sequelize";
import { UsuariosEvaluadores } from "../models/usuarios.model.js";

class UserEvaluatorRepository {
  async updateAttempt(payload) {
    await UsuariosEvaluadores.update(
      { completado: true },
      {
        where: {
          idEvaluador: payload.idEvaluador,
          idEvaluacion: payload.idEvaluacion,
          idUsuario: payload.idColaborador
        }
      }
    )
  }
  async softDeleteEvaluator(payload, isDeleted = true, isGroup = false) {

    const deletedAt = isDeleted ? new Date() : null;

    const where = {
      idEvaluador: payload.idEvaluador,
      idEvaluacion: payload.idEvaluacion
    };

    if (isGroup) {
      where.idUsuario = {
        [Op.notIn]: payload.ids_usuarios
      };
    } else if (!isDeleted) {
      where.idUsuario = payload.idUsuario;
    }

    const currentUsers = await UsuariosEvaluadores.findAll({where})

    const [rowsAffected] = await UsuariosEvaluadores.update(
      { deletedAt },
      { where }
    );

    return {
      currentUsers,
      rowsAffected
    };
  }
  async findOrCreate(payload) {
    const [user, created] = await UsuariosEvaluadores.findOrCreate(payload);
    return { user, created };
  }
}

export default new UserEvaluatorRepository();