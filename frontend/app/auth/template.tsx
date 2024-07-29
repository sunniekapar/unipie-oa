import { SunIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import background from '@/public/background.jpg';

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-2">
      <section className="flex flex-col items-center gap-3.5 min-h-dvh pt-64">
        <SunIcon className="size-10" />
        <h1 className="font-semibold text-3xl">Weather App</h1>
        {children}
      </section>
      <section className="p-4 hidden lg:block">
        <div className="relative w-full h-full">
          <Image
            src={background}
            alt="background"
            placeholder="blur"
            fill
            className="brightness-50 rounded-lg opacity-55"
          />
        </div>
      </section>
    </div>
  );
}
