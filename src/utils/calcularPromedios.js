export const calcularPromedio = (respuestas) => {
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
            promedio: promedio.toFixed(2),
            fechaRegistro: competencia.createdAt
        };
    });
} 