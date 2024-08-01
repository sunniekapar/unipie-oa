import { extractForecastData } from './utils';

export async function getForecast(coordinates: { lat: string; lon: string }) {
  const response = await fetch(
    `http://localhost:5000/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}`
  );
  const { data } = await response.json();
  return extractForecastData(data);
}

export async function getWeather(coordinates: { lat: string; lon: string }) {
  const response = await fetch(
    `http://localhost:5000/weather?lat=${coordinates.lat}&lon=${coordinates.lon}`
  );
  const { data } = await response.json();
  return data;
}
