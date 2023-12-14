import { Avatar, Typography, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, updateProfile } from "../services/actions/User.jsx"
import Loader from "./Loader.jsx"
import { useNavigate } from "react-router-dom"

const UpdateProfile = () => {
  const navigate = useNavigate()
  const { loading, error, user } = useSelector((state) => state.user)
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like)

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [avatar, setAvatar] = useState("")
  const [bio, setBio] = useState(user.bio)
  const [avatarPrev, setAvatarPrev] = useState(user?.avatar?.url)

  const dispatch = useDispatch()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    // console.log(e)
    const Reader = new FileReader()
    Reader.readAsDataURL(file)

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        // console.log(Reader.result)
        setAvatarPrev(Reader.result)

        setAvatar(Reader.result)
      }
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    await dispatch(updateProfile(name, email, avatar, bio))
    dispatch(loadUser())
  }
  // console.log("Change Profile")
  useEffect(() => {
    if (error) {
      alert(error)
      dispatch({ type: "clearErrors" })
    }

    if (updateError) {
      alert(updateError)
      dispatch({ type: "clearErrors" })
    }

    if (message) {
      alert(message)
      dispatch({ type: "clearMessage" })
      navigate("/account")
    }
  }, [dispatch, error, updateError, message])
  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h4" style={{ padding: "2vmax" }}>
          Update Profile
        </Typography>

        <Avatar
          src={avatarPrev}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <textarea
          className="updateProfileBio"
          placeholder="Write about you "
          cols="95"
          rows="7"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="updateProfileInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="updateProfileInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          sx={{ margin: "2vmax", backgroundColor: "green" }}
          variant="contained"
          disabled={updateLoading}
          type="submit"
        >
          Update
        </Button>
      </form>
    </div>
  )
}

export default UpdateProfile
