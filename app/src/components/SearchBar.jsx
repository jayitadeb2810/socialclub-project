import { Button, Dialog, Typography } from "@mui/material"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsersByName } from "../services/actions/User.jsx"
import User from "./User.jsx"
import { Search } from "@mui/icons-material"

const SearchBar = () => {
  const [name, setName] = useState("")
  const [searchNameToggle, setSearchNameToggle] = useState(false)

  const { users, loading } = useSelector((state) => state.UsersByName)
  // console.log(users)
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(getUsersByName(name))
    setName("")
  }

  return (
    <form className="searchbar" onSubmit={submitHandler}>
      <input
        placeholder="Search for friends"
        className="searchInput"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        className="searchIcon"
        onClick={() => setSearchNameToggle(!searchNameToggle)}
      >
        <Search />
      </button>
      <Dialog
        open={searchNameToggle}
        onClose={() => setSearchNameToggle(!searchNameToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Users</Typography>

          {users && users.length > 0 ? (
            users.map((item) => (
              <User
                key={item._id}
                userId={item._id}
                name={item.name}
                avatar={item?.avatar?.url}
              />
            ))
          ) : (
            <Typography style={{ margin: "2vmax" }}>
              'No Result found'
            </Typography>
          )}
        </div>
      </Dialog>
    </form>
  )
}

export default SearchBar
