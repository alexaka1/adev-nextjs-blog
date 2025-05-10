'use client';

import { useEffect, useState } from 'react';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavLink from '@/app/components/NavLink';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-16 text-center">
      <div
        className={`transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      >
        <h1 className="relative mb-6 text-9xl font-extrabold tracking-tight">
          <span
            className="animate-glitch-1 absolute top-0 left-0 w-full text-main-foreground"
            aria-hidden={true}
          >
            404
          </span>
          <span
            className="animate-glitch-2 absolute top-0 left-0 w-full text-main"
            aria-hidden={true}
          >
            404
          </span>
          <span
            className="animate-glitch-3 text-secondary absolute top-0 left-0 w-full"
            aria-hidden={true}
          >
            404
          </span>
          <span className="relative z-10">404</span>
        </h1>

        <h2 className="mb-8 text-2xl font-semibold">Oops! Page not found</h2>

        <p className="text-muted-foreground mx-auto mb-10 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <NavLink href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
}
