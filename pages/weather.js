import { useState } from "react";

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "46af897914931fddfbe6bc87eee136b1";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
      } else {
        setWeather(null);
        alert("Город не найден. Попробуй ещё раз.");
      }
    } catch (error) {
      console.error("Ошибка при запросе погоды:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Страница погоды</h1>
      <input
        type="text"
        placeholder="Введите город"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />

      <button
        onClick={fetchWeather}
        style={{
          padding: "10px 20px",
          marginLeft: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      ></button>

      {weather ? (
        <div style={{ marginTop: "20px" }}>
          <h2>Погода в {weather.name}</h2>
          <p>Температура: {weather.main.temp}°C</p>
          <p>Ощущается как: {weather.main.feels_like}°C</p>
          <p>Погодные условия: {weather.weather[0].description}</p>
          <p>Скорость ветра: {weather.wind.speed} m/s</p>
        </div>
      ) : null}
    </div>
  );
}
