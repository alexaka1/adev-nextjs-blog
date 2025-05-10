import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-core/presets-zod';
// import { z } from 'zod';

export const env = createEnv({
  server: {},
  client: {},
  experimental__runtimeEnv: {},
  extends: [vercel()],
});
