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


export function transformarDatos(evaluadores) {
    return evaluadores.flatMap((evaluador) =>
      evaluador.colaboradores.map((colaborador) => ({
        evaluador: {
          idUsuario: evaluador.idUsuario,
          nombre: evaluador.nombre,
          cargo: evaluador.cargo,
          fechaIngreso: evaluador.fechaIngreso
            ? new Date(evaluador.fechaIngreso).toLocaleDateString()
            : null,
          area: evaluador.area,
          empresas: evaluador.Empresas || [],
          sedes: evaluador.Sedes || [],
          nivelCargo: evaluador.nivelCargo?.nombre || '',
          evaluaciones: evaluador.evaluacionesComoColaborador || [],
        },
        colaborador: {
          idUsuario: colaborador.idUsuario,
          nombre: colaborador.nombre,
          cargo: colaborador.cargo,
          fechaIngreso: colaborador.fechaIngreso
            ? new Date(colaborador.fechaIngreso).toLocaleDateString()
            : null,
          area: colaborador.area,
          empresas: colaborador.Empresas || [],
          sedes: colaborador.Sedes || [],
          nivelCargo: colaborador.nivelCargo?.nombre || '',
          evaluaciones: colaborador.evaluacionesComoColaborador || [],
        },
      }))
    );
  }


export const calcularPromedioGeneral = (array) => {
    const agrupar = array.reduce((acc, curr) => {
        if (acc[curr.idCompetencia]) {
          acc[curr.idCompetencia].total += curr.valor;
          acc[curr.idCompetencia].count += 1;
      } else {
          acc[curr.idCompetencia] = {
              nombre: curr.nombre,
              total: curr.valor,
              count: 1
          };
      }
      return acc;
  },{})
  const datosCalculados = Object.keys(agrupar).map(idCompetencia => {
      const item = agrupar[idCompetencia];
      const average = item.total / item.count; // Promedio
      return {
          idCompetencia: parseInt(idCompetencia),
          nombre: item.nombre,
          promedio: Number(average.toFixed(1))
      };
  });
  return datosCalculados
  }