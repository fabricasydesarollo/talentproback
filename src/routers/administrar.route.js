import { Router } from "express";
import { obtenerMenusPorUsuario } from "../controllers/administrar.controller.js";

const router = Router()

router.route("/menus")
    .get(obtenerMenusPorUsuario)

export default router