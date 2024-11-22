import { ADMMenus, ADMPerfilesRutas, ADMPerfilesUsuarios, ADMRutas } from "./administrar.model.js"
import { Ciudades, Departamentos } from "./ciudades.model.js"
import { Competencias, CompetenciasEmpresas, CompetenciasNivelesCargo, Descriptores, EvaluacionCompetencias, TipoCompetencia } from "./competencias.model.js"
import { Empresas, Hubs, Sedes } from "./empresas.model.js"
import { Compromisos, DescriptoresNivelesCargo, Evaluaciones, EvaluacionesRealizadas, TipoEvaluaciones } from "./evaluaciones.model.js"
import { Calificaciones, Respuestas } from "./respuestas.model.js"
import { NivelCargo, Perfiles, UsuariosEvaluadores, Usuarios, UsuariosEmpresas, UsuariosSedes,  UsuariosEvaluaciones } from "./usuarios.model.js"


const initModels = () => {


    Departamentos.hasMany(Ciudades, { foreignKey: "idDepartamento" })
    Ciudades.belongsTo(Departamentos, { foreignKey: "idDepartamento" })


    Evaluaciones.belongsToMany(Competencias, { through: EvaluacionCompetencias, foreignKey: 'idEvaluacion' })
    Competencias.belongsToMany(Evaluaciones, { through: EvaluacionCompetencias, foreignKey: 'idCompetencia' })


    Competencias.hasMany(Descriptores, { foreignKey: 'idCompetencia' })
    Descriptores.belongsTo(Competencias, { foreignKey: 'idCompetencia' })

    TipoCompetencia.hasMany(Competencias, { foreignKey: 'idTipo' })
    Competencias.belongsTo(TipoCompetencia, { foreignKey: 'idTipo' })


    Descriptores.belongsToMany(NivelCargo, { through: DescriptoresNivelesCargo, foreignKey: 'idDescriptor' })
    NivelCargo.belongsToMany(Descriptores, { through: DescriptoresNivelesCargo, foreignKey: 'idNivelCargo' })

    Competencias.belongsToMany(NivelCargo, { through: CompetenciasNivelesCargo, foreignKey: 'idCompetencia' })
    NivelCargo.belongsToMany(Competencias, { through: CompetenciasNivelesCargo, foreignKey: 'idNivelCargo' })


    Competencias.belongsToMany(Empresas, { through: CompetenciasEmpresas, foreignKey: 'idCompetencia' })
    Empresas.belongsToMany(Competencias, { through: CompetenciasEmpresas, foreignKey: 'idEmpresa' })

    Usuarios.belongsToMany(Evaluaciones, {through: UsuariosEvaluaciones, foreignKey: 'idUsuario'})
    Evaluaciones.belongsToMany(Usuarios, {through: UsuariosEvaluaciones, foreignKey: 'idEvaluacion'})


    NivelCargo.hasMany(Usuarios, { foreignKey: 'idNivelCargo' })
    Usuarios.belongsTo(NivelCargo, { foreignKey: 'idNivelCargo' })

    Empresas.hasMany(Sedes, { foreignKey: 'idEmpresa' })
    Sedes.belongsTo(Empresas, { foreignKey: 'idEmpresa' })

    Hubs.hasMany(Empresas, { foreignKey: 'idHub' })
    Empresas.belongsTo(Hubs, { foreignKey: 'idHub' })

    Ciudades.hasMany(Sedes, { foreignKey: 'idCiudad' })
    Sedes.belongsTo(Ciudades, { foreignKey: 'idCiudad' })

    Usuarios.belongsToMany(Sedes, { through: UsuariosSedes, foreignKey: 'idUsuario' })
    Sedes.belongsToMany(Usuarios, { through: UsuariosSedes, foreignKey: 'idSede' })

    Usuarios.belongsToMany(Empresas, { through: UsuariosEmpresas, foreignKey: 'idUsuario' })
    Empresas.belongsToMany(Usuarios, { through: UsuariosEmpresas, foreignKey: 'idEmpresa' })

    Perfiles.hasMany(Usuarios, { foreignKey: 'idPerfil' })
    Usuarios.belongsTo(Perfiles, { foreignKey: 'idPerfil' })

    Usuarios.belongsToMany(Usuarios, { through: UsuariosEvaluadores, as: 'evaluadores', foreignKey: 'idUsuario', otherKey: 'idEvaluador' })
    Usuarios.belongsToMany(Usuarios, { through: UsuariosEvaluadores, as: 'colaboradores', foreignKey: 'idEvaluador', otherKey: 'idUsuario' })

    Usuarios.belongsToMany(Usuarios, { through: Respuestas, as: "colaboradoresResp", foreignKey: "idColaborador" })
    Usuarios.belongsToMany(Usuarios, { through: Respuestas, as: "evaluadoresResp", foreignKey: "idEvaluador" })

    Respuestas.belongsTo(Calificaciones, { foreignKey: "idCalificacion" })
    Calificaciones.hasMany(Respuestas, { foreignKey: "idCalificacion" })

    Respuestas.belongsTo(Descriptores, { foreignKey: "idDescriptor" })
    Descriptores.hasMany(Respuestas, { foreignKey: "idDescriptor" })

    Respuestas.belongsTo(Evaluaciones, { foreignKey: "idEvaluacion" })
    Evaluaciones.hasMany(Respuestas, { foreignKey: "idEvaluacion" })

    EvaluacionesRealizadas.belongsTo(Usuarios, {  foreignKey: 'idColaborador',  as: 'colaborador',});
    EvaluacionesRealizadas.belongsTo(Usuarios, {foreignKey: 'idEvaluador', as: 'evaluador', });

    EvaluacionesRealizadas.belongsTo(Evaluaciones, { foreignKey: 'idEvaluacion', as: 'evaluacion',});
    Evaluaciones.hasMany(EvaluacionesRealizadas, {foreignKey: 'idEvaluacion'})

    EvaluacionesRealizadas.belongsTo(TipoEvaluaciones, {foreignKey: 'idTipoEvaluacion'})
    TipoEvaluaciones.hasMany(EvaluacionesRealizadas, {foreignKey: 'idTipoEvaluacion'})

    EvaluacionesRealizadas.hasMany(Compromisos, { foreignKey: 'idEvalRealizada', sourceKey: 'idEvalRealizada'});
    Compromisos.belongsTo(EvaluacionesRealizadas, {foreignKey: 'idEvalRealizada', targetKey: 'idEvalRealizada' });

    Competencias.hasMany(Compromisos, {foreignKey: 'idCompetencia'})
    Compromisos.belongsTo(Competencias, {foreignKey: 'idCompetencia'})


    ADMMenus.hasMany(ADMRutas, {foreignKey: 'idMenu'})
    ADMRutas.belongsTo(ADMMenus, {foreignKey: 'idMenu'})

    Perfiles.belongsToMany(Usuarios, {through: ADMPerfilesUsuarios, foreignKey: 'idPerfil' })
    Usuarios.belongsToMany(Perfiles, {through: ADMPerfilesUsuarios, foreignKey: 'idUsuario' })

    ADMRutas.belongsToMany(Perfiles, {through: ADMPerfilesRutas, foreignKey: 'idRuta' })
    Perfiles.belongsToMany(ADMRutas, {through: ADMPerfilesRutas, foreignKey: 'idPerfil' })

}
export default initModels