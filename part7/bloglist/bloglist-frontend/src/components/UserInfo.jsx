import { React } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { initUserlist } from '../reducers/userlistReducer'

const UserInfo = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userlist)
  if (users.length === 0) {
    dispatch(initUserlist())
  }
  const match = useMatch('/users/:id')
  const matchedUser = match
    ? users.find((user) => user.id === match.params.id)
    : null

  if (!matchedUser) {
    return null
  }

  return (
    <div>
      <h2>{matchedUser.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {matchedUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserInfo
