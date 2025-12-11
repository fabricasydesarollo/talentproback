import { DataTypes } from "sequelize";
import db from "../config/db.js";


export const Evaluaciones = db.define("Evaluaciones", {
    idEvaluacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: new Date().getFullYear()
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    activa: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
})

export const TipoEvaluaciones = db.define("TipoEvaluaciones", {
    idTipoEvaluacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    peso: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.1
    },
})

export const EvaluacionesRealizadas= db.define("EvaluacionesRealizadas", {
    idEvalRealizada: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
    idTipoEvaluacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    promedio: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: true
    },
    retroalimentacion: {
        type:DataTypes.BOOLEAN,
        allowNull: true
    }
});


export const Compromisos = db.define("Compromisos", {
    idCompromiso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idEvalRealizada: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idCompetencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM("Por Iniciar", "En curso", "Finalizado"),
        allowNull: false,
    },
    fechaCumplimiento: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

export const DescriptoresNivelesCargo = db.define("DescriptoresNivelesCargo", {
    idDescriptor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idNivelCargo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})


