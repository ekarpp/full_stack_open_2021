const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user.js')
const SALT_ROUNDS = 10

userRouter.get('/', async (req, res) => {
  const users = await User
        .find({})
        .populate('blogs', { title: 1, author: 1, url: 1 })
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const data = req.body

  if (data.password === undefined || data.password.length < 3)
    throw {name: 'ValidationError', message: 'missing password or too short'}

  const hash = await bcrypt.hash(data.password, SALT_ROUNDS)

  const user = new User({
    username: data.username,
    name: data.name,
    passwordHash: hash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = userRouter
