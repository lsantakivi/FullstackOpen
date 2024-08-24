import { useState } from 'react'

const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}

const DisplayVotes = ({votes}) => {
  return (
    <div>
      has {votes} votes
    </div>
  )
}

// Trying to understand reduce... (almost there)
const findIndexOfMax = (array) => {
  console.log("Input array ", array)
  const indexOfMax = array.reduce(
    (currentBestIdx, testedValue, testedIdx, array) => 
    testedValue > array[currentBestIdx] ? testedIdx : currentBestIdx, 
    0
  )
  console.log("Index of maximum value ", indexOfMax)
  return indexOfMax
}

const DisplayMostVoted = ({anecdotes, votes}) => {
  const indexOfMax = findIndexOfMax(votes)
  const biggestVotes = votes[indexOfMax]
  const mostVotedAnecdote = anecdotes[indexOfMax] 
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <div>{mostVotedAnecdote}</div>
      <div>has {biggestVotes} votes</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const emptyVoteArray = new Uint8Array(anecdotes.length)
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(emptyVoteArray)

  const setRandomSelected = () => {
    const anecdoteCount = anecdotes.length
    const randomIndex = Math.floor(Math.random() * anecdoteCount);
    console.log("randomIndex", {randomIndex})
    setSelected(randomIndex)
  }

  const voteSelected = () => {
    console.log("Clicked voting")
    const copy = [...votes]
    console.log("Votes before ", copy)
    copy[selected] += 1
    console.log("Votes after ", copy)
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <DisplayVotes votes={votes[selected]} />
      <Button clickHandler={voteSelected} text="vote" />
      <Button clickHandler={setRandomSelected} text="next anecdote" />
      <DisplayMostVoted anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App