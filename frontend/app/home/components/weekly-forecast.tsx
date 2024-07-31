import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { WeeklyData } from '../page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
} from 'lucide-react';

const getWeatherIcon = (weather: string) => {
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
};
export default function WeeklyForecast({ data }: { data: WeeklyData }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>5 day forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {Object.entries(data).map(([day, data]) => (
                <TableRow key={day}>
                  <TableCell>{day}</TableCell>
                  <TableCell>{getWeatherIcon(data.icon)}</TableCell>
                  <TableCell className="inline-flex">
                    {data.minTemp}
                    <div className="w-20" />
                    {data.maxTemp}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
