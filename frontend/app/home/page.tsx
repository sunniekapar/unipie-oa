import WeeklyForecast, {
  WeeklyForecastSkeleton,
} from './components/weekly-forecast';
import { Suspense } from 'react';
import { getForecast, getWeather } from '@/app/actions';
import SearchBar from './components/search-bar';
import Weather from './components/weather';

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { lat: string; lon: string };
}) {
  const coordinates = {
    lat: searchParams?.lat || '',
    lon: searchParams?.lon || '',
  };

  const forecastData = await getForecast(coordinates);
  const weatherData = await getWeather(coordinates);

  const [forecast, weather] = await Promise.all([forecastData, weatherData]);

  return (
    <main className="max-w-screen-sm container pt-16 space-y-12">
      <SearchBar />
      <Suspense fallback={<WeeklyForecastSkeleton />}>
        <Weather data={weather} />
        <WeeklyForecast data={forecast} />
      </Suspense>
    </main>
  );
}
