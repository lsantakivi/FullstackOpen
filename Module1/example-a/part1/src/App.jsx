const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, are you {props.age} years old?</p>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  const nimi = 'Pekka'
  const ika = 65
  console.log(now, a+b)

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={15+16}/>
      <Hello name={nimi} age={ika}/>
      <p>Hello World, it is {now.toString()}!</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}

export default App