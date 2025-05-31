import type { MDXComponents } from 'mdx/types';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import { type AnchorHTMLAttributes, type PropsWithChildren } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 font-mono text-4xl font-bold tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 font-mono text-3xl font-bold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 font-mono text-2xl font-semibold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 mb-2 text-xl font-semibold">{children}</h4>
    ),
    p: ({ children }) => <p className="mb-4 font-mono leading-7">{children}</p>,
    a: ({
      href,
      children,
    }: PropsWithChildren & AnchorHTMLAttributes<typeof Link>) => (
      <Link
        href={href ?? '#'}
        target={`_blank`}
        className="font-mono text-main underline transition-colors hover:text-main/80"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="my-4 list-disc pl-6 font-mono">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 list-decimal pl-6 font-mono">{children}</ol>
    ),
    li: ({ children }) => <li className="mt-2 font-mono">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-main/50 pl-4 font-mono italic">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded bg-main/60 px-1 py-0.5 font-mono text-foreground">
        {children}
      </code>
    ),
    img: (props: ImageProps) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...props}
        alt={props.alt}
      />
    ),
    table: ({ children }) => <Table>{children}</Table>,
    thead: ({ children }) => <TableHeader>{children}</TableHeader>,
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    tfoot: ({ children }) => <TableFooter>{children}</TableFooter>,
    tr: ({ children }) => <TableRow>{children}</TableRow>,
    th: ({ children }) => <TableHead>{children}</TableHead>,
    td: ({ children }) => <TableCell>{children}</TableCell>,
    caption: ({ children }) => <TableCaption>{children}</TableCaption>,
    ...components,
  };
}
