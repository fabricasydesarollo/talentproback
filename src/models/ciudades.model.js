import { DataTypes } from "sequelize";
import db from "../config/db.js";

export const Departamentos = db.define("Departamentos", {
    idDepartamento:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


export const Ciudades = db.define("Ciudades",{
    idCiudad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idDepartamento: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},)