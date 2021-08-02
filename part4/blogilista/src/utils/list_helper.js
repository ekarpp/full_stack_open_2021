const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((s,v) => s + v.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return null
  return blogs.reduce((b,v) => b.likes < v.likes ? v : b)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return null

  const authors = {}

  blogs.forEach(b => authors[b.author] = {author: b.author, blogs: 0})
  blogs.forEach(b => authors[b.author].blogs += 1)
  return authors[Object.keys(authors)
    .reduce((b,v) => authors[b].blogs < authors[v].blogs ? v : b)]
}

const mostLikes = (blogs) => {
    if (blogs.length === 0)
    return null

  const authors = {}

  blogs.forEach(b => authors[b.author] = {author: b.author, likes: 0})
  blogs.forEach(b => authors[b.author].likes += b.likes)
  return authors[Object.keys(authors)
    .reduce((b,v) => authors[b].likes < authors[v].likes ? v : b)]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
