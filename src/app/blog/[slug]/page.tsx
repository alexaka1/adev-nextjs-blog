import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/blog';
import { type Metadata } from 'next';
import fs from 'fs';
import path from 'path';

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
  const blogDir = path.join(process.cwd(), 'src', 'app', 'blog');
  const directories = fs
    .readdirSync(blogDir)
    .filter(
      (dir) =>
        fs.statSync(path.join(blogDir, dir)).isDirectory() &&
        !dir.startsWith('[') &&
        dir !== 'components',
    );

  return directories.map((slug) => ({
    slug,
  }));
}

// Blog post page component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // This is a special case - we're not actually rendering the content here
  // Instead, we're redirecting to the actual page.mdx file in the directory
  // This allows us to use the dynamic route for SEO and URL structure
  // while still using the MDX file for content

  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // The actual content is rendered by the page.mdx file in the directory
  // This component won't be used for rendering, but is needed for the dynamic route
  return null;
}
