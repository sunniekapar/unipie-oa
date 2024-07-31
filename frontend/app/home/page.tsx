import Search from './components/search';
import forecast from './components/forecast.json';
import WeeklyForecast from './components/weekly-forecast';
export default async function HomePage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || '';
  const weeklyData = weekly(forecast);

  return (
    <main className='max-w-screen-sm container pt-16 space-y-6'>
      <Search />
      <WeeklyForecast data={weeklyData} />
      {query}
    </main>
  );
}

export type WeeklyData = Record<
  string,
  {
    minTemp: number;
    maxTemp: number;
    icon: string;
  }
>;

const weekly = (data: typeof forecast) => {
  const weeklyData: WeeklyData = {};

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
};

function unixToDayOfWeek(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayIndex = date.getUTCDay();
  return daysOfWeek[dayIndex];
}
