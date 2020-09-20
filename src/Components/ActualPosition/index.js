import React from 'react'
import './style.css'

function ActualPosition({myLocation}) {
    const {main, name, weather} = myLocation
    const kelvin = 273.15

    return(
        <>
            <p className="actualPosition">Tu ciudad:</p>
            <p className="position">en {name} hacen {Math.round(main?.temp - kelvin)}°C</p>
        </>
    )
}

export default ActualPosition