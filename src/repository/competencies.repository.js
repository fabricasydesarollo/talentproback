import { Op } from "sequelize";
import { EvaluacionCompetencias } from "../models/competencias.model.js";

class EvaluationCompetencyRepository {
    async findByEvaluation(idEvaluation) {
        return EvaluacionCompetencias.findAll({
            where: { idEvaluacion: idEvaluation }
        })
    }

    async deleteMany(idEvaluation, competencyIds) {
        return EvaluacionCompetencias.destroy({
            where: {
                idEvaluacion: idEvaluation,
                idCompetencia: {
                    [Op.in]: competencyIds
                }
            }
        })
    }
    async create(data) {
        return EvaluacionCompetencias.create(data);
    }

    async createMany(records) {
        return EvaluacionCompetencias.bulkCreate(records)
    }
}

export default new EvaluationCompetencyRepository();