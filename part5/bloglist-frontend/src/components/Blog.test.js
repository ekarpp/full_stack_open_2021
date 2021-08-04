import React from 'react'
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('blog element', () => {
  let component
  let count = 0
  const countFunction = () => {count += 1}

  beforeEach(() => {
    const blog = {
      title: 'test',
      author: 'no one',
      url: 'localhost',
      likes: 0,
      user: {
        name: 'admin'
      }
    }

    component = render(
      <Blog
        blog={blog}
        likeBlog={countFunction}
        deleteBlog={countFunction}
      />
    )
  })

  test('renders content only title', () => {
    expect(component.container).toHaveTextContent('test')
    expect(component.container).not.toHaveTextContent('localhost')
  })

  test('renders info after pressing button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('localhost')
  })

  test('button gets pressed twice', () => {
    fireEvent.click(component.getByText('view'))
    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(count).toBe(2)
  })
})

describe('blog form element', () => {
  let component
  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm
        createBlog={createBlog}
      />
    )
  })

  test('form calls submit handler with proper arguments', async () => {
    const arr = ['url', 'title', 'author']
    let obj = {}

    for (let a of arr) {
      obj[a] = component.container.querySelector(`#${a}`)
      fireEvent.change(obj[a], {
        target: { value: a }
      })
    }

    const form = component.container.querySelector('form')
    await act(async () => {
      fireEvent.submit(form)
    })

    expect(createBlog.mock.calls).toHaveLength(1)
    const call_obj = createBlog.mock.calls[0][0]

    for (let a of arr) {
      expect(call_obj[a]).toBe(a)
    }
  })
})
