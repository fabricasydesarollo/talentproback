import { DataTypes } from "sequelize";
import db from "../config/db.js";

export const Competencias = db.define("Competencias",{
    idCompetencia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idTipo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
})

export const CompetenciasNivelesCargo = db.define("CompetenciasNivelesCargo",{
    idCompetencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idNivelCargo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})
export const CompetenciasEmpresas = db.define("CompetenciasEmpresas",{
    idCompetencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idEmpresa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})



export const EvaluacionCompetencias = db.define("EvaluacionCompetencias",{
    idEvaluacion: {
        type: DataTypes.INTEGER,
    },
    idCompetencia: {
        type: DataTypes.INTEGER,
    },
})

export const TipoCompetencia = db.define("TipoCompetencia", {
    idTipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export const Descriptores = db.define("Descriptores",{
    idDescriptor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    idCompetencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
})