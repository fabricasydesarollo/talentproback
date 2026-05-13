import express from "express"
import initModels from "./models/index.js"
import db from "./config/db.js"
import routerIndex from "./routers/index.js"
import { httpError } from "./middleware/httpError.js"
import dontenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { readFileSync } from "fs"
import { initTask } from "./utils/deletedFolter.js"
import path from 'path'

dontenv.config()

const app = express()

app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ limit: "3mb", extended: true }));

app.use(express.json())
app.use(cookieParser())
initTask() // ⏳ Ejecutar cron jobs al iniciar el servidor


app.use(cors({
  origin: [
    "https://talentprozentria.netlify.app",
    "http://localhost:5173",
    "https://talentprozentriaqa.netlify.app"
  ],
  credentials: true
}))

app.use("/api/v1", routerIndex)
app.use('/images', express.static(path.resolve('images')))

app.get("/*", (req, res) => {
  const info = {
      ip: req.ip,
      endpoint: req.originalUrl,
      method: req.method,
      userAgent: req.headers["user-agent"]
    }
  console.log(info)

  res.status(200).json({
    title: "Talent Pro API",
    message: "Welcome to API!",
    details: "continue to talentprozentria.netlify.app"
  })
})

app.use(httpError)
app.use(cookieParser())

initModels()

db.authenticate()
  .then(() => console.log('Auth succes!'))
  .catch(err => console.log(err))

db.sync({ alter: false })
  .then(() => console.log('db sycn succes!!'))
  .catch(err => console.log(err))
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Sever running ${PORT}`)
})