import { Button, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewPost } from "../services/actions/Post.jsx"
import { loadUser } from "../services/actions/User.jsx"
import { useNavigate } from "react-router-dom"
const NewPost = () => {
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")

  const { loading, error, message } = useSelector(
    (state) => state.like
  )
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    const Reader = new FileReader()
    Reader.readAsDataURL(file)

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result)
      }
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    await dispatch(createNewPost(caption, image, city, country))
    dispatch(loadUser())
  }

  useEffect(() => {
    if (error) {
      alert(error)
      dispatch({ type: "clearErrors" })
    }

    if (message) {
      alert(message)
      dispatch({ type: "clearMessage" })
      navigate("/account")
    }
  }, [dispatch, error, message])

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h4">Add New Post</Typography>

        {image && <img src={image} alt="post" />}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button
          sx={{ margin: "2vmax", backgroundColor: "green" }}
          variant="contained"
          disabled={loading}
          type="submit"
        >
          Post
        </Button>
      </form>
    </div>
  )
}

export default NewPost
