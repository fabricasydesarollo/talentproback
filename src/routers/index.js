import { Router } from "express";
import routerCiudades from "./ciudades.route.js";
import routerEmpresas from "./empresas.route.js"
import routerUsuarios from "./usuarios.route.js"
import routerEvaluaciones from "./evaluaciones.route.js"
import routerCompetencias from "./competencias.route.js"
import routerRespuestas from "./respuestas.route.js"
import { schemaGen, validateRequest } from "../middleware/validateSchema.js";
const router = Router()

router.use("/ciudades", validateRequest(schemaGen), routerCiudades)
router.use("/empresas", routerEmpresas)
router.use("/usuarios", routerUsuarios)
router.use("/evaluaciones", routerEvaluaciones)
router.use("/competencias", routerCompetencias)
router.use("/respuestas", routerRespuestas)

export default router