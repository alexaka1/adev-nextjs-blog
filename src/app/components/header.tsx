'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/app/components/theme-toggle';
import { Button } from '@/components/ui/button';
import NavLink from '@/app/components/NavLink';

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About me' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <NavLink href="/" className="text-xl font-bold">
          alexaka1.dev
        </NavLink>

        {/* Mobile menu button */}
        <Button
          className="md:hidden"
          variant={'outline'}
          size={'icon'}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
          title={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ?
            <X size={24} />
          : <Menu size={24} />}
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav
          className="border-t border-border px-4 py-4 md:hidden"
          aria-label="Primary"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  className="block py-2 transition-colors hover:text-primary"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="py-2">
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
