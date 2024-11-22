import { DataTypes } from "sequelize";
import db from "../config/db.js";


export const ADMMenus = db.define('ADMmenus', {
    idMenu :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    icono: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export const ADMRutas = db.define('ADMrutas',{
    idRuta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nomnbre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ruta: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export const ADMPerfilesUsuarios = db.define('ADMperfilesUsuarios', {
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idPerfil: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
})

export const ADMPerfilesRutas = db.define('ADMperfilesRutas', {
    idPerfil: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idRuta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
})