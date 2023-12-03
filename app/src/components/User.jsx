import { Typography } from "@mui/material"
import React, { useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
const User = ({ userId, name, avatar }) => {
  return (
    <Link to={`/user/${userId}`} className="userInHome">
      <img src={avatar} alt={name} />
      <Typography sx={{ fontWeight: "500" }}>{name}</Typography>
    </Link>
  )
}

export default User
