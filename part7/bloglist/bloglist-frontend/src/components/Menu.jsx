import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import { Button, AppBar, Toolbar, IconButton, Typography } from '@mui/material'

const Menu = ({ user }) => {
  const dispatch = useDispatch()

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" />
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Typography>
          <i>{user}</i> logged in
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          sx={{ m: 1 }}
          onClick={() => {
            dispatch(setUser(null))
            window.localStorage.removeItem('loggedBlogApiUser')
            window.location.reload()
          }}
        >
          logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

Menu.propTypes = {
  user: PropTypes.string.isRequired,
}

export default Menu
