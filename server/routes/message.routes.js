import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js"
import { getMessages, getUserforSidebar, markMessageAsSeen, sendMessage } from "../controllers/message.controller.js"

const messageRouter = express.Router()

messageRouter.get("/users",protectRoute, getUserforSidebar)
messageRouter.get("/:id",protectRoute, getMessages)
messageRouter.put("mark/:id",protectRoute, markMessageAsSeen)
messageRouter.post("/send/:id",protectRoute, sendMessage)

export default messageRouter