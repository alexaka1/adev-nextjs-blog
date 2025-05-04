import type { MDXComponents } from 'mdx/types';
// import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-4xl font-bold tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 text-3xl font-bold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-2xl font-semibold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 mb-2 text-xl font-semibold">{children}</h4>
    ),
    p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
    a: ({ href, children }) => (
      <Link
        href={href as string}
        className="text-primary hover:text-primary/80 transition-colors"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => <ul className="my-4 list-disc pl-6">{children}</ul>,
    ol: ({ children }) => (
      <ol className="my-4 list-decimal pl-6">{children}</ol>
    ),
    li: ({ children }) => <li className="mt-2">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-primary/50 my-4 border-l-4 pl-4 italic">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-muted rounded px-1 py-0.5 text-foreground">
        {children}
      </code>
    ),
    // img: (props) => (
    //   <Image
    //     sizes="100vw"
    //     style={{ width: '100%', height: 'auto' }}
    //     {...(props as ImageProps)}
    //     alt={props.alt ?? ''}
    //   />
    // ),
    ...components,
  };
}
