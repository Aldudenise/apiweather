import React, { useState } from 'react'

function Form({cityWeather, setCityWeather, setConsult}) {

    const [error, setError] = useState(false)

    const { city } = cityWeather

    //funcion que coloca los elementos en el state

    const handleChange = e => {
        setCityWeather({
            ...cityWeather,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(city.trim() === '') {
            setError(true)
            return;
        } 
        setError(false)
        setConsult(true)
    }

    return(
        <form onSubmit={handleSubmit}>
            {error ? <p className="cityError">Debes elegir una ciudad</p> : null}
            <select name="city" id="city" value={city} onChange={handleChange}>
                <option value="">Selecciona una ciudad</option>
                <option value="paris">Paris</option>
                <option value="tokyo">Tokyo</option>
                <option value="roma">Roma</option>
                <option value="miami">Miami</option>
                <option value="sydney">Sydney</option>
            </select>
            <input type="submit" value="Buscar clima"></input>
        </form>
    )
}

export default Form