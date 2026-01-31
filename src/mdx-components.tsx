import type { MDXComponents } from 'mdx/types';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import { HashIcon } from 'lucide-react';
import React, {
  isValidElement,
  type AnchorHTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
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

function HeadingLink({
  children,
  slug,
}: Readonly<PropsWithChildren & { slug: string }>) {
  return (
    <>
      <HashIcon
        className={`invisible absolute top-1/2 -left-4 size-6 -translate-1/2 group-hover/title:visible`}
        aria-hidden={true}
      />
      <Link href={`#${slug}`} key={`link-${slug}`}>
        {children}
      </Link>
    </>
  );
}

/**
 * Safely convert a ReactNode to a string.
 * Handles strings, numbers, booleans, arrays, null/undefined, and React elements by
 * recursively extracting their children text.
 */
function reactNodeToString(node: ReactNode): string {
  if (node === null || node === undefined) return '';
  if (
    typeof node === 'string' ||
    typeof node === 'number' ||
    typeof node === 'boolean'
  ) {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(reactNodeToString).join('');
  }
  if (isValidElement(node)) {
    // If it's a React element, try to extract its children
    const element = node as React.ReactElement<{ children?: ReactNode }>;
    return reactNodeToString(element.props.children);
  }
  // Fallback to empty string for other types
  return '';
}

export const customComponents = {
  h1: ({ children }: { children: ReactNode }) => {
    const slug = slugify(children);
    return (
      <h1
        id={slug}
        className="group/title relative mt-8 mb-4 font-mono text-4xl font-extrabold tracking-tight capitalize"
      >
        <HeadingLink slug={slug}>{children}</HeadingLink>
      </h1>
    );
  },
};

// noinspection JSUnusedGlobalSymbols
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: customComponents.h1,
    h2: ({ children }: { children: ReactNode }) => {
      const slug = slugify(children);
      return (
        <h2
          id={slug}
          className="group/title relative mt-8 mb-4 font-mono text-3xl font-bold tracking-tight capitalize"
        >
          <HeadingLink slug={slug}>{children}</HeadingLink>
        </h2>
      );
    },
    h3: ({ children }: { children: ReactNode }) => {
      const slug = slugify(children);
      return (
        <h3
          id={slug}
          className="group/title relative mt-6 mb-3 font-mono text-2xl font-semibold capitalize"
        >
          <HeadingLink slug={slug}>{children}</HeadingLink>
        </h3>
      );
    },
    h4: ({ children }: { children: ReactNode }) => {
      const slug = slugify(children);
      return (
        <h4
          id={slug}
          className="group/title relative mt-4 mb-2 text-xl font-semibold"
        >
          <HeadingLink slug={slug}>{children}</HeadingLink>
        </h4>
      );
    },
    h5: ({ children }: { children: ReactNode }) => {
      const slug = slugify(children);
      return (
        <h5
          id={slug}
          className="group/title relative mt-4 mb-2 text-lg font-semibold"
        >
          <HeadingLink slug={slug}>{children}</HeadingLink>
        </h5>
      );
    },
    h6: ({ children }: { children: ReactNode }) => {
      const slug = slugify(children);
      return (
        <h6
          id={slug}
          className="group/title relative mt-4 mb-2 text-lg font-medium"
        >
          <HeadingLink slug={slug}>{children}</HeadingLink>
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
      <InlineCode>{children}</InlineCode>
    ),
    pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
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

function slugify(node: ReactNode): string {
  const str = reactNodeToString(node);
  return str
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters except for -
    .replace(/--+/g, '-'); // Replace multiple - with single -
}

function CustomLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
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
      <Link
        href={href}
        className={`font-mono text-main underline transition-colors hover:text-main/80`}
        {...props}
      />
    );
  }

  return (
    <Link
      href={href}
      className={`font-mono text-main underline transition-colors hover:text-main/80`}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

const CodeBlock = ({ children }: { children: ReactNode }) => (
  <pre className="bg-[var(--code-block-bg)] text-[var(--code-block-text)] border border-[color-mix(in_oklch,var(--code-block-text)_15%,transparent)] rounded-xl px-4 py-3 shadow-[0_10px_30px_color-mix(in_oklch,var(--code-block-bg)_40%,transparent)] overflow-x-auto">
    <code className="bg-transparent text-[inherit] text-[0.95rem] leading-[1.6]">
      {children}
    </code>
  </pre>
);

const InlineCode = ({ children }: { children: ReactNode }) => (
  <code className="bg-[var(--code-inline-bg)] text-[var(--code-inline-text)] border border-[color-mix(in_oklch,var(--code-inline-text)_30%,transparent)] rounded-lg px-[0.45em] py-[0.15em] font-semibold">
    {children}
  </code>
);
