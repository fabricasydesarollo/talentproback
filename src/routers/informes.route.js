import { Router } from "express";
import { informeAvancesGraficas, informeAvancesGraficasAll } from "../controllers/informes.controller.js";

const router = Router()

router.route("/grafica")
    .get(informeAvancesGraficas)
router.route("/grafica/all")
    .get(informeAvancesGraficasAll)


export default router