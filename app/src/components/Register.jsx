import { Avatar, Typography, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { registerUser } from "../services/actions/User.jsx"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.user)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(registerUser(name, email, password))
  }

  useEffect(() => {
    if (error) {
      alert(error)
      dispatch({ type: "clearErrors" })
    }
  }, [dispatch, error])
  return (
    <div className="register">
      <div className="formcontainer">
        <div className="titlebox">
          <div className="titletext">Create an account</div>
        </div>
        <form className="registerForm" onSubmit={submitHandler}>
          <input
            type="text"
            value={name}
            placeholder="Name"
            className="registerInputs"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="registerInputs"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="registerInputs"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            type="submit"
            className="registerbutton"
          >
            Create account
          </button>
          <div className="login_text">
            Already have an account?
            <Link className="login_link" to="/">
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
