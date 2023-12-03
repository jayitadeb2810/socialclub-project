import axios from "axios"
import { useEffect, useState } from "react"
import noAvatar from "../assets/noAvatar.webp"

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/J3/friends/" + currentId,
        {
          withCredentials: true,
        }
      )
      console.log(res.data)
      setFriends(res.data)
    }

    getFriends()
  }, [currentId])
  console.log(onlineUsers)

  useEffect(() => {
    setOnlineFriends(
      friends.filter((f) => onlineUsers.includes(f._id))
    )
  }, [friends, onlineUsers])

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/conversations/find/${currentId}/${user._id}`,
        { withCredentials: true }
      )
      console.log(res)
      setCurrentChat(res.data)
    } catch (err) {
      console.log(err)
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
              src={o?.avatar ? o.avatar.url : noAvatar}
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
