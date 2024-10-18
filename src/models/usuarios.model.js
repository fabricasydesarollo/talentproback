import { DataTypes} from 'sequelize';
import db from '../config/db.js';


export const Usuarios = db.define('usuarios', {
    idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idNivelCargo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idPerfil: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: true
    },
})

export const UsuariosEvaluadores = db.define('usuariosEvaluadores', {
    idEvaluador: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

export const Perfiles = db.define("perfiles", {
    idPerfil:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export const NivelCargo = db.define("nivelCargo",{
    idNivelCargo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export const UsuariosEvaluaciones = db.define("UsuariosEvaluaciones", {
    idUsuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idEvaluacion:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

export const UsuariosSedes = db.define("UsuariosSedes", {
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idSede: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})
export const UsuariosEmpresas = db.define("UsuariosEmpresas", {
    idUsuario: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idEmpresa: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
})
