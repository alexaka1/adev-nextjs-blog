import { type MetadataRoute } from 'next';

// this page is static, so new Date() will be the time of the last deployment
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://alexaka1.dev/',
      lastModified: new Date(),
      priority: 1,
      changeFrequency: 'weekly',
    },
  ];
}
