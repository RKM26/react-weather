import React, {  useState } from "react";
require('dotenv').config();

const api = {
  base: "http://api.openweathermap.org/data/2.5/",
};

const App = (d) => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&APPID=${process.env.REACT_APP_KEY}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log("weather", result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className={(typeof weather.main != "undefined") ? (Math.round(weather.main.temp-273.15)>16) ? 'app warm' : 'app': 'app' }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            value={query}
            onKeyPress={search}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
          />
        </div>
        {typeof weather.main != "undefined" ? (
            <div>
            <div className="location-box">
            <div className="location"> {weather.name}, {weather.sys.country} </div>
            <br />
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <br />
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp-273.15) }°C</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
          </div>
        ) : ('')}
        
      </main>
    </div>
  );
};

export default App;
