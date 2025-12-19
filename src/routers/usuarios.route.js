import { Router } from "express";
import { actualizarContraseña, actualizarUsuario, asignarColaboradoresEvaluar, asignarUsuariosSedes, buscarUsuarios, crearNivelCargo, crearPerfil, crearUsuario, obtenerColaboradores, obtenerListaUsuarios, obtenerNivelCargos, obtenerPerfiles, obtenerUnicoUsuario, obtenerUsuariosSedes, usuariosEvaluar } from "../controllers/usuarios.controller.js";
import { schemaUser, validateRequest } from "../middleware/validateSchema.js";
import { loginUsuario, obtenerAutoevaluaciones } from "../controllers/login.controller.js";
import { logoutSession, validateToken } from "../utils/token.js";

const router = Router()

router.route("/")
    .get(obtenerUnicoUsuario)
    .post(crearUsuario)

router.route("/search")
    .get(buscarUsuarios)

router.route("/colaboradores")
    .get(obtenerColaboradores)
    .post(asignarColaboradoresEvaluar)
    
router.route("/login")
    .post(loginUsuario)

router.route("/misEvaluaciones")
    .get(obtenerAutoevaluaciones)


router.route("/:idUsuario")
    .put(actualizarUsuario)
    .patch(actualizarContraseña)

router.route("/perfiles")
    .get(obtenerPerfiles)
    .post(crearPerfil)

router.route("/nivelcargos")
    .get(obtenerNivelCargos)
    .post(crearNivelCargo)

router.route("/empresassedes")
    .get(obtenerUsuariosSedes)
    .post(asignarUsuariosSedes)

router.route("/evaluar")
    .get(usuariosEvaluar)

router.route("/sesion")
    .get(validateToken)
    
router.route("/logout")
    .post(logoutSession)

router.route("/obtenerListaUsuarios")
    .get(obtenerListaUsuarios)

export default router