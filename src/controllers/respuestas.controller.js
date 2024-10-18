import { Competencias, Descriptores } from "../models/competencias.model.js";
import { Calificaciones, Respuestas } from "../models/respuestas.model.js"
export const crearRespuesta = async (req, res, next) => {
    try {
        const {respuestas} = req.body;
        // Usamos Promise.all para manejar todas las respuestas de manera asíncrona
        const results = await Promise.all(
            respuestas.map(async (respuesta) => {
                const { idDescriptor, idColaborador, idEvaluador, idEvaluacion, idCalificacion } = respuesta;
                const result = await Respuestas.create({
                    idDescriptor,
                    idColaborador,
                    idEvaluador,
                    idEvaluacion,
                    idCalificacion
                });
                return result;
            })
        );
        // Después de que todas las respuestas han sido creadas, enviamos la respuesta al cliente
        res.status(200).json({ message: "Ok", data: results });
    } catch (error) {
        next(error); // Manejar el error correctamente
    }
};

export const obtenerRespuestas = async (req, res, next) => {
    try {
        const { idEvaluador, idColaborador } = req.query;
        const respuesta = await Respuestas.findAll({
            where: { idEvaluador, idColaborador},
            include: [
                { model: Calificaciones }, 
                { model: Descriptores, include: [{ model: Competencias }] }
            ]
        });

        const agruparRespuestasPorCompetencia = (respuestas) => {
            return respuestas.reduce((acc, respuesta) => {
                const competenciaId = respuesta.descriptore.competencia.idCompetencia;

                // Verifica si la competencia ya existe en el agrupamiento
                if (!acc[competenciaId]) {
                    acc[competenciaId] = {
                        idCompetencia: competenciaId,
                        nombreCompetencia: respuesta.descriptore.competencia.nombre,
                        descriptores: []
                    };
                }

                // Verifica si el descriptor ya existe para evitar duplicados
                const existeDescriptor = acc[competenciaId].descriptores.some(
                    descriptor => descriptor.idDescriptor === respuesta.descriptore.idDescriptor
                );

                if (!existeDescriptor) {
                    acc[competenciaId].descriptores.push({
                        idDescriptor: respuesta.descriptore.idDescriptor,
                        nombreDescriptor: respuesta.descriptore.descripcion,
                        calificacion: {
                            idCalificacion: respuesta.calificacione.idCalificacion,
                            valor: respuesta.calificacione.valor,
                            nombre: respuesta.calificacione.descripcion
                        }
                    });
                }

                return acc;
            }, {});
        };

        res.status(200).json({ message: "Ok", data: agruparRespuestasPorCompetencia(respuesta) });
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
        const respuesta = await Calificaciones.findAll()
        res.status(200).json({ message: "Ok", data: respuesta })
    } catch (error) {
        next(error)
    }
}