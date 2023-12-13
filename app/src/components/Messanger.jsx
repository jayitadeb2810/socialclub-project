import Conversation from "./Conversation"
import Message from "./Message"
import ChatOnline from "./ChatOnline"
import { useContext, useEffect, useRef, useState } from "react"
import axiosConfig from "../config/axiosConfig.jsx"
import { io } from "socket.io-client"
import { useSelector } from "react-redux"
import { Typography } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"

const Messenger = () => {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [currentFriend, setCurrentFriend] = useState([])
  const socket = useRef()
  const { user, loading: userLoading } = useSelector(
    (state) => state.user
  )
  console.log(user)

  const scrollRef = useRef()

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_BASE_URL)
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit("addUser", user._id)
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.following.filter((f) =>
          users.some((u) => u.userId === f)
        )
      )
    })
  }, [user])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axiosConfig.get(
          "/api/conversations/" + user._id,
          { withCredentials: true }
          // {
          //   headers: {
          //     Authorization: sessionStorage.getItem("token"),
          //     "Content-Type": "application/json",
          //   },
          // }
        )
        setConversations(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getConversations()
  }, [user._id])

  console.log(conversations)

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosConfig.get(
          "/api/messages/" + currentChat?._id,
          { withCredentials: true }
          // {
          //   headers: {
          //     Authorization: sessionStorage.getItem("token"),
          //     "Content-Type": "application/json",
          //   },
          // }
        )
        setMessages(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMessages()
  }, [currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    }

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    )

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    })

    try {
      const res = await axiosConfig.post(
        "/api/messages",
        {
          message,
        },
        // {
        //   headers: {
        //     Authorization: sessionStorage.getItem("token"),
        //     "Content-Type": "application/json",
        //   },
        // }
        { withCredentials: true }
      )
      setMessages([...messages, res.data])
      setNewMessage("")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  console.log(currentChat)

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <Typography
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "grey",
              }}
            >
              Conversation Menu
            </Typography>
            {conversations.length !== 0 ? (
              <>
                {conversations.map((c, index) => (
                  <div key={index} onClick={() => setCurrentChat(c)}>
                    <Conversation
                      conversation={c}
                      currentUser={user}
                    />
                  </div>
                ))}
              </>
            ) : (
              <div
                style={{
                  position: "absolute",
                  top: "20%",
                  color: "gray",
                }}
              >
                'no conversation yet'
              </div>
            )}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, index) => (
                    <div key={index} ref={scrollRef}>
                      <Message
                        message={m}
                        own={m.sender === user._id}
                        user={user}
                        currentChat={currentChat}
                        setMessages={setMessages}
                        currentFriend={currentFriend}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={handleSubmit}
                  >
                    <SendIcon />
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a Conversation to start a Chat...
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <Typography
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "grey",
              }}
            >
              All Friends
            </Typography>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
              setcurrentFriend={setCurrentFriend}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger
