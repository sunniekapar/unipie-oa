'use client';

import { KeyboardEvent, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Location } from '@/types';
import { Input } from '@/components/ui/input';
import { getLocations } from '@/app/actions';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [search, setSearch] = useState<string>('');
  const [resultsShown, setResultsShown] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);

  const findAllLocations = useDebouncedCallback((location: string) => {
    if (location) getLocations(location).then((result) => setLocations(result));
    else setLocations([]);
  }, 300);

  const chooseLocation = (location: Location) => {
    setResultsShown(false);
    const { lat, lon } = location;
    const params = new URLSearchParams(searchParams);

    if (lat && lon) {
      params.set('lat', lat.toString());
      params.set('lon', lon.toString());
    } else {
      params.delete('lat');
      params.delete('lon');
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
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Input
          className="border-0 focus-visible:ring-0"
          value={search}
          onChange={(e) => handleValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a location..."
        />
      </div>
      {locations.length > 0 && resultsShown ? (
        <div className="absolute top-12 w-full z-10 bg-background/85 backdrop-blur-sm rounded-b-lg divide-background divide-y-2">
          {locations.map((location, index) => (
            <div
              onClick={() => chooseLocation(location)}
              key={index}
              className="flex justify-between items-center gap-1.5 px-4 py-2.5 group transition-all duration-300 hover:bg-primary-foreground/90 hover:backdrop-blur-sm"
            >
              <div className="inline-flex flex-col">
                <p>{location.name}</p>
                <small className="text-primary/70 group-hover:text-primary/100">
                  {location.state}
                </small>
              </div>
              <p>{location.country}</p>
            </div>
          ))}
        </div>
      ) : locations.length === 0 && search != '' ? (
        <small className="self-center text-primary/70">No results</small>
      ) : null}
    </section>
  );
}
