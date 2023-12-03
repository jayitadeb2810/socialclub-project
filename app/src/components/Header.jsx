import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import SearchBar from "./SearchBar"
import SCLogo from "../assets/SC_logo.avif"
import { Home, Add, Chat } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { Avatar } from "@mui/material"

const Header = () => {
  const { user, loading: userLoading } = useSelector(
    (state) => state.user
  )

  return (
    <div className="header">
      <div className="logo">
        <img src={SCLogo} alt="" />
      </div>

      <SearchBar />

      <div className="navbar">
        <NavLink exact="true" activeclassname="active" to="/">
          <Home />
        </NavLink>

        <NavLink activeclassname="active" to="/newpost">
          <Add />
        </NavLink>

        <NavLink activeclassname="active" to="/messenger">
          <Chat />
        </NavLink>

        <NavLink activeclassname="active" to="/account">
          <Avatar
            className="avatar_image"
            src={user?.avatar?.url}
            sx={{
              height: "2vmax",
              width: "2vmax",
              borderRadius: "50%",
            }}
          />
        </NavLink>
      </div>
    </div>
  )
}

export default Header
