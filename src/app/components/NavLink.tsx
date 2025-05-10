'use client';

import { usePathname } from 'next/navigation';
import React, {
  type ComponentProps,
  type PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';

type CustomLinkProps = ComponentProps<typeof Link> & PropsWithChildren;

export default function NavLink({ href, children, ...props }: CustomLinkProps) {
  const path = usePathname();
  const [ariaCurrent, setAriaCurrent] =
    useState<React.AriaAttributes['aria-current']>(undefined);

  useEffect(() => {
    setAriaCurrent(href === path ? 'page' : undefined);
  }, [href, path]);
  return (
    <Link href={href} aria-current={ariaCurrent} {...props}>
      {children}
    </Link>
  );
}
