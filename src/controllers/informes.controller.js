import Sequelize from "../config/db.js";
import { Empresas, Sedes } from "../models/empresas.model.js";
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

import ExcelJS from "exceljs";

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
    const { idSede, idEmpresa, area, idNivelCargo, idEvaluador, idEvaluacion } =
      req.query;

    if (!idEvaluacion) {
      res.status(400).json({ message: "La evaluación es requerida!" });
    }

    const replacements = {
      idEmpresa: idEmpresa ?? null,
      idSede: idSede ?? null,
      area: area ?? "", // Evita que `LIKE` falle con NULL
      idNivelCargo: idNivelCargo ?? null,
      idEvaluador: idEvaluador ?? null,
      idEvaluacion: idEvaluacion ?? null,
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
        s.idEmpresa, s.idSede, s.nombre 
        FROM usuarios u 
        LEFT JOIN respuestas r ON u.idUsuario = r.idColaborador  AND u.idUsuario != r.idEvaluador AND r.idEvaluacion = :idEvaluacion
        LEFT JOIN respuestas r2 ON u.idUsuario = r2.idColaborador AND u.idUsuario = r2.idEvaluador AND r2.idEvaluacion = :idEvaluacion
        LEFT JOIN UsuariosSedes us ON us.idUsuario = u.idUsuario AND us.principal = 1
        LEFT JOIN Sedes s ON s.idSede = us.idSede 
        WHERE u.activo = 1 ${filtroArea} ${filtroNivelCargo}
        GROUP BY 
        s.idEmpresa, s.idSede, s.nombre;`;
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
    LEFT JOIN respuestas r ON u.idUsuario = r.idColaborador  AND u.idUsuario != r.idEvaluador AND r.idEvaluacion = :idEvaluacion
    LEFT JOIN respuestas r2 ON u.idUsuario = r2.idColaborador AND u.idUsuario = r2.idEvaluador AND r2.idEvaluacion = :idEvaluacion
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
      FROM usuarios u 
      LEFT JOIN respuestas r ON u.idUsuario = r.idColaborador  AND u.idUsuario != r.idEvaluador AND r.idEvaluacion = :idEvaluacion
      LEFT JOIN respuestas r2 ON u.idUsuario = r2.idColaborador AND u.idUsuario = r2.idEvaluador  AND r2.idEvaluacion = :idEvaluacion 
      WHERE u.activo = 1;`;
    const avanceGlobal = await Sequelize.query(query, {
      replacements,
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
    const { idEmpresa, idSede, idEvaluacion } = req.query;

    if (!(idEmpresa || idSede) && !idEvaluacion) {
      return res
        .status(400)
        .json({ message: "Falta información para procesar la solicitud" });
    }

    const query = `
              SELECT 
              u.idUsuario as documento, 
              u.nombre, 
              e.nombre as empresa,
              COALESCE(s.nombre, '---') as sede,
              COUNT(ue.idUsuario) AS colaboradores,
              SUM(CASE WHEN ue.completado = 1 THEN 1 ELSE 0 END) AS respuestas
          FROM usuarios u
          JOIN usuariosEvaluadores ue 
              ON u.idUsuario = ue.idEvaluador AND ue.deletedAt IS NULL
          JOIN usuarios u2 
              ON u2.idUsuario = ue.idUsuario 
          JOIN UsuariosEvaluaciones ue2 
              ON ue2.idUsuario = u2.idUsuario 
            AND ue2.idTipoEvaluacion = 2
          JOIN UsuariosEmpresas ue3 ON ue3.idUsuario = u2.idUsuario AND ue3.principal = 1
          JOIN Empresas e ON e.idEmpresa = ue3.idEmpresa 
          LEFT JOIN UsuariosSedes us ON us.idUsuario = u2.idUsuario AND us.principal = 1
          LEFT JOIN Sedes s ON s.idSede = us.idSede 
          JOIN UsuariosEmpresas ue4 ON ue4.idUsuario = u2.idUsuario AND ue4.principal = 1
          WHERE (:idEmpresa IS NULL OR ue4.idEmpresa = :idEmpresa)
            AND (:idSede IS NULL OR s.idSede = :idSede)
            AND ue.idEvaluacion = :idEvaluacion 
            AND ue2.idEvaluacion = :idEvaluacion
            AND u.activo = 1
            AND u2.activo = 1
          GROUP BY u.idUsuario, u.nombre, e.nombre, s.nombre  ;
      `;
    const replacements = {
      idSede: idSede || null,
      idEmpresa: idEmpresa || null,
      idEvaluacion: idEvaluacion || null,
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
    const { idSede, idEmpresa, idEvaluador, idEvaluacion, area, idNivelCargo } =
      req.query;

    if (!idEvaluacion) {
      res.status(400).json({ message: "El la evaluación es requerida!" });
    }

    const replacements = {
      idEmpresa: idEmpresa ?? null,
      idSede: idSede ?? null,
      area: area ?? "", // Evita que `LIKE` falle con NULL
      idNivelCargo: idNivelCargo ?? null,
      idEvaluador: idEvaluador ?? null,
      idEvaluacion: idEvaluacion ?? null,
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
    const filtro = `(ue.idEmpresa = :idEmpresa OR us.idSede = :idSede) ${filtroNivelCargo} ${filtroArea} AND r.idEvaluacion = :idEvaluacion`;

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
      WHERE ${idEvaluador ? filtroEvaluador : filtro}
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
      WHERE ${idEvaluador ? filtroEvaluador : filtro}
      GROUP BY u.idUsuario;
    `;

    const query3 = `SELECT u.area, nc.idNivelCargo, nc.nombre   FROM usuarios u 
    JOIN UsuariosEmpresas ue ON ue.idUsuario = u.idUsuario AND ue.principal = 1 
    JOIN UsuariosSedes us ON us.idUsuario = u.idUsuario AND us.principal = 1
    JOIN nivelCargos nc ON nc.idNivelCargo = u.idNivelCargo 
    WHERE ue.idEmpresa = :idEmpresa OR us.idSede = :idSede 
    GROUP BY u.area, nc.idNivelCargo, nc.nombre; `;

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
      dataSelect: formatAreasNiveles(dataSelect),
    });
  } catch (error) {
    next(error);
  }
};

export const informeExcelAvancesDetalle = async (req, res, next) => {
  try {
    const { idSede, idEmpresa, idEvaluador, idEvaluacion } = req.query;
    if (!idEvaluacion) {
      res
        .status(400)
        .json({ message: "idEvaluacion and idEmpresa is required" });
      return;
    }

    const query = `
            SELECT
            u2.idUsuario as "ID_Evaluador" ,
              u2.nombre AS "Evaluador",
              u2.cargo AS "cargo_evaluador",
              COALESCE(e2.nombre, '-') as empresa_evaluador,
              nc2.nombre as nivel_cargo,
              IF(u2.activo, 'Activo', 'Inactivo') as activo,
              u.idUsuario AS "ID_Colaborador",
              u.nombre AS "Colaborador",
              u.cargo,
              u.area,
              COALESCE(e.nombre, '-') as Empresa,
              nc.nombre as nivel_cargo_col,
              IF(u.activo, 'Activo', 'Inactivo') as activo_col,
              COALESCE(s.nombre, '-') as Sede,
              DATE_FORMAT(u.fechaIngreso, '%Y-%m-%d') as "fechaIngreso",
              COALESCE(ROUND(AVG(c_auto.valor), 2), '-') AS "AUTOEVALUACION",
              COALESCE(ROUND(AVG(c_eval.valor), 2), '-') AS "EVALUACION"
          FROM usuarios u 
          JOIN nivelCargos nc ON nc.idNivelCargo = u.idNivelCargo
          JOIN usuariosEvaluadores ue ON ue.idUsuario = u.idUsuario AND ue.deletedAt IS NULL AND ue.idEvaluacion = :idEvaluacion
          JOIN usuarios u2 ON ue.idEvaluador = u2.idUsuario
          JOIN nivelCargos nc2 ON nc2.idNivelCargo = u2.idNivelCargo 
          LEFT JOIN respuestas auto ON auto.idEvaluador = u.idUsuario AND auto.idColaborador = u.idUsuario AND auto.idEvaluacion = :idEvaluacion
          LEFT JOIN calificaciones c_auto ON c_auto.idCalificacion = auto.idCalificacion 
          LEFT JOIN respuestas eval ON eval.idEvaluador = ue.idEvaluador AND eval.idColaborador = ue.idUsuario AND eval.idEvaluacion = :idEvaluacion
          LEFT JOIN calificaciones c_eval ON c_eval.idCalificacion = eval.idCalificacion 
          LEFT JOIN UsuariosEmpresas ue2 ON ue2.idUsuario = u.idUsuario AND ue2.principal  = 1
          LEFT JOIN Empresas e ON e.idEmpresa = ue2.idEmpresa 
          LEFT JOIN UsuariosSedes us ON us.idUsuario = u.idUsuario AND us.principal = 1
          LEFT JOIN Sedes s ON s.idSede = us.idSede 
          LEFT JOIN UsuariosEmpresas ue3 ON ue3.idUsuario = u2.idUsuario AND ue3.principal = 1
          LEFT JOIN Empresas e2 ON e2.idEmpresa = ue3.idEmpresa 
          WHERE (:idEmpresa IS NULL OR e.idEmpresa = :idEmpresa ) AND (:idSede IS NULL OR s.idSede = :idSede)
          GROUP BY ID_Evaluador , Evaluador, cargo_evaluador,empresa_evaluador, nivel_cargo, activo, ID_Colaborador,
          Colaborador,u.cargo, u.area, Empresa,Sede,fechaIngreso, nivel_cargo_col, activo_col;`;
    const replacements = {
      idEmpresa: idEmpresa || null,
      idSede: idSede || null,
      idEvaluacion: idEvaluacion,
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
    const { idEvaluacion, idEmpresa } = req.query;

    const query = `SELECT  CONCAT(e.nombre, " ", e.year) AS evaluacion,u.idUsuario as EvaluadorCC, u.nombre as Evaluador, u.cargo as EvaluadorCargo, u.area as EvaluadorArea, u.activo as activoEvaluador,
    e2.nombre as EvaluadorEmpresa, s.nombre as sedeEvaluador, u2.idUsuario as ColaboradorCC, u2.nombre as Colaborador, u2.cargo, u2.area, u2.activo,
    e3.nombre as Empresa, s2.nombre as Sede,
    c2.nombre as competencia, tc.nombre as tipoCompetencia, c.comentario , c.estado,
    DATE_FORMAT(c.fechaCumplimiento, '%Y-%m-%d') as fechaCumplimiento
    FROM EvaluacionesRealizadas er
    JOIN usuarios u ON u.idUsuario = er.idEvaluador
    JOIN UsuariosEmpresas ue ON ue.idUsuario = u.idUsuario AND ue.principal = 1
    JOIN Empresas e2 ON e2.idEmpresa = ue.idEmpresa
    JOIN UsuariosSedes us ON us.idUsuario = u.idUsuario AND us.principal = 1 
    JOIN Sedes s ON s.idSede = us.idSede 
    JOIN usuarios u2 ON u2.idUsuario = er.idColaborador
    JOIN UsuariosEmpresas ue2 ON ue2.idUsuario = u2.idUsuario AND ue2.principal = 1
    JOIN Empresas e3 ON e3.idEmpresa = ue2.idEmpresa
    JOIN UsuariosSedes us2 ON us2.idUsuario = u2.idUsuario AND us2.principal = 1 
    JOIN Sedes s2 ON s2.idSede = us2.idSede
    JOIN Evaluaciones e ON e.idEvaluacion = er.idEvaluacion 
    JOIN Compromisos c ON er.idEvalRealizada = c.idEvalRealizada 
    JOIN Competencias c2 ON c2.idCompetencia = c.idCompetencia 
    JOIN TipoCompetencia tc ON tc.idTipo = c2.idTipo 
    WHERE e.idEvaluacion = :idEvaluacion ${
      idEmpresa != "0" ? "AND e2.idEmpresa = :idEmpresa;" : ""
    }`;
    const replacements = {
      idEvaluacion: idEvaluacion || null,
      idEmpresa: idEmpresa || null,
    };

    const informe = await Sequelize.query(query, {
      replacements,
      type: Sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({ message: "Informe acciones de mejora", informe });
  } catch (error) {
    next(error);
  }
};

export const informeExcelResultadosDetalle = async (req, res, next) => {
  try {
    const { idSede, idEmpresa, idEvaluador, idEvaluacion } = req.query;
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
  const { idEvaluador, idEvaluacion } = req.query;
  try {
    const query = `
        SELECT 
        COUNT(DISTINCT ue.idUsuario) AS Usuarios,
        COUNT(DISTINCT er.idColaborador) AS Respuestas
        FROM usuarios u
        JOIN usuariosEvaluadores ue ON u.idUsuario = ue.idEvaluador 
        JOIN usuarios u2 ON ue.idUsuario = u2.idUsuario
        LEFT JOIN UsuariosEvaluaciones ue2 ON ue2.idUsuario = u2.idUsuario
        LEFT JOIN EvaluacionesRealizadas er ON er.idColaborador = ue.idUsuario AND er.idTipoEvaluacion = 2 AND er.idEvaluacion = :idEvaluacion
        WHERE ue.idEvaluador = :idEvaluador AND ue.idEvaluacion = :idEvaluacion AND u2.activo = 1 AND ue.deletedAt  IS NULL;`;
    const replacements = {
      idEvaluador: idEvaluador || null,
      idEvaluacion: idEvaluacion || null,
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

import os from 'os'
import path from "path";
import fs from 'fs'
export const exportExcel = async (req, res, next) => {
  try {
    const { reporteNombre = "Reporte", columns = [], datos = [] } = req.body;


    // Ruta de archivo temporal
    const tmpDir = os.tmpdir();
    const tmpPath = path.join(tmpDir, `${Date.now()}_${reporteNombre}.xlsx`);

    // Workbook en modo streaming escribiendo a archivo
    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
      filename: tmpPath,
      useStyles: false,          // reduce tamaño/memoria
      useSharedStrings: false    // reduce tamaño/memoria
    });

    const worksheet = workbook.addWorksheet(reporteNombre);

    if (columns.length > 0) {
      worksheet.columns = columns.map(col => ({
        header: col.headerName,
        key: col.field,
        width: col.width || 20,
      }));
    }

    // Validar/normalizar filas grandes para evitar undefined/tipos raros
    for (const rawRow of datos) {
      const row = {};
      for (const col of worksheet.columns || []) {
        const v = rawRow[col.key];
        row[col.key] = v === undefined ? null : v; // evita undefined
      }
      worksheet.addRow(row).commit();
    }

    // Importante: cerrar hoja y workbook
    worksheet.commit();
    await workbook.commit();

    // Enviar archivo ya cerrado desde disco
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename="${reporteNombre}.xlsx"`);

    const readStream = fs.createReadStream(tmpPath);
    readStream.on("close", () => {
      fs.unlink(tmpPath, () => {}); // limpia archivo temporal
    });
    readStream.pipe(res);
  } catch (error) {
    next(error);
  }
};
