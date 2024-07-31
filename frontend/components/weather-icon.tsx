import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
} from 'lucide-react';

export default function WeatherIcon({ weather }: { weather: string }) {
  const weatherCode = weather.toLowerCase();
  if (weatherCode === 'thunderstorm') {
    <CloudLightning />;
  } else if (weatherCode === 'drizzle') {
    return <CloudDrizzle />;
  } else if (weatherCode === 'rain') {
    return <CloudRain />;
  } else if (weatherCode === 'snow') {
    return <CloudSnow />;
  } else if (weatherCode === 'clear') {
    return <Sun />;
  } else if (weatherCode === 'clouds') {
    return <Cloud />;
  } else {
    return <CloudFog />;
  }
}
