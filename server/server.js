import dotenv from "dotenv"
import cloudinary from "cloudinary"
import cors from "cors"
import app from "./app.js"
import http from "http"
import { connectDatabase } from "./config/database.js"
import { Server } from "socket.io"
import SocketServer from "./socketServer.js"

const server = http.createServer(app)

// export const io = new Server(server)
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
})

const port = process.env.PORT || 5000

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.")
  SocketServer(socket)
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

connectDatabase()

// import express from "express"
// import mongoose from "mongoose"
// import cors from "cors"
// import dotenv from "dotenv"
// import cloudinary from "cloudinary"
// import cookieParser from "cookie-parser"
// import postRoutes from "./routes/Post.js"
// import userRoutes from "./routes/User.js"
// import conversationRoutes from "./routes/Conversation.js"
// import messageRoutes from "./routes/Message.js"
// import { connectDatabase } from "./config/database.js"

// const app = express()

// dotenv.config()

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// )
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// app.use(cookieParser())

// app.use("/api/J3", postRoutes)
// app.use("/api/J3", userRoutes)
// app.use("/api/conversations", conversationRoutes)
// app.use("/api/messages", messageRoutes)

// const port = process.env.PORT || 5000

// app.get("/", (req, res) => {
//   res.send("Hello World!")
// })

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`)
// })

// connectDatabase()
