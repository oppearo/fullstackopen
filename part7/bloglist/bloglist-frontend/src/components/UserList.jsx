import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUserlist } from '../reducers/userlistReducer'
import { Link, Routes, Route } from 'react-router-dom'
import UserInfo from './UserInfo.Jsx'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userlist)

  useEffect(() => {
    dispatch(initUserlist())
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td key={user.name}>
                <Link to={user.id}>{user.name}</Link>
              </td>
              <td key={user.blogs.length}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Routes>
        <Route path=":id" element={<UserInfo />} />
      </Routes>
    </div>
  )
}

export default UserList
