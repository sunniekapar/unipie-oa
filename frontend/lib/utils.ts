import {
  WeatherData,
  ForecastData,
  ForecastAPIData,
  WeatherAPIData,
} from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractForecastData(data: ForecastAPIData) {
  const weeklyData: ForecastData = {};
  if (!data) {
    return weeklyData;
  }
  data.list.forEach((entry) => {
    const day = unixToDayOfWeek(entry.dt);
    const { temp_min, temp_max } = entry.main;
    const icon = entry.weather[0].main;

    if (!weeklyData[day]) {
      weeklyData[day] = {
        minTemp: temp_min,
        maxTemp: temp_max,
        icon,
      };
    } else {
      weeklyData[day] = {
        minTemp: Math.min(temp_min, weeklyData[day].minTemp),
        maxTemp: Math.max(temp_max, weeklyData[day].maxTemp),
        icon,
      };
    }
  });
  return weeklyData;
}

function unixToDayOfWeek(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayIndex = date.getUTCDay();
  return daysOfWeek[dayIndex];
}

export function extractWeatherData(data: WeatherAPIData) {
  if (!data) return null;

  const { name } = data;
  const { temp, temp_min, temp_max } = data.main;
  const { description } = data.weather[0];

  const weatherData: WeatherData = {
    location: name,
    currentTemp: temp,
    minTemp: temp_min,
    maxTemp: temp_max,
    description: description,
  };

  return weatherData;
}
