import { Sequelize } from "sequelize";
import { Empresas, Sedes } from "../models/empresas.model.js";
import {
  UsuariosEmpresas,
  UsuariosSedes,
  Usuarios,
} from "../models/usuarios.model.js";

export const informeAvancesGraficas = async (req, res, next) => {
  try {
    const { idEmpresa, idSede } = req.query;
    const totalUsuariosEmpresa = await UsuariosEmpresas.count({
      where: {
        idEmpresa,
      },
      distinct: true,
      col: "idUsuario",
    });
    const totalUsuariosSede = await UsuariosSedes.count({
      where: {
        idSede,
      },
      distinct: true,
      col: "idUsuario",
    });
    const { count, rows } = await Usuarios.findAndCountAll({
        include: [
          {
            model: Usuarios,
            as: "colaboradoresResp",
            through: { attributes: [] },
            required: true,
            attributes: []
          },
          {
            model: Empresas,
            attributes: ['nombre'],
            through: { attributes: [] },
            required: true,
          },
        ],
        distinct: true,
        col: 'idUsuario',
        attributes:['idUsuario']
      });
      
      const totalEmpresas = { 
        respuestas: count, 
        programados: totalUsuariosEmpresa,
        nombre: [...new Set(rows.flatMap(usuario => usuario.Empresas.map(empresa => empresa.nombre)))][0] || null
      };
      
      const { count: count1, rows: rows1 } = await Usuarios.findAndCountAll({
        include: [
          { model: Usuarios, as: "colaboradoresResp", through: {}, required: true },
          { model: Sedes, through: {}, required: true, where: { idSede } },
        ],
        distinct: true,
        col: 'idUsuario'
      });

    const totalSedes = {
        respuestas: count1,
        programados: totalUsuariosSede,
        nombre: [...new Set(rows1.flatMap(usuario => usuario.Sedes.map(sede => sede.nombre)))][0] || null
    }

    res
      .status(200)
      .json({
        message: "Informes",
        data: {totalEmpresas, totalSedes },
      });
  } catch (error) {
    next(error);
  }
};
export const informeAvancesGraficasAll = async (req, res, next) => {
  try {
    const totalUsuariosSede = await Usuarios.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('colaboradoresResp.idUsuario'))), 'Respuestas'],  // Total de colaboradores
        [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('usuarios.idUsuario'))), 'Usuarios'],  // Total de usuarios
        [Sequelize.col('Sedes.nombre'), 'nombre'],  // Nombre de la sede
        'Sedes.idSede',  // ID de la sede para agrupar
      ],
      include: [
        { 
          model: Usuarios, 
          as: "colaboradoresResp", 
          attributes: [],  // No seleccionamos atributos de Usuarios directamente
          through: { attributes: [] },  // No necesitamos columnas de la tabla intermedia
          required: false  // Cambiado a false para LEFT JOIN
        },
        { 
          model: Sedes, 
          attributes: [], // No seleccionamos directamente columnas de Sedes
          required: false,  // Cambiado a false para LEFT JOIN
          through: { attributes: [] },  // No seleccionamos atributos de la tabla intermedia de la relación
        }
      ],
      group: ['Sedes.idSede', 'Sedes.nombre'],  // Aseguramos de agrupar por idSede y nombre de sede
      distinct: true,
      raw: true,  // Usamos raw para obtener resultados sin la envoltura de Sequelize
    });    

    const totalUsuariosEmpresa = await Usuarios.findAll({
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('colaboradoresResp.idUsuario'))), 'Respuestas'],  // Contamos usuarios distintos por idUsuario
            [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('usuarios.idUsuario'))), 'Usuarios'],
            [Sequelize.col('Empresas.nombre'), 'nombre'],
            'Empresas.idEmpresa',
          ],
          include: [
            { 
              model: Usuarios, 
              as: "colaboradoresResp", 
              attributes: [],  // No seleccionamos atributos de Usuarios directamente
              through: { attributes: [] },  // No necesitamos columnas de la tabla intermedia
              required: false  // Cambiado a false para LEFT JOIN
            },
            { 
              model: Empresas,
              through: { attributes: [] }, 
              attributes: [],
              required: false, 
            }
          ],
          group: ['Empresas.idEmpresa', 'Empresas.nombre'],
          distinct: true,
          raw: true, 
          subQuery: false, 
    })

    res
      .status(200)
      .json({
        message: "Informes",
        data: {totalUsuariosEmpresa, totalUsuariosSede },
      });
  } catch (error) {
    next(error);
  }
};

//informes

export const informeExcelAvances = async (req, res, next) => {
  try {

    const resp = await Usuarios.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('usuarios.idUsuario'))), 'Usuarios'],
        [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('colaboradoresResp.idUsuario'))), 'Respuestas'],  // Contamos usuarios distintos por idUsuario
      ],
      include: [
        { 
          model: Usuarios, 
          as: "evaluadores", 
          attributes: ['nombre'],  // No seleccionamos atributos de Usuarios directamente
          through: { attributes: [] },  // No necesitamos columnas de la tabla intermedia
          required: false  // Cambiado a false para LEFT JOIN
        },
        { 
          model: Usuarios, 
          as: "colaboradoresResp", 
          attributes: [],
          through: { attributes: [] },  // No necesitamos columnas de la tabla intermedia
          required: false  // Cambiado a false para LEFT JOIN
        },
        { 
          model: Empresas,
          attributes: ['nombre'],
          through: { attributes: [] }, 
          required: false, 
        },
        { 
          model: Sedes,
          attributes: ['nombre'],
          through: { attributes: [] }, 
          required: false, 
        }
      ],
      group: ['Empresas.idEmpresa', 'Empresas.nombre', 'evaluadores.nombre', 'Sedes.nombre'],
      distinct: true,
      raw: true, 
      subQuery: false, 
    })
    res.status(200).json({message: "Informe Excel", resp})
    
  } catch (error) {
    next(error)
  }
}