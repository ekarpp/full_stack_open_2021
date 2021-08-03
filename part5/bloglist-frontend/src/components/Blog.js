import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, likeBlog, usersBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const renderDelete = () => (
    <button onClick={deleteBlog(blog)}>delete</button>
  )


  return (
    <div style={blogStyle}>
      "{blog.title}" by "{blog.author}"
      <Togglable buttonLabel="view">
        {blog.url}
        <br></br>
        likes {blog.likes} <button onClick={likeBlog(blog)}>like</button>
        <br></br>
        {blog.user.name}
        {usersBlog && renderDelete()}
        <br></br>
      </Togglable>
    </div>
  )
}

export default Blog
