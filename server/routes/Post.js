import express from "express"
import {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostOfFollowing,
  updateCaption,
  commentOnPost,
  deleteComment,
} from "../controllers/Post.js"
import requireAuth from "../middlewares/requireAuth.js"

const router = express.Router()

router.route("/post/upload").post(requireAuth, createPost)

router
  .route("/post/:id")
  .get(requireAuth, likeAndUnlikePost)
  .put(requireAuth, updateCaption)
  .delete(requireAuth, deletePost)

router.route("/posts").get(requireAuth, getPostOfFollowing)

router
  .route("/post/comment/:id")
  .put(requireAuth, commentOnPost)
  .delete(requireAuth, deleteComment)

export default router
