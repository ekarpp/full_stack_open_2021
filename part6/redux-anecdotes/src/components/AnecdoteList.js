import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdote = anecdotes.filter(a => a.id === id)[0].content
    dispatch(setNotification(
      `you voted "${anecdote}"`
    ))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
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
                         <button onClick={() => vote(anecdote.id)}>vote</button>
                       </div>
                     </div>
                    )}
    </>
  )
}

export default AnecdoteList
