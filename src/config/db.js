import { Sequelize } from "sequelize";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv"; 
import { loadSecrets } from "./secrets.js";

dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const secretCache = await loadSecrets();

const db = new Sequelize({
  dialect: "mysql",
  database: secretCache.DB_NAME,
  username: secretCache.DB_USER,
  password: secretCache.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 3306,
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      ca: readFileSync(join(__dirname, "../certs/DigiCertGlobalRootG2.crt.pem"), "utf8"),
      // ca: readFileSync("C:\\Tramita\\certs\\server-ca.pem", "utf8"), // Ruta al archivo de certificado en Windows
      // cert: readFileSync("C:\\Tramita\\certs\\client-cert.pem", "utf8"), // Ruta al archivo de certificado en Windows
      // key: readFileSync("C:\\Tramita\\certs\\client-key.pem", "utf8"), // Ruta al archivo de clave en Windows
    }
  },
});

export default db;