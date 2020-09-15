import React from 'react'

function Forecast({result}) {
    const {name, main} = result

    if(!name){
        return null
    }

    const kelvin = 273.15

    return(
        <div>
            <p>El clima para los próximos días en {name} es:</p>
            <p>Mañana: temperatura de {Math.round(main.temp.day - kelvin)}</p>
        </div>
    )
}

export default Forecast