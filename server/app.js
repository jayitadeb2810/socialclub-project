import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import postRoutes from "./routes/Post.js"
import userRoutes from "./routes/User.js"
import conversationRoutes from "./routes/Conversation.js"
import messageRoutes from "./routes/Message.js"
import path from "path"
// import { fileURLToPath } from "url"

// const getDirName = function (moduleUrl) {
//   const filename = fileURLToPath(moduleUrl)
//   return path.dirname(filename)
// }

// const dirName = getDirName(import.meta.url)

const app = express()

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://socialclub-application.onrender.com"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  )
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  )
  res.setHeader("Access-Control-Allow-Credentials", true)
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use("/api/J3", postRoutes)
app.use("/api/J3", userRoutes)
app.use("/api/conversations", conversationRoutes)
app.use("/api/messages", messageRoutes)

// app.use(express.static(path.join(dirName, "../app/dist")))

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(dirName, "../app/dist/index.html"))
// })

export default app
