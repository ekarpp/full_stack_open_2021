const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')

const app = express()
app.use(cors())
app.use(express.json())
morgan.token('json', (req, res) => JSON.stringify(req.body))
const format = ':method :url :status :res[content-length] - :response-time ms :json'
app.use(morgan(format))

const ID_RANGE = 1 << 30

let persons = [
  {
    "name": "3fd",
    "number": "2",
    "id": 1
  },
  {
    "name": "djslka",
    "number": "2",
    "id": 2
  },
  {
    "name": "fdjskfl",
    "number": "2",
    "id": 3
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const pers = persons.find(p => p.id === id)
  if (pers !== undefined)
    res.json(pers)
  else {
    res.status(404)
    res.send('not found')
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const n = persons.length
  persons = persons.filter(p => p.id !== id)

  if (persons.length === n)
    res.status(404).end()
  else
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const data = req.body

  let err = null
  if (!('name' in data))
    err = 'missing name'

  if (!('number' in data))
    err = 'missing number'

  if (!persons.every(p => p.name !== data.name))
    err = `${data.name} already exists`

  if (err !== null) {
    res.status(400)
    res.send(err)
    return
  }

  const person = {
    name: data.name,
    number: data.number,
    id: Math.round(Math.random() * ID_RANGE)
  }

  persons = persons.concat(person)

  res.json(person)
})

app.get('/info/', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`running on ${PORT}`)
})
