const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
  const result = await Blog.findByIdAndRemove(req.params.id)
  if (result)
    res.status(204).end()
  else
    res.status(404).end()
})

blogRouter.put('/:id', async (req, res) => {
  const data = req.body

  const blog = {
    title: data.title,
    author: data.author,
    url: data.url,
    likes: data.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id, blog, { new: true }
  )

  if (updatedBlog)
    res.json(updatedBlog)
  else
    res.status(404).end()

})

module.exports = blogRouter
