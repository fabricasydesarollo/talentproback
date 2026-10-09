import evaluationCompetencyRepository from "../repository/competencies.repository.js"

class EvaluationService {
    async assignCompetencies(payload) {
        const currentCompetencies = await evaluationCompetencyRepository.findByEvaluation(
            payload.idEvaluacion
        )

        const currentCompetenciesIds = currentCompetencies.map(competency => competency.idCompetencia)

        const competenciesToAdd = payload.competencias.filter(id => !currentCompetenciesIds.includes(id))

        const competenciesToDelete = currentCompetenciesIds.filter(id => !payload.competencias.includes(id))

        if (competenciesToDelete.length > 0) {
            await evaluationCompetencyRepository.deleteMany(payload.idEvaluacion, competenciesToDelete)
        }

        if (competenciesToAdd.length > 0) {
            const recordsToCreate = competenciesToAdd.map(id => ({
                idEvaluacion: payload.idEvaluacion,
                idCompetencia: id
            }))
            await evaluationCompetencyRepository.createMany(recordsToCreate)
        }

        return {
            message: "Competencies synchronized successfully.",
        }
    }
}
const evaluationService = new EvaluationService()
export default evaluationService;