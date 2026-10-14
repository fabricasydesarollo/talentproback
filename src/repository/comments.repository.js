import { Competencias } from "../models/competencias.model.js";
import { Compromisos, EvaluacionesRealizadas } from "../models/evaluaciones.model.js";
import transaction from "../config/db.js";

class CommentsRepository {
    async getByUserId(payload) {
        const comments = await EvaluacionesRealizadas.findOne({
            where: {
                idColaborador: payload.idColaborador,
                idEvaluacion: payload.idEvaluacion,
                idEvaluador: payload.idEvaluador,
                idTipoEvaluacion: 2
            },
            include: [
                {
                    model: Compromisos,
                    required: false, // Esto hace que la consulta no falle si no hay compromisos
                    include: [{ model: Competencias, attributes: { exclude: ["updatedAt", "createdAt", "idTipo"] } }],
                    attributes: { exclude: ["idEvalRealizada", "idCompetencia", "updatedAt", "createdAt"] }
                },
            ],
            attributes: ["idEvalRealizada", "comentario", "retroalimentacion"]
        });
        return comments;
    }
    async create(payload, requiredCommitments) {
        let t;
        try {
            t = await transaction.transaction();
            if (requiredCommitments) {
                const newComment = await EvaluacionesRealizadas.create({
                    idColaborador: payload.idColaborador,
                    idEvaluador: payload.idEvaluador,
                    idEvaluacion: payload.idEvaluacion,
                    comentario: payload.comentario,
                    promedio: payload.promedio,
                    retroalimentacion: payload.retroalimentacion,
                    idTipoEvaluacion: payload.idTipoEvaluacion
                }, { transaction: t });
                const result = await Compromisos.bulkCreate(payload.compromisos.map(compromiso => ({
                    idEvalRealizada: newComment.idEvalRealizada,
                    idCompetencia: compromiso.idCompetencia,
                    comentario: compromiso.comentario,
                    estado: compromiso.estado,
                    fechaCumplimiento: compromiso.fechaCumplimiento
                })), { transaction: t });
                await t.commit();
                return { newComment, result };
            }
            const newComment = await EvaluacionesRealizadas.create({
                idColaborador: payload.idColaborador,
                idEvaluador: payload.idEvaluador,
                idEvaluacion: payload.idEvaluacion,
                comentario: payload.comentario,
                promedio: payload.promedio,
                retroalimentacion: payload.retroalimentacion,
                idTipoEvaluacion: payload.idTipoEvaluacion
            }, { transaction: t });
            await t.commit();
            return newComment;
        } catch (error) {
            if (t) await t.rollback();
            throw {
                statusCode: 400,
                message: error.message || "Error al crear el comentario"
            };
        }
    }
    async getCommentsByEvaluationId(payload) {
        const comments = await EvaluacionesRealizadas.findOne({
            where: {
                idEvaluacion: payload.idEvaluacion,
                idColaborador: payload.idColaborador,
                idEvaluador: payload.idEvaluador,
            }
        });
        return comments;
    }
}

export default new CommentsRepository();