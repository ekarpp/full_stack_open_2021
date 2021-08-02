const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)
const helper = require('./test_helper.js')
const Blog = require('../models/blog.js')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are 5 blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have field "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST /api/blogs', () => {
  test('blogs grow by one when POSTing', async () => {
    const newBlog = {
      title: "test",
      author: "no one",
      url: "localhost",
      likes: -1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('likes initialize to zero', async () => {
    const blog = {
      title: 'test',
      author: 'no one',
      url: 'localhost'
    }

    const newBlog = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(newBlog.body.likes).toBe(0)
  })

  test('missing title or url should result in 400', async () => {
    const malformedBlog = {
      title: 'FAIL',
      authror: 'FAIL'
    }

    await api
      .post('/api/blogs')
      .send(malformedBlog)
      .expect(400)
  })
})

describe('DELETE /api/blogs', () => {
  test('should delete', async () => {
    const blogs = await Blog.find({})
    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .expect(204)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(blogs.length - 1)
  })

  test('should 404 on wrong id', async () => {
    const id = await helper.invalidId()
    await api
      .delete(`/api/blogs/${id}`)
      .expect(404)
  })
})

describe('PUT /api/blogs', () => {
  test('should update blog', async () => {
    const blogs = await Blog.find({})
    let newBlog = blogs[0].toJSON()
    newBlog.likes = -1

    const updatedBlog = await api
          .put(`/api/blogs/${newBlog.id}`)
          .send(newBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)

    expect(updatedBlog.body.likes).toBe(-1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
