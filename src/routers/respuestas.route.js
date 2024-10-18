import { Router } from "express";
import { crearCalificacion, crearRespuesta, obtenerCalificacion, obtenerRespuestas } from "../controllers/respuestas.controller.js";

const router = Router()

router.route("/")
    .get(obtenerRespuestas)
    .post(crearRespuesta)

router.route("/calificacion")
    .get(obtenerCalificacion)
    .post(crearCalificacion)


export default router