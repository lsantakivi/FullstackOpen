import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries.js'

const FilterField = ({filter, handleFilterChange}) => {
  return (
    <div>
      find countries 
      <input 
        value={filter}
        onChange={handleFilterChange} />
    </div>
  )
}

const ShowOneCountry = ({country}) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>Languages:</h3>
      {Object.keys(country.languages).map(
        countryKey => 
          <li key={countryKey}>{country.languages[countryKey]}</li>
      )}
      <div>
        <img src={country.flags.png} alt={country.flags.alt} width="200"/>
      </div>
    </div>
  )
}

const ShowResults = ({results}) => {
  console.log("This is your ShowResults with results:", results)

  if(!results) {
    return null;
  }

  if(results.length < 1) {
    console.log("No results")
    return (
      <div>The country you search is not found.</div>
    )
  }
  if(results.length > 5) {
    console.log("Too many results")
    return (
      <div>Too many matches, specify another filter.</div>
    )
  }
  if(results.length > 1) {
    console.log("We have 2-5 results")
    return (
      <div>
        {results.map(country => 
          <div key={country.ssa2}>{country.name.common}</div>
        )}
      </div>
    )
  }
  console.log("We have ONE match!")
  return (
    <ShowOneCountry country={results[0]} />
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState(null)

  useEffect(() => {
    console.log("Effect starts here")

    countryService
      .getAll()
      .then(initCountries => {
        setCountries(initCountries)
        console.log("Effect done", initCountries)
      })
  }, [])


  const handleFilterChange = (event) => {
    console.log("Handling filter value change: ", event.target.value)
    setFilter(event.target.value)
  }

  const countriesToShow = filter.length < 1 ? 
    countries : 
    countries.filter(country => 
      country.name.common.toLowerCase().includes(filter.toLowerCase()))


  return (
    <div>
      <FilterField filter={filter} handleFilterChange={handleFilterChange}/>
      <ShowResults results={countriesToShow}/>
    </div>
  )

}

export default App