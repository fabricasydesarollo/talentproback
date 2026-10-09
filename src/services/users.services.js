import userevaluatorRepository from "../repository/userevaluator.repository.js";
import usersRepository from "../repository/users.repository.js";
import { hashPassword } from "../utils/hashPassword.js";

class UsersServices {
    async create(payload) {
        if (!payload.idUsuario || !payload.nombre || !payload.cargo || !payload.correo || !payload.password || !payload.idPerfil || !payload.idNivelCargo || !payload.area || !payload.fechaIngreso) {
            throw new Error("Missing required fields");
        }
        const password = await hashPassword(payload.contrasena);
        const user = await usersRepository.create({ ...payload, contrasena: password });
        return user;

    }
    async update(idUsuario, payload) {
        if (!idUsuario) {
            throw new Error("It's necessary to provide the user ID to update");
        }
        const existingUser = await usersRepository.findById(idUsuario);
        if (!existingUser) {
            throw new Error("User not found");
        }
        if (payload.contrasena) {
            const password = await hashPassword(payload.contrasena);
            payload.contrasena = password;
        }
        await usersRepository.update(idUsuario, payload);
        return {
            message: "User updated successfully",
            userOld: existingUser.toJSON(),
            userNew: payload
        };
    }
    async addColaboradores(usuarios) {
        if (!Array.isArray(usuarios) || usuarios.length === 0) {
            throw {
                status: 400,
                message: "The 'usuarios' array is required and cannot be empty"
            }
        }
        const { idEvaluador, idEvaluacion, idUsuario } = usuarios[0];
        const currentUsersAudit = []
        const usersCreate = []
        // 2. Extraer los ids de usuarios
        const ids_usuarios = usuarios.map((u) => u.idUsuario);

        // 3. Si idusuario viene null entonces debe hacer un sof/delete de ese evaluador y esa evaluación (deletedAt: now Date())
        if (!idUsuario) {
            const { currentUsers, rowsAffected } = await userevaluatorRepository.softDeleteEvaluator({ idEvaluador, idEvaluacion }, true, false);
            return {
                message: `${rowsAffected} usuario(s) soft deleted successfully`,
                rowsAffected,
                status: 200,
                usersAudit: [...currentUsers],
                usersCreate: []
            };
        }
        // 4. Validar si el usuario existe y no esta eliminado
        // 5. Si existe y no esta eliminado (omitir)
        // 6. Si no existe se debe crear

        for (const user_d of usuarios) {
            const { idEvaluador, idEvaluacion, idUsuario } = user_d; // El punto 4, 5 y 6 lo logramos con el findOrCreate
            const { user, created } = await userevaluatorRepository.findOrCreate({
                where: { idEvaluador, idEvaluacion, idUsuario },
                defaults: user_d,
            });

            if (created) {
                usersCreate.push(user)
            }

            // 7. si existe y esta eliminado se debe restaurar (deletedAt : null)
            if (user.deletedAt) {
                const { currentUsers, rowsAffected } = await userevaluatorRepository.softDeleteEvaluator({ idEvaluador, idEvaluacion, idUsuario }, false, false);
                usersCreate.push(...currentUsers)
            }
        }

        // 8. Hacer un soft/delete con con los ids de usuarios en update({deletedAt: now Date()}, {where: NOT IN (ids_usuarios) AND idEvaluacion})
        const { currentUsers, rowsAffected } = await userevaluatorRepository.softDeleteEvaluator({ idEvaluador, idEvaluacion, idUsuario, ids_usuarios }, true, true);
        currentUsersAudit.push(...currentUsers)
        return {
            status: 200,
            message: "Usuarios actualizados correctamente",
            usersAudit: currentUsersAudit,
            usersCreate: usersCreate
        }
    }
}

export default new UsersServices();