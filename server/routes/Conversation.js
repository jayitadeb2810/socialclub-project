import express from "express"
import Conversation from "../models/Conversation.js"
import {
  createNewConversation,
  getConversationOfaUser,
  getConversationOfTwoUser,
} from "../controllers/Conversation.js"

const router = express.Router()

// router.route("/").post(requireAuth, createNewConversation)
router.route("/").post(createNewConversation)

// router.route("/:userId").get(requireAuth, getConversationOfaUser)
router.route("/:userId").get(getConversationOfaUser)

// router
//   .route("/find/:firstUserId/:secondUserId")
//   .get(requireAuth, getConversationOfTwoUser)
router
  .route("/find/:firstUserId/:secondUserId")
  .get(getConversationOfTwoUser)

export default router
