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
import { NivelCargo, UsuariosEvaluadores } from "../models/usuarios.model.js";

export const crearEvaluacion = async (req, res, next) => {
  try {
    const { nombre, año } = req.body;
    const respuesta = await Evaluaciones.create({ nombre, año });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const obtenerEvaluacion = async (req, res, next) => {
  try {
    const { idEmpresa, idNivelCargo } = req.query;

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
        ],
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
        ],
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
    const { idColaborador, idEvaluador, idEvaluacion, comentario,promedio } = req.body;

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
      attributes: ["idEvalRealizada","comentario"]
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
      Retroalimentacion,
      fechaCumplimiento,
    } = req.body;
    const respuesta = await Compromisos.create({
      idCompetencia,
      idEvalRealizada,
      comentario,
      estado,
      Retroalimentacion,
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

    const disponible = await Respuestas.findOne({
      where: { idEvaluador, idColaborador, idEvaluacion },
    });

    const cantidadEvaluados = await EvaluacionesRealizadas.count({
      where: {
        idEvaluador,
      },
      distinct: true,
      col:'idColaborador'
    });

    const cantidadEvaluar = await UsuariosEvaluadores.count({
        where: {
            idEvaluador
        },
        distinct: true,
        col: 'idUsuario'
    })
    res
      .status(200)
      .json({ disponible: !disponible, porcentageEvaluados:  ((cantidadEvaluados * 100 ) / (cantidadEvaluar + 1))});
  } catch (error) {
    next(error);
  }
};

export const eliminarEvaluacion = async (req, res, next) => {
  try {
    const { idColaborador, idEvaluador, idEvaluacion } = req.query
    const existeRespuesta = await Respuestas.findOne({where: {idColaborador, idEvaluador, idEvaluacion}})
    const existeRealizada = await EvaluacionesRealizadas.findOne({where: {idColaborador, idEvaluador, idEvaluacion}})
    const existeEvaluador = await UsuariosEvaluadores.findOne({where: {idEvaluador, idUsuario: idColaborador}})

    if (existeRespuesta || existeRealizada || existeEvaluador) {
      const eliminado = await Respuestas.destroy({where: {idColaborador, idEvaluador, idEvaluacion}})
      const eliminadoRealizado = await EvaluacionesRealizadas.destroy({where: {idColaborador, idEvaluador, idEvaluacion}})
      const actualizarEvaluador = await UsuariosEvaluadores.update({estado: false}, {where: {idEvaluador, idUsuario: idColaborador}})
      res.status(200).json({ message: "Ok", eliminado, eliminadoRealizado, actualizarEvaluador });
    }else {
      res.status(400).json({ message: "No existe información para actualizar" });
    }
  } catch (error) {
    next(error);
  }
}
