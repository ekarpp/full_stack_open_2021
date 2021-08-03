const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)
const User = require('../models/user.js')

beforeEach(async () => {

})

describe('POST /api/users', () => {
  test('users without password are not created', async () => {
    const user = {
      username: 'foo'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('users with password shorter than 3 are not created', async () => {
    const user = {
      username: 'foo',
      password: 'ba'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('users without username are not created', async () => {
    const user = {
      password: 'bar'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('users with username shorter than 3 are not created', async () => {
    const user = {
      username: 'fo',
      password: 'bar'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
