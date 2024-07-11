import { React, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@mui/material'
import { SendIcon } from '@mui/icons-material/Send'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }
    createBlog(blogObject)
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label={'title'}
            margin="normal"
            type="text"
            name="title"
            placeholder="title goes here"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label={'author'}
            margin="normal"
            type="text"
            name="author"
            placeholder="author goes here"
            value={blogAuthor}
            onChange={(e) => setBlogAuthor(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label={'url'}
            margin="normal"
            type="url"
            name="url"
            placeholder="url goes here"
            value={blogUrl}
            onChange={(e) => setBlogUrl(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ mx: 'auto' }}
        >
          submit
        </Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
