import { useEffect, useState } from "react"
import noAvatar from "../assets/noAvatar.webp"
import axiosConfig from "../config/axiosConfig.jsx"
import { Dialog } from "@mui/material"

const ChatOnline = ({
  currentId,
  setCurrentChat,
  setcurrentFriend,
}) => {
  const [friends, setFriends] = useState([])
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axiosConfig.get(
          "/api/J3/friends/" + currentId,
          // {
          //   headers: {
          //     Authorization: sessionStorage.getItem("token"),
          //     "Content-Type": "application/json",
          //   },
          // }
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

  // console.log(friends)

  // useEffect(() => {
  //   setOnlineFriends(
  //     friends.filter((f) => onlineUsers.includes(f._id))
  //   )
  // }, [friends, onlineUsers])

  const handleClick = async (user) => {
    try {
      const res = await axiosConfig.get(
        `/api/conversations/find/${currentId}/${user._id}`,

        { withCredentials: true }
        // {
        //   headers: {
        //     Authorization: sessionStorage.getItem("token"),
        //     "Content-Type": "application/json",
        //   },
        // }
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

            { withCredentials: true }
            // {
            //   headers: {
            //     Authorization: sessionStorage.getItem("token"),
            //     "Content-Type": "application/json",
            //   },
            // }
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
        { withCredentials: true }
        // {
        //   headers: {
        //     Authorization: sessionStorage.getItem("token"),
        //     "Content-Type": "application/json",
        //   },
        // }
      )
      // console.log(res.data.user)
      setcurrentFriend(res.data.user)
    } catch (err) {
      // console.log(err)
    }
  }

  return (
    <div className="chatOnline">
      {friends.map((o, index) => (
        <div
          key={index}
          className="chatOnlineFriend"
          onClick={() => handleClick(o)}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={o?.avatar?.url ? o.avatar?.url : noAvatar}
              alt="userpicture"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.name}</span>
        </div>
      ))}
    </div>
  )
}

export default ChatOnline
