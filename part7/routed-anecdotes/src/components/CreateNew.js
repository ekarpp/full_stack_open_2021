import { useState } from 'react'
import { useField } from '../hooks/index.js'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const resetForm = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            { ...{...content, reset: undefined} }
          />
        </div>
        <div>
          author
          <input
            { ...{...author, reset: undefined} }
          />
        </div>
        <div>
          url for more info
          <input
            { ...{...info, reset: undefined} }
          />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={resetForm}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew
