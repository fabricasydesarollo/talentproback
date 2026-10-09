import { Router } from "express";
import {
  asignarCompetenciasCargo,
  asignarDescriptoresNivelCargo,
  assignEvaluationCompetencies,
  crearCompetencia,
  crearDescriptor,
  crearTipoCompetencia,
  obtenerCompetencia,
  obtenerDescriptor,
  obtenerDescriptores,
  obtenerTipoCompetencia,
} from "../controllers/competencias.controller.js";

const router = Router();

router.route("/").get(obtenerCompetencia).post(crearCompetencia);

router.route("/descriptores").get(obtenerDescriptores).post(crearDescriptor);
router.route("/descriptores/:idCompetencia").get(obtenerDescriptor)

router.route("/tipo").get(obtenerTipoCompetencia).post(crearTipoCompetencia);

router.route("/assignEvaluation").post(assignEvaluationCompetencies);

router.route("/asignarCompCargo").post(asignarCompetenciasCargo);
router.route("/asignarDescCargo").post(asignarDescriptoresNivelCargo);

export default router;
