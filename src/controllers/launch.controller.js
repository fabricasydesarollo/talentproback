import { Empresas } from "../models/empresas.model.js";
import { Evaluaciones } from "../models/evaluaciones.model.js";
import { Usuarios } from "../models/usuarios.model.js";
import { loadSecrets } from "../config/secrets.js";
import { generateToken } from "../utils/token.js";
import {
  LAUNCH_TICKET_NONCE_CACHE_MS,
  verifyLaunchTicket,
} from "../utils/launchTicket.js";
import auditoriaServices from "../services/auditoria.services.js";

// Nonces vistos con su timestamp. Ventana: LAUNCH_TICKET_NONCE_CACHE_MS.
// Limpieza oportunista (sin timers): cada 60 s se purgan los expirados.
const seenNonces = new Map();
let lastSweepAt = 0;

const sweepNonces = (now) => {
  for (const [nonce, seenAt] of seenNonces) {
    if (now - seenAt > LAUNCH_TICKET_NONCE_CACHE_MS) {
      seenNonces.delete(nonce);
    }
  }
  lastSweepAt = now;
};

const rememberNonce = (nonce, now) => {
  if (now - lastSweepAt > 60_000) {
    sweepNonces(now);
  }
  if (seenNonces.has(nonce)) {
    return false;
  }
  seenNonces.set(nonce, now);
  return true;
};

const reject = (res, code, message) => res.status(403).json({ code, message });

export const launchConHelixa = async (req, res, next) => {
  try {
    const ticket = req.body?.ticket ?? req.query?.ticket;
    if (!ticket) {
      return reject(res, "MALFORMED", "Falta el ticket de Helixa.");
    }

    const secrets = await loadSecrets();
    if (!secrets.LAUNCH_TICKET_SECRET) {
      throw new Error(
        "LAUNCH_TICKET_SECRET no esta configurado. Defina la variable de entorno con el mismo valor de Helixa (minimo 32 caracteres)."
      );
    }

    let claims;
    try {
      claims = verifyLaunchTicket(ticket, secrets.LAUNCH_TICKET_SECRET);
    } catch (error) {
      return reject(res, error.code || "MALFORMED", error.message);
    }

    if (!rememberNonce(claims.nonce, Date.now())) {
      return reject(res, "EXPIRED", "Ticket ya utilizado.");
    }

    // Modo requiereEmpresa = false: Helixa siempre firma codigoEmpresa null.
    // No existe columna de codigo en Empresas/UsuariosEmpresas (unen por
    // idEmpresa numerico), asi que un ticket con empresa no tiene lookup
    // posible en este parche.
    if (claims.codigoEmpresa !== null && claims.codigoEmpresa !== undefined) {
      return reject(res, "CONTEXT_USER_NOT_FOUND", "Ticket con empresa no soportado en este modo.");
    }

    const documentoId = Number(claims.documento);
    if (!Number.isInteger(documentoId)) {
      return reject(res, "CONTEXT_USER_NOT_FOUND", "Documento sin usuario local.");
    }

    const usuario = await Usuarios.findOne({ where: { idUsuario: documentoId } });
    if (!usuario || !usuario.activo) {
      return reject(res, "CONTEXT_USER_NOT_FOUND", "Usuario sin contexto local.");
    }

    // Misma sesion que el login normal: query de sedes, JWT 6h y cookie.
    const idUsuario = usuario.idUsuario;
    const usuarioSedes = await Usuarios.findOne({
      where: { idUsuario },
      attributes: ["idUsuario", "nombre", "idPerfil", "idNivelCargo", "cargo", "fechaIngreso"],
      include: [
        {
          model: Empresas,
          attributes: { exclude: ["idHub", "createdAt", "updatedAt"] },
          through: { attributes: [], where: { principal: true } },
        },
        {
          model: Evaluaciones,
          through: {
            attributes: ["idTipoEvaluacion", "attempt", "maxAttempts"],
            where: { idTipoEvaluacion: 1 },
          },
        },
      ],
    });

    const token = await generateToken(usuario);
    res.cookie("token", token, {
      path: "/",
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });

    try {
      await auditoriaServices.logAction({
        accion: "LOGIN",
        tabla: "usuarios",
        idRegistro: idUsuario,
        fechaAccion: new Date(),
        usuarioAccion: idUsuario,
      });
    } catch (auditError) {
      console.error("launchConHelixa: auditoria no registrada.", auditError);
    }

    // El navegador navego a esta URL (form-POST): redirigir al front en vez
    // de responder JSON. Debe ser una ruta protegida del front.
    const frontUrl = (process.env.TALENTPRO_FRONT_URL || "").replace(/\/$/, "");
    if (!frontUrl) {
      throw new Error(
        "TALENTPRO_FRONT_URL no esta configurado. Defina la URL del front de TalentPro (ruta protegida)."
      );
    }
    return res.redirect(302, frontUrl);
  } catch (error) {
    next(error);
  }
};
