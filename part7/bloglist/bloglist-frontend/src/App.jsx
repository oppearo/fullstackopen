import { React, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import {
  showErrorMessage,
  showSuccessMessage,
} from './reducers/notificationReducer'
import { initUser, setUser } from './reducers/loginReducer'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import UserInfo from './components/UserInfo.Jsx'
import Menu from './components/Menu'
import BlogsList from './components/BlogsList'
import { Container, Typography } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)
  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

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

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <Container>
      <div>
        <Menu user={user.name} />
        <Notification />
        <Typography variant="h3" component={'span'}>
          <h2>blog app</h2>
        </Typography>
        <Routes>
          <Route path="/" element={<BlogsList />} />
          <Route path="/users/*" element={<UserList />} />
          <Route path="/users/:id" element={<UserInfo />} />
          <Route path="/blogs/:id" element={<Blog blog={matchedBlog} />} />
        </Routes>
      </div>
    </Container>
  )
}

export default App
