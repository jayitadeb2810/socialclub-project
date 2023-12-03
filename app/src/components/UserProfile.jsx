import { Avatar, Button, Dialog, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
  loadUser,
} from "../services/actions/User.jsx"
import Loader from "./Loader.jsx"
import Post from "./Post.jsx"
import User from "./User.jsx"

const UserProfile = () => {
  const dispatch = useDispatch()

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile)

  console.log(user)

  const { user: me } = useSelector((state) => state.user)
  const { loading, error, posts } = useSelector(
    (state) => state.userPosts
  )
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like)

  const params = useParams()
  const [followersToggle, setFollowersToggle] = useState(false)
  const [followingToggle, setFollowingToggle] = useState(false)
  const [following, setFollowing] = useState(false)
  const [myProfile, setMyProfile] = useState(false)

  const followHandler = async () => {
    setFollowing(!following)
    await dispatch(followAndUnfollowUser(user._id))
    dispatch(getUserProfile(params.id))
    dispatch(loadUser())
  }

  useEffect(() => {
    dispatch(getUserPosts(params.id))
    dispatch(getUserProfile(params.id))
  }, [dispatch, params.id])

  useEffect(() => {
    if (me._id === params._id) {
      setMyProfile(true)
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true)
        } else {
          setFollowing(false)
        }
      })
    }
  }, [user, me._id, params.id])

  useEffect(() => {
    if (error) {
      alert(error)
      dispatch({ type: "clearErrors" })
    }

    if (followError) {
      alert(followError)
      dispatch({ type: "clearErrors" })
    }

    if (userError) {
      alert(userError)
      dispatch({ type: "clearErrors" })
    }
    if (message) {
      alert(message)
      dispatch({ type: "clearMessage" })
    }
  }, [error, message, followError, userError, dispatch])

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        <div className="accountleftContent">
          {user && (
            <>
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

              <button
                style={{ backgroundColor: "rgb(184, 181, 181)" }}
                onClick={() => setFollowersToggle(!followersToggle)}
              >
                <Typography>{user.followers.length}</Typography>
                <Typography>Followers</Typography>
              </button>

              <button
                style={{ backgroundColor: "rgb(184, 181, 181)" }}
                onClick={() => setFollowingToggle(!followingToggle)}
              >
                <Typography>{user.following.length}</Typography>
                <Typography>Following</Typography>
              </button>

              <button>
                <Typography>{user.posts.length}</Typography>
                <Typography>Posts</Typography>
              </button>

              {myProfile ? null : (
                <Button
                  variant="contained"
                  style={{
                    background: following ? "red" : "",
                    padding: "1vmax",
                  }}
                  onClick={followHandler}
                  disabled={followLoading}
                >
                  {following ? "Unfollow" : "Follow"}
                </Button>
              )}
            </>
          )}
        </div>
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
      <div className="accountright">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post?.image?.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post?.owner?.avatar?.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography variant="h6">
            {user?.name} has not made any post
          </Typography>
        )}
      </div>
    </div>
  )
}

export default UserProfile
