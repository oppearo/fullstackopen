import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
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

  const likeBlog = (event) => {
    event.preventDefault()
    addLike(blog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id, blog.title)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} style={hideWhenVisible}>view</button>
      <button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
      <div style={showWhenVisible}>
        {blog.url}
        <p>
          {' '}
          {blog.likes} <button onClick={likeBlog}>like this post</button>{' '}
        </p>
        {blog.user.name}
        {checkCorrectUser()}
      </div>
    </div>
  )
}

export default Blog
