import {
  Competencias,
  Descriptores,
  TipoCompetencia,
} from "../models/competencias.model.js";
import {
  Compromisos,
  Evaluaciones,
  EvaluacionesRealizadas,
  TipoEvaluaciones,
} from "../models/evaluaciones.model.js";
import { Calificaciones, Respuestas } from "../models/respuestas.model.js";
import { Usuarios, UsuariosEvaluaciones, UsuariosEvaluadores } from "../models/usuarios.model.js";
import { literal, Op } from "sequelize";
import Sequelize from "../config/db.js";
import { downloadPdfs, generateDynamicPdfs } from "../utils/generatepdf.js";
import jwt from "jsonwebtoken";
import dontenv from "dotenv";
dontenv.config();

export const crearRespuesta = async (req, res, next) => {
  try {
    const { respuestas } = req.body;

    if (respuestas.length > 1) {
      // Usamos Promise.all para manejar todas las respuestas de manera asíncrona
      await Promise.all(
        respuestas.map(async (respuesta) => {
          const {
            idDescriptor,
            idColaborador,
            idEvaluador,
            idEvaluacion,
            idCalificacion,
          } = respuesta;
          const existe = await Respuestas.findOne({
            where: { idColaborador, idEvaluador, idEvaluacion },
          });
          if (existe) {
            return res
              .status(400)
              .json({ message: "Esta evaluación ya fue resuelta" });
          } else {
            const result = await Respuestas.create({
              idDescriptor,
              idColaborador,
              idEvaluador,
              idEvaluacion,
              idCalificacion,
            });
            return result;
          }
        })
      );
      const [updatedRows] = await UsuariosEvaluaciones.update(
        { attempt: 1 },
        {
          where: {
            idEvaluacion: respuestas[0].idEvaluacion,
            idUsuario: respuestas[0].idColaborador,
            idTipoEvaluacion: respuestas[0].idEvaluador ==  respuestas[0].idColaborador ? 1 : 2
          },
        }
      );
      const [updatedRows2] = await UsuariosEvaluadores.update(
        {completado: true},
        {
          where: {
            idEvaluador: respuestas[0].idEvaluador,
            idEvaluacion: respuestas[0].idEvaluacion,
            idUsuario: respuestas[0].idColaborador
          }
        }
      )
      // Después de que todas las respuestas han sido creadas, enviamos la respuesta al cliente
      res.status(200).json({ message: "Ok" });
    } else {
      res.status(400).json({ message: "Falta información para procesar" });
    }
  } catch (error) {
    next(error); // Manejar el error correctamente
  }
};

