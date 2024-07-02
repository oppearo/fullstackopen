import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const showNotification = (message) => {
  return (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer