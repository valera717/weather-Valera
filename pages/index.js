import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function HomePage() {
  const [weatherData, setWeatherData] = useState([]);
  const API_KEY = "46af897914931fddfbe6bc87eee136b1";
  const cities = ["Moscow", "London", "Tokyo"];
  const fetchWeather = async () => {
    try {
      const data = await Promise.all(
        cities.map(async (city) => {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
          );
          return res.json();
        })
      );
      setWeatherData(data);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };
  useEffect(() => {
    fetchWeather();
  }, []);
  return (
    <div className="main-container">
      <Head>
        <title>Погода в трёх города</title>
        <meta
          name="description"
          content="Посмотрите погоду в Москве, Лондоне и Токио. Узнайте актуальную информацию о температуре, погодных условиях и скорости ветра."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Погода в трёх городах" />
        <meta
          property="og:description"
          content="Посмотрите погоду в Москве, Лондоне и Токио."
        />
        <meta property="og:image" content="URL_картинки" />
        <meta property="og:url" content="http://localhost:3000" />
      </Head>
      <h1>Погода в трёх городах</h1>
      <div style={{ marginTop: "20px" }}>
        <Link href="/weather" className="weather-link">
          Узнать погоду
        </Link>
      </div>

      <div className="weather-cards">
        {weatherData.map((weather, index) => (
          <div key={index} className="weather-card">
            <h2>{weather.name}</h2>
            <p>Температура: {weather.main?.temp}°C</p>
            <p>Ощущается как: {weather.main?.feels_like}°C</p>
            <p>Условия: {weather.weather?.[0]?.description}</p>
            <p>Скорость ветра: {weather.wind?.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
}
