import { ErrorOutline, Home } from "@mui/icons-material"
import { Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="notFound">
      <div className="notFoundContainer">
        <ErrorOutline />
        <Typography variant="h2" style={{ padding: "2vmax" }}>
          Page Not Found
        </Typography>

        <Link to="/">
          <Typography variant="h5">Go to</Typography>
          <Home sx={{ height: "2.5vmax", width: "2.5vmax" }} />
        </Link>
      </div>
    </div>
  )
}

export default NotFound
