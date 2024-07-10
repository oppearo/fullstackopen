import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUserlist } from '../reducers/userlistReducer'

const Users = () => {
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
              <td key={user.name}>{user.name}</td>
              <td key={user.blogs.length}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
