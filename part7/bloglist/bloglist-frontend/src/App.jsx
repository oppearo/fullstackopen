import { React, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import {
  showErrorMessage,
  showSuccessMessage,
} from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { initUser, setUser } from './reducers/loginReducer'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import UserInfo from './components/UserInfo.Jsx'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  const handleLogin = async (username, password) => {
    console.log('login attempted with ', username, password)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogApiUser', JSON.stringify(user))
      dispatch(setUser(JSON.stringify(user)))
      dispatch(showSuccessMessage(`${user.name} logged in successfully!`))
      dispatch(initUser()) // ugly hack to set user right away correctly
      navigate('/')
    } catch (e) {
      dispatch(showErrorMessage(`${e.response.data.error}`))
    }
  }

  const addBlog = (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject)).then(
        dispatch(
          showSuccessMessage(
            `a new blog ${blogObject.title} by ${blogObject.author} was added`
          )
        )
      )
    } catch (e) {
      dispatch(showErrorMessage(`${e.response.data.error}`))
    }
  }

  const UserInfoElement = () => {
    return (
      <p>
        {`${user.name} logged in`}
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
      </p>
    )
  }

  const MainPageElement = () => {
    return (
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {blogs.map((blog) => (
          <p key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </p>
        ))}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <UserInfoElement />
      <Routes>
        <Route path="/" element={<MainPageElement />} />
        <Route path="/users/*" element={<UserList />} />
        <Route path="/users/:id" element={<UserInfo />} />
        <Route path="/blogs/:id" element={<Blog blog={matchedBlog} />} />
      </Routes>
    </div>
  )
}

export default App
