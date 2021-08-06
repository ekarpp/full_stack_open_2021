const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => Number((100000 * Math.random()).toFixed(0))

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'ADD',
    data: anecdote
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: id
  }
}

const sortBy = (e1, e2) => e1.votes < e2.votes
const initialState = anecdotesAtStart.map(asObject).sort(sortBy)

const reducer = (state = initialState, action) => {

  switch (action.type) {
  case 'VOTE':
    const id = Number(action.data)
    return state
      .map(a => {
      return id !== a.id
        ? a
        : {...a, votes: a.votes + 1}
      })
      .sort(sortBy)
  case 'ADD':
    return state.concat({
      content: action.data,
      id: getId(),
      votes: 0
    })
  default:
    return state
  }
}

export default reducer
