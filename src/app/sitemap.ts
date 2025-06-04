import { type MetadataRoute } from 'next';

export const baseUrl = 'https://alexaka1.dev';

// this page is static, so new Date() will be the time of the last deployment
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: 'weekly',
    },
  ];
}
