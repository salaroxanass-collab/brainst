# BRAINST

Premium editorial website for **BRAINST** — a landscape architecture and research studio. Built as an interactive publication / research atlas with Next.js, Sanity CMS, bilingual EN/IT support, and immersive motion.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS 4**
- **Framer Motion** + **GSAP** + **Lenis** (smooth scroll)
- **Mapbox GL** (maps & GIS-inspired visuals)
- **Sanity CMS** (content editing without code)
- **next-intl** (English / Italian)

## Quick start

```bash
cd ~/Projects/brainst
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — default locale redirects to `/en`.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` |
| `SANITY_API_TOKEN` | Optional, for preview/drafts |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox public token for interactive maps |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO |

Without Mapbox, maps show an elegant GIS-style placeholder. Without Sanity, the site uses curated sample content in `src/lib/data.ts`.

## Sanity CMS setup

1. Create a project at [sanity.io](https://www.sanity.io/manage).
2. Add credentials to `.env.local`.
3. From the project root:

```bash
npx sanity@latest init --env-path .env.local
npm run sanity
```

Schemas live in `sanity/schemaTypes/` for **Projects**, **Research**, **Publications**, **Services**, and **News**. Editors can update all content in Sanity Studio without touching code.

## Pages

| Route | Description |
|-------|-------------|
| `/[locale]` | Immersive homepage narrative |
| `/[locale]/studio` | Philosophy & visual storytelling |
| `/[locale]/projects` | Filterable project index (7 samples) |
| `/[locale]/projects/[slug]` | Visual-first project story |
| `/[locale]/research` | Research atlas |
| `/[locale]/publications` | Editorial archive + search/filter |
| `/[locale]/services` | Custom diagram-based services |
| `/[locale]/contact` | Form, email, map |

## Design system

Colours: forest green, clay orange, sand, beige, off-white, charcoal.  
Typography: **Barlow Condensed** (display), **Cormorant Garamond** (editorial), **DM Sans** (UI).

## Production build

```bash
npm run build
npm start
```

## Next steps

- Replace Unsplash placeholders with studio photography in Sanity
- Connect contact form to Formspree, Resend, or Vercel server action
- Deploy to Vercel and add `sanity deploy` for hosted Studio
- Submit sitemap and verify accessibility (WCAG) before Awwwards entry
