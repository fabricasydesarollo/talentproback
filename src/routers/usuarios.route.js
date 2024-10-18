import { Router } from "express";
import { actualizarUsuario, asignarUsuariosSedes, crearNivelCargo, crearPerfil, crearUsuario, obtenerNivelCargos, obtenerPerfiles, obtenerUsuarios, obtenerUsuariosSedes, usuariosEvaluar } from "../controllers/usuarios.controller.js";
import { schemaUser, validateRequest } from "../middleware/validateSchema.js";
import { loginUsuario } from "../controllers/login.controller.js";

const router = Router()

router.route("/")
    .get(obtenerUsuarios)
    .post(validateRequest(schemaUser), crearUsuario)
    
router.route("/login")
    .post(loginUsuario)
    
router.route("/:idUsuario")
    .put(actualizarUsuario)

router.route("/perfiles")
    .get(obtenerPerfiles)
    .post(crearPerfil)

router.route("/nivelcargos")
    .get(obtenerNivelCargos)
    .post(crearNivelCargo)

router.route("/sedes")
    .get(obtenerUsuariosSedes)
    .post(asignarUsuariosSedes)
router.route("/evaluar")
    .get(usuariosEvaluar)

export default router