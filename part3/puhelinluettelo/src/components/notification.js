const Notification = ({ msg, error }) => {
  if (msg !== null) {
  return (
    <div className="notif">
      {msg}
    </div>
  )
  } else if (error !== null) {
    return (
      <div className="error">
        {error}
      </div>
    )
  } else {
    return null
  }
}

export default Notification
