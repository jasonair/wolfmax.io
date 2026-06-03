# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository & branding

This is the **Workings** marketing/waitlist site. The repo and npm package are still named `wolfmax.io` (legacy branding) — "Wolfmax" is dead; the live product is **Workings**.

- **Work from the `workings-io` git remote** (`https://github.com/jasonair/workings-io.git`), which is production — not `origin` (`wolfmax.io`).
- The live domain is **workings.io**. Never hardcode it — import `SITE_URL` / `SITE_NAME` from `src/lib/seo.ts`, which is the single source of truth for site identity.

## Commands

```bash
npm run dev      # Next.js dev server, http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (eslint-config-next: core-web-vitals + typescript)

# Waitlist DB: create the `signups` table in Neon (idempotent). Reads .env.local itself.
node scripts/migrate.mjs
```

There is no test suite. Verify changes via `npm run lint` and `npm run build`.

Environment: copy `.env.example` to `.env.local` (gitignored), or `vercel env pull .env.local`. `DATABASE_URL` (Neon) is required for the waitlist; `RESEND_API_KEY` + `CONTACT_EMAIL` for the contact form; `NEXT_PUBLIC_GA_ID` for analytics; `NEXT_PUBLIC_WISP_BLOG_ID` for the news CMS.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 (`@tailwindcss/postcss`, no `tailwind.config`) · framer-motion · TypeScript. Path alias `@/*` → `./src/*`. Deployed on Vercel.

## Architecture

**SEO / structured data is centralized.** `src/lib/seo.ts` owns site constants and all schema.org JSON-LD (Organization, WebSite, SoftwareApplication, plus `faqPageSchema` / `articleSchema` builders). The sitewide `@graph` is injected once in the root layout via the `JsonLd` server component (`src/components/JsonLd.tsx`), which writes `<script type="application/ld+json">` into the initial HTML so crawlers/AI agents read facts without running JS. When adding pages or facts, update `seo.ts` and `src/app/sitemap.ts` rather than scattering metadata.

**FAQ has one source of truth.** `src/lib/faq.ts` exports `faqSections` (answers are HTML strings, so they can carry links) — this feeds both the rendered `/faq` page and the FAQPage JSON-LD. Edit content there, not in the page component.

**News is Wisp-backed, not in the repo.** `/news` reads from Wisp CMS via `src/lib/wisp.ts` (`wisp.getPosts()`); posts are authored in the Wisp dashboard, not as repo files. Call it "News," not "blog." News pages use ISR (`export const revalidate = 3600`). The sitemap pulls post slugs from Wisp and degrades gracefully if Wisp is unreachable at build time.

**Waitlist flow.** A global `WaitlistProvider` (root layout) exposes `useWaitlist().open()` to trigger the modal from anywhere. The modal POSTs to `src/app/api/waitlist/route.ts`, which validates server-side and writes to Neon Postgres with `@neondatabase/serverless` — the browser never touches the DB. Inserts are idempotent (`ON CONFLICT (email) DO NOTHING`). Schema lives in `scripts/migrate.mjs`.

**Page structure.** Marketing pages live under `src/app/*` (`/`, `/individuals`, `/institutions`, `/faq`, `/news`, `/verify`, `/privacy`). Per-route `layout.tsx` files carry route-specific metadata. The root layout wires fonts, the intro overlay, navbar/footer, analytics, and cookie consent. Shared UI is in `src/components/*`.

**Intro overlay.** The root layout runs an inline pre-paint script that sets `documentElement.dataset.intro='play'` (unless `prefers-reduced-motion`) so neither the `IntroOverlay` nor the bare logo flashes on first paint. Reveal animations downstream key off intro readiness (`src/lib/useIntroReady.ts`) — be careful not to deadlock reveals when touching intro/animation timing.
