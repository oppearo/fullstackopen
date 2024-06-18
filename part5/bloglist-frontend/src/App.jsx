import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageIsError, setMessageIsError] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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
      setMessageIsError(true)
      setMessage(`${e.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 8000)
    }
  }

  const addBlog = (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService
        .create(blogObject)
        .then((returnedBlog) => setBlogs(blogs.concat(returnedBlog)))
        .then(setMessageIsError(false))
        .then(
          setMessage(
            `a new blog ${blogObject.title} by ${blogObject.author} was added`,
          ),
        )
        .then(
          setTimeout(() => {
            setMessage(null)
          }, 8000),
        )
    } catch (e) {
      setMessageIsError(true)
      setMessage(`${e.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
        setMessageIsError(null)
      }, 8000)
    }
  }

  const addLike = (blogObject) => {
    try {
      blogObject.likes = blogObject.likes + 1
      console.log(`likes of ${blogObject.title} are now ${blogObject.likes}`)
      blogService
        .update(blogObject)
        .then(setMessageIsError(false))
        .then(
          setMessage(
            `You liked ${blogObject.title}, it has now ${blogObject.likes} likes`,
          ),
        )
        .then(
          setTimeout(() => {
            setMessage(null)
          }, 8000),
        )
    } catch (e) {
      setMessageIsError(true)
      setMessage(`${e.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
        setMessageIsError(null)
      }, 8000)
    }
  }

  const removeBlog = (id, title) => {
    try {
      console.log(`removing blog ${id}`)
      blogService
        .remove(id)
        .then(setMessageIsError(false))
        .then(
          setMessage(
            `${title} was removed`,
          ),
        )
        .then(
          setTimeout(() => {
            setMessage(null)
          }, 8000),
        )
        .then(setBlogs(blogs.filter((b) => b.id !== id)))
    } catch (e) {
      setMessageIsError(true)
      setMessage(`${e.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
        setMessageIsError(null)
      }, 8000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} isError={messageIsError} />
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
      <Notification message={message} isError={messageIsError} />
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
      {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
      ))}
    </div>
  )
}

export default App
