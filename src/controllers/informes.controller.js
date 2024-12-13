import { Op } from "sequelize";
import Sequelize from "../config/db.js";
import {
  Competencias,
  Descriptores,
  TipoCompetencia,
} from "../models/competencias.model.js";
import { Empresas, Sedes } from "../models/empresas.model.js";
import {
  Compromisos,
  EvaluacionesRealizadas,
} from "../models/evaluaciones.model.js";
import { Calificaciones, Respuestas } from "../models/respuestas.model.js";
import {
  UsuariosEmpresas,
  UsuariosSedes,
  Usuarios,
} from "../models/usuarios.model.js";

import {
  calcularPromedio,
  transformarDatos,
} from "../utils/calcularPromedios.js";

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
    const { idSede, idEmpresa, idEvaluador, area } = req.query;

    // const totalUsuariosSede = await Usuarios.findAll({
    //   attributes: [
    //     [
    //       Sequelize.fn(
    //         "COUNT",
    //         Sequelize.fn(
    //           "DISTINCT",
    //           Sequelize.col("colaboradoresResp.idUsuario")
    //         )
    //       ),
    //       "Respuestas",
    //     ], // Total de colaboradores
    //     [
    //       Sequelize.fn(
    //         "COUNT",
    //         Sequelize.fn("DISTINCT", Sequelize.col("usuarios.idUsuario"))
    //       ),
    //       "Usuarios",
    //     ], // Total de usuarios
    //     [Sequelize.col("Sedes.nombre"), "nombre"], // Nombre de la sede
    //     "Sedes.idSede", // ID de la sede para agrupar
    //   ],
    //   include: [
    //     {
    //       model: Usuarios,
    //       as: "colaboradoresResp",
    //       attributes: [], // No seleccionamos atributos de Usuarios directamente
    //       through: { attributes: [] }, // No necesitamos columnas de la tabla intermedia
    //       required: false, // Cambiado a false para LEFT JOIN
    //     },
    //     {
    //       model: Sedes,
    //       attributes: [], // No seleccionamos directamente columnas de Sedes
    //       required: true, // Cambiado a false para LEFT JOIN
    //       through: { attributes: [] }, // No seleccionamos atributos de la tabla intermedia de la relación
    //       where: idSede ? { idSede: { [Op.in]: idSede } } : { idSede: { [Op.eq]: null } },
    //     },
    //   ],
    //   group: ["Sedes.idSede", "Sedes.nombre"], // Aseguramos de agrupar por idSede y nombre de sede
    //   distinct: true,
    //   raw: true, // Usamos raw para obtener resultados sin la envoltura de Sequelize
    //   logging: true
    // });

    const querySedes = `
    SELECT COUNT(DISTINCT u.idUsuario) as Usuarios, COUNT(DISTINCT r.idColaborador) as Respuestas, s.idSede, s.nombre 
    FROM usuarios u 
    LEFT JOIN respuestas r ON r.idColaborador = u.idUsuario 
    LEFT JOIN UsuariosSedes us ON us.idUsuario = u.idUsuario
    LEFT JOIN Sedes s ON s.idSede = us.idSede 
    WHERE 
        us.idSede IN (:idSede)
        AND u.activo = 1 
        AND (ISNULL(us.principal) OR us.principal = 1)
    GROUP BY 
        s.idSede, s.nombre;
      `
    const replacements = {
      idSede: idSede || null,
    };
    const totalUsuariosSede = await Sequelize.query(querySedes, {
      replacements,
      type: Sequelize.QueryTypes.SELECT, // Indica que estamos obteniendo resultados.
    });
    const queryEmpresas = `
    SELECT COUNT(DISTINCT u.idUsuario) as Usuarios, COUNT(DISTINCT r.idColaborador) as Respuestas, e.idEmpresa, e.nombre
    FROM usuarios u 
    LEFT JOIN respuestas r ON r.idColaborador = u.idUsuario 
    JOIN UsuariosEmpresas ue2 ON ue2.idUsuario = u.idUsuario
    LEFT JOIN Empresas e ON e.idEmpresa = ue2.idEmpresa 
    WHERE u.activo = 1 AND ue2.principal = 1 
    GROUP BY 
        e.nombre, e.idEmpresa;
      `
    // const totalUsuariosEmpresa = await Usuarios.findAll({
    //   attributes: [
    //     [
    //       Sequelize.fn(
    //         "COUNT",
    //         Sequelize.fn(
    //           "DISTINCT",
    //           Sequelize.col("colaboradoresResp.idUsuario")
    //         )
    //       ),
    //       "Respuestas",
    //     ], // Contamos usuarios distintos por idUsuario
    //     [
    //       Sequelize.fn(
    //         "COUNT",
    //         Sequelize.fn("DISTINCT", Sequelize.col("usuarios.idUsuario"))
    //       ),
    //       "Usuarios",
    //     ],
    //     [Sequelize.col("Empresas.nombre"), "nombre"],
    //     "Empresas.idEmpresa",
    //   ],
    //   include: [
    //     {
    //       model: Usuarios,
    //       as: "colaboradoresResp",
    //       attributes: [], // No seleccionamos atributos de Usuarios directamente
    //       through: { attributes: [] }, // No necesitamos columnas de la tabla intermedia
    //       required: false, // Cambiado a false para LEFT JOIN
    //     },
    //     {
    //       model: Empresas,
    //       through: { attributes: [] },
    //       attributes: [],
    //       required: true,
    //       where: idEmpresa ? { idEmpresa } : undefined,
    //     },
    //   ],
    //   group: ["Empresas.idEmpresa", "Empresas.nombre"],
    //   distinct: true,
    //   raw: true,
    //   subQuery: false,
    // });

    const replacements1 = {
      idSede: idSede || null,
    };
    const totalUsuariosEmpresa = await Sequelize.query(queryEmpresas, {
      replacements1,
      type: Sequelize.QueryTypes.SELECT, // Indica que estamos obteniendo resultados.
    });
    const query = `
    SELECT COUNT(DISTINCT u.idUsuario) as Usuarios,
    COUNT(er.idColaborador) as Respuestas from usuarios u
    JOIN UsuariosEmpresas ue ON u.idUsuario = ue.idUsuario 
    LEFT JOIN EvaluacionesRealizadas er ON er.idColaborador = u.idUsuario
    WHERE u.activo = 1 AND ue.principal = TRUE
    ;`;
    const avanceGlobal = await Sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT, // Indica que estamos obteniendo resultados.
    });

    res.status(200).json({
      message: "Informes",
      data: { totalUsuariosEmpresa, totalUsuariosSede, avanceGlobal },
    });
  } catch (error) {
    next(error);
  }
};

