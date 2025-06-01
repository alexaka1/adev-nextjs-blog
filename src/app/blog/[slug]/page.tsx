import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { getBlogPosts } from '@/content/utils';
import { baseUrl } from '@/app/sitemap';
import { customComponents } from '@/mdx-components';

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
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) {
    return {};
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image ?? `${baseUrl}/og?title=${encodeURIComponent(title)}`;

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
        <customComponents.h1>{post.metadata.title}</customComponents.h1>
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
