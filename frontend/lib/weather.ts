import { extractForecastData } from './utils';

export async function getForecast(query: string) {
  const response = await fetch(
    `http://localhost:5000/forecast?location=${query}`
  );
  const { data } = await response.json();
  return extractForecastData(data);
}

export async function getWeather(query: string) {
  const response = await fetch(
    `http://localhost:5000/weather?location=${query}`
  );
  const { data } = await response.json();
  return data;
}

