import axios from 'axios'

const BASE_URL = '/api/persons'//'http://localhost:3001'

const get = () => {
  return axios.get(`${BASE_URL}`).then(resp => resp.data)
}

const post = (person) => {
  return axios.post(`${BASE_URL}`, person).then(resp => resp.data)
}

const del = (id) => {
  return axios.delete(`${BASE_URL}/${id}`).then(resp => resp.data)
}

const put = (person) => {
  return axios.put(`${BASE_URL}/person.id`, person).then(resp => resp.data)
}

export default { get , post, del, put }
