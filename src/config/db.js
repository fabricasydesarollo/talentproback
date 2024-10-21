import { Sequelize } from "sequelize";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv"; 

dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Sequelize({
  dialect: "mysql",
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 3306,
  logging: false,
  dialectOptions: {
    ssl: {
      ca: readFileSync(join(__dirname, "server-ca.pem")),
      cert: readFileSync(join(__dirname, "client-cert.pem")),
      key: readFileSync(join(__dirname, "client-key.pem")),
    }
  },
});

export default db;