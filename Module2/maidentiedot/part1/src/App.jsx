import { useState, useEffect } from 'react'
import countryService from './services/countries.js'
import weatherService from './services/weather.js'

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

const ShowCapitalWeather = ({weather}) => {
  if(!weather) {
    console.log("No weather data to show!")
    return null
  }

  const temperature = weather.main.temp
  const wind = weather.wind.speed
  const iconUrl = weatherService.getIconUrl(weather.weather[0].icon)
  const iconAlt = weather.weather[0].description

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <div>temperature {temperature} celsius</div>
      <div>
        <img src={iconUrl} alt={iconAlt}/>
      </div>
      <div>wind {wind} m/s</div>
    </div>
  )

}

const ShowOneCountry = ({country, weather}) => {
  if(!country) {
    return null;
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.keys(country.languages).map(
          countryKey => 
            <li key={countryKey}>{country.languages[countryKey]}</li>
        )}
      </ul>
      <div>
        <img src={country.flags.png} alt={country.flags.alt} width="200"/>
      </div>
      <ShowCapitalWeather city={country.capital} weather={weather} />
    </div>
  )
}

const ShowResults = ({results, showFunction}) => {
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
          <div key={country.cca2}>{country.name.common} 
          <button onClick={() => showFunction(country)}>show</button></div>
        )}
      </div>
    )
  }
  console.log("We have ONE match! (and it's shown somewhere else")
  return null
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState(null)
  const [countryToShow, setCountryToShow] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)

  useEffect(() => {
    console.log("Effect starts here")

    countryService
      .getAll()
      .then(initCountries => {
        setCountries(initCountries)
        console.log("Effect done", initCountries)
      })
  }, [])

  useEffect(() => {
    console.log("Weather effect starts here")
    if(!countryToShow) {
      console.log("WeatherEffect has nothing to show as the country was null or something")
      return;
    }

    const capital = countryToShow.capital
    const country = countryToShow.cca2

    weatherService
      .getWeather(capital, country)
      .then(
        initWeather => {
          setCurrentWeather(initWeather)
          console.log("Weather effect done", initWeather)
        } 
      )
      .catch( msg => 
        console.log("Weather data not ready or other problem: ", msg)
      )
  }, [countryToShow])

  const handleFilterChange = (event) => {
    console.log("Handling filter value change: ", event.target.value)
    const newFilter = event.target.value
    const countriesToShow = newFilter.length < 1 ? 
      countries : 
      countries.filter(country => 
        country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    if(countriesToShow.length == 1) {
      console.log("Setting country to show to one country", countriesToShow)
      setCountryToShow(countriesToShow[0])
    }
    else {
      console.log("Having too many or none countries, so not showing any", countriesToShow)
      setCountryToShow(null)
    }
    setFilteredCountries(countriesToShow)
    setFilter(newFilter)
  }

  const showFunction = (country) => {
    console.log("Show button clicked for country", country)
    const countryCopy = country
    setCountryToShow(countryCopy)
  }


  return (
    <div>
      <FilterField filter={filter} handleFilterChange={handleFilterChange}/>
      <ShowResults results={filteredCountries} showFunction={showFunction}/>
      <ShowOneCountry country={countryToShow} weather={currentWeather}/>
    </div>
  )

}

export default App