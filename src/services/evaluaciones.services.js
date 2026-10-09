import evaluationsRepository from "../repository/evaluaciones.repository.js";

class EvaluationsService {
    async getEvaluations() {
        const evaluations = await evaluationsRepository.getAll();

        if (!evaluations || evaluations.length === 0) {
            throw {
                statusCode: 404,
                message: "No se encontraron evaluaciones"
            }
        }
        return evaluations;
    }

    async createEvaluation(payload) {
        if (!payload.nombre || !payload.year || !payload.fechaInicio || !payload.fechaFin || !payload.objetivo) {
            throw {
                statusCode: 400,
                message: "Faltan campos obligatorios"
            };
        }

        if (payload.fechaInicio > payload.fechaFin) {
            throw {
                statusCode: 400,
                message: "La fecha de inicio no puede ser mayor a la fecha de fin"
            };
        }

        if (payload.year.length !== 4 || isNaN(payload.year)) {
            throw {
                statusCode: 400,
                message: "El año debe ser un número de 4 dígitos"
            };
        }

        return await evaluationsRepository.create(payload);
    }

    async updateEvaluation(payload) {
        if (!payload.idEvaluacion) {
            throw {
                statusCode: 400,
                message: "Falta el ID de la evaluación"
            };
        }

        const existingEvaluation = await evaluationsRepository.getAll({ where: { idEvaluacion: payload.idEvaluacion } });

        if (!existingEvaluation || existingEvaluation.length === 0) {
            throw {
                statusCode: 404,
                message: "La evaluación no existe"
            };
        }

        return await evaluationsRepository.update(payload);
    }
}

export default new EvaluationsService();