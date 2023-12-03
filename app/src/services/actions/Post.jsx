import axios from "axios"

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    })

    const { data } = await axios.get(
      `http://localhost:5000/api/J3/post/${id}`,
      { withCredentials: true }
    )
    dispatch({
      type: "likeSuccess",
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    })
  }
}

export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    })

    const { data } = await axios.put(
      `http://localhost:5000/api/J3/post/comment/${id}`,
      {
        comment,
      },
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    })
  }
}

export const deleteCommentOnPost =
  (id, commentId) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteCommentRequest",
      })

      const { data } = await axios.post(
        `http://localhost:5000/api/J3/post/comment/${id}`,
        {
          commentId,
        },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      dispatch({
        type: "deleteCommentSuccess",
        payload: data.message,
      })
    } catch (error) {
      dispatch({
        type: "deleteCommentFailure",
        payload: error.response.data.message,
      })
    }
  }

export const createNewPost =
  (caption, image, city, country) => async (dispatch) => {
    try {
      dispatch({
        type: "newPostRequest",
      })
      console.log(city)
      const { data } = await axios.post(
        `http://localhost:5000/api/J3/post/upload`,
        {
          caption,
          image,
          city,
          country,
        },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      dispatch({
        type: "newPostSuccess",
        payload: data.message,
      })
    } catch (error) {
      dispatch({
        type: "newPostFailure",
        payload: error.response.data.message,
      })
    }
  }

export const updatePost = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    })

    const { data } = await axios.put(
      `http://localhost:5000/api/J3/post/${id}`,
      {
        caption,
      },
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    })
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    })

    const { data } = await axios.delete(
      `http://localhost:5000/api/J3/post/${id}`,
      { withCredentials: true }
    )
    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    })
  }
}

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    })

    const { data } = await axios.post(
      "http://localhost:5000/api/J3/forgot/password",
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    })
  }
}

export const resetPassword =
  (token, password) => async (dispatch) => {
    try {
      dispatch({
        type: "resetPasswordRequest",
      })

      const { data } = await axios.put(
        `http://localhost:5000/api/J3/password/reset/${token}`,
        {
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      dispatch({
        type: "resetPasswordSuccess",
        payload: data.message,
      })
    } catch (error) {
      dispatch({
        type: "resetPasswordFailure",
        payload: error.response.data.message,
      })
    }
  }
