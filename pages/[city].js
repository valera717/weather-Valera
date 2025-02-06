import { useRouter } from "next/router";

const API_KEY = "46af897914931fddfbe6bc87eee136b1";
const cities = ["moscow", "london", "paris"];

export async function getStaticPaths() {
  const paths = cities.map((city) => ({
    params: { city: city.toLowerCase() },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const city = params.city.toLowerCase();

  if (!cities.includes(city)) {
    return {
      props: { notFound: true },
    };
  }
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        notFound: true,
      };
    }
    return {
      props: { weather: data, notFound: false },
    };
  } catch (error) {
    return { notFound: true };
  }
}
export default function CityWeather({ weather, notFound }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Загружаем..</h1>;
  }

  if (notFound) {
    return (
      <div className="not-found">
        <h1>Такого города нет</h1>
        <p>Пожалуйста, выбери города - Москва, Лондон, Париж</p>
      </div>
    );
  }
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Погода в {weather.name}</h1>
      <p>Температура: {weather.main.temp}°C</p>
      <p>Ощущается как: {weather.main.feels_like}°C</p>
      <p>Условия: {weather.weather[0].description}</p>
      <p>Скорость ветра: {weather.wind.speed} m/s</p>
    </div>
  );
}
