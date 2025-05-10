'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/app/components/theme-toggle';
import { Button } from '@/components/ui/button';
import NavLink from '@/app/components/NavLink';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navLinks = [
  // { href: '/blog', label: 'Blog' },
  // { href: '/projects', label: 'Projects' },
  { href: '/', label: 'About me' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <NavLink
          href="/"
          className="inline-flex flex-row items-center justify-center gap-2 text-xl font-bold"
        >
          <Avatar>
            <AvatarImage
              src="https://github.com/alexaka1.png"
              alt="@alexaka1"
            />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          alexaka1.dev
        </NavLink>

        {/* Mobile menu button */}
        <Button
          className="md:hidden"
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
              className="transition-colors hover:text-main"
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
                  className="block py-2 transition-colors hover:text-main"
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
