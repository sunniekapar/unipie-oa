import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { WeeklyData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WeatherIcon from '@/components/weather-icon';
import { Skeleton } from '@/components/ui/skeleton';

export default function WeeklyForecast({ data }: { data: WeeklyData }) {
  if (Object.keys(data).length === 0) return <WeeklyForecastSkeleton />;

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
                  <TableCell>
                    <WeatherIcon weather={data.icon} />
                  </TableCell>
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

export function WeeklyForecastSkeleton() {
  let rows = [0, 1, 2, 3, 4];
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>5 day forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {rows.map((index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="w-full h-8 my-2" />
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
