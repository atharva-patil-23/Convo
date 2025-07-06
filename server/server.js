import express from "express"
import "dotenv/config"
import cors from "cors"
import http from "http"
import { connectDB } from "./lib/db.js"
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js"
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)

export const io = new Server({
    cors :{origin:"*"}
})

io.on("connection", (socket) =>{
    const userId = socket.handshake.query.userId;
    console.log("User connected" , userId)

    if(userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers" , Object.keys(userSocketMap))
})



app.use(express.json({limit:"4mb"}))
app.use(cors());



app.use("/api/status",(req,res) => res.send("Server is live"));

app.use("/api/auth", userRouter)
app.use("/api/messages",messageRouter)

await connectDB()

const PORT = process.env.PORT || 8080;

server.listen(PORT , ()=> console.log("server is running on port " +PORT));
