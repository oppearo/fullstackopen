import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = loginSlice.actions

export const initUser = () => {
  const loggedInUserJSON = window.localStorage.getItem('loggedBlogApiUser')
  return async (dispatch) => {
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export default loginSlice.reducer
