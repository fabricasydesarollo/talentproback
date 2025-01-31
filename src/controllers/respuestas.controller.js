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
import { Usuarios, UsuariosEvaluadores } from "../models/usuarios.model.js";
import { literal, Op } from "sequelize";
import Sequelize from "../config/db.js";
import { calcularPromedioGeneral } from "../utils/calcularPromedios.js";

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
      const [updatedRows] = await UsuariosEvaluadores.update(
        { estado: 1 },
        {
          where: {
            idEvaluador: respuestas[0].idEvaluador,
            idUsuario: respuestas[0].idColaborador,
          },
        }
      );
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
      const promedio =
        calificaciones.reduce((acc, val) => acc + val, 0) /
          calificaciones.length || 0;
      return {
        idCompetencia: competencia.idCompetencia,
        nombre: competencia.nombre,
        descripcion: competencia.descripcion,
        tipoCompetencia: competencia.TipoCompetencium.nombre,
        promedio,
        fechaRegistro: competencia.createdAt,
      };
    });
  };

  try {
    const { idEvaluador, idColaborador, idEvaluacion } = req.query;
    const compromisos = await EvaluacionesRealizadas.findAll({
      where: {
        idEvaluacion,
        idColaborador,
      },
      include: [
        {
          model: Compromisos,
          include: [{ model: Competencias, attributes: ["nombre"] }],
          attributes: ["comentario", "estado", "fechaCumplimiento"],
        },
        { model: TipoEvaluaciones, attributes: ["nombre"] },
      ],
      attributes: ["comentario", "createdAt"],
    });
    let evaluacion;
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
                  { idColaborador },
                  { idEvaluacion },
                ],
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
    evaluacion = calcularPromedio(respuesta);
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
        evaluacion,
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
  const { idUsuario } = req.query;
  try {
    const cabecera = await Usuarios.findAll({
      where: { idUsuario },
      include: [{ model: Usuarios, as: "evaluadores", attributes: ["idUsuario", "nombre", "cargo"], through:{attributes:[]} },{model: Evaluaciones, through:{attributes: []}}],
      attributes: ["idUsuario", "nombre", "cargo","area", "fechaIngreso"]
    });

    const sqlevaluacion = `SELECT c.idCompetencia, c.nombre, c2.valor FROM respuestas r 
        JOIN Evaluaciones e ON e.idEvaluacion = r.idEvaluacion 
        JOIN Descriptores d ON d.idDescriptor = r.idDescriptor 
        JOIN Competencias c ON c.idCompetencia = d.idCompetencia
        JOIN calificaciones c2 ON c2.idCalificacion = r.idCalificacion 
        WHERE r.idColaborador = :idUsuario;`

      const replacements = {
        idUsuario: idUsuario || null,
      };
      const evaluacion = await Sequelize.query(sqlevaluacion, {
        replacements,
        type: Sequelize.QueryTypes.SELECT,
      });

      const sqlauto = `SELECT c.idCompetencia, c.nombre, c2.valor,r.createdAt FROM respuestas r 
        JOIN Evaluaciones e ON e.idEvaluacion = r.idEvaluacion 
        JOIN Descriptores d ON d.idDescriptor = r.idDescriptor 
        JOIN Competencias c ON c.idCompetencia = d.idCompetencia
        JOIN calificaciones c2 ON c2.idCalificacion = r.idCalificacion 
        WHERE r.idColaborador = :idUsuario AND r.idEvaluador = :idUsuario;`

      const autoevaluacion = await Sequelize.query(sqlauto, {
        replacements,
        type: Sequelize.QueryTypes.SELECT,
      });

      const comentarios = await EvaluacionesRealizadas.findAll({where: {idColaborador: idUsuario}, attributes: ["comentario"]})

    res.status(200).json({ cabecera,comentarios, evaluacion: calcularPromedioGeneral(evaluacion),autoevaluacion: calcularPromedioGeneral(autoevaluacion)});
  } catch (error) {
    next(error);
  }
};
