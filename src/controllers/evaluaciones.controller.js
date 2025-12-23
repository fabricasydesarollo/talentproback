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

export const crearEvaluacion = async (req, res, next) => {
  try {
    const { nombre, año, estado } = req.body;
    const respuesta = await Evaluaciones.create({ nombre, año, estado });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};
export const obtenerEvaluacionesActivas = async (req, res, next) => {
  try {
    const respuesta = await Evaluaciones.findAll({
     include: [{model: Competencias, through: {attributes: []}, attributes: {exclude: ['createdAt', 'updatedAt']},
     include: [{model: Empresas, through: {attributes: []}, attributes: {exclude: ['createdAt', 'updatedAt', 'urlLogo','nit','idHub']}},{model: TipoCompetencia, attributes: {exclude: ['createdAt', 'updatedAt']} }]}],
      attributes: {exclude: ['createdAt','updatedAt']},
    })
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const obtenerEvaluacion = async (req, res, next) => {
  try {
    const { idEmpresa, idNivelCargo, idEvaluacion } = req.query;

    if(!idEmpresa || !idNivelCargo || !idEvaluacion){
      res.status(400).json({message: 'Hacen falta datos para completar la operación'})
    }

    const activa = await Evaluaciones.findOne({
      where: {
        [Op.and]: [{ activa: true }, { idEvaluacion: idEvaluacion }]
      }
    });

    if(!activa) {
      res.status(400).json({message: "Evaluación inactiva!"})
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
        ],where: {
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
        ],where: {
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
    const { idColaborador, idEvaluador, idEvaluacion, comentario, promedio, retroalimentacion } = req.body;

    let idTipoEvaluacion = 2;
    if (idColaborador == idEvaluador) {
      idTipoEvaluacion = 1;
    }

    // Verificar si ya existe un comentario para la evaluación
    const existeComentario = await EvaluacionesRealizadas.findOne({
      where: {
        idColaborador,
        idEvaluador,
        idEvaluacion,
      },
    });

    // Si ya existe un comentario, devolver respuesta adecuada
    if (existeComentario) {
      return res.status(409).json({ message: "Ya existe un comentario" });
    }

    // Crear un nuevo comentario
    const respuesta = await EvaluacionesRealizadas.create({
      idColaborador,
      idEvaluador,
      idEvaluacion,
      idTipoEvaluacion,
      comentario,
      retroalimentacion,
      promedio
    });

    // Respuesta exitosa
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const obtenerComentariosPorUsuario = async (req, res, next) => {
  try {
    const { idColaborador, idEvaluacion } = req.query;
    if (!idColaborador || !idEvaluacion) {
      return res.status(400).json({ message: "Faltan parámetros requeridos" });
    }
    const respuesta = await EvaluacionesRealizadas.findOne({
      where: {
        idColaborador,
        idEvaluacion,
        idTipoEvaluacion: 2
      },
      include: [
        {
          model: Compromisos,
          required: false, // Esto hace que la consulta no falle si no hay compromisos
          include: [{model: Competencias, attributes: {exclude: ["updatedAt", "createdAt","idTipo"]}}],
          attributes: {exclude: ["idEvalRealizada", "idCompetencia", "updatedAt", "createdAt"]}
        },
      ],
      attributes: ["idEvalRealizada","comentario", "retroalimentacion"]
    });
    res.status(200).json({ message: "Ok", data: respuesta || [] });
  } catch (error) {
    next(error);
  }
};

export const actualizarCompromisosPorUsuario = async (req, res, next) => {
    try {
      const { idColaborador, idEvaluacion, comentario,  accionesMejoramiento } = req.body;
  
      const updateComentario = await EvaluacionesRealizadas.update({
        comentario
      },{
        where: {
          idColaborador,
          idEvaluacion,
          idTipoEvaluacion: 2
        },
      });

      if (accionesMejoramiento.length > 0) {
        await Promise.all(
          accionesMejoramiento.map(async acciones => {
            const {comentario, fechaCumplimiento, estado, Retroalimentacion, idCompromiso} = acciones
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

    if (!idEvaluador || !idEvaluacion){
      return res.status(400).json({message: 'Falta información para continuar'})
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
      .json({ message: 'Porcentaje de avance', disponible});
  } catch (error) {
    next(error);
  }
};

export const eliminarEvaluacion = async (req, res, next) => {
  try {
    const { idColaborador, idEvaluador, idEvaluacion, idTipoEvaluacion } = req.query
    const existeRespuesta = await Respuestas.findOne({where: {idColaborador, idEvaluador, idEvaluacion}})
    const existeRealizada = await EvaluacionesRealizadas.findOne({where: {idColaborador, idEvaluador, idEvaluacion}})
    const existeEvaluador = await UsuariosEvaluadores.findOne({where: {idEvaluador, idUsuario: idColaborador}})

    if (existeRespuesta || existeRealizada || existeEvaluador) {
      const eliminado = await Respuestas.destroy({where: {idColaborador, idEvaluador, idEvaluacion}})
      const eliminadoRealizado = await EvaluacionesRealizadas.destroy({where: {idColaborador, idEvaluador, idEvaluacion}})
      const actualizarEvaluador = await UsuariosEvaluaciones.update({attempt: false}, {where: {idUsuario: idColaborador, idEvaluacion: idEvaluacion, idTipoEvaluacion: idTipoEvaluacion}})
      const actualizarIntento = await UsuariosEvaluadores.update({completado: false}, {where: {idUsuario: idColaborador, idEvaluacion: idEvaluacion, idEvaluador: idEvaluador}})
      res.status(200).json({ message: "Ok", eliminado, eliminadoRealizado, actualizarEvaluador, actualizarIntento });
    }else {
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
