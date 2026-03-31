import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "111989aa304572a68381bc943dafa687"; // <-- Replace with your actual OpenWeather API key

  // Fetch weather
  const getWeather = async (queryCity) => {
    if (!queryCity) return;

    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "404") {
        alert("City not found");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (error) {
      alert("Error fetching data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Default city on load
  useEffect(() => {
    const defaultCity = "London";
    setCity(defaultCity);
    getWeather(defaultCity);
  }, []);

  // Dynamic background
  const getBackground = () => {
    if (!weather || !weather.weather || !weather.weather[0]) return "#f0f4f8";

    switch (weather.weather[0].main) {
      case "Clear": return "#87ceeb";
      case "Clouds": return "#d3d3d3";
      case "Rain": return "#a9a9a9";
      case "Snow": return "#fffafa";
      default: return "#f0f4f8";
    }
  };

  return (
    <div className="container" style={{ background: getBackground() }}>
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && getWeather(city)}
      />
      <button onClick={() => getWeather(city)}>Get Weather</button>

      {loading && <p>Loading...</p>}

      {weather && weather.weather && weather.weather[0] && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;