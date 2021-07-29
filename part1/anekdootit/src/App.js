import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  // [votes, index]
  const [selectedBest, setSelectedBest] = useState({votes: 0, index: 0})

  const data = {
    anecdotes: anecdotes,
    state: {
      current: selected,
      set: setSelected
    },
    stateBest: {
      current: selectedBest,
      set: setSelectedBest
    }
  }

  return (
    <div>
      <Anecdote data={data}/>
      <Best data={data}/>
    </div>
  )
}

const Anecdote = (props) => {
  const [votes, setVotes] = useState(new Array(props.data.anecdotes.length).fill(0))

  const vote = () => {
    const copy = [...votes]
    copy[props.data.state.current] += 1
    const max = Math.max(...copy)
    if (max > props.data.stateBest.current.votes) {
      props.data.stateBest.set({index: copy.indexOf(max), votes: max})
    }

    setVotes(copy)
  }

  const next = () => {
    props.data.state.set(Math.floor(Math.random() * votes.length))
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      {props.data.anecdotes[props.data.state.current]}
      <br></br>
      has {votes[props.data.state.current]} votes
      <br></br>
      <button onClick={vote}>vote</button>
      <button onClick={next}>next anecdote</button>
    </>
  )
}

const Best = (props) => {
  return (
    <>
      <h1>Anecdote with the most votes</h1>
      {props.data.anecdotes[props.data.stateBest.current.index]}
      <br></br>
      has {props.data.stateBest.current.votes} votes.
    </>
  )
}

export default App
