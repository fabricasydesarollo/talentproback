import {
  Competencias,
  CompetenciasNivelesCargo,
  Descriptores,
  TipoCompetencia,
} from "../models/competencias.model.js";
import { Empresas } from "../models/empresas.model.js";
import { DescriptoresNivelesCargo } from "../models/evaluaciones.model.js";
import { NivelCargo } from "../models/usuarios.model.js";

export const crearDescriptor = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;
    const respuesta = await Descriptores.create({ nombre, descripcion });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const obtenerDescriptor = async (req, res, next) => {
  try {
    const respuesta = await Descriptores.findAll();
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const crearTipoCompetencia = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    const respuesta = await TipoCompetencia.create({ nombre });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const obtenerTipoCompetencia = async (req, res, next) => {
  try {
    const respuesta = await TipoCompetencias.findAll();
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const asignarCompetenciaEvaluacion = async (req, res, next) => {
  try {
    const { idEvaluacion, idCompetencia } = req.body;
    const respuesta = await CompetenciasEvaluaciones.create({
      idEvaluacion,
      idCompetencia,
    });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};
export const crearCompetencia = async (req, res, next) => {
  try {
    const { nombre, descripcion, idTipoCompetencia, idEmpresa } = req.body;
    const respuesta = await Competencias.create({
      nombre,
      descripcion,
      idTipoCompetencia,
      idEmpresa,
    });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const obtenerCompetencia = async (req, res, next) => {
  try {
    const respuesta = await Competencias.findAll({
      include: [{ model: Empresas, through: { attributes: [] } }],
    });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const asignarCompetenciasCargo = async (req, res, next) => {
  try {
    const { idNivelCargo, competencias } = req.body;
    // const respuesta = await CompetenciaCargo.create({idNivelCargo, idCompetencia})
    const resultados = await Promise.all(
      competencias.map(async (idCompetencia) => {
        if (idNivelCargo && competencias) {
          try {
            await CompetenciasNivelesCargo.destroy({ where: { idNivelCargo } });
            await CompetenciasNivelesCargo.create({
              idNivelCargo,
              idCompetencia,
            });
          } catch (error) {
            return {
              error: `Error al asignar las compatencias al nivel de cargo}`,
            };
          }
        } else {
          return { error: "Datos requeridos para la operación" };
        }
      })
    );
    res.status(201).json({ message: "Ok", resultados });
  } catch (error) {
    next(error);
  }
};



export const asignarDescriptoresNivelCargo = async (req, res, next) => {
    try {
      const { idNivelCargo, descriptores } = req.body;
      // const respuesta = await CompetenciaCargo.create({idNivelCargo, idCompetencia})
      const resultados = await Promise.all(
        descriptores.map(async (idDescriptor) => {
          if (idNivelCargo && descriptores) {
            try {
              await DescriptoresNivelesCargo.destroy({ where: { idNivelCargo } });
              await DescriptoresNivelesCargo.create({
                idNivelCargo,
                idDescriptor,
              });
            } catch (error) {
              return {
                error: `Error al asignar las descriptores al nivel de cargo}`,
              };
            }
          } else {
            return { error: "Datos requeridos para la operación" };
          }
        })
      );
      res.status(201).json({ message: "Ok", resultados });
    } catch (error) {
      next(error);
    }
  };
