import { Button, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { resetPassword } from "../services/actions/Post.jsx"
import { useNavigate } from "react-router-dom"

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const { error, loading, message } = useSelector(
    (state) => state.like
  )

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(resetPassword(params.token, newPassword))
  }

  useEffect(() => {
    if (error) {
      alert(error)
      dispatch({ type: "clearErrors" })
    }
    if (message) {
      // console.log("Hello")
      alert(message)
      dispatch({ type: "clearMessage" })
      navigate("/")
    }
  }, [error, dispatch, message])

  return (
    <div className="resetPassword">
      <div className="formcontainer">
        <div className="titlebox">
          <div className="titletext">Reset Password</div>
        </div>
        <form className="resetPasswordForm" onSubmit={submitHandler}>
          <input
            type="password"
            placeholder="New Password"
            required
            className="updatePasswordInputs"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Link to="/">
            <Typography style={{ fontSize: "3vh" }}>Login</Typography>
          </Link>
          <Typography>Or</Typography>

          <Link to="/forgot/password">
            <Typography style={{ fontSize: "3vh" }}>
              Request Another Token
            </Typography>
          </Link>

          <Button
            sx={{ margin: "2vmax", backgroundColor: "green" }}
            variant="contained"
            disabled={loading}
            type="submit"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