//informes

export const informeExcelAvances = async (req, res, next) => {
  try {
    const { idEmpresa, idSede } = req.query;

    const query = `
        SELECT 
          e.idUsuario as documento, 
          e.nombre, 
          e2.nombre AS empresa, 
          s.nombre AS sede, 
          COUNT(u.idUsuario) AS colaboradores,
          COUNT(er.idColaborador) AS respuestas
        FROM usuarios e 
        LEFT JOIN usuariosEvaluadores ue2 ON ue2.idEvaluador = e.idUsuario
        JOIN usuarios u ON u.idUsuario = ue2.idUsuario 
        LEFT JOIN EvaluacionesRealizadas er ON er.idColaborador = u.idUsuario
        LEFT JOIN UsuariosEmpresas ue ON u.idUsuario = ue.idUsuario 
        JOIN Empresas e2 ON ue.idEmpresa = e2.idEmpresa
        LEFT JOIN UsuariosSedes us ON us.idUsuario = u.idUsuario 
        LEFT JOIN Sedes s ON s.idSede = us.idSede
        WHERE (:idSede IS NULL OR s.idSede = :idSede)
        AND (:idEmpresa IS NULL OR e2.idEmpresa = :idEmpresa)
          AND (ISNULL(us.principal) OR us.principal = TRUE)
          AND ue.principal = TRUE 
        GROUP BY documento, e.nombre, empresa, sede;
      `;
    const replacements = {
      idSede: idSede || null,
      idEmpresa: idEmpresa || null,
    };
    const informe = await Sequelize.query(query, {
      replacements,
      type: Sequelize.QueryTypes.SELECT, // Indica que estamos obteniendo resultados.
    });
    res.status(200).json({ message: "Informe Excel", informe });
  } catch (error) {
    next(error);
  }
};

