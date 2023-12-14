import axiosConfig from "../../config/axiosConfig.jsx"

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    })

    const { data } = await axiosConfig.post(
      "/api/J3/login",
      { email, password },
      { withCredentials: true }
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    )
    // console.log(data)
    sessionStorage.setItem("token", data?.token)
    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    })
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error?.response?.data?.message,
    })
  }
}

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    })

    const { data } = await axiosConfig.get(
      "/api/J3/mee",
      { withCredentials: true }
      // {
      //   headers: {
      //     Authorization: sessionStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // }
    )
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    })
  } catch (error) {
    // console.log(sessionStorage.getItem("token"))

    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    })
  }
}

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "postOfFollowingRequest",
    })

    const { data } = await axiosConfig.get(
      "/api/J3/posts",

      // {
      //   params: {
      //     token: sessionStorage.getItem("token"),
      //   },
      // },
      { withCredentials: true }
      // {
      //   headers: {
      //     Authorization: sessionStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // }
    )
    dispatch({
      type: "postOfFollowingSuccess",
      payload: data.posts,
    })
  } catch (error) {
    dispatch({
      type: "postOfFollowingFailure",
      payload: error?.response?.data?.message,
    })
  }
}

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "myPostsRequest",
    })

    const { data } = await axiosConfig.get(
      "/api/J3/my/posts",
      { withCredentials: true }
      // {
      //   headers: {
      //     Authorization: sessionStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // }
    )
    dispatch({
      type: "myPostsSuccess",
      payload: data.posts,
    })
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data.message,
    })
  }
}

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "allUsersRequest",
    })

    const { data } = await axiosConfig.get(
      `/api/J3/users`,
      { withCredentials: true }
      // {
      //   headers: {
      //     Authorization: sessionStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // }
    )

    dispatch({
      type: "allUsersSuccess",
      payload: data.users,
    })
  } catch (error) {
    dispatch({
      type: "allUsersFailure",
      payload: error.response.data.message,
    })
  }
}
export const getUsersByName = (name) => async (dispatch) => {
  try {
    dispatch({
      type: "UsersByNameRequest",
    })

    const { data } = await axiosConfig.get(
      `/api/J3/usersbyname?name=${name}`,
      { withCredentials: true }
      // {
      //   headers: {
      //     Authorization: sessionStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // }
    )
    dispatch({
      type: "UsersByNameSuccess",
      payload: data.users,
    })
  } catch (error) {
    dispatch({
      type: "UsersByNameFailure",
      payload: error.response.data.message,
    })
  }
}

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    })

    await axiosConfig.get(
      "/api/J3/logout",
      {
        withCredentials: true,
      }
      // {
      //   headers: {
      //     Authorization: sessionStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // }
    )

    dispatch({
      type: "LogoutUserSuccess",
    })
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    })
  }
}

export const registerUser =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      })

      const { data } = await axiosConfig.post(
        "/api/J3/register",
        { name, email, password },
        { withCredentials: true }
        // {
        //   headers: {
        //     Authorization: sessionStorage.getItem("token"),
        //     "Content-Type": "application/json",
        //   },
        // }
      )
      sessionStorage.setItem("token", data?.token)

      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      })
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      })
    }
  }

export const updateProfile =
  (name, email, avatar, bio) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProfileRequest",
      })

      const { data } = await axiosConfig.put(
        "/api/J3/update/profile",
        { name, email, avatar, bio },
        { withCredentials: true }
        // {
        //   headers: {
        //     Authorization: sessionStorage.getItem("token"),
        //     "Content-Type": "application/json",
        //   },
        // }
      )

      dispatch({
        type: "updateProfileSuccess",
        payload: data.message,
      })
    } catch (error) {
      dispatch({
        type: "updateProfileFailure",
        payload: error.response.data.message,
      })
    }
  }

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      })

      const { data } = await axiosConfig.put(
        "/api/J3/update/password",
        { oldPassword, newPassword },
        { withCredentials: true }
        // {
        //   headers: {
        //     Authorization: sessionStorage.getItem("token"),
        //     "Content-Type": "application/json",
        //   },
        // }
      )

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      })
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      })
    }
  }

// export const deleteMyProfile = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteProfileRequest",
//     })

//     const { data } = await axios.delete(
//       "/api/J3/delete/me"
//     )

//     dispatch({
//       type: "deleteProfileSuccess",
//       payload: data.message,
//     })
//   } catch (error) {
//     dispatch({
//       type: "deleteProfileFailure",
//       payload: error.response.data.message,
//     })
//   }
// }

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userPostsRequest",
    })

    const { data } = await axiosConfig.get(
      `/api/J3/userposts/${id}`,
      { withCredentials: true }
      // {
      //   headers: {
      //     Authorization: sessionStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // }
    )
    dispatch({
      type: "userPostsSuccess",
      payload: data.posts,
    })
  } catch (error) {
    dispatch({
      type: "userPostsFailure",
      payload: error.response.data.message,
    })
  }
}

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    })

    const { data } = await axiosConfig.get(
      `/api/J3/user/${id}`,
      { withCredentials: true }
      // {
      //   headers: {
      //     Authorization: sessionStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // }
    )
    dispatch({
      type: "userProfileSuccess",
      payload: data.user,
    })
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response.data.message,
    })
  }
}

export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followUserRequest",
    })

    const { data } = await axiosConfig.get(
      `/api/J3/follow/${id}`,
      { withCredentials: true }
      // {
      //   headers: {
      //     Authorization: sessionStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // }
    )
    dispatch({
      type: "followUserSuccess",
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response.data.message,
    })
  }
}
