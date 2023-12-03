import { configureStore } from "@reduxjs/toolkit"
import {
  allUsersReducer,
  UsersByNameReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
} from "./reducers/User.jsx"
import {
  likeReducer,
  myPostsReducer,
  userPostsReducer,
} from "./reducers/Post.jsx"

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    UsersByName: UsersByNameReducer,
    like: likeReducer,
    myPosts: myPostsReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
  },
})

export default store
