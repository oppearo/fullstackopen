import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = baseUrl + `/${id}`
  const blogObject = await axios.get(url)
  const likedBlog = { ...blogObject.data, likes: blogObject.data.likes + 1 }

  console.log(
    `sending PUT to ${baseUrl}/${id} with likes updated from ${blogObject.data.likes} to ${likedBlog.likes}`
  )

  const response = await axios.put(url, likedBlog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log(`sending DELETE to ${baseUrl}/${id}`)

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, like, remove, setToken }
