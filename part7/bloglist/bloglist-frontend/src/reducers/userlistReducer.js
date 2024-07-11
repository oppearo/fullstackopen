import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const userlistSlice = createSlice({
  name: 'userlist',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload.sort((a, b) => b.blogs.length - a.blogs.length)
    },
  },
})

export const { setUsers } = userlistSlice.actions

export const initUserlist = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export default userlistSlice.reducer
