import React, { useState, useEffect } from 'react';
import Header from './Components/Header'
import ActualPosition from './Components/ActualPosition'
import Form from './Components/Form'
import Weather from './Components/Weather'
import Forecast from './Components/Forecast'

function App() {

    //state del form
    const [cityWeather, setCityWeather] = useState({
      city: '',
      value: ''
    })
    const [consult, setConsult] = useState(false)
    const [consultFiveDays, setConsultFiveDays] = useState(false)
    const [result, setResult] = useState({})
    const {city} = cityWeather
    
    const [myLocation, setMyLocation] = useState({
      latitude: null,
      longitude: null
    })

    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      })
    }

    const {latitude, longitude} = myLocation
    useEffect(() => {
      const consultAPI = async () => {
        if(myLocation) {
          const appid = '55673fdb5fb79ad665cf5995124ac6e6';
          const urlWeatherActualLocation = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}` 

          const response = await fetch(urlWeatherActualLocation)
          const myLocation = await response.json()

          setMyLocation(myLocation)
        }
      }
      consultAPI()
    }, [myLocation])

    //useEffect para el clima actual de la ciudad elegida
    useEffect(() => {
      const consultAPI = async () => {
        if(consult) {
          const appid = '55673fdb5fb79ad665cf5995124ac6e6';
          const urlWeatherToday = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`

          const response = await fetch(urlWeatherToday)
          const result = await response.json()

          setResult(result)
          setConsult(false)
        }
      }
      consultAPI()
    }, [consult])

    //useEffect para el clima de los proximos dias
    useEffect(() => {
      const consultAPI = async () => {
        if(consultFiveDays) {
          const appid = '55673fdb5fb79ad665cf5995124ac6e6'
          const urlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&
          exclude=current,minutely,hourly&appid=${appid}`

          const response = await fetch(urlForecast)
          const result = await response.json()

          setResult(result)
          setConsultFiveDays(false)
        }
      }
      consultAPI()
    }, [consultFiveDays])


  return (
    <div className="App">
      <Header />
      <ActualPosition 
        myLocation={myLocation}
      />
      <Form 
        cityWeather={cityWeather}
        setCityWeather={setCityWeather}
        setConsult={setConsult}
      />
      <Weather 
        result={result}
      />
      <Forecast 
        result={result}
      />
    </div>
  );
}

export default App;
