require('dotenv').config()
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person)
        res.json(person)
      else
        res.status(404).end()
    })
    .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      if (result)
        res.status(204).end()
      else
        res.status(404).end()
    })
    .catch(next)
})

app.put('/api/persons/:id', (req, res, next) => {
  const data = req.body

  const person = {
    name: data.name,
    number: data.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      if (updatedPerson)
        res.json(updatedPerson)
      else
        res.status(404).end()
    })
    .catch(next)
})

app.post('/api/persons', (req, res, next) => {
  const data = req.body

  Person.find({})
    .then(persons => {
      const person = new Person({
        name: data.name,
        number: data.number
      })

      person.save()
        .then(savedPerson => res.json(savedPerson))
        .catch(next)
    })

})

app.get('/info', (req, res) => {
  Person.find({})
    .then(persons => {
      res.send(`Phonebook has info for ${persons.length} people`)
    })
})

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`running on ${process.env.PORT}`)
})
