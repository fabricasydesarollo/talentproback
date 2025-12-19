import { DataTypes } from "sequelize";
import db from "../config/db.js";

export const Hubs = db.define("Hubs",{
    idHub:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export const Empresas = db.define("Empresas",{
    idEmpresa:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nit:{
        type: DataTypes.STRING,
        allowNull: true
    },
    urlLogo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    idHub: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

export const Sedes = db.define("Sedes",{
    idSede:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    siglas: {
        type: DataTypes.STRING,
        allowNull:false
    },
    idEmpresa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idCiudad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})