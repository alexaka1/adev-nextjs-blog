FROM --platform=$BUILDPLATFORM oven/bun:1.3.8-alpine@sha256:b0885548002187f088af5c7e04008f852c0a30cbe4192b5d75c3266a7f0b01f5 AS base
ARG CI=true
ARG NEXT_TELEMETRY_DISABLED
LABEL authors="alexaka1"

RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

FROM base AS builder
ARG VERCEL_PROJECT_PRODUCTION_URL
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN,env=SENTRY_AUTH_TOKEN \
    --mount=type=secret,id=NEXT_PUBLIC_SENTRY_DSN,env=NEXT_PUBLIC_SENTRY_DSN \
    bun run build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENV NODE_ENV=production

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["bun", "--bun", "server.js"]
