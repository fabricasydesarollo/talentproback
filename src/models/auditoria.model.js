import { DataTypes } from "sequelize";
import db from "../config/db.js";

export const Auditoria = db.define("Auditoria", {
    idAuditoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tabla: DataTypes.STRING,
    accion: DataTypes.STRING,
    idRegistro: DataTypes.INTEGER,
    valorAnterior: DataTypes.JSON,
    valorNuevo: DataTypes.JSON,
    observacion: DataTypes.STRING,
    usuarioAccion: DataTypes.INTEGER,
    fechaAccion: DataTypes.DATE
}, {
    tableName: "auditoria"
});