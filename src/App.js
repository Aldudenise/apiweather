import React, { useState, useEffect } from 'react';
import Header from './Components/Header'
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
    const [result, setResult] = useState({})

    const {city, value} = cityWeather

    //useEffect para el clima actual
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
        if(consult) {
          const appid = '55673fdb5fb79ad665cf5995124ac6e6'
          const urlForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${appid}`

          const response = await fetch(urlForecast)
          const result = await response.json()

          setResult(result)
          setConsult(false)
        }
      }
      consultAPI()
    }, [consult])


  return (
    <div className="App">
      <Header />
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
