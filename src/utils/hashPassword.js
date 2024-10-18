import bcrypt from "bcrypt"

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password, passwordHash) => {
    return await bcrypt.compare(password, passwordHash)
}