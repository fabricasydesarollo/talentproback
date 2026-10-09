import { DefaultAzureCredential } from "@azure/identity"
import { SecretClient } from "@azure/keyvault-secrets"
import dotenv from "dotenv"
dotenv.config()

// const client = new SecretClient(`https://${process.env.KEY_VAULT_NAME}.vault.azure.net/`, new DefaultAzureCredential({
//     managedIdentityClientId: process.env.AZURE_CLIENT_ID
// }))
const client = new SecretClient(`https://${process.env.KEY_VAULT_NAME}.vault.azure.net/`, new DefaultAzureCredential())

export const getSecret = async (secretName) => {
    try {
        const secret = await client.getSecret(secretName)
        return secret.value
    } catch (error) {
        console.error(`Error fetching secret ${secretName}:`, error)
        throw error
    }
}