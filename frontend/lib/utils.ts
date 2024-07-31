import { WeatherData, WeeklyData } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractForecastData(data: WeatherData) {
  const weeklyData: WeeklyData = {};
  if(!data) {
    return weeklyData
  }
  data.list.forEach((entry) => {
    const day = unixToDayOfWeek(entry.dt);
    const forecastedMinTemp = entry.main.temp_min;
    const forecastedMaxTemp = entry.main.temp_max;
    const icon = entry.weather[0].main;

    if (!weeklyData[day]) {
      weeklyData[day] = {
        minTemp: forecastedMinTemp,
        maxTemp: forecastedMaxTemp,
        icon,
      };
    } else {
      weeklyData[day] = {
        minTemp: Math.min(forecastedMinTemp, weeklyData[day].minTemp),
        maxTemp: Math.max(forecastedMaxTemp, weeklyData[day].maxTemp),
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