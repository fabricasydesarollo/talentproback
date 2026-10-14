import {
  Competencias,
  Descriptores,
  TipoCompetencia,
} from "../models/competencias.model.js";
import { Empresas } from "../models/empresas.model.js";
import {
  Compromisos,
  Evaluaciones,
  EvaluacionesRealizadas,
} from "../models/evaluaciones.model.js";
import { Respuestas } from "../models/respuestas.model.js";
import { NivelCargo, UsuariosEvaluaciones, UsuariosEvaluadores } from "../models/usuarios.model.js";
import Sequelize from "../config/db.js";
import { Op } from "sequelize";
import evaluationsService from "../services/evaluaciones.services.js";
import commentsServices from "../services/comments.services.js";
import usersevaluationsServices from "../services/usersevaluations.services.js";
import userevaluatorRepository from "../repository/userevaluator.repository.js";
import auditoriaServices from "../services/auditoria.services.js";

export const crearEvaluacion = async (req, res, next) => {
  try {
    const payload = req.body;
    const respuesta = await evaluationsService.createEvaluation(payload);
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};
export const obtenerEvaluacionesActivas = async (req, res, next) => {
  try {
    const respuesta = await evaluationsService.getEvaluations();
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const obtenerEvaluacion = async (req, res, next) => {
  try {
    const { idEmpresa, idNivelCargo, idEvaluacion } = req.query;

    if (!idEmpresa || !idNivelCargo || !idEvaluacion) {
      res.status(400).json({ message: 'Hacen falta datos para completar la operación' })
    }

    const activa = await Evaluaciones.findOne({
      where: {
        [Op.and]: [{ activa: true }, { idEvaluacion: idEvaluacion }]
      }
    });

    if (!activa) {
      res.status(400).json({ message: "Evaluación inactiva!" })
      return
    }

    let respuesta;

    if (idEmpresa != 8 && idEmpresa != 4 && idEmpresa != 5) {
      respuesta = await Evaluaciones.findOne({
        include: [
          {
            model: Competencias,
            through: { attributes: [] }, // Excluir atributos de la tabla intermedia
            include: [
              {
                model: Descriptores,
                include: [
                  {
                    model: NivelCargo,
                    through: { attributes: [] }, // Excluir atributos de la tabla intermedia
                  },
                ],
              },
              {
                model: TipoCompetencia,
              },
              {
                model: NivelCargo,
                through: { attributes: [] }, // Excluir atributos de la tabla intermedia CompetenciasNivelesCargo
                where: {
                  idNivelCargo,
                },
              },
              {
                model: Empresas,
                through: { attributes: [] },
                where: {
                  idEmpresa,
                },
              },
            ],
          },
        ], where: {
          idEvaluacion: idEvaluacion
        }
      });
    } else {
      respuesta = await Evaluaciones.findOne({
        include: [
          {
            model: Competencias,
            through: { attributes: [] }, // Excluir atributos de la tabla intermedia
            include: [
              {
                model: Descriptores,
                include: [
                  {
                    model: NivelCargo,
                    through: { attributes: [] }, // Excluir atributos de la tabla intermedia
                    where: {
                      idNivelCargo,
                    },
                  },
                ],
                required: true,
              },
              {
                model: TipoCompetencia,
              },
              {
                model: NivelCargo,
                through: { attributes: [] }, // Excluir atributos de la tabla intermedia CompetenciasNivelesCargo
              },
              {
                model: Empresas,
                through: { attributes: [] },
                where: {
                  idEmpresa,
                },
              },
            ],
          },
        ], where: {
          idEvaluacion: idEvaluacion
        }
      });
    }

    // Si se encuentra la evaluación, devolvemos los datos
    if (respuesta) {
      res.status(200).json({ message: "Ok", data: respuesta });
    } else {
      res.status(404).json({ message: "Evaluación no encontrada" });
    }
  } catch (error) {
    next(error); // Manejo de errores
  }
};

export const crearTipoEvaluacion = async (req, res, next) => {
  try {
    const { nombre, peso, idEvaluacion } = req.body;
    const respuesta = await TipoEvaluacion.create({
      nombre,
      peso,
      idEvaluacion,
    });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const obtenerTipoEvaluacion = async (req, res, next) => {
  try {
    const respuesta = await TipoEvaluacion.findAll();
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const agregarComentarioGeneral = async (req, res, next) => {
  try {

    const payload = req.body;

    const existComment = await commentsServices.getCommitmentsByEvaluation(payload);
    if (existComment) {
      return res.status(409).json({ message: "Hay un comentario existente para esta evaluación" });
    }

    const resultComment = await commentsServices.create(payload);

    if (!resultComment) {
      return res.status(500).json({ message: "Error al crear el comentario" });
    }
    if (payload.idColaborador !== payload.idEvaluador) {
      await userevaluatorRepository.updateAttempt(payload);
    }
    await usersevaluationsServices.updateAttempt(payload);

    // Respuesta exitosa
    res.status(200).json({ message: "Comentario creado exitosamente" });
  } catch (error) {
    next(error);
  }
};

export const obtenerComentariosPorUsuario = async (req, res, next) => {
  try {
    const payload = req.query;
    const response = await commentsServices.getByUserId(payload);
    res.status(200).json({ message: "Ok", data: response || [] });
  } catch (error) {
    next(error);
  }
};

export const actualizarCompromisosPorUsuario = async (req, res, next) => {
  try {
    const { idColaborador, idEvaluador, idEvaluacion, comentario, accionesMejoramiento } = req.body;

    const updateComentario = await EvaluacionesRealizadas.update({
      comentario
    }, {
      where: {
        idColaborador,
        idEvaluacion,
        idEvaluador,
        idTipoEvaluacion: 2
      },
    });

    if (accionesMejoramiento.length > 0) {
      await Promise.all(
        accionesMejoramiento.map(async acciones => {
          const { comentario, fechaCumplimiento, estado, Retroalimentacion, idCompromiso } = acciones
          const existe = await Compromisos.findByPk(idCompromiso)
          if (existe) {
            const result = await Compromisos.update(
              { comentario, fechaCumplimiento, estado, Retroalimentacion },
              { where: { idCompromiso } }
            );
            return result
          }
        })
      )
    }
    res.status(200).json({ message: "Ok", data: updateComentario });
  } catch (error) {
    next(error);
  }
}


export const crearCompromiso = async (req, res, next) => {
  try {
    const {
      idCompetencia,
      idEvalRealizada,
      comentario,
      estado,
      fechaCumplimiento,
    } = req.body;
    const respuesta = await Compromisos.create({
      idCompetencia,
      idEvalRealizada,
      comentario,
      estado,
      fechaCumplimiento,
    });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};
export const obtenerCompromisos = async (req, res, next) => {
  try {
    const respuesta = await Compromisos.findAll();
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const evaluacionesDisponibles = async (req, res, next) => {
  try {
    const { idEvaluador, idColaborador, idEvaluacion } = req.query;

    if (!idEvaluador || !idEvaluacion) {
      return res.status(400).json({ message: 'Falta información para continuar' })
    }

    const query = `SELECT 
                    COUNT(*) AS total,
                    COALESCE(SUM(CASE WHEN ue.completado = 1 THEN 1 ELSE 0 END), 0) AS completados
                    FROM usuariosEvaluadores ue
                    JOIN usuarios u ON u.idUsuario = ue.idUsuario 
                    WHERE ue.deletedAt IS NULL
                      AND u.activo = 1 AND
                      ue.idEvaluador = :idEvaluador 
                      AND ue.idEvaluacion = :idEvaluacion;`
    const replacements = {
      idEvaluador: idEvaluador,
      idEvaluacion: idEvaluacion
    };

    const disponible = await Sequelize.query(query, {
      replacements,
      type: Sequelize.QueryTypes.SELECT,
    });
    res
      .status(200)
      .json({ message: 'Porcentaje de avance', disponible });
  } catch (error) {
    next(error);
  }
};

export const eliminarEvaluacion = async (req, res, next) => {
  try {
    const { idColaborador, idEvaluador, idEvaluacion, idTipoEvaluacion } = req.query
    const existeRespuesta = await Respuestas.findOne({ where: { idColaborador, idEvaluador, idEvaluacion } })
    const existeRealizada = await EvaluacionesRealizadas.findOne({ where: { idColaborador, idEvaluador, idEvaluacion } })
    const existeEvaluador = await UsuariosEvaluadores.findOne({ where: { idEvaluador, idUsuario: idColaborador } })

    if (existeRespuesta || existeRealizada || existeEvaluador) {
      const eliminado = await Respuestas.destroy({ where: { idColaborador, idEvaluador, idEvaluacion } })
      const eliminadoRealizado = await EvaluacionesRealizadas.destroy({ where: { idColaborador, idEvaluador, idEvaluacion } })
      const actualizarEvaluador = await UsuariosEvaluaciones.update({ attempt: false }, { where: { idUsuario: idColaborador, idEvaluacion: idEvaluacion, idTipoEvaluacion: idTipoEvaluacion } })
      const actualizarIntento = await UsuariosEvaluadores.update({ completado: false }, { where: { idUsuario: idColaborador, idEvaluacion: idEvaluacion, idEvaluador: idEvaluador } })

      try {
        await auditoriaServices.logAction({
          accion: "DELETED",
          tabla: "Respuestas, EvaluacionesRealizadas, UsuariosEvaluaciones, UsuariosEvaluadores",
          idRegistro: req.user?.idUsuario,
          fechaAccion: new Date(),
          usuarioAccion: req.user?.idUsuario,
          observacion: "Eliminar evaluación",
          valorAnterior: Respuestas,
          valorNuevo: []
        });
      } catch (auditError) {
        console.error("Error registrando auditoría:", auditError);
      }

      res.status(200).json({ message: "Ok", eliminado, eliminadoRealizado, actualizarEvaluador, actualizarIntento });
    } else {
      res.status(400).json({ message: "No existe información para actualizar" });
    }
  } catch (error) {
    next(error);
  }
}

export const generarpdfcontroller = async (req, res, next) => {
  try {
    generatePDF(res, req.body);
  } catch (error) {
    next(error)
  }
}


export const asignarEvalucionUsuarios = async (req, res, next) => {
  try {
    const { ListaAsignar } = req.body;
    if (!ListaAsignar || ListaAsignar.length === 0) {
      return res.status(400).json({ message: 'No hay información suficiente para continuar' });
    }

    for (const usuario of ListaAsignar) {
      if (usuario.autoevaluacion && usuario.evaluacion) {
        await UsuariosEvaluaciones.findOrCreate({
          where: {
            idUsuario: usuario.idUsuario,
            idEvaluacion: usuario.idEvaluacion,
            idTipoEvaluacion: 1
          },
          defaults: {
            idUsuario: usuario.idUsuario,
            idEvaluacion: usuario.idEvaluacion,
            idTipoEvaluacion: 1
          }
        });

        await UsuariosEvaluaciones.findOrCreate({
          where: {
            idUsuario: usuario.idUsuario,
            idEvaluacion: usuario.idEvaluacion,
            idTipoEvaluacion: 2
          },
          defaults: {
            idUsuario: usuario.idUsuario,
            idEvaluacion: usuario.idEvaluacion,
            idTipoEvaluacion: 2
          }
        });

      } else if (usuario.autoevaluacion) {
        await UsuariosEvaluaciones.findOrCreate({
          where: {
            idUsuario: usuario.idUsuario,
            idEvaluacion: usuario.idEvaluacion,
            idTipoEvaluacion: 1
          },
          defaults: {
            idUsuario: usuario.idUsuario,
            idEvaluacion: usuario.idEvaluacion,
            idTipoEvaluacion: 1
          }
        });

      } else {
        await UsuariosEvaluaciones.findOrCreate({
          where: {
            idUsuario: usuario.idUsuario,
            idEvaluacion: usuario.idEvaluacion,
            idTipoEvaluacion: 2
          },
          defaults: {
            idUsuario: usuario.idUsuario,
            idEvaluacion: usuario.idEvaluacion,
            idTipoEvaluacion: 2
          }
        });
      }
    }

    res.status(201).json({ message: "Ok" });
  } catch (error) {
    next(error);
  }
};



export const obtenerEvaluacionesAsignadas = async (req, res, next) => {
  try {
    const { idEvaluacion } = req.query;

    if (!idEvaluacion) {
      return res.status(400).json({ message: "Falta el parámetro idEvaluacion" });
    }

    const query = `
      SELECT 
        ue.idUsuario,
        ue.idEvaluacion,
        MAX(CASE WHEN ue.idTipoEvaluacion = 1 THEN 1 ELSE 0 END) AS Autoevaluacion,
        MAX(CASE WHEN ue.idTipoEvaluacion = 2 THEN 1 ELSE 0 END) AS Evaluacion
      FROM UsuariosEvaluaciones ue
      WHERE ue.idEvaluacion = :idEvaluacion
      GROUP BY ue.idUsuario, ue.idEvaluacion;
    `;

    const resultados = await Sequelize.query(query, {
      replacements: { idEvaluacion }, // Aquí se pasa el parámetro
      type: Sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({ message: "Ok", resultados });
  } catch (error) {
    next(error);
  }
};

export const updateEvaluacion = async (req, res, next) => {
  try {
    const payload = req.body

    const respuesta = await evaluationsService.updateEvaluation(payload)
    res.status(200).json({ message: "Ok", data: respuesta });

  } catch (error) {
    next(error)
  }
}