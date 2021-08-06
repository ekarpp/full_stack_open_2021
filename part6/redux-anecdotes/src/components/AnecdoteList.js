import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(
      `you voted "${anecdote.content}"`,
      5
    ))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
                     <div key={anecdote.id}>
                       <div>
                         {anecdote.content}
                       </div>
                       <div>
                         has {anecdote.votes}
                         <button onClick={() => vote(anecdote)}>vote</button>
                       </div>
                     </div>
                    )}
    </>
  )
}

export default AnecdoteList
