import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMessage, showSuccessMessage } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBlogApiUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login attempted with ', username, password)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogApiUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      dispatch(showErrorMessage(`${e.response.data.error}`))
    }
  }

  const addBlog = (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject)).then(
        dispatch(
          showSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} was added`)
        )
      )
    } catch (e) {
      dispatch(showErrorMessage(`${e.response.data.error}`))
    }
  }

  const addLike = (blogObject) => {
    try {
      blogObject.likes = blogObject.likes + 1
      console.log(`likes of ${blogObject.title} are now ${blogObject.likes}`)
      blogService
        .update(blogObject)
        .then(
          dispatch(
            showSuccessMessage(
              `You liked ${blogObject.title}, it has now ${blogObject.likes} likes`
            )
          )
        )
    } catch (e) {
      dispatch(showErrorMessage(`${e.response.data.error}`))
    }
  }

  const removeBlog = (id, title) => {
    try {
      console.log(`removing blog ${id}`)
      blogService
        .remove(id)
        .then(dispatch(showSuccessMessage(`${title} was removed`)))
        .then(setBlogs(blogs.filter((b) => b.id !== id)))
    } catch (e) {
      dispatch(showErrorMessage(`${e.response.data.error}`))
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {`${user.name} logged in`}
        <button
          type="submit"
          onClick={() => {
            window.localStorage.removeItem('loggedBlogApiUser')
            window.location.reload()
          }}
        >
          logout
        </button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            removeBlog={removeBlog}
            activeUser={user.username}
          />
        ))
        .sort((a, b) => b.likes - a.likes)}
    </div>
  )
}

export default App
