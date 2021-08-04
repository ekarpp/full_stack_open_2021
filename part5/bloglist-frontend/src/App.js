import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
const LOGIN_STORE_NAME = 'loggedBlogUser'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogs, setBlogs] = useState([])

  const [errMsg, setErrMsg] = useState(null)
  const [notif, setNotif] = useState(null)

  const blogFormRef = useRef()

  const blogSortBy = (e1, e2) => e1.likes < e2.likes

  useEffect(async () => {
    const blogs = await blogService.getAll()
    setBlogs( blogs.sort(blogSortBy) )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem(LOGIN_STORE_NAME)
    if (loggedUser) {
      const usr = JSON.parse(loggedUser)
      setUser(usr)
      blogService.setToken(usr.token)
    }
  }, [])

  const addNotif = (msg, setter) => {
    setter(msg)
    setTimeout(() => {
      setter(null)
    }, 5000)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const usr = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        LOGIN_STORE_NAME, JSON.stringify(usr)
      )
      blogService.setToken(usr.token)
      setUser(usr)
      setUsername('')
      setPassword('')
    } catch (ex) {
      addNotif('wrong username or password', setErrMsg)
    }
  }

  const likeBlog = blog => async () => {
    const copy = { ...blog }
    copy.likes += 1
    copy.user = blog.user.id

    const updatedBlog = await blogService.update(copy)
    setBlogs(
      blogs
        .filter(b => b.id !== blog.id)
        .concat(updatedBlog)
        .sort(blogSortBy)
    )

    addNotif(
      `liked blog "${blog.title}"`, setNotif
    )
  }

  const createBlog = async blog => {
    const createdBlog = await blogService.create(blog)
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(createdBlog))
    addNotif(
      `a new blog "${blog.title}" by "${blog.author}" added`, setNotif
    )
  }

  const deleteBlog = blog => async () => {
    const ok = window.confirm(
      `remove blog ${blog.title} by ${blog.author}?`
    )

    if (!ok)
      return

    await blogService.deleteBlog(blog)
    setBlogs(
      blogs
        .filter(b => b.id !== blog.id)
    )
    addNotif(
      `deleted blog "${blog.title}"`, setNotif
    )
  }

  const change = setter => ({ target }) => {
    setter(target.value)
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem(LOGIN_STORE_NAME)
    blogService.setToken(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>login</h2>
        <Notification msg={notif} error={errMsg} />
        <Togglable buttonLabel="log in">
          <Login
            username={username}
            usernameChange={change(setUsername)}
            password={password}
            passwordChange={change(setPassword)}
            login={handleLogin}
          />
        </Togglable>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification msg={notif} error={errMsg} />
        <p>
          {user.name} logged in
          <button onClick={logout}>logout</button>
        </p>

        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm
            createBlog={createBlog}
          />
        </Togglable>
        {blogs.map(blog =>
                   <Blog
                     key={blog.id}
                     blog={blog}
                     likeBlog={likeBlog}
                     deleteBlog={deleteBlog}
                     usersBlog={user.username === blog.user.username}
                   />
                  )}
      </div>
    )
  }
}

export default App
