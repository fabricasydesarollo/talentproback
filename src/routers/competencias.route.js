import { Router } from "express";
import {
  asignarCompetenciaEvaluacion,
  asignarCompetenciasCargo,
  crearCompetencia,
  crearDescriptor,
  crearTipoCompetencia,
  obtenerCompetencia,
  obtenerDescriptor,
  obtenerTipoCompetencia,
} from "../controllers/competencias.controller.js";

const router = Router();

router.route("/").get(obtenerCompetencia).post(crearCompetencia);

router.route("/descriptor").get(obtenerDescriptor).post(crearDescriptor);

router.route("/tipo").get(obtenerTipoCompetencia).post(crearTipoCompetencia);

router.route("/asignarCompEval").post(asignarCompetenciaEvaluacion);

router.route("/asignarCompCargo").post(asignarCompetenciasCargo);

router.route("/asignarCompCargo").post("");

export default router;
