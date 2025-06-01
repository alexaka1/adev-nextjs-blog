import Link from 'next/link';
import { getPaginatedBlogPosts } from '@/lib/blog';
import { type Metadata } from 'next';
import { Pagination } from '@/components/pagination';

interface BlogIndexPageProps {
  searchParams: {
    page?: string;
  };
}

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest blog posts',
};

export default async function BlogIndexPage({
  searchParams,
}: BlogIndexPageProps) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = 5; // Number of posts per page

  const {
    posts,
    totalPages,
    currentPage: validatedPage,
  } = await getPaginatedBlogPosts(currentPage, pageSize);

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold">Blog Posts</h1>

      <div className="space-y-8">
        {posts.length === 0 ?
          <p>No blog posts found.</p>
        : posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="mb-2 text-2xl font-bold hover:text-main">
                  {post.title}
                </h2>
                <div className="mb-4 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>By {post.author}</span>
                  <span>•</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-main hover:underline">Read more →</span>
                </div>
              </Link>
            </article>
          ))
        }
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={validatedPage}
            totalPages={totalPages}
            baseUrl="/blog"
          />
        </div>
      )}
    </div>
  );
}
