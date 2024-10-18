import { Sequelize } from "sequelize"
import  dontenv from "dotenv"
dontenv.config()

const db = new Sequelize({
    dialect: "mysql",
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 3306,
    logging: false
})

export default db