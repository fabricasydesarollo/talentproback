import { Router } from "express";
import routerCiudades from "./ciudades.route.js";
import routerEmpresas from "./empresas.route.js"
import routerUsuarios from "./usuarios.route.js"
import routerEvaluaciones from "./evaluaciones.route.js"
import routerCompetencias from "./competencias.route.js"
import routerRespuestas from "./respuestas.route.js"
import { schemaGen, validateRequest } from "../middleware/validateSchema.js";
const router = Router()

router.use("/administrar/ciudades", validateRequest(schemaGen), routerCiudades)
router.use("/administrar/empresas", routerEmpresas)
router.use("/administrar/usuarios", routerUsuarios)
router.use("/administrar/evaluaciones", routerEvaluaciones)
router.use("/administrar/competencias", routerCompetencias)
router.use("/administrar/respuestas", routerRespuestas)

export default router