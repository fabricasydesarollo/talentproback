import commentsRepository from "../repository/comments.repository.js";

class CommentsServices {
    async getByUserId(payload) {
        if (!payload.idColaborador || !payload.idEvaluacion || !payload.idEvaluador) {
            throw {
                statusCode: 400,
                message: "Faltan campos obligatorios"
            };
        }
        return await commentsRepository.getByUserId(payload);
    }
    async create(payload) {
        if (!payload.idColaborador
            || !payload.idEvaluacion
            || !payload.idEvaluador
            || !payload.comentario
            || !payload.promedio
            || (!payload.retroalimentacion  && (payload.idColaborador !== payload.idEvaluador))
        ) {
            throw {
                statusCode: 400,
                message: "Faltan campos obligatorios"
            };
        }
        if (!payload.hasOwnProperty('requiredCommitments')){
            throw {
                statusCode: 400,
                message: "Falta el campo requiredCommitments"
            };
        }

        if (payload.requiredCommitments) {
            if (!payload.compromisos || !Array.isArray(payload.compromisos) || payload.compromisos.length === 0) {
                throw {
                    statusCode: 400,
                    message: "Faltan compromisos obligatorios"
                };
            }

            if (payload.compromisos.some(compromiso => !compromiso.idCompetencia || !compromiso.comentario || !compromiso.estado || !compromiso.fechaCumplimiento)) {
                throw {
                    statusCode: 400,
                    message: "Cada compromiso debe tener idCompetencia, comentario, estado y fechaCumplimiento"
                };
            }
        }
        // idEvalRealizada
        payload.idTipoEvaluacion = payload.idColaborador === payload.idEvaluador ? 1 : 2; // 1: Autoevaluación, 2: Evaluación de otro
        return await commentsRepository.create(payload, payload.requiredCommitments);
    }
    async getCommitmentsByEvaluation(payload) {
        if (!payload.idColaborador || !payload.idEvaluacion || !payload.idEvaluador) {
            throw {
                statusCode: 400,
                message: "Faltan campos obligatorios"
            };
        }
        return await commentsRepository.getCommentsByEvaluationId(payload);
    }
}



export default new CommentsServices();