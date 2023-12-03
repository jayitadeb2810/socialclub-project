import axios from "axios"
import { useEffect, useState } from "react"
import noAvatar from "../assets/noAvatar.webp"

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState({})
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const friendId = conversation.members.find(
      (m) => m !== currentUser._id
    )

    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:5000/api/J3/user?userId=" + friendId,
          {
            withCredentials: true,
          }
        )
        console.log(res)
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [currentUser, conversation])

  console.log(user?.name)

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.avatar ? user?.avatar.url : noAvatar}
        alt="useravatar"
      />
      <span className="conversationName">{user?.name}</span>
    </div>
  )
}
