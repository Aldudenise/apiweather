import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import ActualPosition from "./Components/ActualPosition";
import Form from "./Components/Form";
import Weather from "./Components/Weather";
import Forecast from "./Components/Forecast";

function App() {
    //state del form
    const [cityWeather, setCityWeather] = useState({
        city: "",
        value: "",
    });
    const [consult, setConsult] = useState(false);
    const [result, setResult] = useState({});
    const [resultFiveDays, setResultFiveDays] = useState({});
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

                const appid = "76aef8ef0fa81bcdd9cc92a0a3f31963";
                const urlWeatherActualLocation = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}`;

                const response = await fetch(urlWeatherActualLocation);
                const myLocationWeather = await response.json();
                if (response.status == 200) {
                    setMyLocation(myLocationWeather)

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
                const appid = "76aef8ef0fa81bcdd9cc92a0a3f31963";
                const urlWeatherToday = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`;

                const responseWeatherToday = await fetch(urlWeatherToday);
                const resultWeatherToday = await responseWeatherToday.json();

                setResult(resultWeatherToday);

                const urlFiveDays = `https://api.openweathermap.org/data/2.5/onecall?lat=${resultWeatherToday.coord.lat}&lon=${resultWeatherToday.coord.lon}&exclude=current,hourly,minutely&appid=${appid}`;

                const responseFiveDays = await fetch(urlFiveDays);
                const resultFiveDays  = await responseFiveDays.json();
                
                setResultFiveDays(resultFiveDays);

                setConsult(false);
            }
        };
        consultAPI();
    }, [consult]);

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
            <Forecast city={city} result={resultFiveDays} />
        </div>
    );
}

export default App;