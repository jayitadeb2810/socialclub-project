import { Avatar, Button, Typography, Dialog } from "@mui/material"
import React, { useEffect } from "react"
import {
  MoreVert,
  ThumbUpAlt,
  ThumbUpAltOutlined,
  LocationOn,
  ChatBubble,
  Delete,
} from "@mui/icons-material"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addCommentOnPost,
  deletePost,
  likePost,
  updatePost,
} from "../services/actions/Post.jsx"
import {
  getFollowingPosts,
  getMyPosts,
  loadUser,
} from "../services/actions/User.jsx"
import User from "./User.jsx"
import CommentCard from "./CommentCard.jsx"

const Post = ({
  postId,
  caption,
  city,
  country,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false)
  const [likesUser, setLikesUser] = useState(false)
  const [commentValue, setCommentValue] = useState("")
  const [commentToggle, setCommentToggle] = useState(false)
  const [captionValue, setCaptionValue] = useState(caption)
  const [captionToggle, setCaptionToggle] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  const handleLike = async () => {
    setLiked(!liked)

    // console.log("comments", comments)
    await dispatch(likePost(postId))

    if (isAccount) {
      dispatch(getMyPosts())
    } else {
      dispatch(getFollowingPosts())
    }
  }

  const addCommentHandler = async (e) => {
    e.preventDefault()
    await dispatch(addCommentOnPost(postId, commentValue))

    if (isAccount) {
      dispatch(getMyPosts())
    } else {
      dispatch(getFollowingPosts())
    }
  }

  const updateCaptionHandler = (e) => {
    e.preventDefault()
    dispatch(updatePost(captionValue, postId))
    dispatch(getMyPosts())
  }

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId))
    dispatch(getMyPosts())
    dispatch(loadUser())
  }

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true)
      }
    })
  }, [likes, user._id])

  return (
    <div className="post">
      <div className="postHeader">
        <div className="postDetails">
          <Avatar
            src={ownerImage}
            alt="User"
            sx={{
              height: "3.5vmax",
              width: "3.5vmax",
            }}
          />

          <div className="nameLocationContainer">
            <Link to={`/user/${ownerId}`}>
              <Typography fontWeight={700}>{ownerName}</Typography>
            </Link>
            {country || city ? (
              <div className="locationContainer">
                <LocationOn
                  style={{ height: "2vmax", width: "2vmax" }}
                />
                <div className="location">
                  <Typography>{city}</Typography>
                  <Typography>,</Typography>
                  <Typography style={{ marginLeft: "1vmax" }}>
                    {country}
                  </Typography>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {isAccount ? (
          <Button onClick={() => setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : null}
      </div>

      <div className="captionContainer">{caption}</div>

      <img src={postImage} alt="Post" />

      <div className="postFooter">
        <div className="likeContainer">
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              cursor: "pointer",
              margin: "1vmax 0",
              whiteSpace: "nowrap",
            }}
            onClick={() => setLikesUser(!likesUser)}
            disabled={likes.length === 0 ? true : false}
          >
            <Typography fontSize={"1.2vmax"}>
              {likes.length} Likes
            </Typography>
          </button>
          <Button className="likeButton" onClick={handleLike}>
            {liked ? (
              <ThumbUpAlt style={{ color: "blue" }} />
            ) : (
              <ThumbUpAltOutlined />
            )}
          </Button>
        </div>
        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubble />
        </Button>

        {isDelete ? (
          <Button onClick={deletePostHandler}>
            <Delete />
          </Button>
        ) : null}
      </div>

      <Dialog
        open={likesUser}
        onClose={() => setLikesUser(!likesUser)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>

          {likes.map((like) => (
            <User key={like._id} userId={like._id} name={like.name} />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">
            {comments.length} Comments
          </Typography>

          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                userId={item.user._id}
                name={item.user.name}
                avatar={item?.user?.avatar?.url}
                comment={item.comment}
                commentId={item._id}
                key={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No comment yet</Typography>
          )}
          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Write a comment"
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>
        </div>
      </Dialog>

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>

          <form
            className="commentForm"
            onSubmit={updateCaptionHandler}
          >
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />

            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  )
}

export default Post
