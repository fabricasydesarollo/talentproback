import userevaluatorRepository from "../repository/userevaluator.repository.js";

class UsersEvaluatorServices {
    async updateAttempt(payload) {
        if (!payload.idColaborador || !payload.idEvaluacion || !payload.idEvaluador) {
            throw {
                statusCode: 400,
                message: "Faltan campos obligatorios"
            };
        }
        return userevaluatorRepository.update(payload);
    }
}
export default new UsersEvaluatorServices();