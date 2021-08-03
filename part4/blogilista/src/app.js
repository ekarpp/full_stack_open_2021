const config = require('./utils/config.js')
const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blog.js')
const userRouter = require('./controllers/user.js')
const loginRouter = require('./controllers/login.js')
const middleware = require('./utils/middleware.js')
const logger = require('./utils/logger.js')

logger.info(`connecting to ${config.MONOGB_URI}`)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => logger.info('connected to MongoDB'))
  .catch(err => logger.error('error conncecting to MongoDB:', err.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
