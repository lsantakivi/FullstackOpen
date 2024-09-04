import axios from 'axios'
const APIkey = import.meta.env.VITE_WEATHER_KEY

const getWeather = (city, country) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIkey}&units=metric`)
    console.log("Get weather with request", request)
    return request.then(response => response.data)
  }

const getIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

export default { getWeather, getIconUrl }