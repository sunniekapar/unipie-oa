'use client';

import { KeyboardEvent, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Location } from '@/types';
import { Input } from '@/components/ui/input';
import { getLocations } from '@/app/actions';

function cleanLocation(location: Location) {
  let { name, state, country } = location;
  name = name.toLowerCase().replaceAll(' ', '_');
  state = state ? state.toLowerCase().replaceAll(' ', '_') : '';
  console.log(`${name},${state}${state ? ',' : state}${country}`);
  return `${name},${state}${state ? ',' : state}${country}`;
}

export default function Search() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [search, setSearch] = useState<string>('');
  const [resultsShown, setResultsShown] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);

  const findAllLocations = useDebouncedCallback((location: string) => {
    if (location) {
      getLocations(location).then((result) => {
        setLocations(result);
      });
    } else setLocations([])
  }, 300);

  const chooseLocation = (location: Location) => {
    setResultsShown(false)
    const queryParam = cleanLocation(location);
    console.log(queryParam);
    const params = new URLSearchParams(searchParams);
    if (queryParam) {
      params.set('query', queryParam);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleValueChange = (location: string) => {
    setSearch(location);
    findAllLocations(location);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setResultsShown(false);
      chooseLocation(locations[0]);
    } else {
      setResultsShown(true);
    }
  };

  return (
    <section className="flex flex-col gap-6 relative">
      <Input
        value={search}
        onChange={(e) => handleValueChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {locations.length > 0 && resultsShown ? (
        <div className="absolute top-12 w-full z-10 bg-background/60 backdrop-blur-sm rounded-b-lg">
          {locations.map((location, index) => (
            <div
              onClick={() => chooseLocation(location)}
              key={index}
              className="flex justify-between items-center gap-1.5 px-4 py-2.5 group hover:bg-primary-foreground/90 hover:backdrop-blur-sm "
            >
              <div className="inline-flex flex-col">
                <p>{location.name}</p>
                <small className="text-primary/70 group-hover:text-primary/100 transition-all duration-300">
                  {location.state}
                </small>
              </div>
              <p>{location.country}</p>
            </div>
          ))}
        </div>
      ) : locations.length === 0 ? (
        <small className="self-center text-primary/70">No results</small>
      ) : null}
    </section>
  );
}
