import express from "express"
import Message from "../models/Message.js"
import {
  addNewMessage,
  getConversation,
} from "../controllers/Message.js"

const router = express.Router()

// router.route("/").post(requireAuth, addNewMessage)
router.route("/").post(addNewMessage)

// router.route("/:conversationId").get(requireAuth, getConversation)
router.route("/:conversationId").get(getConversation)

export default router
