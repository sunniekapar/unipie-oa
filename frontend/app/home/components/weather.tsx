import { Skeleton } from '@/components/ui/skeleton';
import { WeatherData } from '@/types';

export default function Weather({ data }: { data: WeatherData }) {
  if (!data) return <WeatherSkeleton />;
  return (
    <section className="flex flex-col gap-3 items-center text-center">
      <h2 className="font-semibold text-2xl">{data.location}</h2>
      <h1 className="text-6xl font-bold">{Math.round(data.currentTemp)}&deg;C</h1>
      <p>
        {data.description
          .split(' ')
          .map((word) => word[0].toUpperCase() + word.substring(1))
          .join(' ')}
      </p>
      <div className="flex gap-3 opacity-65">
        <p>H:{Math.round(data.maxTemp)}</p>
        <p> L:{Math.round(data.minTemp)}</p>
      </div>
    </section>
  );
}

export function WeatherSkeleton() {
  return (
    <section className="flex flex-col gap-3 items-center">
      <Skeleton className="w-1/2 h-6" />
      <Skeleton className="rounded-full size-36" />
      <Skeleton className="w-1/4 h-4" />
      <Skeleton className="w-1/3 h-4" />
    </section>
  );
}
