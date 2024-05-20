import React, { useState } from "react";
import axios from "axios";

export default function Weather(props) {
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  function showTemp(response) {
    setMessage(
      <ul>
        <li>Weather: {Math.round(response.data.main.temp)}℃</li>
        <li>Description: {response.data.weather[0].description}</li>
        <li>Humidity: {response.data.main.humidity}%</li>
        <li>Wind: {Math.round(response.data.wind.speed)} km/h</li>
        <li>
          <img
            src={`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
            alt={response.data.weather[0].description}
          />
        </li>
      </ul>
    );
  }

  function handleError(error) {
    setMessage(<p>Sorry, we couldn't find the weather for "{city}". Please try again.</p>);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemp).catch(handleError);
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="WeatherSearch">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Type a city"
          onChange={changeCity}
        />
        <input type="submit" value="Search" />
      </form>
      <h2>{message}</h2>
    </div>
  );
}
