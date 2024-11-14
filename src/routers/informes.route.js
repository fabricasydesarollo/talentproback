import { Router } from "express";
import { informeAvancesGraficas, informeAvancesGraficasAll, informeExcelAvances } from "../controllers/informes.controller.js";

const router = Router()

router.route('/')
    .get(informeExcelAvances)

router.route("/grafica")
    .get(informeAvancesGraficas)
router.route("/grafica/all")
    .get(informeAvancesGraficasAll)
//informes


export default router