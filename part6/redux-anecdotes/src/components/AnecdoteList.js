import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
                     <div key={anecdote.id}>
                       <div>
                         {anecdote.content}
                       </div>
                       <div>
                         has {anecdote.votes}
                         <button onClick={() => vote(anecdote.id)}>vote</button>
                       </div>
                     </div>
                    )}
    </>
  )
}

export default AnecdoteList