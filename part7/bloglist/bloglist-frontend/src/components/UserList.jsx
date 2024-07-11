import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUserlist } from '../reducers/userlistReducer'
import { Link, Routes, Route } from 'react-router-dom'
import UserInfo from './UserInfo.Jsx'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userlist)

  useEffect(() => {
    dispatch(initUserlist())
  }, [])

  const MaterialUiTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>username</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={user.id}>{user.name}</Link>
                </TableCell>
                <TableCell numeric="true">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const HtmlTable = () => {
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
      </div>
    )
  }

  return (
    <div>
      <MaterialUiTable />
      <Routes>
        <Route path=":id" element={<UserInfo />} />
      </Routes>
    </div>
  )
}

export default UserList
