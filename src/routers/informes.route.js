import { Router } from "express";
import { informeAvancesGraficas, informeAvancesGraficasAll, informeExcelAvances, informeResultadosGraficas } from "../controllers/informes.controller.js";

const router = Router()

router.route('/')
    .get(informeExcelAvances)

router.route("/grafica")
    .get(informeAvancesGraficas)

router.route("/resultados")
    .get(informeResultadosGraficas)

router.route("/grafica/all")
    .get(informeAvancesGraficasAll)


export default router