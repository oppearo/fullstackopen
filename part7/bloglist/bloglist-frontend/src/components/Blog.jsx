import { React, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { handleRemove, likeBlog } from '../reducers/blogReducer'
import {
  showSuccessMessage,
  showErrorMessage,
} from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const checkCorrectUser = () => {
    if (user.username === blog.user.username) {
      return <button onClick={deleteBlog}>remove blog</button>
    }

    return <p></p>
  }

  const addLike = (event) => {
    event.preventDefault()
    try {
      dispatch(likeBlog(blog.id))
      dispatch(
        showSuccessMessage(
          `You liked ${blog.title}, it has now ${blog.likes + 1} likes`
        ) // hate this +1 stuff
      )
    } catch (e) {
      dispatch(showErrorMessage(`${e.response.data.error}`))
    }
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        dispatch(handleRemove(blog.id))
        dispatch(showSuccessMessage(`${blog.title} was removed`))
      }
    } catch (e) {
      dispatch(showErrorMessage(`${e.response.data.error}`))
    }
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} style={hideWhenVisible}>
        view
      </button>
      <button onClick={toggleVisibility} style={showWhenVisible}>
        hide
      </button>
      <div style={showWhenVisible}>
        {blog.url}
        <p>
          {' '}
          {blog.likes} <button onClick={addLike}>like this post</button>{' '}
        </p>
        {blog.user.name}
        {checkCorrectUser()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
