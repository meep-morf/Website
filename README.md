# NomadLabz Website

Premium Next.js website for **NomadLabz** — software engineering and cybersecurity under the creative direction *The Invisible Operating Layer*.

## Stack

- Next.js App Router (React + TypeScript strict)
- Tailwind CSS v4
- Motion for React
- next/font + next/image
- Zod + Resend (contact API)
- Playwright e2e
- ESLint + Prettier

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/services` | Capabilities |
| `/cybersecurity` | Cybersecurity |
| `/solutions` | Industry solutions |
| `/portfolio` | Work index |
| `/portfolio/[slug]` | Case detail |
| `/about` | Company |
| `/contact` | Contact + form |

Permanent redirects from legacy `*.html` paths are configured in `next.config.ts`.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript `--noEmit` |
| `npm run test` | typecheck + lint |
| `npm run test:e2e` | Playwright smoke tests (requires build first) |
| `npm run check:links` | Link integrity (starts `next start` on :4310) |
| `npm run format` | Prettier write |

Recommended verification sequence:

```bash
npm run build
npm run test
npx playwright install chromium
npm run test:e2e
npm run check:links
```

## Environment variables

Set these in Vercel (Production / Preview) and locally in `.env.local`:

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (no trailing slash), e.g. `https://nomadlabz.com` |
| `RESEND_API_KEY` | For live email | From [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | Recommended | Defaults to `projects@nomadlabz.com` |
| `CONTACT_FROM_EMAIL` | For live email | Must be a verified Resend sender, e.g. `NomadLabz <hello@yourdomain.com>` |

If Resend is not configured, the contact API returns an honest **fallback** instructing users to email `projects@nomadlabz.com`.

## Brand assets

Official logos live in `public/brand/` (copied from the original `Images/` lockups). Do not recolor or redraw them.

## Content integrity

- Portfolio external links are verified live URLs only.
- Confidential projects are listed without client identifiers or invented metrics.
- About page does not invent team size, office addresses, or founding years.

## Deploy (Vercel)

1. Push to the GitHub remote connected to Vercel (this repo’s `origin`).
2. Framework preset: **Next.js** (auto-detected).
3. Set env vars above in the Vercel project.
4. Deploy — Vercel builds with `next build`.

Security headers (CSP, HSTS, frame denial, etc.) are applied via `next.config.ts` and reinforced in `vercel.json`.

## Project structure

```
src/app/           # routes, API, sitemap, robots, OG image
src/components/    # layout, sections, hero field, forms, motion
src/content/       # services, projects, industries, site copy
src/lib/           # validation, metadata, security, rate limit
src/styles/        # globals.css design tokens
public/brand/      # official logos
tests/             # Playwright
scripts/           # check-links.mjs
```

## Contact

`projects@nomadlabz.com`
