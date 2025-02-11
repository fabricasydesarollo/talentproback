import { Router } from "express";
import { actualizarCompromisosPorUsuario, agregarComentarioGeneral, crearCompromiso, crearEvaluacion, crearTipoEvaluacion, eliminarEvaluacion, evaluacionesDisponibles, generarpdfcontroller, obtenerComentariosPorUsuario, obtenerCompromisos, obtenerEvaluacion, obtenerEvaluacionesActivas, obtenerTipoEvaluacion } from "../controllers/evaluaciones.controller.js";

const router = Router()

router.route("/")
    .get(obtenerEvaluacion)
    .post(crearEvaluacion)

router.route("/tipo")
    .get(obtenerTipoEvaluacion)
    .post(crearTipoEvaluacion)

router.route("/compromisos")
    .get(obtenerCompromisos)
    .post(crearCompromiso)
    .patch(actualizarCompromisosPorUsuario)

router.route("/comentarios")
    .get(obtenerComentariosPorUsuario)
    .post(agregarComentarioGeneral)

router.route("/disponible")
    .get(evaluacionesDisponibles)
    .delete(eliminarEvaluacion)

router.route("/gestionar")
    .get(obtenerEvaluacionesActivas)
    .delete(eliminarEvaluacion)

export default router