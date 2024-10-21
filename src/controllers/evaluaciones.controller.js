import { Competencias, Descriptores, TipoCompetencia } from "../models/competencias.model.js"
import { Empresas } from "../models/empresas.model.js"
import { Compromisos, Evaluaciones, EvaluacionesRealizadas } from "../models/evaluaciones.model.js"
import { Respuestas } from "../models/respuestas.model.js"
import { NivelCargo, Usuarios } from "../models/usuarios.model.js"

export const crearEvaluacion = async (req, res, next) => {
    try {
        const { nombre, año } = req.body
        const respuesta = await Evaluaciones.create({ nombre, año })
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}


export const obtenerEvaluacion = async (req, res, next) => {
    try {
        const { idEmpresa, idNivelCargo } = req.query;

        let respuesta;

        if (idEmpresa != 8 && idEmpresa != 4 && idEmpresa != 5) {
            respuesta = await Evaluaciones.findOne({
                include: [{
                    model: Competencias,
                    through: { attributes: [] }, // Excluir atributos de la tabla intermedia
                    include: [
                        {
                            model: Descriptores, 
                            include: [
                                { 
                                    model: NivelCargo, 
                                    through: { attributes: [] }, // Excluir atributos de la tabla intermedia
                                }
                            ]
                        },{
                            model: TipoCompetencia
                        },
                        {
                            model: NivelCargo,
                            through: { attributes: [] }, // Excluir atributos de la tabla intermedia CompetenciasNivelesCargo
                            where: {
                                idNivelCargo
                            }
                        },
                        {
                            model: Empresas,
                            through: { attributes: [] },
                            where: {
                                idEmpresa
                            }
                        }
                    ],
                },]
            });
            

        } else {
            // Si la empresa es 8, 4, o 5, obtenemos las competencias a través de descriptores
            console.log("Estamos consultando esto", idEmpresa, idNivelCargo)
            respuesta = await Evaluaciones.findOne({
                include: [{
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
                                        idNivelCargo
                                    }
                                }
                            ], required: true
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
                                idEmpresa
                            }
                        }
                    ],
                },]
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
        const { nombre, peso, idEvaluacion } = req.body
        const respuesta = await TipoEvaluacion.create({ nombre, peso, idEvaluacion })
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const obtenerTipoEvaluacion = async (req, res, next) => {
    try {
        const respuesta = await TipoEvaluacion.findAll()
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const agregarComentarioGeneral = async (req, res, next) => {
    try {
        const { idColaborador, idEvaluador, idEvaluacion, comentario } = req.body;


        let idTipoEvaluacion = 2
        if (idColaborador == idEvaluador) {
            idTipoEvaluacion = 1
        }

        // Verificar si ya existe un comentario para la evaluación
        const existeComentario = await EvaluacionesRealizadas.findOne({
            where: {
                idColaborador,
                idEvaluador,
                idEvaluacion
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
            comentario
        });

        // Respuesta exitosa
        res.status(200).json({ message: "Ok", data: respuesta });
    } catch (error) {
        next(error);
    }
};


export const obtenerComentariosPorUsuario = async (req, res, next) => {
    try {
        const { idColaborador, idEvaluacion } = req.query
        if (!idColaborador || !idEvaluacion) {
            return res.status(400).json({ message: "Faltan parámetros requeridos" });
        }
        const respuesta = await EvaluacionesRealizadas.findAll({
            where: {
                idColaborador,
                idEvaluacion
            },
            include: [
                {
                    model: Compromisos,
                    as: 'compromisos', // Debe coincidir con el alias en la relación
                    required: false // Esto hace que la consulta no falle si no hay compromisos
                }, {
                    model: Usuarios,
                    as: "evaluador",
                    attributes: ["nombre"]
                }
            ]
        });
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}


export const crearCompromiso = async (req, res, next) => {
    try {
        const { idCompetencia, idEvalRealizada, comentario, estado, fechaCumplimiento } = req.body
        const respuesta = await Compromisos.create({ idCompetencia, idEvalRealizada, comentario, estado, fechaCumplimiento })
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}
export const obtenerCompromisos = async (req, res, next) => {
    try {
        const respuesta = await Compromisos.findAll()
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const evaluacionesDisponibles = async (req, res, next) => {
    try {

        const { idEvaluador, idColaborador } = req.query

        const respuesta = await Respuestas.findOne({ where: { idEvaluador, idColaborador } });

        res.status(200).json({ disponible: !respuesta })
    } catch (error) {
        next(error)
    }
}