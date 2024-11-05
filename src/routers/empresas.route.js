import { Router } from "express";
import { crearEmpresa, crearHubs, crearSedes, obtenerEmpresa, obtenerHubs, obtenerSedes } from "../controllers/empresas.controller.js";

const router = Router()

router.route("/")
    .get(obtenerEmpresa)
    .post(crearEmpresa)
router.route("/hubs")
    .get(obtenerHubs)
    .post(crearHubs)
router.route("/sedes")
    .get(obtenerSedes)
    .post(crearSedes)


export default router