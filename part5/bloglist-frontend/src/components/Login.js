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
        id="username"
        value={username}
        name="Username"
        onChange={usernameChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        id="password"
        value={password}
        name="Password"
        onChange={passwordChange}
      />
    </div>
    <button type="submit" id="login">login</button>
  </form>
)

export default Login
