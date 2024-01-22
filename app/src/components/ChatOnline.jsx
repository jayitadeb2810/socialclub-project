import { useEffect, useState } from "react"
import noAvatar from "../assets/noAvatar.webp"
import axiosConfig from "../config/axiosConfig.jsx"
import { Dialog } from "@mui/material"

const ChatOnline = ({
  currentId,
  setCurrentChat,
  setcurrentFriend,
  onlineUsers,
}) => {
  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER

  console.log(onlineUsers)

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axiosConfig.get(
          "/api/J3/friends/" + currentId,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          },
          {
            withCredentials: true,
          }
        )
        // console.log(res.data)
        setFriends(res.data)
      } catch (error) {
        // console.log(error)
      }
    }

    getFriends()
  }, [currentId])

  useEffect(() => {
    setOnlineFriends(
      // friends.filter((f) => (o) => o._id.toString() === f._id.toString())
      friends.filter((f) => onlineUsers.some((o) => o._id === f._id))
    )
  }, [friends, onlineUsers])

  const handleClick = async (user) => {
    try {
      const res = await axiosConfig.get(
        `/api/conversations/find/${currentId}/${user._id}`,

        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      )
      // console.log(res)

      if (res.data.success === false) {
        try {
          await axiosConfig.post(
            `/api/conversations`,

            {
              senderId: currentId,
              receiverId: user._id,
            },

            {
              headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
            },
            { withCredentials: true }
          )
          return
        } catch (error) {
          // console.log(error)
        }
      }

      setCurrentChat(res.data)
    } catch (err) {
      // console.log(err)
    }

    try {
      const res = await axiosConfig.get(
        `/api/J3/user/${user._id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      )
      // console.log(res.data.user)
      setcurrentFriend(res.data.user)
    } catch (err) {
      // console.log(err)
    }
  }

  return (
    <div className="chatOnline">
      {onlineFriends.map((f, index) => (
        <div
          key={index}
          className="chatOnlineFriend"
          onClick={() => handleClick(f)}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={f?.avatar?.url ? f.avatar?.url : noAvatar}
              alt="userpicture"
            />
            <div className="chatOnlineBadge"></div>
            {/* {onlineUsers.some(
              (o) => o._id.toString() === f._id.toString()
            ) ? (
              <div className="chatOnlineBadge"></div>
            ) : null} */}
          </div>
          <span className="chatOnlineName">{f?.name}</span>
        </div>
      ))}
    </div>
  )
}

export default ChatOnline