export const informeResultadosGraficas = async (req, res, next) => {
  try {
    const { idSede, idEmpresa, idEvaluador } = req.query;
    const respuesta = await Competencias.findAll({
      include: [
        {
          model: Descriptores,
          attributes: ["idDescriptor"],
          include: [
            {
              model: Respuestas,
              attributes: ["idCalificacion"],
              where: idEvaluador ? {idEvaluador} : undefined,
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

    const query = `
    SELECT u.idUsuario as idEvaluador, u.nombre as nombreEvaluador, u.cargo as cargoEval, u.area as areaEval, nc.nombre as nivelCargoEval, DATE_FORMAT(u.fechaIngreso, '%Y-%m-%d') as fechaIngresoEval,
    e.nombre as empresaEval, s.nombre  as sedeEval,
    er.promedio as promedioEval, te.nombre as tipoEval,
    u2.idUsuario , u2.nombre , u2.cargo, u2.area, nc2.nombre as nivelCargo, DATE_FORMAT(u2.fechaIngreso, '%Y-%m-%d') as fechaIngreso, e2.nombre as empresa, s2.nombre as sede,
    er2.promedio, te2.nombre as tipo 
    FROM usuarios u 
    JOIN nivelCargos nc2 on nc2.idNivelCargo = u.idNivelCargo 
    LEFT JOIN usuariosEvaluadores ue ON u.idUsuario = ue.idEvaluador 
    LEFT JOIN usuarios u2 ON u2.idUsuario = ue.idUsuario
    JOIN nivelCargos nc on nc.idNivelCargo = u2.idNivelCargo  
    LEFT JOIN UsuariosEmpresas ue2 ON ue2.idUsuario = u.idUsuario
    LEFT JOIN Empresas e ON e.idEmpresa = ue2.idEmpresa 
    LEFT JOIN UsuariosEmpresas ue3 ON ue3.idUsuario = u2.idUsuario 
    LEFT JOIN Empresas e2 ON e2.idEmpresa = ue3.idEmpresa 
    LEFT JOIN UsuariosSedes us ON us.idUsuario = u.idUsuario
    LEFT JOIN Sedes s ON s.idSede = us.idSede
    LEFT JOIN UsuariosSedes us2 ON us2.idUsuario = u2.idUsuario 
    LEFT JOIN Sedes s2 ON s2.idSede = us2.idSede 
    LEFT JOIN EvaluacionesRealizadas er ON er.idColaborador = u.idUsuario
    LEFT JOIN TipoEvaluaciones te ON te.idTipoEvaluacion = er.idTipoEvaluacion 
    LEFT JOIN EvaluacionesRealizadas er2 ON er2.idColaborador = u2.idUsuario 
    LEFT JOIN TipoEvaluaciones te2 ON te2.idTipoEvaluacion = er2.idTipoEvaluacion
    WHERE (:idEmpresa IS NULL OR e.idEmpresa = :idEmpresa) AND (:idSede IS NULL OR s.idSede = :idSede) 
    AND ue3.principal = 1 AND ue2.principal = 1 AND (us.principal IS NULL OR us.principal = 1) 
    AND (us2.principal IS NULL OR us2.principal = 1);`

    const replacements = {
      idEmpresa: idEmpresa || null,
      idSede: idSede || null,
    };
      const informe = await Sequelize.query(query, {
        replacements,
        type: Sequelize.QueryTypes.SELECT,
      });

      res.status(200).json({
        message: "informe Detalle",
        informe
      });
  } catch (error) {
    next(error);
  }
};

export const reporteAccionesMejora = async (req, res, next) => {
  try {
    const reporte = await Usuarios.findAll({
      include: [
        {
          model: Usuarios,
          as: "evaluadores",
          through: { attributes: [] },
          attributes: ["idUsuario", "nombre", "cargo", "area"],
          where: { activo: true },
        },
        {
          model: EvaluacionesRealizadas,
          as: "evaluacionesComoColaborador",
          attributes: ["comentario", "promedio"],
          required: true,
          include: [
            {
              model: Compromisos,
              attributes: ["comentario", "estado", "fechaCumplimiento"],
              required: true,
              include: [{ model: Competencias, attributes: ["nombre"] }],
            },
          ],
        },
        {
          model: Empresas,
          attributes: ["idEmpresa", "nombre"],
          through: { attributes: [], where: { principal: true } },
        },
        {
          model: Sedes,
          attributes: ["idSede", "nombre"],
          through: { attributes: [], where: { principal: true } },
        },
      ],
      attributes: ["idUsuario", "nombre", "cargo", "area"],
      where: { activo: true },
    });
    res.status(200).json({ message: "Informe acciones de mejora", reporte });
  } catch (error) {
    next(error);
  }
};


export const informeExcelResultadosDetalle = async(req, res, next) => {
  try {
    const { idSede, idEmpresa, idEvaluador } = req.query;
    const query = `
    SELECT u.idUsuario as idEvaluador, u.nombre as nombreEvaluador, u.cargo as cargoEval, u.area as areaEval, nc.nombre as nivelCargoEval, 
    DATE_FORMAT(u.fechaIngreso, '%Y-%m-%d') as fechaIngresoEval,
      e.nombre as empresaEval, s.nombre  as sedeEval,	er.promedio as promedioEval, te.nombre as tipoEval,
      u2.idUsuario , u2.nombre , u2.cargo, u2.area,nc2.nombre as nivelCargo, DATE_FORMAT(u2.fechaIngreso, '%Y-%m-%d') as fechaIngreso, e2.nombre as empresa, s2.nombre as sede,
      er2.promedio, te2.nombre as tipo, c1.nombre as competencia, AVG(c3.valor) AS promedioCompetencia
      FROM usuarios u
      JOIN nivelCargos nc2 on nc2.idNivelCargo = u.idNivelCargo  
      LEFT JOIN usuariosEvaluadores ue ON u.idUsuario = ue.idEvaluador 
      LEFT JOIN usuarios u2 ON u2.idUsuario = ue.idUsuario
      JOIN nivelCargos nc on nc.idNivelCargo = u2.idNivelCargo  
      LEFT JOIN UsuariosEmpresas ue2 ON ue2.idUsuario = u.idUsuario
      LEFT JOIN Empresas e ON e.idEmpresa = ue2.idEmpresa 
      LEFT JOIN UsuariosEmpresas ue3 ON ue3.idUsuario = u2.idUsuario 
      LEFT JOIN Empresas e2 ON e2.idEmpresa = ue3.idEmpresa 
      LEFT JOIN UsuariosSedes us ON us.idUsuario = u.idUsuario
      LEFT JOIN Sedes s ON s.idSede = us.idSede
      LEFT JOIN UsuariosSedes us2 ON us2.idUsuario = u2.idUsuario 
      LEFT JOIN Sedes s2 ON s2.idSede = us2.idSede 
      LEFT JOIN EvaluacionesRealizadas er ON er.idColaborador = u.idUsuario
      LEFT JOIN TipoEvaluaciones te ON te.idTipoEvaluacion = er.idTipoEvaluacion 
      LEFT JOIN EvaluacionesRealizadas er2 ON er2.idColaborador = u2.idUsuario 
      LEFT JOIN TipoEvaluaciones te2 ON te2.idTipoEvaluacion = er2.idTipoEvaluacion
      LEFT JOIN respuestas r2 ON r2.idEvaluador = u2.idUsuario
      LEFT JOIN Descriptores d2 ON d2.idDescriptor = r2.idDescriptor 
      LEFT JOIN Competencias c1 ON c1.idCompetencia = d2.idCompetencia 
      LEFT JOIN calificaciones c3 ON c3.idCalificacion = r2.idCalificacion
        WHERE e.idEmpresa IN(:idEmpresa) AND (:idSede IS NULL OR s.idSede = :idSede) AND (:idEvaluador IS NULL OR u.idUsuario = :idEvaluador) AND 
        ue3.principal = 1 AND ue2.principal = 1 AND (us.principal IS NULL OR us.principal = 1) 
        AND (us2.principal IS NULL OR us2.principal = 1)
        GROUP BY idEvaluador, nombreEvaluador, cargoEval,areaEval,fechaIngresoEval,	empresaEval,sedeEval,promedioEval,tipoEval, competencia,nivelCargoEval,nivelCargo,
      u2.idUsuario , u2.nombre , u2.cargo, u2.area,fechaIngreso,empresa, sede,er2.promedio,tipo;`


  const replacements = {
    idEmpresa: idEmpresa || null,
    idSede: idSede || null,
    idEvaluador: idEvaluador || null,
  };
    const informe = await Sequelize.query(query, {
      replacements,
      type: Sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({
      message: "informe Resultados Detalle",
      informe
    });
  } catch (error) {
    next(error)
  }
}

export const informeParaEvaluador = async(req, res, next) => {
  const {idEvaluador} = req.params
  try {
    const query = `
    SELECT COUNT(DISTINCT u2.idUsuario) as Usuarios,
      COUNT(DISTINCT er.idColaborador) as Respuestas from usuarios u
      JOIN usuariosEvaluadores ue ON ue.idEvaluador = u.idUsuario 
      JOIN usuarios u2 ON u2.idUsuario = ue.idUsuario 
      LEFT JOIN EvaluacionesRealizadas er ON er.idColaborador = u.idUsuario
      WHERE u.activo = 1 AND u.idUsuario = :idEvaluador
      `
      const replacements = {
        idEvaluador: idEvaluador || null,
      };
        const informe = await Sequelize.query(query, {
          replacements,
          type: Sequelize.QueryTypes.SELECT,
        });
    
        res.status(200).json({
          message: "informe avances",
          data: informe
        });
  } catch (error) {
    next(error)
  }
}