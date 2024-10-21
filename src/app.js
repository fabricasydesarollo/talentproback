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

dontenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())


app.use(cors({
    origin: ["https://talentprozentria.netlify.app", "http://localhost:5173"],
    credentials: true
}))

app.use("/api/v1", routerIndex)

app.get("/*", (req, res) => {
    res.status(200).json({ message: "Welcome to API!" })
})

app.use(httpError)
app.use(cookieParser())

initModels()

db.authenticate()
    .then(() => console.log('Auth succes!'))
    .catch(err => console.log(err))

db.sync()
    .then(() => console.log('db sycn succes!!'))
    .catch(err => console.log(err))
const PORT = process.env.PORT || 3002

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