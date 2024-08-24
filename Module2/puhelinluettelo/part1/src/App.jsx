import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

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

const DisplayPerson = ({person, deleteFunction}) => {
  return (
    <p>
      {person.name} {person.number} 
      <button  onClick={() => deleteFunction(person.id)}>
        delete
      </button>
    </p>
  )
}

const Persons = ({persons, deleteFunction}) => {
  return (
    <div>
      {persons.map((person) => 
        <DisplayPerson key={person.name} person={person} deleteFunction={deleteFunction}/>)}
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
    personService
      .getAll()
      .then(initPersons => {
        setPersons(initPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log("Adding new person")

    const personIfExists = persons.find(
      person => person.name === newName
    )
    if(personIfExists === undefined) {
      console.log("Person didn't exist, adding new", newName)
      const personObject = {
        name: newName, 
        number: newNumber,
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          console.log("Person put on server", returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
    else { 
      console.log("Person exists already, asking to update phone number ", newName)
      const msg = `${newName} is already added to phonebook, replace the old number with a new one?`
      const response = confirm(msg)
      if(response) {
        const updatedPerson = {...personIfExists, number: newNumber}
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id === returnedPerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
          })
      }
      else {
        console.log("Didn't change the number")
      }
    }
  }

  const deletePerson = id => {
    console.log("Going to delete and here we are ", id)
    personService
      .remove(id)
      .then( responseperson => {
        console.log("Person removed succesfully ", responseperson.id)
        const filteredPersons = persons.filter(person => person.id !== responseperson.id)
        setPersons(filteredPersons)
      })
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
      <Persons 
        persons={personsToShow} 
        deleteFunction={deletePerson}
      />
    </div>
  )

}

export default App