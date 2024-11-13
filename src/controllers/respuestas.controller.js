import { Competencias, Descriptores, TipoCompetencia } from "../models/competencias.model.js";
import { Compromisos, EvaluacionesRealizadas, TipoEvaluaciones } from "../models/evaluaciones.model.js";
import { Calificaciones, Respuestas } from "../models/respuestas.model.js"
import { Usuarios, UsuariosEvaluadores } from "../models/usuarios.model.js";
export const crearRespuesta = async (req, res, next) => {
    try {
        const {respuestas} = req.body;
        
        if (respuestas.length > 1) {
            // Usamos Promise.all para manejar todas las respuestas de manera asíncrona
            await Promise.all(
                respuestas.map(async (respuesta) => {
                    const { idDescriptor, idColaborador, idEvaluador, idEvaluacion, idCalificacion } = respuesta;
                    const existe = await Respuestas.findOne({where: {idColaborador, idEvaluador, idEvaluacion} })
                    if (existe) {
                        return res.status(400).json({message: "Esta evaluación ya fue resuelta"})
                    }else {
                        const result = await Respuestas.create({
                            idDescriptor,
                            idColaborador,
                            idEvaluador,
                            idEvaluacion,
                            idCalificacion
                        });
                        return result;
                    }
                })
            );
            await UsuariosEvaluadores.update({estado: true},{where:{
                idEvaluador: respuestas[0].idEvaluador, idUsuario: respuestas[0].idColaborador
            }})
            // Después de que todas las respuestas han sido creadas, enviamos la respuesta al cliente
            res.status(200).json({ message: "Ok" });
        }else{
            res.status(400).json({message: "Falta información para procesar"})
        }
        
    } catch (error) {
        next(error); // Manejar el error correctamente
    }
};

export const obtenerRespuestas = async (req, res, next) => {

    const calcularPromedio = (respuestas) => {
        return respuestas.map(competencia => {
            const calificaciones = competencia.Descriptores.flatMap(descriptor => 
                descriptor.respuestas.map(respuesta => respuesta.calificacione.valor)
            );
            const promedio = calificaciones.reduce((acc, val) => acc + val, 0) / calificaciones.length || 0;
            return {
                idCompetencia: competencia.idCompetencia,
                nombre: competencia.nombre,
                descripcion: competencia.descripcion,
                tipoCompetencia: competencia.TipoCompetencium.nombre,
                promedio,
                fechaRegistro: competencia.createdAt
            };
        });
    } 
    
    try {
        const { idEvaluador, idColaborador, idEvaluacion } = req.query;
        const compromisos = await EvaluacionesRealizadas.findAll({
            where: {
                idEvaluacion,
                idColaborador
            },
            include: [{model: Compromisos, include: [{model: Competencias, attributes: ["nombre"]}], attributes: ["comentario", "estado", "fechaCumplimiento"]}, {model: TipoEvaluaciones, attributes: ["nombre"]}],
            attributes: ["comentario", "createdAt"]
        })
        let evaluacion
        if (idEvaluador !== idColaborador) {
            const respuesta = await Competencias.findAll({
                include: [
                    {
                        model: Descriptores,
                        attributes: ["idDescriptor"],
                        include: [
                            {
                                model: Respuestas,
                                where: {
                                    idEvaluador,
                                    idColaborador,
                                    idEvaluacion
                                },
                                attributes: ['idCalificacion'],
                                include: [
                                    {
                                        model: Calificaciones,
                                        attributes: ["valor"]
                                    }
                                ],
                                required: true
                            }
                        ],
                        required: true,
                    },{
                        model: TipoCompetencia,
                        attributes: ["nombre"]
                    }
                ],
                attributes: {exclude: ["updatedAt"]}
            })
            evaluacion = calcularPromedio(respuesta)
        }
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
                                idEvaluacion
                            },
                            attributes: ['idCalificacion'],
                            include: [
                                {
                                    model: Calificaciones,
                                    attributes: ["valor"]
                                }
                            ],
                            required: true
                        }
                    ],
                    required: true,
                },{
                    model: TipoCompetencia,
                    attributes: ["nombre"]
                }
            ],
            attributes: {exclude: ["updatedAt"]}
        });
        res.status(200).json({ message: "Ok",compromisos, evaluacion, autoevaluacion: calcularPromedio(autoevaluacion),  });
    } catch (error) {
        next(error);
    }
};


export const crearCalificacion = async (req, res, next) =>{
    try {
        const {descripcion, valor} = await Calificaciones.create({descripcion, valor})
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}

export const obtenerCalificacion = async (req, res, next) => {
    try {
        const respuesta = await Calificaciones.findAll({
            attributes: ["idCalificacion","descripcion", "valor"]
        })
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}