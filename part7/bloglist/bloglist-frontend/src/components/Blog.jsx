/* eslint-disable react/prop-types */
import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commentBlog, handleRemove, likeBlog } from '../reducers/blogReducer'
import {
  showSuccessMessage,
  showErrorMessage,
} from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ThumbUp } from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send'

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
  const [comment, setComment] = useState('')

  const checkCorrectUser = () => {
    if (user.username === blog.user.username) {
      return (
        <Button
          onClick={deleteBlog}
          startIcon={<DeleteIcon />}
          variant="contained"
          sx={{ m: 1 }}
        >
          remove blog
        </Button>
      )
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

  const addComment = (event) => {
    event.preventDefault()
    const submittedObject = { id: blog.id, comment: comment }
    dispatch(commentBlog(submittedObject))
    dispatch(
      showSuccessMessage(
        `added comment '${comment}' to ${blog.title} successfully`
      )
    )
    setComment('')
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
          {blog.likes}
          {blog.likes === 1 ? ' like' : ' likes'}{' '}
          <Button onClick={addLike} variant="contained" startIcon={<ThumbUp />}>
            like
          </Button>{' '}
        </p>
        added by {blog.user.name}
        {checkCorrectUser()}
      </div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <TextField
          type="text"
          name="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ m: 1 }}
          startIcon={<SendIcon />}
        >
          add comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
