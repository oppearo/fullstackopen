import { useState } from 'react'

const Blog = ({ blog, addLike }) => {
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

  const likeBlog = (event) => {
    event.preventDefault()
    addLike(blog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <div style={hideWhenVisible}>
        {' '}
        <button onClick={toggleVisibility}>view more info</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <p>
          {' '}
          {blog.likes} <button onClick={likeBlog}>like this post</button>{' '}
        </p>
        {blog.user.username}
        <button onClick={toggleVisibility}>hide more info</button>
      </div>
    </div>
  )
}

export default Blog
