import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import ActualPosition from "./Components/ActualPosition";
import Form from "./Components/Form";
import Weather from "./Components/Weather";
//import Forecast from "./Components/Forecast";

function App() {
    //state del form
    const [cityWeather, setCityWeather] = useState({
        city: "",
        value: "",
    });
    const [consult, setConsult] = useState(false);
    const [consultFiveDays, setConsultFiveDays] = useState(false);
    const [result, setResult] = useState({});
    const { city } = cityWeather;
    const [myLocation, setMyLocation] = useState({
        latitude: null,
        longitude: null,
    });
    const [locationWeather, setLocationWeather] = useState({})


  //useEffect para el clima en la posición actual
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setMyLocation({ latitude, longitude });

                const appid = "55673fdb5fb79ad665cf5995124ac6e6";
                const urlWeatherActualLocation = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}`;

                const response = await fetch(urlWeatherActualLocation);
                const myLocationWeather = await response.json();
                if (response.status == 200) {
                    console.log(myLocationWeather);
                    setMyLocation(myLocationWeather)
                    console.log(urlWeatherActualLocation)

                } else {
                    alert("Weather API error");
                }
            });
        } else {
            alert("Geolocation unavailable");
        }
    }, []);

    //useEffect para el clima actual de la ciudad elegida
    useEffect(() => {
        const consultAPI = async () => {
            if (consult) {
                const appid = "55673fdb5fb79ad665cf5995124ac6e6";
                const urlWeatherToday = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`;

                const response = await fetch(urlWeatherToday);
                const result = await response.json();

                setResult(result);
                setConsult(false);
            }
        };
        consultAPI();
    }, [consult]);

    //useEffect para el clima de los proximos dias
    // useEffect(() => {
    //     const consultAPI = async () => {
    //         if (consultFiveDays) {
    //             const appid = "55673fdb5fb79ad665cf5995124ac6e6";
    //             const urlForecast = `api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt={5}&appid=${appid}`;

    //             const response = await fetch(urlForecast);
    //             const consultFiveDays = await response.json();

    //             setConsultFiveDays(consultFiveDays);
    //             console.log(consultFiveDays)
    //         }
    //     };
    //     consultAPI();
    // }, [consultFiveDays]);

    return (
        <div className="App">
            <Header />
            <ActualPosition myLocation={myLocation} setLocationWeather={setLocationWeather} />
            <Form
                cityWeather={cityWeather}
                setCityWeather={setCityWeather}
                setConsult={setConsult}
            />
            <Weather result={result} />
            {/* <Forecast setConsultFiveDays={setConsultFiveDays} 
            consultFiveDays={consultFiveDays}
            /> */}
        </div>
    );
}

export default App;