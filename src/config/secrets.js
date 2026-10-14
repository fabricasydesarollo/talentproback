import { getSecret } from "./azureKeyVault.js";
import dotenv from "dotenv";

dotenv.config();

let secretsCache = null;

export const loadSecrets = async () => {
  if (secretsCache) return secretsCache;

  console.log("🔐 Cargando secretos desde Key Vault...");

  secretsCache = {
    DB_USER: process.env.DB_USERNAME || await getSecret("talentpro-db-username"),
    DB_NAME: process.env.DB_NAME || await getSecret("talentpro-db-name"),
    DB_PASSWORD: process.env.DB_PASSWORD || await getSecret("talentpro-db-password"),
    JWT_SECRET: process.env.SECRETWORD || await getSecret("talentpro-secret"),
  };

  return secretsCache;
}