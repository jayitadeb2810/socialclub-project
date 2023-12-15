import React, { useEffect } from "react"
import Post from "./Post.jsx"
import User from "./User"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllUsers,
  getFollowingPosts,
} from "../services/actions/User.jsx"
import Loader from "./Loader.jsx"
import { Typography } from "@mui/material"

const Home = () => {
  const dispatch = useDispatch()

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  )
  console.log(posts)

  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  )
  // console.log(users)
  const { error: likeError, message } = useSelector(
    (state) => state.like
  )

  useEffect(() => {
    dispatch(getFollowingPosts())
    dispatch(getAllUsers())
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

  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        <div className="homeleftUserContainer">
          {users && users.length > 0 ? (
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user?.avatar?.url}
              />
            ))
          ) : (
            <Typography>No Users Yet</Typography>
          )}
        </div>
      </div>
      <div className="homeright">
        {posts && posts.length > 0 ? (
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
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>
    </div>
  )
}

export default Home
