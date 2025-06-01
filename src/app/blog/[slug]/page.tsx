import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { type Metadata } from 'next';
import { getBlogPosts } from '@/content/utils';
import { baseUrl } from '@/app/sitemap';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useMDXComponents } from '@/mdx-components';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata | null> {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) {
    return null;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage =
    image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// Blog post page component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  // Import the MDX content dynamically
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const MDXContent = await import(`@/content/blog/${slug}.mdx`);
  return (
    <div className="container mx-auto py-8">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <h1 className="mt-8 mb-4 font-mono text-4xl font-extrabold tracking-tight capitalize">
          {post.metadata.title}
        </h1>
        <span
          className={`mt-2 mb-4 text-xl font-light text-gray-600 italic dark:text-foreground/75`}
        >
          {post.metadata.summary}
        </span>
        <p>
          <span className={`mb-8 flex items-center space-x-2 text-sm`}>
            By {post.metadata.author}
            {' | '}
            <time dateTime={post.metadata.publishedAt}>
              {new Date(post.metadata.publishedAt).toLocaleDateString()}
            </time>
          </span>
        </p>
        <MDXContent.default />
      </article>
    </div>
  );
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}
