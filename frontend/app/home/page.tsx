import Search from './components/search';

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || '';

  return (
    <>
      <Search />
      {query}
    </>
  );
}
