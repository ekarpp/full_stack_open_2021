import React from 'react'

const Login = ({
  username,
  usernameChange,
  password,
  passwordChange,
  login
}) => (
  <form onSubmit={login}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={usernameChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={passwordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default Login
