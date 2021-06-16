import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const obj = {
    good: {
      set: setGood,
      current: good
    },
    neutral: {
      set: setNeutral,
      current: neutral
    },
    bad: {
      set: setBad,
      current: bad
    }
  }

  const buttonHandler = (name) => {
    return () => {
      obj[name].set(1 + obj[name].current)
    }
  }

  return (
    <div>
      <Feedback handler={buttonHandler} />
      <Statistics values={obj}/>
    </div>
  )
}

const Feedback = (props) => {
  return (
    <>
      <h1> give feedback </h1>
      <button onClick={props.handler("bad")}>bad</button>
      <button onClick={props.handler("neutral")}>neutral</button>
      <button onClick={props.handler("good")}>good</button>
      <br></br>
    </>
  )
}

const Statistics = (props) => {
  const total = props.values.good.current +
        props.values.neutral.current +
        props.values.bad.current

  if (total === 0) {
    return (
      <>
        <h1>statistics</h1>
        No feedback given
      </>
    )
  }

  const positive = props.values.good.current / total

  const average = (props.values.good.current - props.values.bad.current) / total

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
        <tr>
          <td>
            good
          </td>
          <td>
            {props.values.good.current}
          </td>
        </tr>

        <tr>
          <td>
            neutral
          </td>
          <td>
            {props.values.neutral.current}
          </td>
        </tr>

        <tr>
          <td>
            bad
          </td>
          <td>
            {props.values.bad.current}
          </td>
        </tr>

        <tr>
          <td>
            all
          </td>
          <td>
            {total}
          </td>
        </tr>

        <tr>
          <td>
            positive
          </td>
          <td>
            {positive} %
          </td>
        </tr>

        <tr>
          <td>
            average
          </td>
          <td>
            {average}
          </td>
        </tr>
        </tbody>
      </table>
    </>
  )
}

export default App
