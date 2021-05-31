import axios from "axios";
import { useState, useEffect } from "react";

const WeatherInfo = ({ capital }) => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
      )
      .then((response) => {
        console.log("Weather promise fulfilled");
        setWeatherData(response.data);
        setLoading(false);
      });
  }, [api_key, capital]);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Current weather in {capital} (via OpenWeatherMap API)</h3>
      <p>
        <b>temperature:</b> {(weatherData.main.temp - 273.15).toFixed(1)}{" "}
        degrees Celsius, feels like{" "}
        {(weatherData.main.feels_like - 273.15).toFixed(1)} degrees Celsius.
      </p>
      <p>
        At the moment the weather is {weatherData.weather[0].main}, with{" "}
        {weatherData.weather[0].description}.
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt="Weather icon"
        ></img>
      </p>
      <p>
        wind: {weatherData.wind.speed} m/s, direction: {weatherData.wind.deg}{" "}
        degrees.
      </p>
    </div>
  );
};

export default WeatherInfo;
