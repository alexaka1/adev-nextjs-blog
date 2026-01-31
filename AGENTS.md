# Coding Agent Instructions

This document provides essential information for coding agents working on this repository. Trust these instructions and only search the codebase if information here is incomplete or in error.

## Repository Overview

This is a **Next.js 16 personal blog** built with **Bun** as the package manager and runtime. The site uses TypeScript, React 19, Tailwind CSS 4, and MDX for blog content. It includes Sentry for error tracking and monitoring.

**Key Technologies:**
- **Runtime/Package Manager:** Bun 1.3.7 (specified in `.bun-version`)
- **Framework:** Next.js 16.x (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.x with shadcn/ui components
- **Content:** MDX with remark/rehype plugins
- **Linting:** oxlint (not ESLint)
- **Formatting:** oxfmt and Prettier

## Build and Validation Commands

**ALWAYS run these commands in order:**

### 1. Install Dependencies
```bash
bun install
```
Dependencies are pre-installed in CI via copilot-setup-steps workflow. In local development, always run this first.

### 2. Linting (Required before build)
```bash
bun run lint
```
Uses oxlint with type-aware checking. Expected output: "Found 0 warnings and 0 errors." Takes ~1 second.

### 3. Build
```bash
SKIP_T3_ENV_VALIDATION=true bun run build
```
**IMPORTANT:** Always set `SKIP_T3_ENV_VALIDATION=true` when building without Sentry environment variables configured. This prevents validation errors for `NEXT_PUBLIC_SENTRY_DSN`. Build takes ~20-30 seconds.

### 4. Development Server
```bash
bun run dev
```
Starts development server at http://localhost:3000

## CI/CD Workflow

The **Lint workflow** (`.github/workflows/lint.yml`) runs on all PRs and performs:
1. `bun install --frozen-lockfile`
2. oxlint action
3. `bun run lint`
4. `bun run build` with `SKIP_T3_ENV_VALIDATION=true`

**To replicate CI locally:**
```bash
bun install --frozen-lockfile
bun run lint
SKIP_T3_ENV_VALIDATION=true bun run build
```

## Project Structure

```
/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── blog/               # Blog listing and [slug] pages
│   │   ├── components/         # App-specific components
│   │   ├── globals.css         # Global styles and Tailwind imports
│   │   └── manifest.ts         # PWA manifest
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   └── pagination.tsx      # Pagination component
│   ├── content/
│   │   ├── blog/               # MDX blog posts
│   │   └── utils.ts            # Blog post utilities
│   ├── lib/
│   │   ├── env.ts              # T3 Env validation (Zod)
│   │   └── utils.ts            # Utility functions (cn)
│   ├── mdx-components.tsx      # MDX component overrides
│   ├── instrumentation.ts      # Sentry instrumentation
│   └── instrumentation-client.ts
├── .github/workflows/
│   ├── lint.yml                # CI: lint and build
│   └── copilot-setup-steps.yml # Agent environment setup
├── next.config.ts              # Next.js + Sentry config
├── tsconfig.json               # TypeScript config
├── .oxlintrc.json              # Linter config
├── .oxfmtrc.jsonc              # Formatter config
├── package.json                # Dependencies and scripts
├── bun.lock                    # Lockfile
└── .bun-version                # Bun version: 1.3.7
```

## Configuration Files

| File | Purpose |
|------|---------|
| `.oxlintrc.json` | Linter rules (oxlint, not ESLint) |
| `.oxfmtrc.jsonc` | Formatter settings |
| `prettier.config.js` | Prettier (Tailwind plugin) |
| `tsconfig.json` | TypeScript with path alias `@/*` → `./src/*` |
| `next.config.ts` | Next.js with MDX and Sentry |
| `components.json` | shadcn/ui configuration |
| `.editorconfig` | Editor settings |

## Important Notes

### Path Aliases
Always use `@/` for imports from `src/`:
```typescript
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
```

### Environment Variables
- `SKIP_T3_ENV_VALIDATION=true` - Required for builds without Sentry DSN
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry DSN (required in production)
- `SENTRY_AUTH_TOKEN` - Sentry auth token (for source map uploads)

### Adding UI Components
Use shadcn/ui CLI:
```bash
bunx --bun shadcn@latest add <component>
```
Components are installed to `src/components/ui/`.

### Adding Blog Posts
Create MDX files in `src/content/blog/` with frontmatter:
```yaml
---
title: "Post Title"
publishedAt: "2024-01-15"
summary: "Brief description"
author: "Author Name"
---
```

### No Test Suite
This repository does not have a test suite configured. There is no `test` script.

### Formatting Note
The `bun run fmt` command may show errors for non-JS/TS files due to external formatter issues with oxfmt. This is a known issue and does not affect the CI build.
