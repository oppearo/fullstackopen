import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    error: false,
    message: '',
  },
  reducers: {
    setError(state, action) {
      state.error = true
      state.message = action.payload
    },
    setSuccess(state, action) {
      state.error = false
      state.message = action.payload
    },
    clearNotification(state) {
      state.error = false
      state.message = ''
    },
  },
})

export const { setError, setSuccess, clearNotification } = notificationSlice.actions

export const showErrorMessage = (message) => {
  return (dispatch) => {
    dispatch(setError(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const showSuccessMessage = (message) => {
  return (dispatch) => {
    dispatch(setSuccess(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer
