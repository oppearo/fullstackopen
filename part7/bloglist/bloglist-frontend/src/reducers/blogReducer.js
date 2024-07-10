import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      const blogs = action.payload
      return blogs.sort((a, b) => b.likes - a.likes)
    },
    like(state, action) {
      const id = action.payload
      const toBeLiked = state.find((blog) => blog.id === id)
      const likedBlog = {
        ...toBeLiked,
        likes: toBeLiked.likes + 1,
      }
      console.log(JSON.parse(JSON.stringify(state)))
      return state
        .map((blog) => (blog.id !== id ? blog : likedBlog))
        .sort((a, b) => b.likes - a.likes)
    },
    removeBlog(state, action) {
      return state
        .filter((blog) => blog.id !== action.payload)
        .sort((a, b) => b.likes - a.likes)
    },
  },
})

export const { addBlog, setBlogs, like, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(addBlog(newBlog))
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    const likedBlog = await blogService.like(id)
    dispatch(like(likedBlog.id))
  }
}

export const handleRemove = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer
