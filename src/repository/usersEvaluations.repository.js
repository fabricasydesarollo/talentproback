import { UsuariosEvaluaciones } from "../models/usuarios.model.js";

class UsersEvaluationsRepository {
    async update(payload) {
        await UsuariosEvaluaciones.update(
            { attempt: true }, {
            where: {
                idUsuario: payload.idColaborador,
                idEvaluacion: payload.idEvaluacion,
                idTipoEvaluacion: payload.idTipoEvaluacion
            }
        })
    }
}

export default new UsersEvaluationsRepository();