import Post from "../models/Post.js"
import User from "../models/User.js"
import cloudinary from "cloudinary"
import { sendEmail } from "../middlewares/sendEmail.js"
import crypto from "crypto"

// const baseURL = process.env.SECRET_KEY

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    let user = await User.findOne({ email })
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" })
    }

    // // const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    //   folder: "avatars",
    // });

    user = await User.create({
      name,
      email,
      password,
    })

    const token = await user.generateToken()

    // const options = {
    //   expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    // }

    res.status(201).json({
      success: true,
      user,
      token,
      message: "New Account Created",
    })
    // res.status(201).cookie("token", token, options).json({
    //   success: true,
    //   user,
    //   token,
    //   message: "New Account Created",
    // })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
      .select("+password")
      .populate("posts followers following")

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      })
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      })
    }

    const token = await user.generateToken()

    // const options = {
    //   expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    // }

    res.status(200).json({
      success: true,
      user,
      token,
    })
    // res.status(200).cookie("token", token, options).json({
    //   success: true,
    //   user,
    //   token,
    // })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      // .cookie("token", null, {
      //   expires: new Date(Date.now()),
      //   httpOnly: true,
      // })
      .json({
        success: true,
        message: "Logged out",
      })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id)
    const loggedInUser = await User.findById(req.user._id)

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexfollowing = loggedInUser.following.indexOf(
        userToFollow._id
      )
      const indexfollowers = userToFollow.followers.indexOf(
        loggedInUser._id
      )

      loggedInUser.following.splice(indexfollowing, 1)
      userToFollow.followers.splice(indexfollowers, 1)

      await loggedInUser.save()
      await userToFollow.save()

      res.status(200).json({
        success: true,
        message: "User Unfollowed",
      })
    } else {
      loggedInUser.following.push(userToFollow._id)
      userToFollow.followers.push(loggedInUser._id)

      await loggedInUser.save()
      await userToFollow.save()

      res.status(200).json({
        success: true,
        message: "User followed",
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getFriendList = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId)
      })
    )
    let friendList = []
    friends.map((friend) => {
      const { _id, name, avatar } = friend
      friendList.push({ _id, name, avatar })
    })
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err)
  }
}

export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password")

    const { oldPassword, newPassword } = req.body

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new password",
      })
    }

    const isMatch = await user.matchPassword(oldPassword)

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old password",
      })
    }

    user.password = newPassword
    await user.save()
    res
      .status(200)
      // .cookie("token", null, {
      //   expires: new Date(Date.now()),
      //   httpOnly: true,
      // })
      .json({
        success: true,
        message: "Password Updated",
      })
    // res.status(200).json({
    //   success: true,
    //   message: "Password Updated",
    // })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    const { name, email, avatar, bio } = req.body

    if (name) {
      user.name = name
    }
    if (email) {
      user.email = email
    }
    if (bio) {
      user.bio = bio
    }

    if (avatar) {
      if (user.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id)
      }

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      })
      user.avatar.public_id = myCloud.public_id
      user.avatar.url = myCloud.secure_url
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    })
    user.avatar.public_id = myCloud.public_id
    user.avatar.url = myCloud.secure_url

    await user.save()

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts followers following"
    )

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: {
        $ne: req.user._id,
      },
    })

    res.status(200).json({
      success: true,
      users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getUsersByName = async (req, res) => {
  try {
    const users = await User.find({
      $and: [
        {
          _id: {
            $ne: req.user._id,
          },
        },
        {
          name: {
            $regex: req.query.name,
            $options: "i",
          },
        },
      ],
    })

    res.status(200).json({
      success: true,
      users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    const resetPasswordToken = user.getResetPasswordToken()

    await user.save()

    const resetUrl = `${req.protocol}://${req.get(
      "origin"
    )}/password/reset/${resetPasswordToken}`
    // const resetUrl = `${req.protocol}://${process.env.BASE_URL_PORT}/password/reset/${resetPasswordToken}`

    const message = `click on the link below to Reset Your Password: \n\n ${resetUrl}`

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      })

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      })
    } catch (error) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined
      await user.save()

      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex")

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      })
    }

    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    res.status(200).json({
      success: true,
      message: "Password Updated",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    const posts = []

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      )
      posts.push(post)
    }

    res.status(200).json({
      success: true,
      posts,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    const posts = []

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      )
      posts.push(post)
    }

    res.status(200).json({
      success: true,
      posts,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getUserById = async (req, res) => {
  const userId = req.query.userId
  const username = req.query.username
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username })
    // const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}
