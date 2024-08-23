const Hello = ({name, age}) => {

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, are you {age} years old?</p>
      <p>So you were probably born {bornYear()}</p>
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