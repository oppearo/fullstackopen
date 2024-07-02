import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'

const reducerStore = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notifications: notificationReducer
  }
})

export default reducerStore