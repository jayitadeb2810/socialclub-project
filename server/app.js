import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import postRoutes from "./routes/Post.js"
import userRoutes from "./routes/User.js"
import conversationRoutes from "./routes/Conversation.js"
import messageRoutes from "./routes/Message.js"
import path from "path"
import { fileURLToPath } from "url"

const getDirName = function (moduleUrl) {
  const filename = fileURLToPath(moduleUrl)
  return path.dirname(filename)
}

const dirName = getDirName(import.meta.url)

const app = express()

app.use(
  cors({
    origin: [
      "https://socialclub-poject-backend.onrender.com",
      // "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use("/api/J3", postRoutes)
app.use("/api/J3", userRoutes)
app.use("/api/conversations", conversationRoutes)
app.use("/api/messages", messageRoutes)

app.use(express.static(path.join(dirName, "../app/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.resolve(dirName, "../app/dist/index.html"))
})

export default app
