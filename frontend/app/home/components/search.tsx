'use client';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useState } from 'react';

export default function Search() {
  const [location, setLocation] = useState<string>('');
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setLocation(event.target.value);
  };
  return <Input value={location} onChange={handleSearch} />;
}
