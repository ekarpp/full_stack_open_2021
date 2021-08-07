import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === id)

  return (
    <div>
      <h2>{anecdote.content}</h2>
      has {anecdote.votes} votes
      <br></br>
      for more info see <a href={anecdote.info}>{anecdote.info}</a>
      <br></br>
      <br></br>
    </div>
  )
}

export default Anecdote
