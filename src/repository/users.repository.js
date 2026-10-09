import { Usuarios } from "../models/usuarios.model.js";

class UsersRepository {
    async findById(idUsuario) {
        const user = await Usuarios.findOne({
            where: { idUsuario }
        });
        return user;
    }
    async create(payload) {
        const newUser = await Usuarios.create({
            idUsuario: payload.idUsuario,
            nombre: payload.nombre,
            cargo: payload.cargo,
            correo: payload.correo,
            contrasena: payload.password,
            idPerfil: payload.idPerfil,
            idNivelCargo: payload.idNivelCargo,
            area: payload.area,
            fechaIngreso: payload.fechaIngreso,
            defaultContrasena: true,
            activo: true,
        })
        return newUser;
    }
    async update(idUsuario, payload) {
        const updatedUser = await Usuarios.update(payload, {
            where: { idUsuario }
        });
        return updatedUser;
    }
}

export default new UsersRepository();