import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  if (newToken)
    token = `bearer ${newToken}`
  else
    token = newToken
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async blog => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const resp = await axios.post(baseUrl, blog, config)
  return resp.data
}

const update = async blog => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const resp = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return resp.data
}

const deleteBlog = async blog => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const resp = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return resp.data
}

export default { getAll, create, setToken, update, deleteBlog }
