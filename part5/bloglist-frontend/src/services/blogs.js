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

const put = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = baseUrl + '/' + blogObject.id
  console.log(`sending PUT to ${url}`)

  const response = await axios.put(url, blogObject, config)
  return response.data
}

export default { getAll, create, put, setToken }