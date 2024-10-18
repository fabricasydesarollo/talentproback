import { DataTypes } from "sequelize";
import db from "../config/db.js";


export const Respuestas = db.define("respuestas",{
    idRespuesta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idEvaluacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idEvaluador: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idColaborador: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idDescriptor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idCalificacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

export const Calificaciones = db.define("calificaciones",{
    idCalificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
})