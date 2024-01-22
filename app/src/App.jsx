import { HashRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Login from "./components/Login"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { loadUser } from "./services/actions/User.jsx"
import Home from "./components/Home"
import Account from "./components/Account.jsx"
import NewPost from "./components/NewPost.jsx"
import Register from "./components/Register.jsx"
import UpdateProfile from "./components/UpdateProfile.jsx"
import UpdatePassword from "./components/UpdatePassword.jsx"
import ForgotPassword from "./components/ForgotPassword.jsx"
import ResetPassword from "./components/ResetPassword.jsx"
import UserProfile from "./components/UserProfile.jsx"
import Search from "./components/Search.jsx"
import NotFound from "./components/NotFound.jsx"
import Loader from "./components/Loader.jsx"
import Messanger from "./components/Messanger.jsx"
import "./styles/App.css"

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.user)

  // console.log(isAuthenticated)
  // console.log(localStorage.getItem("token"))

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <Router>
      {isAuthenticated && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated === undefined ? (
              <Loader />
            ) : isAuthenticated ? (
              <Home />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />

        <Route
          path="/register"
          element={isAuthenticated ? <Account /> : <Register />}
        />

        <Route
          path="/newpost"
          element={isAuthenticated ? <NewPost /> : <Login />}
        />

        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />
        <Route
          path="/update/password"
          element={isAuthenticated ? <UpdatePassword /> : <Login />}
        />

        <Route
          path="/messenger"
          element={isAuthenticated ? <Messanger /> : <Login />}
        />

        <Route
          path="/forgot/password"
          element={
            isAuthenticated ? <UpdatePassword /> : <ForgotPassword />
          }
        />

        <Route
          path="/password/reset/:token"
          element={
            isAuthenticated ? <UpdatePassword /> : <ResetPassword />
          }
        />

        <Route
          path="/user/:id"
          element={isAuthenticated ? <UserProfile /> : <Login />}
        />

        <Route path="search" element={<Search />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
