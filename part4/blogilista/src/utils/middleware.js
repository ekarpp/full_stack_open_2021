const jwt = require('jsonwebtoken')
const logger = require('./logger.js')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError')
    return response.status(400).json({ error: error.message })

  if (error.name === 'CastError')
    return response.status(400).json({ error: 'malformatted id' })

  if (error.name === 'JsonWebTokenError')
    return response.status(401).json({ error: 'invalid token' })

  logger.error(error.name, error.message)
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer '))
    req.token = authorization.substring(7)
  else
    req.token = null

  next()
}

const userExtractor = (req, res, next) => {
  if (req.method === 'GET')
    return next()

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id)
    return res.status(401).json({ error: 'missing token or invalid' })
  req.user = decodedToken.id
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
