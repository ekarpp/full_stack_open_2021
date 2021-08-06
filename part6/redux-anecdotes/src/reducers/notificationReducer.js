const initialState = ''

export const setNotification = (msg, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: msg
    })
    await new Promise(r => setTimeout(r, 1000*seconds))
    dispatch({
      type: 'CLEAR_NOTIFICATION'
    })
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return ''
  default:
    return state
  }

}

export default notificationReducer
