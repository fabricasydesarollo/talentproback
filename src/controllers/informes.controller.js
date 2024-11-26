import { Sequelize } from "sequelize";
import {
  Competencias,
  Descriptores,
  TipoCompetencia,
} from "../models/competencias.model.js";
import { Empresas, Sedes } from "../models/empresas.model.js";
import {
  EvaluacionesRealizadas,
  TipoEvaluaciones,
} from "../models/evaluaciones.model.js";
import { Calificaciones, Respuestas } from "../models/respuestas.model.js";
import {
  UsuariosEmpresas,
  UsuariosSedes,
  Usuarios,
  NivelCargo,
} from "../models/usuarios.model.js";

import { calcularPromedio, transformarDatos } from "../utils/calcularPromedios.js";

export const informeAvancesGraficas = async (req, res, next) => {
  try {
    const { idEmpresa, idSede } = req.query;
    const totalUsuariosEmpresa = await UsuariosEmpresas.count({
      where: {
        idEmpresa,
      },
      distinct: true,
      col: "idUsuario",
    });
    const totalUsuariosSede = await UsuariosSedes.count({
      where: {
        idSede,
      },
      distinct: true,
      col: "idUsuario",
    });
    const { count, rows } = await Usuarios.findAndCountAll({
      include: [
        {
          model: Usuarios,
          as: "colaboradoresResp",
          through: { attributes: [] },
          required: true,
          attributes: [],
        },
        {
          model: Empresas,
          attributes: ["nombre"],
          through: { attributes: [] },
          required: true,
          where: { idEmpresa },
        },
      ],
      distinct: true,
      col: "idUsuario",
      attributes: ["idUsuario"],
    });

    const totalEmpresas = {
      respuestas: count,
      programados: totalUsuariosEmpresa,
      nombre:
        [
          ...new Set(
            rows.flatMap((usuario) =>
              usuario.Empresas.map((empresa) => empresa.nombre)
            )
          ),
        ][0] || null,
    };

    const { count: count1, rows: rows1 } = await Usuarios.findAndCountAll({
      include: [
        {
          model: Usuarios,
          as: "colaboradoresResp",
          through: {},
          required: true,
        },
        { model: Sedes, through: {}, required: true, where: { idSede } },
      ],
      distinct: true,
      col: "idUsuario",
    });

    const totalSedes = {
      respuestas: count1,
      programados: totalUsuariosSede,
      nombre:
        [
          ...new Set(
            rows1.flatMap((usuario) => usuario.Sedes.map((sede) => sede.nombre))
          ),
        ][0] || null,
    };

    res.status(200).json({
      message: "Informes",
      data: { totalEmpresas, totalSedes },
    });
  } catch (error) {
    next(error);
  }
};
export const informeAvancesGraficasAll = async (req, res, next) => {
  try {
    const { idSede, idEmpresa, idNivelCargo, area } = req.query;

    const totalUsuariosSede = await Usuarios.findAll({
      attributes: [
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.fn(
              "DISTINCT",
              Sequelize.col("colaboradoresResp.idUsuario")
            )
          ),
          "Respuestas",
        ], // Total de colaboradores
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.fn("DISTINCT", Sequelize.col("usuarios.idUsuario"))
          ),
          "Usuarios",
        ], // Total de usuarios
        [Sequelize.col("Sedes.nombre"), "nombre"], // Nombre de la sede
        "Sedes.idSede", // ID de la sede para agrupar
      ],
      include: [
        {
          model: Usuarios,
          as: "colaboradoresResp",
          attributes: [], // No seleccionamos atributos de Usuarios directamente
          through: { attributes: [] }, // No necesitamos columnas de la tabla intermedia
          required: false, // Cambiado a false para LEFT JOIN
        },
        {
          model: Sedes,
          attributes: [], // No seleccionamos directamente columnas de Sedes
          required: true, // Cambiado a false para LEFT JOIN
          through: { attributes: [] }, // No seleccionamos atributos de la tabla intermedia de la relación
          where: idSede ? { idSede } : undefined,
        },
      ],
      group: ["Sedes.idSede", "Sedes.nombre"], // Aseguramos de agrupar por idSede y nombre de sede
      distinct: true,
      raw: true, // Usamos raw para obtener resultados sin la envoltura de Sequelize
    });

    const totalUsuariosEmpresa = await Usuarios.findAll({
      attributes: [
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.fn(
              "DISTINCT",
              Sequelize.col("colaboradoresResp.idUsuario")
            )
          ),
          "Respuestas",
        ], // Contamos usuarios distintos por idUsuario
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.fn("DISTINCT", Sequelize.col("usuarios.idUsuario"))
          ),
          "Usuarios",
        ],
        [Sequelize.col("Empresas.nombre"), "nombre"],
        "Empresas.idEmpresa",
      ],
      include: [
        {
          model: Usuarios,
          as: "colaboradoresResp",
          attributes: [], // No seleccionamos atributos de Usuarios directamente
          through: { attributes: [] }, // No necesitamos columnas de la tabla intermedia
          required: false, // Cambiado a false para LEFT JOIN
        },
        {
          model: Empresas,
          through: { attributes: [] },
          attributes: [],
          required: true,
          where: idEmpresa ? { idEmpresa } : undefined,
        },
      ],
      group: ["Empresas.idEmpresa", "Empresas.nombre"],
      distinct: true,
      raw: true,
      subQuery: false,
    });

    res.status(200).json({
      message: "Informes",
      data: { totalUsuariosEmpresa, totalUsuariosSede },
    });
  } catch (error) {
    next(error);
  }
};

