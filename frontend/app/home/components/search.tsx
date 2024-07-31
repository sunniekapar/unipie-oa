'use client';

import { KeyboardEvent, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import locations from './locations.json';

export default function Search() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [location, setLocation] = useState<string>('');

  const handleSearch = useDebouncedCallback((value) => {
    console.log(`Searching... ${value}`);

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleChange = (value: string) => {
    setLocation(value);
    handleSearch(value);
  };

  const handleSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key != 'Enter') return;
  };

  return (
    <Command>
      <CommandInput
        value={location}
        onValueChange={(value) => handleChange(value)}
        onKeyDown={handleSubmit}
      />
      <CommandList>
        <CommandEmpty>No location found</CommandEmpty>
        <CommandGroup>
          {locations.map((location, index) => (
            <CommandItem
              key={index}
              className="flex justify-between gap-2.5 px-4 py-2.5 group"
            >
              <div className="inline-flex flex-col">
                <p>{location.name}</p>
                <small className="text-primary/70 group-hover:text-primary/100 transition-all duration-300">
                  {location.state}
                </small>
              </div>
              <p>{location.country}</p>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
