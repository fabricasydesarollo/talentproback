import usersEvaluationsRepository from "../repository/usersEvaluations.repository.js";

class UsersEvaluationsServices {
    updateAttempt(payload) {
        if (!payload.idColaborador || !payload.idEvaluacion || !payload.idTipoEvaluacion) {
            throw {
                statusCode: 400,
                message: "Faltan campos obligatorios"
            };
        }
        return usersEvaluationsRepository.update(payload);
    }
}

export default new UsersEvaluationsServices();