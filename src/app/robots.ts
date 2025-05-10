import { type MetadataRoute } from 'next';
import { env } from '@/lib/env';

const sitename = env.VERCEL_PROJECT_PRODUCTION_URL ?? 'alexaka1.dev';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: `https://${sitename}/sitemap.xml`,
  };
}
