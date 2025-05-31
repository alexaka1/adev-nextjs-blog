import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-core/presets-zod';
import { z } from 'zod/v4';

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  extends: [vercel()],
});
