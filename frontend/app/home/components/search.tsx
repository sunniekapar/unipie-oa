'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
  const [location, setLocation] = useState<string>('');
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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

  return (
    <>
      <Input value={location} onChange={(e) => handleChange(e.target.value)} />
    </>
  );
}
