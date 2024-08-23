const Header = (props) => {
  return (
    <h1>{props.courseName}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.partName} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  const content = props.content
  return (
    <div>
        <Part partName={content[0].partName} exercises={content[0].exercises}/>
        <Part partName={content[1].partName} exercises={content[1].exercises}/>
        <Part partName={content[2].partName} exercises={content[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.nbrOfExercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const contentList = [
    { partName: part1, exercises: exercises1}, 
    { partName: part2, exercises: exercises2}, 
    { partName: part3, exercises: exercises3}, 
  ]

  return (
    <div>
      <Header courseName={course} />
      <Content content={contentList} />
      <Total nbrOfExercises={exercises1+exercises2+exercises3} />
    </div>
  )
}

export default App