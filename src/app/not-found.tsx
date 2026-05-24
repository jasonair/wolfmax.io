import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { Wave } from '@/components/Wave';

export default function NotFound() {
  return (
    <div className="surface-cream min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <Logo variant="dark" className="mb-12 opacity-60 w-36" />

      <p className="eyebrow mb-6">Error 404</p>

      <h1 className="font-display text-8xl sm:text-[10rem] text-navy leading-none mb-6">
        404
      </h1>

      <p className="text-xl text-mute max-w-sm mb-12 leading-relaxed">
        We couldn&apos;t find that page. It may have moved or never existed.
      </p>

      <Button variant="blue" href="/" withArrow>
        Back home
      </Button>

      <div className="mt-16 text-blue opacity-30 w-full max-w-xs">
        <Wave />
      </div>
    </div>
  );
}
