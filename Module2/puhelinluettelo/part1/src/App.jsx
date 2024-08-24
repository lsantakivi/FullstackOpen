import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({newFilter, handleFilterChange}) => {
  return(
    <div>
      filter shown with <input
        value={newFilter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const DisplayPerson = ({person}) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map((person) => 
        <DisplayPerson key={person.name} person={person}/>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('Effect starts here')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('Promise fulfilled.', response)
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log("Adding new person")

    const personExistsAlready = persons.some(
      person => person.name == newName
    )
    if(!personExistsAlready) {
      const personObject = {
        name: newName, 
        number: newNumber,
      }
    
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    else { 
      const msg = `${newName} is already added to phonebook`
      alert(msg)
    }
  }

  const handleFilterChange = (event) => {
    console.log("Handling filter change ", event.target.value)
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log("Handling name change ", event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log("Handling number change ", event.target.value)
    setNewNumber(event.target.value)
  }

  const personsToShow = newFilter.length < 1
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )

}

export default App