import GitHub from '@/app/components/icons/github';
import X from '@/app/components/icons/x';
// import NavLink from '@/app/components/NavLink';
//
// const navLinks: Record<string, string>[] = [
//   // { href: '/blog', label: 'Blog' },
//   // { href: '/projects', label: 'Projects' },
//   // { href: '/about', label: 'About me' },
// ];

const socialLinks = [
  {
    href: 'https://github.com/alexaka1/adev-nextjs-blog',
    icon: GitHub,
    label: 'GitHub',
  },
  { href: 'https://x.com/alexaka1', icon: X, label: 'X (Twitter)' },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Alex Martossy. All rights reserved.
            </p>
            {/*<p className="mt-1 text-sm text-muted-foreground">*/}
            {/*  <a*/}
            {/*    href="mailto:jobs.github@mail.martossy.hu"*/}
            {/*    className="transition-colors hover:text-primary"*/}
            {/*  >*/}
            {/*    jobs.github@mail.martossy.hu*/}
            {/*  </a>*/}
            {/*</p>*/}
          </div>

          {/*<nav*/}
          {/*  className="flex flex-col items-center gap-4 md:flex-row md:gap-8"*/}
          {/*  aria-label="Primary"*/}
          {/*>*/}
          {/*  {navLinks.map((link) => (*/}
          {/*    <NavLink*/}
          {/*      key={link.href}*/}
          {/*      href={link.href}*/}
          {/*      className="text-sm transition-colors hover:text-primary"*/}
          {/*    >*/}
          {/*      {link.label}*/}
          {/*    </NavLink>*/}
          {/*  ))}*/}
          {/*</nav>*/}

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-primary"
                  aria-label={link.label}
                >
                  <Icon className={`size-4 dark:fill-white`} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
