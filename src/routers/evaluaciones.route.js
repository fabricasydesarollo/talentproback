import { Router } from "express";
import { agregarComentarioGeneral, crearCompromiso, crearEvaluacion, crearTipoEvaluacion, evaluacionesDisponibles, obtenerComentariosPorUsuario, obtenerCompromisos, obtenerEvaluacion, obtenerTipoEvaluacion } from "../controllers/evaluaciones.controller.js";

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

router.route("/comentarios")
    .get(obtenerComentariosPorUsuario)
    .post(agregarComentarioGeneral)

router.route("/disponible")
    .get(evaluacionesDisponibles)

export default router