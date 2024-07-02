import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'
import { configureStore } from '@reduxjs/toolkit'

const reducerStore = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }
})

export default reducerStore