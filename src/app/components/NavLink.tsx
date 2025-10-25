'use client';

import { usePathname } from 'next/navigation';
import React, { type ComponentProps, type PropsWithChildren } from 'react';
import Link from 'next/link';

type CustomLinkProps = ComponentProps<typeof Link> & PropsWithChildren;

export default function NavLink({ href, children, ...props }: CustomLinkProps) {
  const path = usePathname();
  const ariaCurrent: React.AriaAttributes['aria-current'] =
    href === path ? 'page' : undefined;
  return (
    <Link href={href} aria-current={ariaCurrent} {...props}>
      {children}
    </Link>
  );
}
