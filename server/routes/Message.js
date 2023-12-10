import express from "express"
import {
  addNewMessage,
  deleteMessage,
  getConversation,
} from "../controllers/Message.js"
import requireAuth from "../middlewares/requireAuth.js"

const router = express.Router()

router.route("/").post(requireAuth, addNewMessage)

router.route("/:conversationId").get(requireAuth, getConversation)

router.route("/:messageId").delete(requireAuth, deleteMessage)

export default router
