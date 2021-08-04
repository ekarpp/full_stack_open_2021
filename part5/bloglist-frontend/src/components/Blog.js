import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, usersBlog, deleteBlog }) => {
  const [ showInfo, setShowInfo ] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const renderDelete = () => (
    <button
      onClick={deleteBlog(blog)}
      id={'deleteBlog-' + blog.title.replaceAll(' ', '-')}
    >
      delete
    </button>
  )

  const renderInfo = () => (
    <>
      <br></br>
      {blog.url}
      <br></br>
      likes {blog.likes}
      <button
        onClick={likeBlog(blog)}
        id={'likeBlog-' + blog.title.replaceAll(' ', '-')}
      >
        like
      </button>
      <br></br>
      {blog.user.name}
      {usersBlog && renderDelete()}
      <br></br>
    </>
  )

  return (
    <div style={blogStyle}>
      "{blog.title}" by "{blog.author}"
      <button
        id={'toggleBlog-' + blog.title.replaceAll(' ', '-')}
        onClick={() => setShowInfo(!showInfo)}
      >
        {
          showInfo
          ? 'hide'
          : 'view'
        }
      </button>
      {showInfo && renderInfo()}
    </div>
  )
}

export default Blog
