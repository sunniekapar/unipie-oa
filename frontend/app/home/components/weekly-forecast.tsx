import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ForecastData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WeatherIcon from '@/components/weather-icon';
import { Skeleton } from '@/components/ui/skeleton';

export default function WeeklyForecast({ data }: { data: ForecastData }) {
  if (Object.keys(data).length === 0) return <WeeklyForecastSkeleton />;

  let weeklyMinTemp = Infinity,
    weeklyMaxTemp = -Infinity;

  Object.keys(data).map((day) => {
    weeklyMinTemp = Math.min(data[day].minTemp, weeklyMinTemp);
    weeklyMaxTemp = Math.max(data[day].maxTemp, weeklyMaxTemp);
  });

  const range = weeklyMaxTemp - weeklyMinTemp;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>5 day forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {Object.entries(data).map(([day, data]) => {
                const { icon, minTemp, maxTemp } = data;
                const dailyTempRange = data.maxTemp - data.minTemp;
                const scalar = (dailyTempRange / range) * 100;
                const rightShift = ((minTemp - weeklyMinTemp) / range) * 100;
                return (
                  <TableRow key={day}>
                    <TableCell className="font-semibold text-lg">
                      {day}
                    </TableCell>
                    <TableCell>
                      <WeatherIcon weather={icon} />
                    </TableCell>
                    <TableCell>{Math.round(minTemp)}</TableCell>
                    <TableCell className="w-[100px] relative px-4 ">
                      <div
                        className={'bg-primary h-1 rounded-full'}
                        style={{
                          width: `${scalar}%`,
                          transform: `translateX(${rightShift}%)`,
                        }}
                      />
                    </TableCell>
                    <TableCell>{Math.round(maxTemp)}</TableCell>
                  </TableRow>
                );
              })}
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
