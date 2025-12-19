import { Router } from "express";
import { actualizarCompromisosPorUsuario, agregarComentarioGeneral, asignarEvalucionUsuarios, crearCompromiso, crearEvaluacion, crearTipoEvaluacion, eliminarEvaluacion, evaluacionesDisponibles, generarpdfcontroller, obtenerComentariosPorUsuario, obtenerCompromisos, obtenerEvaluacion, obtenerEvaluacionesActivas, obtenerEvaluacionesAsignadas, obtenerTipoEvaluacion } from "../controllers/evaluaciones.controller.js";

const router = Router()

router.route("/")
    .get(obtenerEvaluacion)

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
    .post(crearEvaluacion)
    
router.route("/asignarEvaluaciones").post(asignarEvalucionUsuarios);
router.route("/obtenerEvaluacionesAsignadas").get(obtenerEvaluacionesAsignadas);

export default router