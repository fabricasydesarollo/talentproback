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
  formatAreasNiveles,
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
    const { idSede, idEmpresa, area, idNivelCargo, idEvaluador, idEvaluacion } = req.query;

    if (!idEvaluacion) {
      res.status(400).json({ message: "La evaluación es requerida!" });
    }

    const replacements = {
      idEmpresa: idEmpresa ?? null,
      idSede: idSede ?? null,
      area: area ?? "", // Evita que `LIKE` falle con NULL
      idNivelCargo: idNivelCargo ?? null,
      idEvaluador: idEvaluador ?? null,
      idEvaluacion,
    };


    let filtroNivelCargo = "";
    if (idNivelCargo) {
      filtroNivelCargo = `AND u.idNivelCargo = :idNivelCargo`;
    }

    let filtroArea = "";
    if (area) {
      filtroArea = `AND u.area LIKE CONCAT('%', :area, '%')`;
    }
    let filtroEvaluador = "";
    if (idEvaluador) {
      filtroEvaluador = `r.idEvaluacion = :idEvaluacion AND r.idEvaluador = :idEvaluador ${filtroNivelCargo} ${filtroArea}`;
    }

    const querySedes = `
    SELECT COUNT(DISTINCT u.idUsuario) as Usuarios, 
    COUNT(DISTINCT r2.idColaborador) as Autoevaluacion,
    COUNT(DISTINCT r.idColaborador) as Evaluacion, 
    s.idSede, s.nombre 
    FROM usuarios u 
    LEFT JOIN respuestas r ON u.idUsuario = r.idColaborador  AND u.idUsuario != r.idEvaluador
    LEFT JOIN respuestas r2 ON u.idUsuario = r2.idColaborador AND u.idUsuario = r2.idEvaluador 
    LEFT JOIN UsuariosSedes us ON us.idUsuario = u.idUsuario AND us.principal = 1
    LEFT JOIN Sedes s ON s.idSede = us.idSede 
    WHERE us.idSede IN (:idSede) ${filtroArea} ${filtroNivelCargo}
        AND u.activo = 1
    GROUP BY 
        s.idSede, s.nombre;
      `;
    const totalUsuariosSede = await Sequelize.query(querySedes, {
      replacements,
      type: Sequelize.QueryTypes.SELECT, // Indica que estamos obteniendo resultados.
    });
    const queryEmpresas = `
    SELECT COUNT(DISTINCT u.idUsuario) as Usuarios, 
    COUNT(DISTINCT r2.idColaborador) as Autoevaluacion,
    COUNT(DISTINCT r.idColaborador) as Evaluacion,
    e.idEmpresa, e.nombre
    FROM usuarios u 
    LEFT JOIN respuestas r ON u.idUsuario = r.idColaborador  AND u.idUsuario != r.idEvaluador
    LEFT JOIN respuestas r2 ON u.idUsuario = r2.idColaborador AND u.idUsuario = r2.idEvaluador 
    JOIN UsuariosEmpresas ue2 ON ue2.idUsuario = u.idUsuario AND ue2.principal = 1
    JOIN Empresas e ON e.idEmpresa = ue2.idEmpresa 
    WHERE u.activo = 1 AND (:idEmpresa IS NULL OR e.idEmpresa = :idEmpresa) ${filtroArea} ${filtroNivelCargo}
    GROUP BY e.nombre, e.idEmpresa;`;

    const totalUsuariosEmpresa = await Sequelize.query(queryEmpresas, {
      replacements,
      type: Sequelize.QueryTypes.SELECT, // Indica que estamos obteniendo resultados.
    });
    const query = `
    SELECT COUNT(DISTINCT u.idUsuario) AS Usuarios,
    COUNT(DISTINCT r.idColaborador) AS Evaluacion,
    COUNT(DISTINCT r2.idColaborador) AS Autoevaluacion
    FROM usuarios u LEFT JOIN respuestas r ON u.idUsuario = r.idColaborador  AND u.idUsuario != r.idEvaluador
    LEFT JOIN respuestas r2 ON u.idUsuario = r2.idColaborador AND u.idUsuario = r2.idEvaluador 
    WHERE u.activo = 1;
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
    COUNT(ue2.idUsuario) AS colaboradores,
    COUNT(CASE WHEN ue2.estado = 1 THEN 1 END) AS respuestas
  FROM usuarios e 
  LEFT JOIN usuariosEvaluadores ue2 ON ue2.idEvaluador = e.idUsuario
  JOIN usuarios u ON u.idUsuario = ue2.idUsuario 
  LEFT JOIN UsuariosEmpresas ue ON u.idUsuario = ue.idUsuario 
  JOIN Empresas e2 ON ue.idEmpresa = e2.idEmpresa
  LEFT JOIN UsuariosSedes us ON us.idUsuario = u.idUsuario 
  LEFT JOIN Sedes s ON s.idSede = us.idSede
  WHERE (:idSede IS NULL OR s.idSede = :idSede)
  AND (:idEmpresa IS NULL OR e2.idEmpresa = :idEmpresa)
    AND (ISNULL(us.principal) OR us.principal = TRUE)
    AND ue.principal = TRUE AND ue2.deletedAt IS NULL AND u.activo = 1
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
    const { idSede, idEmpresa, idEvaluador, idEvaluacion, area, idNivelCargo } = req.query;

    if (!idEvaluacion) {
      res.status(400).json({ message: "El la evaluación es requerida!" });
    }

    const replacements = {
      idEmpresa: idEmpresa ?? null,
      idSede: idSede ?? null,
      area: area ?? "", // Evita que `LIKE` falle con NULL
      idNivelCargo: idNivelCargo ?? null,
      idEvaluador: idEvaluador ?? null,
      idEvaluacion,
    };

    let filtroNivelCargo = "";
    if (idNivelCargo) {
      filtroNivelCargo = `AND u.idNivelCargo = :idNivelCargo`;
    }

    let filtroArea = "";
    if (area) {
      filtroArea = `AND u.area LIKE CONCAT('%', :area, '%')`;
    }
    let filtroEvaluador = "";
    if (idEvaluador) {
      filtroEvaluador = `r.idEvaluacion = :idEvaluacion AND r.idEvaluador = :idEvaluador ${filtroNivelCargo} ${filtroArea}`;
    }
    const filtro = `(ue.idEmpresa = :idEmpresa OR us.idSede = :idSede) ${filtroNivelCargo} ${filtroArea} AND r.idEvaluacion = :idEvaluacion`

    const query2 = `
      SELECT 
        c.idCompetencia, 
        c.nombre, 
        tc.nombre AS tipoCompetencia, 
        ROUND(AVG(c2.valor), 1) AS promedio 
      FROM usuarios u 
      JOIN UsuariosSedes us ON us.idUsuario = u.idUsuario AND us.principal = 1
      JOIN Sedes s ON s.idSede = us.idSede 
      JOIN UsuariosEmpresas ue ON ue.idUsuario = u.idUsuario AND ue.principal = 1
      JOIN Empresas e ON e.idEmpresa = ue.idEmpresa 
      JOIN respuestas r ON r.idColaborador = u.idUsuario AND r.idEvaluador != u.idUsuario
      JOIN Descriptores d ON r.idDescriptor = d.idDescriptor 
      JOIN Competencias c ON c.idCompetencia = d.idCompetencia
      JOIN TipoCompetencia tc ON tc.idTipo = c.idTipo  
      JOIN calificaciones c2 ON c2.idCalificacion = r.idCalificacion 
      WHERE ${idEvaluador ? filtroEvaluador : filtro }
      GROUP BY c.idCompetencia, c.nombre, tipoCompetencia;
    `;

    const query = `
      SELECT 
        u.idUsuario, 
        ROUND(AVG(c2.valor), 1) AS promedio 
      FROM usuarios u 
      JOIN UsuariosSedes us ON us.idUsuario = u.idUsuario AND us.principal = 1
      JOIN UsuariosEmpresas ue ON ue.idUsuario = u.idUsuario AND ue.principal = 1
      JOIN respuestas r ON r.idColaborador = u.idUsuario AND r.idEvaluador != u.idUsuario
      JOIN Descriptores d ON r.idDescriptor = d.idDescriptor 
      JOIN Competencias c ON c.idCompetencia = d.idCompetencia
      JOIN calificaciones c2 ON c2.idCalificacion = r.idCalificacion 
      WHERE ${idEvaluador ? filtroEvaluador : filtro }
      GROUP BY u.idUsuario;
    `;

    const query3 = `SELECT u.area, nc.idNivelCargo, nc.nombre   FROM usuarios u 
    JOIN UsuariosEmpresas ue ON ue.idUsuario = u.idUsuario AND ue.principal = 1 
    JOIN UsuariosSedes us ON us.idUsuario = u.idUsuario AND us.principal = 1
    JOIN nivelCargos nc ON nc.idNivelCargo = u.idNivelCargo 
    WHERE ue.idEmpresa = :idEmpresa OR us.idSede = :idSede 
    GROUP BY u.area, nc.idNivelCargo, nc.nombre; ` 

    const dataSelect = await Sequelize.query(query3, {
      replacements,
      type: Sequelize.QueryTypes.SELECT,
    });

    const respuesta = await Sequelize.query(query2, {
      replacements,
      type: Sequelize.QueryTypes.SELECT,
    });

    const informe = await Sequelize.query(query, {
      replacements,
      type: Sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({
      message: "Informes",
      data: respuesta,
      informe,
      dataSelect: formatAreasNiveles(dataSelect)
      
    });
  } catch (error) {
    next(error);
  }
};

export const informeExcelAvancesDetalle = async (req, res, next) => {
  try {
    const { idSede, idEmpresa, idEvaluador, idEvaluacion } = req.query;
    if (!idEvaluacion) {
      res.status(400).json({ message: "idEvaluacion and idEmpresa is required" });
      return
    }

    const query = `
          SELECT
          u2.idUsuario as "ID_Evaluador" ,
            u2.nombre AS "Evaluador",
            u2.cargo AS "cargo_evaluador",
            e2.nombre as empresa_evaluador,
            u.idUsuario AS "ID_Colaborador",
            u.nombre AS "Colaborador",
            u.cargo,
            u.area,
            e.nombre as Empresa,
            s.nombre as Sede,
            DATE_FORMAT(u.fechaIngreso, '%Y-%m-%d') as "fechaIngreso",
            ROUND(AVG(c_auto.valor), 2) AS "AUTOEVALUACION",
            ROUND(AVG(c_eval.valor), 2) AS "EVALUACION"
        FROM usuarios u 
        JOIN usuariosEvaluadores ue ON ue.idUsuario = u.idUsuario AND ue.deletedAt IS NULL 
        JOIN usuarios u2 ON ue.idEvaluador = u2.idUsuario
        LEFT JOIN respuestas auto ON auto.idEvaluador = u.idUsuario AND auto.idColaborador = u.idUsuario 
        LEFT JOIN calificaciones c_auto ON c_auto.idCalificacion = auto.idCalificacion 
        LEFT JOIN respuestas eval ON eval.idEvaluador = ue.idEvaluador AND eval.idColaborador = ue.idUsuario 
        LEFT JOIN calificaciones c_eval ON c_eval.idCalificacion = eval.idCalificacion 
        JOIN UsuariosEmpresas ue2 ON ue2.idUsuario = u.idUsuario AND ue2.principal  = 1
        JOIN Empresas e ON e.idEmpresa = ue2.idEmpresa 
        LEFT JOIN UsuariosSedes us ON us.idUsuario = u.idUsuario AND us.principal = 1
        LEFT JOIN Sedes s ON s.idSede = us.idSede 
        JOIN UsuariosEmpresas ue3 ON ue3.idUsuario = u2.idUsuario 
        JOIN Empresas e2 ON e2.idEmpresa = ue3.idEmpresa AND ue3.principal = 1
        WHERE (:idEmpresa IS NULL OR e.idEmpresa  = :idEmpresa) AND (:idSede IS NULL OR s.idSede = :idSede) AND (eval.idEvaluacion = :idEvaluacion OR eval.idEvaluacion IS NULL AND auto.idEvaluacion = :idEvaluacion OR auto.idEvaluacion IS NULL)
        GROUP BY ID_Evaluador , Evaluador, cargo_evaluador,empresa_evaluador, ID_Colaborador,
        Colaborador,u.cargo, u.area, Empresa,Sede,fechaIngreso;`;
    const replacements = {
      idEmpresa: idEmpresa || null,
      idSede: idSede || null,
      idEvaluacion,
      idEvaluador: idEvaluador || null,
    };
    const informe = await Sequelize.query(query, {
      replacements,
      type: Sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({
      message: "informe Detalle",
      informe,
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

export const informeExcelResultadosDetalle = async (req, res, next) => {
  try {
    const { idSede, idEmpresa, idEvaluador, idEvaluacion } = req.query;
    console.log(idSede, idEmpresa);
    console.log((!idEmpresa || !idSede));
    if (!idEvaluacion && (!idEmpresa || !idSede)) {
      res.status(400).json({ message: "idEvaluacion is required" });
    }

    const query = `
        SELECT CASE WHEN r.idColaborador = r.idEvaluador THEN "AUTOEVALUACIÓN" ELSE "EVALUACIÓN" END as tipo ,
        u.idUsuario as "ID_Evaluador", u.nombre AS "Evaluador", u.cargo as "cargo_evaluador", e.nombre as empresa_evaluador,
        u2.idUsuario as "ID_Colaborador", u2.nombre as Colaborador, u2.cargo, u2.area,
        DATE_FORMAT(u2.fechaIngreso, '%Y-%m-%d') as "fechaIngreso", e2.nombre  as Empresa, s.nombre  as Sede,
        c.nombre as Competencia, ROUND(AVG(valor), 2) as promedio FROM usuarios u 
          JOIN UsuariosEmpresas ue ON ue.idUsuario = u.idUsuario AND ue.principal = 1
          JOIN Empresas e ON e.idEmpresa = ue.idEmpresa
          JOIN respuestas r ON r.idEvaluador = u.idUsuario
          JOIN usuarios u2 ON r.idColaborador = u2.idUsuario
          JOIN UsuariosEmpresas ue2 ON ue2.idUsuario = u2.idUsuario AND ue2.principal = 1
          JOIN Empresas e2 ON e2.idEmpresa = ue2.idEmpresa
          LEFT JOIN UsuariosSedes us ON us.idUsuario = u2.idUsuario AND us.principal= 1
          LEFT JOIN Sedes s ON s.idSede = us.idSede 
          JOIN Descriptores d ON d.idDescriptor = r.idDescriptor 
          JOIN Competencias c ON c.idCompetencia = d.idCompetencia 
          JOIN calificaciones c2 ON c2.idCalificacion = r.idCalificacion 
        WHERE e.idEmpresa IN(:idEmpresa) AND e2.idEmpresa IN(:idEmpresa) OR (:idSede IS NULL OR s.idSede = :idSede) AND r.idEvaluacion = :idEvaluacion AND (:idEvaluador IS NULL OR u.idUsuario = :idEvaluador)
        GROUP BY u.idUsuario, u.nombre, u2.idUsuario, u2.nombre, c.nombre, tipo, cargo_evaluador, empresa_evaluador, u2.cargo, u2.area, Empresa, fechaIngreso, Sede;`;
    const replacements = {
      idEmpresa: idEmpresa || null,
      idSede: idSede || null,
      idEvaluador: idEvaluador || null,
      idEvaluacion: idEvaluacion,
    };
    const informe = await Sequelize.query(query, {
      replacements,
      type: Sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({
      message: "informe Resultados Detalle",
      informe,
    });
  } catch (error) {
    next(error);
  }
};

export const informeParaEvaluador = async (req, res, next) => {
  const { idEvaluador } = req.params;
  try {
    const query = `
        SELECT 
        COUNT(DISTINCT ue.idUsuario) AS Usuarios,
        COUNT(DISTINCT er.idColaborador) AS Respuestas
        FROM usuarios u
        JOIN usuariosEvaluadores ue ON u.idUsuario = ue.idEvaluador
        JOIN usuarios u2 ON ue.idUsuario = u2.idUsuario
        LEFT JOIN EvaluacionesRealizadas er ON er.idColaborador = ue.idUsuario AND er.idTipoEvaluacion = 2
        WHERE ue.idEvaluador = :idEvaluador AND u2.activo = 1 AND ue.deletedAt IS NULL `;
    const replacements = {
      idEvaluador: idEvaluador || null,
    };
    const informe = await Sequelize.query(query, {
      replacements,
      type: Sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({
      message: "informe avances",
      data: informe,
    });
  } catch (error) {
    next(error);
  }
};
