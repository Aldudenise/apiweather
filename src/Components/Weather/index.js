import React from 'react'

function Weather({result}) {
    const {name, main, weather} = result

    //verifico que exista name o me tira un error
    if(!name){
        return null
    }
    
    const kelvin = 273.15

    return(
        <div>
                <p>El clima de {name} es:</p>
                <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}></img>
                <p>{Math.round(main.temp - kelvin)}</p>
                <p>Puede variar entre una máxima de {Math.round(main.temp_max - kelvin)} y una mínima de {Math.round(main.temp_min - kelvin)}</p>
                <p>Humedad: {Math.round(main.humidity)}%</p>
        </div>
    )
}

export default Weather