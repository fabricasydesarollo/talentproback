import { Router } from "express";
import { exportExcel, informeAvancesGraficas, informeAvancesGraficasAll, informeExcelAvances, informeExcelAvancesDetalle, informeExcelResultadosDetalle, informeParaEvaluador, informeResultadosGraficas, reporteAccionesMejora } from "../controllers/informes.controller.js";

const router = Router()

router.route('/')
    .get(informeExcelAvances)

router.route("/grafica")
    .get(informeAvancesGraficas)

router.route("/resultados")
    .get(informeResultadosGraficas)

router.route("/grafica/all")
    .get(informeAvancesGraficasAll)
router.route("/detalle")
    .get(informeExcelAvancesDetalle)
router.route("/acciones")
    .get(reporteAccionesMejora)
router.route("/resultados/detalle")
    .get(informeExcelResultadosDetalle)
router.route("/resultados/evaluador")
    .get(informeParaEvaluador)

router.route("/exportExcel")
    .post(exportExcel)


export default router