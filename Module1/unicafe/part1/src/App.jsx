import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Display = ({text, value}) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const Sum = ({array}) => {
  return (
    <div>
      all {array[0]+array[1]+array[2]}
    </div>
  )
}

const Average = ({array}) => {
  return (
    <div>
      average {(array[0]+array[1]+array[2])/3}
    </div>
  )
}

const Positive = ({array}) => {
  return (
    <div>
      positive {array[0]/(array[0]+array[1]+array[2])}
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  console.log("Values", good, neutral, bad)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <h1>statistics</h1>
      <Display text="good" value={good}/>
      <Display text="neutral" value={neutral}/>
      <Display text="bad" value={bad}/>
      <Sum array={[good, neutral, bad]} />
      <Average array={[good, neutral, bad]} />
      <Positive array={[good, neutral, bad]} />
    </div>
  )
}

export default App