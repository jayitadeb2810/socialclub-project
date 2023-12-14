import axiosConfig from "../../config/axiosConfig.jsx"

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    })

    const { data } = await axiosConfig.get(
      `/api/J3/post/${id}`,
      { withCredentials: true }
      // {
      //   headers: {
      //     Authorization: sessionStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // }
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

    const { data } = await axiosConfig.put(
      `/api/J3/post/comment/${id}`,
      {
        comment,
      },
      { withCredentials: true }
      // {
      //   headers: {
      //     Authorization: sessionStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // }
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

      const { data } = await axiosConfig.delete(
        `/api/J3/post/comment/${id}`,
        {
          // headers: {
          //   Authorization: sessionStorage.getItem("token"),
          //   "Content-Type": "application/json",
          // },
          data: {
            commentId,
          },
          withCredentials: true,
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
      // console.log(city)
      const { data } = await axiosConfig.post(
        `/api/J3/post/upload`,
        {
          caption,
          image,
          city,
          country,
        },
        { withCredentials: true }
        // {
        //   headers: {
        //     Authorization: sessionStorage.getItem("token"),
        //     "Content-Type": "application/json",
        //   },
        // }
      )
      console.log("jayit", data)
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

    const { data } = await axiosConfig.put(
      `/api/J3/post/${id}`,
      {
        caption,
      },
      { withCredentials: true }
      // {
      //   headers: {
      //     Authorization: sessionStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // }
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

    const { data } = await axiosConfig.delete(
      `/api/J3/post/${id}`,
      { withCredentials: true }
      // {
      //   headers: {
      //     Authorization: sessionStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // }
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

    const { data } = await axiosConfig.post(
      "/api/J3/forgot/password",
      {
        email,
      },
      { withCredentials: true }

      // {
      //   headers: {
      //     Authorization: sessionStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // }
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

      const { data } = await axiosConfig.put(
        `/api/J3/password/reset/${token}`,
        {
          password,
        },
        // {
        //   headers: {
        //     Authorization: sessionStorage.getItem("token"),
        //     "Content-Type": "application/json",
        //   },
        // }
        { withCredentials: true }
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
