import { Competencias, TipoCompetencia } from "../models/competencias.model.js";
import { Empresas } from "../models/empresas.model.js";
import { Evaluaciones } from "../models/evaluaciones.model.js";

class EvaluationsRepository {
    async getAll() {
        const response = await Evaluaciones.findAll({
            include: [{
                model: Competencias, through: { attributes: [] }, attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{ model: Empresas, through: { attributes: [] }, attributes: { exclude: ['createdAt', 'updatedAt', 'urlLogo', 'nit', 'idHub'] } }, { model: TipoCompetencia, attributes: { exclude: ['createdAt', 'updatedAt'] } }]
            }],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        })
        return response;
    }
    async create(payload) {
        const response = await Evaluaciones.create(payload);
        return response;
    }
    async update(payload) {
        const response = await Evaluaciones.update(payload, { where: { idEvaluacion: payload.idEvaluacion } });
        return response;
    }
}


export default new EvaluationsRepository();