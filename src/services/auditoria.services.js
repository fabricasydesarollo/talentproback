import { Auditoria } from "../models/auditoria.model.js";

class AuditService {
    async logAction(payload) {
        if (!payload.accion || !payload.tabla || !payload.idRegistro || !payload.fechaAccion || !payload.usuarioAccion) {
            throw new Error("Missing required fields for audit log");
        }
        const auditLog = await Auditoria.create({
            accion: payload.accion,
            tabla: payload.tabla,
            idRegistro: payload.idRegistro,
            fechaAccion: payload.fechaAccion,
            usuarioAccion: payload.usuarioAccion,
            observacion: payload.observacion || null,
            valorAnterior: payload.valorAnterior || null,
            valorNuevo: payload.valorNuevo || null,
        });
        return auditLog;
    }
}

export default new AuditService();