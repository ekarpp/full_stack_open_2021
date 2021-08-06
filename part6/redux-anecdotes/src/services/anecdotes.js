import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const resp = await axios.get(baseUrl)
  return resp.data
}

const createNew = async (content) => {
  const anecdote = {
    content,
    votes: 0
  }

  const resp = await axios.post(baseUrl, anecdote)
  return resp.data
}

const updateOne = async (anecdote) => {
  const resp = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  console.log(resp.data)
  return resp.data
}

export default { getAll, createNew, updateOne }
