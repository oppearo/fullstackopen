import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { initializeBlogs, createBlog } from '../reducers/blogReducer'
import {
  showSuccessMessage,
  showErrorMessage,
} from '../reducers/notificationReducer'
import { Typography } from '@mui/material'

const BlogsList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const addBlog = (blogObject) => {
    try {
      dispatch(createBlog(blogObject)).then(
        dispatch(
          showSuccessMessage(
            `a new blog ${blogObject.title} by ${blogObject.author} was added`
          )
        )
      )
    } catch (e) {
      dispatch(showErrorMessage(`${e}`))
    }
  }

  if (!blogs) {
    return null
  }

  return (
    <div>
      <Togglable buttonLabel="add a new blog">
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <p key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            <Typography component={'span'}>
              {blog.title}, {blog.author}
            </Typography>
          </Link>
        </p>
      ))}
    </div>
  )
}

export default BlogsList
