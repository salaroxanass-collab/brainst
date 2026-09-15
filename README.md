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
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL for BrainStorming Engine |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key for client-safe reads/auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key for ingestion/admin jobs |
| `OPENAI_API_KEY` | Server-only key for future AI tagging and embeddings |
| `BRAINSTORMING_EMBEDDING_MODEL` | Embedding model, default `text-embedding-3-small` |
| `BRAINSTORMING_EMBEDDING_DIMENSIONS` | Embedding vector dimensions, default `1536` |

Without Mapbox, maps show an elegant GIS-style placeholder. Without Sanity, the site uses curated sample content in `src/lib/data.ts`.

## BrainStorming Engine data model

The BrainStorming Engine now has a Supabase-ready data model in `supabase/migrations/202609150001_brainstorming_engine.sql`.

Supporting notes live in `docs/brainstorming-engine-data-model.md`. The UI calls server API routes and uses Supabase when keys are configured; otherwise it falls back to curated seed examples.

After applying the migration and adding Supabase keys:

```bash
npm run brainstorming:seed
```

Set `OPENAI_API_KEY` before seeding if you want semantic embeddings generated immediately.

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
| `/[locale]/brainstorming-engine` | Landscape architecture reference search and moodboard engine |
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
