import { Router } from "express";
import { informeAvancesGraficas, informeAvancesGraficasAll, informeExcelAvances, informeExcelAvancesDetalle, informeResultadosGraficas } from "../controllers/informes.controller.js";

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


export default router