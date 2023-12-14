import React, { useEffect, useState } from "react"
import { Typography, Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../services/actions/User.jsx"

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const { error } = useSelector((state) => state.user)
  const { message } = useSelector((state) => state.like)

  const loginHandler = (e) => {
    e.preventDefault()
    // console.log("login")
    dispatch(loginUser(email, password))
  }

  useEffect(() => {
    if (error) {
      alert(error)
      dispatch({ type: "clearErrors" })
    }
    if (message) {
      alert(message)
      dispatch({ type: "clearMessage" })
      navigate("/")
    }
  }, [error, dispatch, message])

  return (
    <div className="login">
      <div className="loginFormContainer">
        <div className="titlebox">
          <div className="title">Login</div>
        </div>
        <form className="loginForm" onSubmit={loginHandler}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="/forgot/password" className="link">
            Forgot Password?
          </Link>
          <button className="loginbutton">Login</button>
          <hr />
          <div className="signup_link">
            Not a member?
            <Link to="/register" className="link">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
