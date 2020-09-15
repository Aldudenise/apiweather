import React from 'react'

function Weather({result}) {
    const {name, main} = result

    //verifico que exista name o me tira un error
    if(!name){
        return null
    }
    
    const kelvin = 273.15

    return(
        <div>
            <div>
                <p>El clima de {name} es:</p>
                <p>{Math.round(main.temp - kelvin)}</p>
            </div>
            <div>
                <p>Temperatura máxima:</p>
                <p>{Math.round(main.temp_max - kelvin)}</p>
            </div>
            <div>
                <p>Temperatura minima</p>
                <p>{Math.round(main.temp_min - kelvin)}</p>
            </div>
            <div>
                <p>Humedad:</p>
                <p>{Math.round(main.humidity)}%</p>
            </div>
        </div>
    )
}

export default Weather