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
    area: {
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
    fechaIngreso: {
        type: DataTypes.DATE,
        allowNull: true
    },
    idNivelCargo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idPerfil: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    defaultContrasena: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: true
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
        primaryKey: true,
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idEvaluacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: 'Evaluaciones',
            key: 'idEvaluacion'
          },
    },
    completado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0
    },
    deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null
    }
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
        primaryKey: true,
        allowNull: false
    },
    idEvaluacion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    idTipoEvaluacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    attempt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    maxAttempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
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
    principal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    reportes: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
    }
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
    principal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    reportes: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
    }
})
