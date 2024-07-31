import Search from './components/search';
import WeeklyForecast from './components/weekly-forecast';
import { Suspense } from 'react';
import { getForecast, getWeather } from '@/lib/weather';

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || '';

  const forecastData = await getForecast(query);
  const weatherData = await getWeather(query);

  const [forecast, weather] = await Promise.all([forecastData, weatherData]);

  return (
    <main className="max-w-screen-sm container pt-16 space-y-6">
      <Search />
      <Suspense fallback={<>Loading...</>}>
        <WeeklyForecast data={forecast} />
      </Suspense>
      {query}
    </main>
  );
}
