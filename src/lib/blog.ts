import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
  const files = fs.readdirSync(blogDir).filter(
    (file) =>
      file.endsWith('.mdx') &&
      !file.startsWith('[') && // Exclude dynamic route files
      fs.statSync(path.join(blogDir, file)).isFile()
  );

  const posts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');

      // Extract frontmatter using regex
      const titleMatch = fileContent.match(
        /export const title = ["'](.+)["'];/,
      );
      const dateMatch = fileContent.match(/export const date = ["'](.+)["'];/);
      const authorMatch = fileContent.match(
        /export const author = ["'](.+)["'];/,
      );

      if (!titleMatch || !dateMatch) return null;

      // Extract slug from filename (remove .mdx extension)
      const slug = file.replace(/\.mdx$/, '');

      return {
        slug,
        title: titleMatch[1],
        date: dateMatch[1],
        author: authorMatch ? authorMatch[1] : 'Unknown',
        content: fileContent,
      };
    }),
  );

  // Filter out null values and sort by date (newest first)
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get a single blog post by slug
export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

// Get paginated blog posts
export async function getPaginatedBlogPosts(
  page: number = 1,
  pageSize: number = 5,
): Promise<{
  posts: BlogPost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}> {
  const allPosts = await getAllBlogPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage,
  };
}
