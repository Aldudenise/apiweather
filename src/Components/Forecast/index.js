import React from 'react'

function Forecast({result}) {
    const {name, main} = result

    if(!name){
        return null
    }

    const kelvin = 273.15

    return(
        <div>
            <p>Acá iría un pronostico si tuviera uno</p>
        </div>
    )
}

export default Forecast