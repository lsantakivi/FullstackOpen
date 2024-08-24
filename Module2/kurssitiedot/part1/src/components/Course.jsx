const Header = ({courseName}) => {
    console.log("courseName ", courseName)
    return (
      <h2>{courseName}</h2>
    )
  }
  
  const Part = ({partName, exercises}) => {
    console.log("Start printing part information ", partName, exercises)
    return (
      <p>
        {partName} {exercises}
      </p>
    )
  }
  
  const Content = ({parts}) => {
    console.log("Start printing content, here's props put to parts ", parts)
    return (
        <div>
            {parts.map(part => 
                <Part key={part.id} partName={part.name} exercises={part.exercises}
            />)}
        </div>
    )
  }
  
  const Total = ({parts}) => {
    console.log("Start counting total with parts ", parts)
    const total = parts.reduce(
        (sum, currentValue) => 
        sum + currentValue.exercises, 
        0
    )
    return (
        <p><strong>
            total of {total} exercises
        </strong></p>
    )
  }
  

const Course = ({course}) => {

    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course