const initialState = ''

export const setNotification = (msg) => {
  return {
    type: 'SET',
    data: msg
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET':
    return action.data
  case 'CLEAR':
    return ''
  default:
    return state
  }

}

export default notificationReducer
