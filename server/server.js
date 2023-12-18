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
    origin: [
      // "https://socialclub-application.onrender.com",
    ],
  },
})
dotenv.config()

const port = process.env.PORT

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

io.on("connection", (socket) => {
  //when ceonnect
  // console.log("a user connected.")
  SocketServer(socket)
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

connectDatabase()
