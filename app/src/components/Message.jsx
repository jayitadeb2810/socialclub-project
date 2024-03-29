import { format } from "timeago.js"
import noAvatar from "../assets/noAvatar.webp"
import axios from "axios"
import axiosConfig from "../config/axiosConfig.jsx"
import { useState } from "react"
import { Button, Dialog, Typography } from "@mui/material"

const Message = ({
  message,
  own,
  user,
  currentChat,
  setMessages,
  currentFriend,
}) => {
  const [deleteMessage, setDeleteMessage] = useState(false)

  const deleteHandle = async (id) => {
    try {
      const { data } = await axiosConfig.delete(
        `/api/messages/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        },

        { withCredentials: true }
      )

      try {
        const res = await axiosConfig.get(
          "/api/messages/" + currentChat?._id,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          },
          { withCredentials: true }
        )
        setMessages(res.data)
      } catch (err) {
        // console.log(err)
      }

      // alert(data.message)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            own
              ? user?.avatar?.url
                ? user?.avatar?.url
                : noAvatar
              : currentFriend?.avatar?.url
              ? currentFriend?.avatar?.url
              : noAvatar
          }
          alt=""
        />
        <p
          className="messageText"
          onClick={() => setDeleteMessage(!deleteMessage)}
        >
          {message.text}
        </p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
      {own ? (
        <Dialog
          open={deleteMessage}
          onClose={() => setDeleteMessage(!deleteMessage)}
        >
          <div className="DialogBoxDelete">
            <Button
              variant="contained"
              onClick={() => deleteHandle(message._id)}
            >
              Delete message
            </Button>
            {/* <Typography
              variant="h6"
              onClick={() => deleteHandle(message._id)}
            >
              Delete message
            </Typography> */}
          </div>
        </Dialog>
      ) : null}
    </div>
  )
}

export default Message
