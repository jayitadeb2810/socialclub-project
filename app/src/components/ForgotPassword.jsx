import { Button, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { forgotPassword } from "../services/actions/Post.jsx"
const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const dispatch = useDispatch()
  const { error, loading, message } = useSelector(
    (state) => state.like
  )

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
  }

  useEffect(() => {
    if (error) {
      alert(error)
      dispatch({ type: "clearErrors" })
    }
    if (message) {
      alert(message)
      dispatch({ type: "clearMessage" })
    }
  }, [alert, error, dispatch, message])
  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="enter registered email"
          required
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          sx={{ margin: "2vmax", backgroundColor: "green" }}
          variant="contained"
          disabled={loading}
          type="submit"
        >
          Send Token
        </Button>
      </form>
    </div>
  )
}

export default ForgotPassword
