import React from 'react'
import './style.css'

function Weather({result}) {
    const {name, main, weather} = result

    //verifico que exista name o me tira un error
    if(!name){
        return null
    }
    
    const kelvin = 273.15

    return(
        <div className="weather">
                <p className="weatherCity">El clima en {name}:</p>
                <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}></img>
                <p className="temperature">{Math.round(main.temp - kelvin)}°C</p>
                <p>Puede variar entre una máxima de {Math.round(main.temp_max - kelvin)}°C y una mínima de {Math.round(main.temp_min - kelvin)}°C</p>
                <p>Humedad: {Math.round(main.humidity)}%</p>
        </div>
    )
}

export default Weather