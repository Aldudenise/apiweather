import React from 'react'

function ActualPosition({myLocation}) {
    const {main, name} = myLocation
    const kelvin = 273.15

    return(
    <p>Clima en tu ciudad: en {name} hacen {Math.round(main?.temp - kelvin)}°C</p>
    )
}

export default ActualPosition