import Link from 'next/link';
import GitHub from '@/app/components/icons/github';
import X from '@/app/components/icons/x';

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About me' },
];

const socialLinks = [
  { href: '#', icon: GitHub, label: 'GitHub' },
  { href: '#', icon: X, label: 'X (Twitter)' },
];

export default function Footer() {
  return (
    <footer className="border-border mt-auto border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Alex Martossy. All rights reserved.
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              <a
                href="mailto:jobs.github@mail.martossy.hu"
                className="hover:text-primary transition-colors"
              >
                jobs.github@mail.martossy.hu
              </a>
            </p>
          </div>

          <nav
            className="flex flex-col items-center gap-4 md:flex-row md:gap-8"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  <Icon className={`size-2.5`} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
