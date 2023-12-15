import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Typography, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {
  loadUser,
  updatePassword,
} from "../services/actions/User.jsx"

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const dispatch = useDispatch()

  const { error, loading, message } = useSelector(
    (state) => state.like
  )

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updatePassword(oldPassword, newPassword))
    sessionStorage.removeItem("token")
  }

  useEffect(() => {
    if (error) {
      alert(error)
      dispatch({ type: "clearErrors" })
    }

    if (message) {
      alert(message)
      dispatch({ type: "clearMessage" })
      dispatch(loadUser())
    }
  }, [dispatch, error, message])

  return (
    <div className="updatePassword">
      <div className="formcontainer">
        <div className="titlebox">
          <div className="titletext">Change Password</div>
        </div>
        <form className="updatePasswordForm" onSubmit={submitHandler}>
          <input
            type="password"
            placeholder="Old Password"
            required
            value={oldPassword}
            className="updatePasswordInputs"
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            required
            className="updatePasswordInputs"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button
            sx={{ margin: "2vmax", backgroundColor: "green" }}
            variant="contained"
            disabled={loading}
            type="submit"
          >
            Change Password
          </Button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword
