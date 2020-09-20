import React from 'react'
import './style.css'

function Forecast({city, result}) {
    const {daily} = result

    if(!daily){
        return null
    }

    const kelvin = 273.15

    return(
        <>
            <p className="forecastTittle">Dentro de los próximos días:</p>
            <div className="dailyForecast">
                <p><span className="dailyTittle">Mañana:</span> <span>Temp. min: {Math.round(daily[1].temp.min - kelvin)}°C.</span> <span>Temp. max: {Math.round(daily[1].temp.max - kelvin)}°C.</span> <span>Humedad: {daily[1].humidity}%</span></p>
            </div>
            <div className="dailyForecast">
                <p><span className="dailyTittle">A 2 días:</span> <span>Temp. min: {Math.round(daily[2].temp.min - kelvin)}°C.</span> <span>Temp max: {Math.round(daily[2].temp.max - kelvin)}°C.</span> <span>Humedad: {daily[2].humidity}%</span></p>
            </div>
            <div className="dailyForecast">
                <p><span className="dailyTittle">A 3 días:</span> <span>Temp. min: {Math.round(daily[3].temp.min - kelvin)}°C.</span> <span>Temp. max: {Math.round(daily[3].temp.max - kelvin)}°C.</span> <span>Humedad: {daily[3].humidity}%</span></p>
            </div>
        </>
    )
}

export default Forecast