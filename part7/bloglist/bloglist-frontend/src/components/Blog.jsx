/* eslint-disable react/prop-types */
import { React } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleRemove, likeBlog } from '../reducers/blogReducer'
import {
  showSuccessMessage,
  showErrorMessage,
} from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.login)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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
        ) // hate this +1 workaround
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
        navigate('/')
      }
    } catch (e) {
      dispatch(showErrorMessage(`${e.response.data.error}`))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div style={blogStyle} className="blog">
      <h2>
        {blog.title} by &lsquo;{blog.author}&lsquo;
      </h2>
      <div>
        <a href={`${blog.url}`}>{blog.url}</a>
        <p>
          {' '}
          {blog.likes} <button onClick={addLike}>like this post</button>{' '}
        </p>
        added by {blog.user.name}
        {checkCorrectUser()}
      </div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
