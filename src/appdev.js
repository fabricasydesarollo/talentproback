import express from "express"
import initModels from "./models/index.js"
import db from "./config/db.js"
import routerIndex from "./routers/index.js"
import { httpError } from "./middleware/httpError.js"
import dontenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import https from 'https'
import { readFileSync } from "fs"
import { initTask } from "./utils/deletedFolter.js"
import path from 'path'

dontenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())
initTask() // ⏳ Ejecutar cron jobs al iniciar el servidor


app.use(cors({
  origin: ["https://talentpro-evaluaciones2024.netlify.app", "http://localhost:5173", "https://talentprozentriaqa.netlify.app"],
    credentials: true
}))

app.use("/api/v1", routerIndex)
app.use('/images',express.static(path.resolve('images')))

app.get("/*", (req, res) => {
    res.status(200).json({ message: "Welcome to API!" })
})

app.use(httpError)
app.use(cookieParser())

initModels()

db.authenticate()
    .then(() => console.log('Auth succes!'))
    .catch(err => console.log(err))

db.sync({alter: false})
    .then(() => console.log('db sycn succes!!'))
    .catch(err => console.log(err))
const PORT = 3012

https
  .createServer(
    {
      key: readFileSync(
        "/var/lib/caddy/.local/share/caddy/certificates/acme-v02.api.letsencrypt.org-directory/ide.oncologosdeloccidente.net/ide.oncologosdeloccidente.net.key"
      ),
      cert: readFileSync(
        "/var/lib/caddy/.local/share/caddy/certificates/acme-v02.api.letsencrypt.org-directory/ide.oncologosdeloccidente.net/ide.oncologosdeloccidente.net.crt"
      ),
    },
    app
  ).listen(PORT, () => {
    console.log(`Sever running ${PORT}`)
})