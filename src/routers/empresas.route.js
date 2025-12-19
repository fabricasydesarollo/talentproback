import { Router } from "express";
import { actualizarEmpresa, actualizarSede, crearEmpresa, crearHubs, crearSedes, eliminarSede, obtenerEmpresa, obtenerHubs, obtenerSedes } from "../controllers/empresas.controller.js";
import upload from "../utils/multer.js";

const router = Router()

router.route("/")
    .get(obtenerEmpresa)
    .post(upload.single('file'), crearEmpresa)
    .put(upload.single('file'), actualizarEmpresa)
router.route("/hubs")
    .get(obtenerHubs)
    .post(crearHubs)
router.route("/sedes")
    .get(obtenerSedes)
    .post(crearSedes)
    
router.route("/sedes/:idSede")
    .delete(eliminarSede)
    .patch(actualizarSede)


export default router