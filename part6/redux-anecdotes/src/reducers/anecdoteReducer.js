import anecdoteService from '../services/anecdotes.js'

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: anecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updated = await anecdoteService.updateOne({
      ...anecdote,
      votes: anecdote.votes + 1
    })

    dispatch({
      type: 'VOTE_ANECDOTE',
      data: updated
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const sortBy = (e1, e2) => e1.votes < e2.votes

const reducer = (state = [], action) => {
  console.log(state)
  console.log(action)
  switch (action.type) {
  case 'VOTE_ANECDOTE':
    return state
      .filter(a => a.id !== action.data.id)
      .concat(action.data)
      .sort(sortBy)
  case 'ADD_ANECDOTE':
    return state.concat(action.data)
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state
  }
}

export default reducer
