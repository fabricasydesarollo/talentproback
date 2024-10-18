import { Router } from "express";
import { crearCiudades, crearDepartamentos, obtenerCiudades, obtenerDepartamentos } from "../controllers/ciudades.controller.js";

const router = Router()

router.route("/departamentos")
    .get(obtenerDepartamentos)
    .post(crearDepartamentos)
router.route("/")
    .get(obtenerCiudades)
    .post(crearCiudades)

export default router