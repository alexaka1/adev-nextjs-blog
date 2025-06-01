import type { MDXComponents } from 'mdx/types';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import {
  type AnchorHTMLAttributes,
  JSX,
  type PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
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

export const customComponents = {
  h1: ({ children }: { children: ReactNode }) => {
    const slug = slugify(children);
    return (
      <h1
        id={slug}
        className="mt-8 mb-4 font-mono text-4xl font-extrabold tracking-tight capitalize"
      >
        <a href={`#${slug}`} key={`link-${slug}`}>
          {children}
        </a>
      </h1>
    );
  },
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: customComponents.h1,
    h2: ({ children }) => {
      const slug = slugify(children);
      return (
        <h2
          id={slugify(children)}
          className="mt-8 mb-4 font-mono text-3xl font-bold tracking-tight capitalize"
        >
          <a href={`#${slug}`} key={`link-${slug}`}>
            {children}
          </a>
        </h2>
      );
    },
    h3: ({ children }) => {
      const slug = slugify(children);
      return (
        <h3
          id={slugify(children)}
          className="mt-6 mb-3 font-mono text-2xl font-semibold capitalize"
        >
          <a href={`#${slug}`} key={`link-${slug}`}>
            {children}
          </a>
        </h3>
      );
    },
    h4: ({ children }) => {
      const slug = slugify(children);
      return (
        <h4 id={slugify(children)} className="mt-4 mb-2 text-xl font-semibold">
          <a href={`#${slug}`} key={`link-${slug}`}>
            {children}
          </a>
        </h4>
      );
    },
    h5: ({ children }) => {
      const slug = slugify(children);
      return (
        <h5 id={slugify(children)} className="mt-4 mb-2 text-lg font-semibold">
          <a href={`#${slug}`} key={`link-${slug}`}>
            {children}
          </a>
        </h5>
      );
    },
    h6: ({ children }) => {
      const slug = slugify(children);
      return (
        <h6 id={slugify(children)} className="mt-4 mb-2 text-lg font-medium">
          <a href={`#${slug}`} key={`link-${slug}`}>
            {children}
          </a>
        </h6>
      );
    },
    p: ({ children }) => <p className="mb-4 font-mono leading-7">{children}</p>,
    a: (props) => <CustomLink {...props} />,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function slugify(str: any): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    str
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .toString()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .toLowerCase()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .trim() // Remove whitespace from both ends of a string
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .replace(/\s+/g, '-') // Replace spaces with -
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .replace(/&/g, '-and-') // Replace & with 'and'
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .replace(/\-\-+/g, '-')
  ); // Replace multiple - with single -
}

function CustomLink(
  props: PropsWithChildren & AnchorHTMLAttributes<typeof Link>,
) {
  const href = props.href ?? '#';

  if (href.startsWith('/')) {
    return (
      <Link
        href={href}
        className={`font-mono text-main underline transition-colors hover:text-main/80`}
        {...props}
      >
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a
        className={`font-mono text-main underline transition-colors hover:text-main/80`}
        {...props}
      />
    );
  }

  return (
    <a
      className={`font-mono text-main underline transition-colors hover:text-main/80`}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}
