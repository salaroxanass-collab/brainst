# BrainStorming Engine Data Model

This document describes the first real-product data layer for BrainStorming Engine.

The current user interface can still run with local seed data, but the model now has a Supabase/Postgres target that can support real source approval, crawling, AI metadata, semantic search, saved searches, moodboards, and exports.

## Migration

The schema lives at:

`supabase/migrations/202609150001_brainstorming_engine.sql`

It creates a dedicated `brainstorming` schema and enables:

- `pgcrypto` for UUID generation
- `vector` for semantic search embeddings
- RLS policies for public read access, user-owned moodboards/searches, and admin-only source/crawler management

## Core Tables

| Table | Purpose |
| --- | --- |
| `brainstorming.sources` | Approved or pending publication/source registry, including robots.txt, permissions, crawl delay, and attribution rules. |
| `brainstorming.projects` | Canonical reference project records with title, designer, location, source URL, snippets, status, and text search document. |
| `brainstorming.project_ai_metadata` | AI-generated and editor-reviewable metadata: typology, materials, planting style, climate, atmosphere, palette, NbS, health, GIS, accessibility, etc. |
| `brainstorming.project_images` | Source-linked image records with permission state, thumbnail URL, credit, license notes, dominant colours, and ordering. |
| `brainstorming.tags` | Controlled and AI-generated vocabulary. |
| `brainstorming.project_tags` | Many-to-many project tag assignments with source/confidence. |
| `brainstorming.embeddings` | `vector(1536)` records for project/image/moodboard semantic search. |
| `brainstorming.saved_searches` | User prompts, filters, and AI interpretation state. |
| `brainstorming.moodboards` | Saved user boards with title, concept, tags, palette, and visibility. |
| `brainstorming.moodboard_items` | Ordered selected references with captions, credits, source URLs. |
| `brainstorming.moodboard_exports` | PDF/PPTX export jobs and generated file URLs. |
| `brainstorming.crawler_jobs` | Queue for robots checks, source crawls, AI tagging, indexing, embedding, and refresh jobs. |
| `brainstorming.ai_tag_reviews` | Audit trail for editor/admin corrections to AI metadata. |
| `brainstorming.profiles` | App roles mapped to Supabase auth users. |

## Search

The migration includes `brainstorming.match_projects(...)`, a vector-search RPC that returns published projects by cosine similarity.

The intended search flow is:

1. User enters a natural-language prompt.
2. API creates an embedding with `BRAINSTORMING_EMBEDDING_MODEL`.
3. API calls `brainstorming.match_projects`.
4. Results are re-ranked with metadata filters, source quality, recency, and editorial boosting.
5. UI displays credited cards that link back to original source URLs.

## Source Governance

Initial source records are inserted as `pending`, not `approved`.

Before enabling a crawler for a source:

1. Review robots.txt.
2. Review website terms.
3. Decide which content fields are allowed.
4. Set `permission_status`.
5. Add attribution notes.
6. Only then set `status = 'approved'`.

This prevents the product from quietly treating third-party publications as scrapeable content.

## App Integration

The app-side domain model lives in:

- `src/lib/brainstorming/model.ts`
- `src/lib/brainstorming/database.ts`
- `src/lib/brainstorming/repository.ts`
- `src/lib/brainstorming/supabase.ts`
- `src/lib/brainstorming/embeddings.ts`

`getBrainstormingRepository()` now chooses Supabase when `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are configured. Without those keys, the same UI and API routes fall back to the curated local seed examples.

The app exposes these server routes:

| Route | Purpose |
| --- | --- |
| `POST /api/brainstorming/search` | Searches the real database with embeddings when available, with seed fallback. |
| `GET /api/brainstorming/sources` | Lists approved sources. |
| `POST /api/brainstorming/moodboards` | Creates a saved moodboard for a signed-in user. |
| `POST /api/brainstorming/crawler-jobs` | Queues an admin ingestion/crawler job using the service role key. |

## Seeding

After applying the migration and setting Supabase keys, run:

```bash
npm run brainstorming:seed
```

The seed command imports the current curated examples into Supabase as published projects with approved thumbnails, metadata, tags, and source credits.

If `OPENAI_API_KEY` is present, it also creates project embeddings using `BRAINSTORMING_EMBEDDING_MODEL`. Without `OPENAI_API_KEY`, search still works through text fallback but semantic matching will not be active yet.

## Next Steps

1. Add authentication UI so designers can save real moodboards to their own account.
2. Build an admin page for source approval, crawler job review, and AI metadata review.
3. Replace the seed import with source-specific ingestion adapters after each source is approved.
4. Add PDF and PPTX export workers that include credits and source links.
5. Add editorial quality scoring and richer re-ranking on top of vector search.
