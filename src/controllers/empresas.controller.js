import { Ciudades, Departamentos } from "../models/ciudades.model.js";
import { Empresas, Hubs, Sedes } from "../models/empresas.model.js";

export const crearHubs = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    if (!nombre) res.status(400).json({ message: "Faltan datos." });
    const respuesta = await Hubs.create({ nombre });
    res.status(201).json({ message: "Creado", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const obtenerHubs = async (req, res, next) => {
  try {
    const respuesta = await Hubs.findAll();
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const crearEmpresa = async (req, res, next) => {
  try {
    const host = `${req.protocol}://${req.get("host")}`;
    const { nombre, nit, idHub } = req.body;
    const urlLogo = `${host}/${req.file.path.replace(/\\/g, "/")}`;

    if (!nombre || !idHub || !urlLogo || !req.file) {
      return res.status(400).json({
        message: "Hacen falta datos necesarios para crear la empresa",
      });
    }

    const respuesta = await Empresas.create({ nombre, nit, urlLogo, idHub });
    res
      .status(201)
      .json({ message: "Empresa creada correctamente", data: respuesta });
  } catch (error) {
    next(error);
  }
};
export const actualizarEmpresa = async (req, res, next) => {
  try {
    const host = `${req.protocol}://${req.get("host")}`;
    const { nombre, nit, idHub, idEmpresa } = req.body;

    const empresaActual = await Empresas.findByPk(idEmpresa);

    if (!empresaActual) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    const urlLogo = req.file
      ? `${host}/${req.file.path.replace(/\\/g, "/")}`
      : empresaActual.urlLogo;

    await Empresas.update(
      { nombre, nit, idHub, urlLogo },
      { where: { idEmpresa } }
    );

    res.status(201).json({ message: "Empresa actualizada con exito" });
  } catch (error) {
    next(error);
  }
};

export const obtenerEmpresa = async (req, res, next) => {
  try {
    const respuesta = await Empresas.findAll({
      include: [{ model: Sedes, include: Ciudades }, { model: Hubs }],
    });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const obtenerSedes = async (req, res, next) => {
  try {
    const respuesta = await Sedes.findAll({
      attributes: ["idSede", "nombre", "siglas"],
      include: [
        { model: Empresas, attributes: ["nombre", "idEmpresa"] },
        { model: Ciudades, attributes: ["idCiudad", "nombre"] },
      ],
    });
    res.status(200).json({ message: "Ok", data: respuesta });
  } catch (error) {
    next(error);
  }
};

export const crearSedes = async (req, res, next) => {
  try {
    const { nombre, siglas, idEmpresa, idCiudad } = req.body;
    await Sedes.create({
      nombre,
      siglas,
      idEmpresa,
      idCiudad,
    });
    res.status(201).json({ message: "Sede creada con exito" });
  } catch (error) {
    next(error);
  }
};

export const eliminarSede = async (req, res, next) => {
  try {
    const { idSede } = req.params;

    const sede = await Sedes.findByPk(idSede);
    if (!sede) {
      return res.status(404).json({ message: "Sede no encontrada" });
    }

    await Sedes.destroy({ where: { idSede } });

    res.status(200).json({ message: "Sede eliminada correctamente!" });
  } catch (error) {
    next(error);
  }
};

export const actualizarSede = async (req, res, next) => {
  try {
    const { idSede } = req.params;
    const { nombre, siglas, idEmpresa, idCiudad } = req.body;

    const sede = await Sedes.findByPk(idSede);
    if (!sede) {
      return res.status(404).json({ message: "Sede no encontrada" });
    }

    await Sedes.update(
      { nombre, siglas, idEmpresa, idCiudad },
      { where: { idSede } }
    );

    const sedeActualizada = await Sedes.findByPk(idSede);

    res.status(200).json({
      message: "Sede actualizada correctamente!",
      data: sedeActualizada
    });
  } catch (error) {
    next(error);
  }
};
