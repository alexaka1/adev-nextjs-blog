import Link from 'next/link';
import { type Metadata } from 'next';
import { Pagination } from '@/components/pagination';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPaginatedBlogPosts } from '@/content/utils';

interface BlogIndexPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest blog posts',
};

export default async function BlogIndexPage({
  searchParams,
}: BlogIndexPageProps) {
  const searchParamsAwaited = await searchParams;
  const currentPage =
    searchParamsAwaited.page ? parseInt(searchParamsAwaited.page) : 1;
  const pageSize = 5; // Number of posts per page

  const {
    posts,
    totalPages,
    currentPage: validatedPage,
  } = getPaginatedBlogPosts(currentPage, pageSize);

  return (
    <article className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold capitalize">Blog posts</h1>

      <div className="space-y-8">
        {posts.length === 0 ?
          <p>No blog posts found.</p>
        : posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <h2>{post.metadata.title}</h2>
                    </CardTitle>
                    <CardDescription className={`flex items-center space-x-2`}>
                      <span>By {post.metadata.author}</span>
                      <span className={`sr-only`}>on</span>
                      <span aria-hidden={true}>•</span>
                      <time dateTime={post.metadata.publishedAt}>
                        {new Date(
                          post.metadata.publishedAt,
                        ).toLocaleDateString()}
                      </time>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mb-4 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    {post.metadata.summary}
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-main hover:underline">
                      Read more →
                    </span>
                  </CardFooter>
                </Card>
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
    </article>
  );
}
