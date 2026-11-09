import { Router } from "express";
import { launchConHelixa } from "../controllers/launch.controller.js";

const router = Router();

router.route("/").post(launchConHelixa).get(launchConHelixa);

export default router;
