import axios from 'axios'

const DB_URL = 'http://localhost:3001/persons/'

const get = () => {
  return axios.get(DB_URL).then(resp => resp.data)
}

const post = (person) => {
  return axios.post(DB_URL, person).then(resp => resp.data)
}

const del = (id) => {
  return axios.delete(DB_URL + id).then(resp => resp.data)
}

const put = (person) => {
  return axios.put(DB_URL + person.id, person).then(resp => resp.data)
}

const obj = { get , post, del, put }
export default obj
