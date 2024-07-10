import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer'

const Menu = ({ user }) => {
  const dispatch = useDispatch()
  const padding = {
    paddingRight: 5,
  }

  return (
    <div style={{ background: 'lightgray' }}>
      <Link style={padding} to={'/'}>
        blogs
      </Link>
      <Link style={padding} to={'/users'}>
        users
      </Link>
      <i>{user}</i> logged in
      <button
        type="submit"
        onClick={() => {
          dispatch(setUser(null))
          window.localStorage.removeItem('loggedBlogApiUser')
          window.location.reload()
        }}
      >
        logout
      </button>
    </div>
  )
}

Menu.propTypes = {
  user: PropTypes.string.isRequired,
}

export default Menu
