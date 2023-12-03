import express from "express"
import {
  register,
  login,
  followUser,
  logout,
  updatePassword,
  updateProfile,
  //   deleteMyProfile,
  myProfile,
  getUserProfile,
  getAllUsers,
  forgotPassword,
  resetPassword,
  getMyPosts,
  getUserPosts,
  getUsersByName,
  getUserById,
  getFriendList,
} from "../controllers/User.js"
import requireAuth from "../middlewares/requireAuth.js"
const router = express.Router()

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/logout").get(logout)

router.route("/follow/:id").get(requireAuth, followUser)

router.route("/update/password").put(requireAuth, updatePassword)

router.route("/update/profile").put(requireAuth, updateProfile)

router.route("/me").get(requireAuth, myProfile)

router.route("/my/posts").get(requireAuth, getMyPosts)

router.route("/userposts/:id").get(requireAuth, getUserPosts)

router.route("/user").get(getUserById)

router.route("/friends/:userId").get(requireAuth, getFriendList)

router.route("/user/:id").get(requireAuth, getUserProfile)

router.route("/users").get(requireAuth, getAllUsers)
router.route("/usersbyname").get(requireAuth, getUsersByName)

router.route("/forgot/password").post(forgotPassword)

router.route("/password/reset/:token").put(resetPassword)

export default router
