import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { type Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: post.title,
    description: `Blog post by ${post.author}`,
    openGraph: {
      title: post.title,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return (await getAllBlogPosts()).map((file) => ({
    slug: file.slug,
  }));
}

// Blog post page component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Import the MDX content dynamically
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const MDXContent = await import(`@/content/blog/${params.slug}.mdx`);

  return (
    <div className="container mx-auto py-8">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <MDXContent.default />
      </article>
    </div>
  );
}
