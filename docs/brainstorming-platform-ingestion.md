# BrainStorming Engine Platform Ingestion

The BrainStorming Engine should grow from trusted landscape architecture platforms, but it should not copy whole articles or silently reuse images as if BrainSt owns them. The product stores structured reference metadata, source links, short snippets, AI tags, embeddings, and attribution.

## Approved Source Targets

| Source | Role in BrainSt |
| --- | --- |
| Landezine | Primary curated landscape architecture project database. Good for typologies, designers, locations, photographs, drawings, and contemporary project descriptions. |
| Landscape Performance Series | Performance-led case studies with quantified environmental, social, and economic benefits. Best for academic and measurable design evidence. |
| LILA | Awards archive for high-quality contemporary precedents, winners, distinctions, and submitted projects. |
| World Landscape Architecture | International project coverage, especially useful for Asian, Australian, and emerging practices. |
| ArchDaily | Large architecture and landscape archive. Useful where building, public realm, and landscape need to be read together. |
| ASLA Professional Awards | Strong source for awarded ecological design, resilience, planning, research, and professional excellence. |
| Landscape Architecture Magazine | Critical professional context and discussion. Best for why a project matters. |
| Landscape Australia | Australian public landscape, climate-responsive design, and regional professional context. |

## What We Store

- Project title
- Designer or design team
- Location and country
- Year, when available
- Typology
- Source platform
- Canonical source URL
- Short source-backed snippet
- AI-generated summary
- AI tags for typology, climate, materials, planting, NbS, health, equity, performance, and atmosphere
- Image URL only when permitted or used as a credited external thumbnail
- Image credit and permission notes
- Embedding text for search
- Review status

## What We Do Not Store

- Full article bodies from publishers
- Uncredited image copies
- Images presented as BrainSt-owned assets
- Unverified AI-generated project facts
- Paywalled article content unless permission exists

## Import Workflow

1. Add or verify the platform in `brainstormSources`.
2. Check robots.txt, terms, and attribution constraints.
3. Discover candidate project URLs from index pages, award archives, search pages, or curated collections.
4. Extract only safe metadata: title, designer, location, source URL, short snippet, and thumbnail URL if allowed.
5. Generate AI tags and summaries from the allowed metadata.
6. Mark imported records as `needs_review`.
7. Human-review important records before changing them to `published`.
8. Generate embeddings after review so search improves over time.

## Batch Priority

1. LPS projects with performance metrics: stormwater, UHI, biodiversity, health, equity, carbon, trees, play.
2. Schoolyards, playgrounds, and outdoor learning landscapes.
3. Italian and Mediterranean public realm precedents.
4. Healthcare, therapeutic, wellbeing, and senior-friendly landscapes.
5. Climate adaptation: floodable parks, sponge city, wetlands, waterfronts, urban cooling.
6. Award-winning public spaces from LILA, ASLA, WLA, and Landscape Australia.

## Product Rule

If the database does not contain an exact verified match, the interface must say so and show the closest verified references. The engine should never invent a project to satisfy a prompt.
