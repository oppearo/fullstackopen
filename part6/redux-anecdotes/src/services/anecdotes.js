import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (id) => {
  const url = baseUrl + `/${id}`
  const toBeVoted = await axios.get(url)
  const votedObject = {...toBeVoted.data, votes: toBeVoted.data.votes + 1}
  const response = await axios.patch(url, votedObject)
  return response.data
}

export default { getAll, createNew, vote }