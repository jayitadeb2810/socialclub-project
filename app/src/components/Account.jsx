import { Avatar, Button, Dialog, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
// import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  //   deleteMyProfile,
  getMyPosts,
  loadUser,
  logoutUser,
} from "../services/actions/User.jsx"
import Loader from "./Loader.jsx"
import Post from "./Post.jsx"
import User from "./User.jsx"

const Account = () => {
  const dispatch = useDispatch()
  //   const alert = useAlert()

  const { user, loading: userLoading } = useSelector(
    (state) => state.user
  )

  // console.log(user)
  const { loading, error, posts } = useSelector(
    (state) => state.myPosts
  )
  // console.log(posts)
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like)

  const [followersToggle, setFollowersToggle] = useState(false)

  const [followingToggle, setFollowingToggle] = useState(false)
  const logoutHandler = () => {
    dispatch(logoutUser())
    // sessionStorage.removeItem("token")
    // alert("Logged out successfully")
  }

  useEffect(() => {
    // console.log("Hello")
    dispatch(getMyPosts())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      alert(error)
      dispatch({ type: "clearErrors" })
    }

    if (likeError) {
      alert(likeError)
      dispatch({ type: "clearErrors" })
    }
    if (message) {
      alert(message)
      dispatch({ type: "clearMessage" })
    }
  }, [error, message, likeError, dispatch])

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        <div className="accountleftContent">
          <Avatar
            src={user?.avatar?.url}
            sx={{
              height: "11vmax",
              width: "10vmax",
              borderRadius: "0",
              border: "4px solid white",
            }}
          />

          <Typography variant="h5">{user.name}</Typography>

          <div className="bioContainer">{user.bio}</div>

          <button style={{ backgroundColor: "rgb(184, 181, 181)" }}>
            <Typography variant="h5">{user.posts.length}</Typography>
            <Typography>Posts</Typography>
          </button>

          <button
            style={{ backgroundColor: "rgb(184, 181, 181)" }}
            onClick={() => setFollowersToggle(!followersToggle)}
          >
            <Typography variant="h5">
              {user.followers.length}
            </Typography>
            <Typography>Followers</Typography>
          </button>

          <button
            style={{ backgroundColor: "rgb(184, 181, 181)" }}
            onClick={() => setFollowingToggle(!followingToggle)}
          >
            <Typography variant="h5">
              {user.following.length}
            </Typography>
            <Typography>Following</Typography>
          </button>

          <Link to="/update/profile">Edit Profile</Link>

          <Link to="/update/password">Change Password</Link>

          <Button
            className="logoutButton"
            variant="contained"
            onClick={logoutHandler}
          >
            Logout
          </Button>

          <Dialog
            open={followersToggle}
            onClose={() => setFollowersToggle(!followersToggle)}
          >
            <div className="DialogBox">
              <Typography variant="h4">Followers</Typography>

              {user && user.followers.length > 0 ? (
                user.followers.map((follower) => (
                  <User
                    key={follower._id}
                    userId={follower._id}
                    name={follower.name}
                    avatar={follower?.avatar?.url}
                  />
                ))
              ) : (
                <Typography style={{ margin: "2vmax" }}>
                  You have no followers
                </Typography>
              )}
            </div>
          </Dialog>

          <Dialog
            open={followingToggle}
            onClose={() => setFollowingToggle(!followingToggle)}
          >
            <div className="DialogBox">
              <Typography variant="h4">Following</Typography>

              {user && user.following.length > 0 ? (
                user.following.map((follow) => (
                  <User
                    key={follow._id}
                    userId={follow._id}
                    name={follow.name}
                    avatar={follow?.avatar?.url}
                  />
                ))
              ) : (
                <Typography style={{ margin: "2vmax" }}>
                  You're not following anyone
                </Typography>
              )}
            </div>
          </Dialog>
        </div>
      </div>
      <div className="accountright">
        {posts && user.posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              city={post?.location?.city}
              country={post?.location?.country}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post?.owner?.avatar?.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">
            You have not made any post
          </Typography>
        )}
      </div>
    </div>
  )
}

export default Account
