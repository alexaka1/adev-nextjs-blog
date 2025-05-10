import { type MetadataRoute } from 'next';

export const APP_NAME = 'alexaka1.dev';
export const APP_DEFAULT_TITLE = 'alexaka1.dev';
// export const APP_TITLE_TEMPLATE = '%s | alexaka1.dev';
export const APP_DESCRIPTION = 'alexaka1.dev';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    id: '/?source=pwa',
    start_url: '/',
    scope: '/',
    display_override: ['standalone', 'fullscreen', 'minimal-ui', 'browser'],
    display: 'standalone',
    orientation: 'portrait-primary',
  };
}
