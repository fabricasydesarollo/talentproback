import { Router } from "express";
import { loginUsuario } from "../controllers/login.controller.js";

const router = Router()

router.route("/")
    .post(loginUsuario)

export default router