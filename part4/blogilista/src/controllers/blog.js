const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const data = {
    ...req.body,
    user: req.user
  }

  const blog = new Blog(data)
  let savedBlog = await blog.save()

  const user = await User.findById(req.user)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  savedBlog.user = user

  res.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
  const data = req.body

  const blog = await Blog.findById(req.params.id)
  if (!blog)
    return res.status(404).end()

  if (blog.user.toString() !== req.user)
    return res.status(401).json({ error: 'not your blog' })

  const user = await User.findById(req.user)
  await Blog.findByIdAndRemove(req.params.id)
  user.blogs = user.blogs.filter(b => b.id !== blog.id)

  res.status(204).end()
})

blogRouter.get('/clear', async (req, res) => {
  await Blog.remove({})
  await User.updateMany({}, { blogs: [] })
  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
  const data = req.body

  const updatedBlog = {
    title: data.title,
    author: data.author,
    url: data.url,
    likes: data.likes
  }

  const blog = await Blog.findById(req.params.id)
  if (!blog)
    return res.status(404).end()

  let savedBlog = await Blog.findByIdAndUpdate(
    req.params.id, updatedBlog, { new: true }
  ).populate('user')

  res.json(savedBlog)
})

module.exports = blogRouter