export const obtenerRespuestas = async (req, res, next) => {
  const calcularPromedio = (respuestas) => {
    return respuestas.map((competencia) => {
      const calificaciones = competencia.Descriptores.flatMap((descriptor) =>
        descriptor.respuestas.map((respuesta) => respuesta.calificacione.valor)
      );
      const lastDescriptor = competencia.Descriptores.at(-1);
      const registro = lastDescriptor?.respuestas.at(-1)?.createdAt;

      const promedio = calificaciones.reduce((acc, val) => acc + val, 0) / calificaciones.length || 0;
      return {
        idCompetencia: competencia.idCompetencia,
        nombre: competencia.nombre,
        descripcion: competencia.descripcion,
        tipoCompetencia: competencia.TipoCompetencium.nombre,
        promedio,
        fechaRegistro: registro,
      };
    });
  };

  try {
    const { idEvaluador, idColaborador, idEvaluacion } = req.query;

    const evaluador = await Sequelize.query(
        `SELECT u.idUsuario, u.nombre  FROM respuestas r
        JOIN usuarios u ON r.idEvaluador = u.idUsuario
        WHERE r.idColaborador = ? AND r.idEvaluacion = ?
        AND r.idColaborador  != r.idEvaluador 
        GROUP BY u.idUsuario, u.nombre ;`,
      {
        replacements: [idColaborador, idEvaluacion],
        type: Sequelize.QueryTypes.SELECT
      }
    );

    const compromisos = await EvaluacionesRealizadas.findAll({
      where: {
        idEvaluacion,
        idColaborador
      },
      include: [
        {
          model: Compromisos,
          include: [{ model: Competencias, attributes: ["nombre"] }],
          attributes: ["comentario", "estado", "fechaCumplimiento"],
        },
        { model: TipoEvaluaciones, attributes: ["nombre"] },
      ],
      attributes: ["comentario", "retroalimentacion", "createdAt"],
    });
    const respuesta = await Competencias.findAll({
      include: [
        {
          model: Descriptores,
          attributes: ["idDescriptor"],
          include: [
            {
              model: Respuestas,
              where: {
                [Op.and]: [
                  literal("idEvaluador != idColaborador"),
                  { idColaborador: idColaborador },
                  { idEvaluacion: idEvaluacion }
                ],
              },
              attributes: ["idCalificacion", "createdAt"],
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
        },
      ],
      attributes: { exclude: ["createdAt","updatedAt"] },
    });
    const autoevaluacion = await Competencias.findAll({
      include: [
        {
          model: Descriptores,
          attributes: ["idDescriptor"],
          include: [
            {
              model: Respuestas,
              where: {
                idEvaluador: idColaborador,
                idColaborador,
                idEvaluacion,
              },
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
        },
      ],
      attributes: { exclude: ["updatedAt"] },
    });
    
    res
      .status(200)
      .json({
        message: "Ok",
        compromisos,
        evaluacion: calcularPromedio(respuesta),
        evaluador,
        autoevaluacion: calcularPromedio(autoevaluacion),
      });
  } catch (error) {
    next(error);
  }
};

export const crearCalificacion = async (req, res, next) => {
  try {
    const { descripcion, valor } = await Calificaciones.create({
      descripcion,
      valor,
    });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const obtenerCalificacion = async (req, res, next) => {
  try {
    const respuesta = await Calificaciones.findAll({
      attributes: ["idCalificacion", "descripcion", "valor"],
    });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const respuestasGeneral = async (req, res, next) => {
  const { idusers, idEvaluacion } = req.body;
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  const data = jwt.verify(token, process.env.SECRETWORD);
  try {
    const escalacalificacion = await Calificaciones.findAll({attributes: ["descripcion", "valor"]})
    const sql =`SELECT CASE WHEN r.idColaborador = r.idEvaluador THEN "AUTOEVALUACIÓN" ELSE "EVALUACIÓN" END as tipo ,
    u.idUsuario as "documento", u.nombre AS "Evaluador", 
    u2.idUsuario as "evaluado_cc", u2.nombre as evaluado_nombre, u2.cargo, 
    DATE_FORMAT(u2.fechaIngreso, '%Y-%m-%d') as "fecha_ingreso", e2.urlLogo  as imageUrl, 
    c.nombre as Competencia, AVG(c2.valor) as promedio, DATE_FORMAT(r.createdAt, '%Y-%m-%d')as fecha_registro
      FROM usuarios u 
      JOIN respuestas r ON r.idEvaluador = u.idUsuario
      JOIN usuarios u2 ON r.idColaborador = u2.idUsuario
      JOIN UsuariosEmpresas ue2 ON ue2.idUsuario = u2.idUsuario AND ue2.principal = 1
      JOIN Empresas e2 ON e2.idEmpresa = ue2.idEmpresa
      JOIN Descriptores d ON d.idDescriptor = r.idDescriptor 
      JOIN Competencias c ON c.idCompetencia = d.idCompetencia 
      JOIN calificaciones c2 ON c2.idCalificacion = r.idCalificacion 
    WHERE r.idColaborador IN(:listIds) AND r.idEvaluacion = :idEvaluacion
    GROUP BY documento, u.nombre, evaluado_cc, evaluado_nombre, c.nombre, tipo,  u2.cargo, imageUrl, fecha_ingreso, fecha_registro;`

    const replacements = {
      listIds:  idusers,
      idEvaluacion: idEvaluacion
    };
    const usuarios = await Sequelize.query(sql, {
      replacements,
      type: Sequelize.QueryTypes.SELECT,
    });

    const groupedData = usuarios.reduce((acc, item) => {
      const { evaluado_cc, evaluado_nombre, cargo, fecha_ingreso, imageUrl, tipo, Competencia, promedio, fecha_registro, documento, Evaluador } = item;
  
      if (!acc[evaluado_cc]) {
          acc[evaluado_cc] = {
              version: '1.0',
              evaluado_nombre,
              evaluado_cc,
              cargo,
              fecha_ingreso,
              evaluadornombre: [],
              escalacalificacion: escalacalificacion,
              competencias: [],
              promedio_evaluacion: 0,
              promedio_autoevaluacion: 0,
              fecha_registro,
              fecha_impresion: new Date().toISOString().split('T')[0],
              imageUrl
          };
      }
  
      acc[evaluado_cc].competencias.push({ nombre: Competencia, puntaje: promedio, tipo: tipo });
  
      if (!acc[evaluado_cc].evaluadornombre.some(e => e.documento === documento)) {
        if (evaluado_cc !== documento) {
            acc[evaluado_cc].evaluadornombre.push({ documento, name: Evaluador });
        }
      }

      if (tipo == 'EVALUACIÓN') {
        acc[evaluado_cc].fecha_registro = fecha_registro
    }
  
      return acc;
  }, {});
  
  
  const result = Object.values(groupedData).map(item => {
      const competenciasMap = item.competencias.reduce((acc, comp) => {
          const key = `${comp.tipo}-${comp.nombre}`;
          if (!acc[key]) {
              acc[key] = { nombre: comp.nombre, puntaje: 0, count: 0, tipo: comp.tipo };
          }
          acc[key].puntaje += comp.puntaje;
          acc[key].count += 1;
  
          return acc;
      }, {});
  
  
      item.competencias = Object.values(competenciasMap).map(comp => ({
          nombre: comp.nombre,
          puntaje: (comp.puntaje / comp.count).toFixed(1),
          tipo: comp.tipo
      }));
      
      
      const evaluaciones = item.competencias.filter(comp => comp.tipo === 'EVALUACIÓN');
      const autoevaluaciones = item.competencias.filter(comp => comp.tipo === 'AUTOEVALUACIÓN');
      
  
      if (evaluaciones.length > 0) {
          item.promedio_evaluacion = (evaluaciones.reduce((sum, comp) => sum + parseFloat(comp.puntaje), 0) / evaluaciones.length).toFixed(1);
      }
  
      if (autoevaluaciones.length > 0) {
          item.promedio_autoevaluacion = (autoevaluaciones.reduce((sum, comp) => sum + parseFloat(comp.puntaje), 0) / autoevaluaciones.length).toFixed(1);
      }
  
      item.competencias = item.competencias.filter(comp => comp.tipo === 'EVALUACIÓN');
  
      return item;
  });

    const paths = await generateDynamicPdfs(result, data?.idUsuario)

    downloadPdfs(paths, res)

  } catch (error) {
    next(error);
  }
};
