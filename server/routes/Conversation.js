import express from "express"
import {
  createNewConversation,
  getConversationOfaUser,
  getConversationOfTwoUser,
} from "../controllers/Conversation.js"
import requireAuth from "../middlewares/requireAuth.js"

const router = express.Router()

router.route("/").post(requireAuth, createNewConversation)

router.route("/:userId").get(requireAuth, getConversationOfaUser)

router
  .route("/find/:firstUserId/:secondUserId")
  .get(requireAuth, getConversationOfTwoUser)

export default router
