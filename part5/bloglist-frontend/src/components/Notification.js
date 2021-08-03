import React from 'react'

const Notification = ({ msg, error }) => {
  let style = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (msg !== null) {
    style.color = 'green'
    return (
      <div style={style}>
        {msg}
      </div>
    )
  } else if (error !== null) {
    style.color = 'red'
    return (
      <div style={style}>
        {error}
      </div>
    )
  } else {
    return null
  }
}

export default Notification