//informes

export const informeExcelAvances = async (req, res, next) => {
  try {
    const { idEmpresa, idSede } = req.query;
    const resp = await Usuarios.findAll({
      attributes: [
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.fn("DISTINCT", Sequelize.col("usuarios.idUsuario"))
          ),
          "Usuarios",
        ],
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.fn(
              "DISTINCT",
              Sequelize.col("colaboradoresResp.idUsuario")
            )
          ),
          "Respuestas",
        ], // Contamos usuarios distintos por idUsuario
      ],
      include: [
        {
          model: Usuarios,
          as: "evaluadores",
          attributes: ["nombre", "idUsuario"], // No seleccionamos atributos de Usuarios directamente
          through: { attributes: [] }, // No necesitamos columnas de la tabla intermedia
          required: false, // Cambiado a false para LEFT JOIN
        },
        {
          model: Usuarios,
          as: "colaboradoresResp",
          attributes: [],
          through: { attributes: [] }, // No necesitamos columnas de la tabla intermedia
          required: false, // Cambiado a false para LEFT JOIN
        },
        {
          model: Empresas,
          attributes: ["nombre"],
          through: { attributes: [] },
          where: idEmpresa ? { idEmpresa } : {},
          required: true,
        },
        {
          model: Sedes,
          attributes: ["nombre"],
          through: { attributes: [] },
          where: idSede ? { idSede } : {},
          required: true,
        },
      ],
      group: [
        "evaluadores.idUsuario",
        "Empresas.idEmpresa",
        "Empresas.nombre",
        "evaluadores.nombre",
        "Sedes.nombre",
      ],
      distinct: true,
      raw: true,
      subQuery: false,
    });
    res.status(200).json({ message: "Informe Excel", resp });
  } catch (error) {
    next(error);
  }
};

export const informeResultadosGraficas = async (req, res, next) => {
  try {
    const { idSede, idEmpresa } = req.query;
    const respuesta = await Competencias.findAll({
      include: [
        {
          model: Descriptores,
          attributes: ["idDescriptor"],
          include: [
            {
              model: Respuestas,
              attributes: ["idCalificacion"],
              include: [
                {
                  model: Calificaciones,
                  attributes: ["valor"],
                },
              ],
              required: true,
            },
          ],
          required: true,
        },
        {
          model: TipoCompetencia,
          attributes: ["nombre"],
          required: false,
        },
        {
          model: Empresas,
          where: idEmpresa ? { idEmpresa } : {},
          required: true,
          attributes: [],
          include: [
            {
              model: Sedes,
              where: idSede ? { idSede } : {},
              required: true,
              attributes: [],
            },
          ],
        },
      ],
      attributes: ["idCompetencia", "nombre"],
    });
    res.status(200).json({
      message: "Informes",
      data: calcularPromedio(respuesta),
    });
  } catch (error) {
    next(error);
  }
};

export const informeExcelAvancesDetalle = async (req, res, next) => {
  try {
    const { idSede, idEmpresa, idEvaluador } = req.query;

    const response = await Usuarios.findAll({
      include: [
        {
          model: Usuarios,
          as: "colaboradores",
          required: true,
          attributes: {
            exclude: [
              "contrasena",
              "defaultContrasena",
              "createdAt",
              "updatedAt",
              "idPerfil",
              "idNivelCargo",
              "activo",
            ],
          },
          through: { attributes: [] },
          include: [
            {
              model: Empresas,
              through: { attributes: [], where: { principal: true } },
              attributes: ["nombre"],
            },{
              model: Sedes,
              through: {attributes: [], where: {principal: true}},
              attributes: ['nombre']
            },
            {
              model: NivelCargo,
              attributes: ["nombre"],
            },
            {
              model: EvaluacionesRealizadas,
              as: "evaluacionesComoColaborador", // Alias correcto para la relación
              attributes: ["promedio", "comentario"],
              include: [{ model: TipoEvaluaciones, attributes: ["nombre"] }],
            },
          ],
        },
        {
          model: Empresas,
          through: { attributes: [], where: { principal: true } },
          attributes: ["nombre"],
          where: idEmpresa ? {idEmpresa} : undefined,
        },
        {
          model: Sedes,
          through: {attributes: [], where: {principal: true}},
          attributes: ['nombre'],
          where: idSede ? {idSede} : undefined
        },
        {
          model: NivelCargo,
          attributes: ["nombre"],
        },
        {
          model: EvaluacionesRealizadas,
          as: "evaluacionesComoColaborador", // Alias correcto para la relación
          attributes: ["promedio", "comentario"],
          include: [{ model: TipoEvaluaciones, attributes: ["nombre"] }],
        },
      ],
      attributes: {
        exclude: [
          "contrasena",
          "defaultContrasena",
          "createdAt",
          "updatedAt",
          "idPerfil",
          "idNivelCargo",
          "activo",
        ],
      },
      where: idEvaluador ? { idUsuario: idEvaluador } : undefined,
    });

    res.status(200).json({
      message: "informe Detalle",
      response: transformarDatos(response),
    });
  } catch (error) {
    next(error);
  }
};
