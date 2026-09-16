export type ImportMode = "sitemap" | "manual_review" | "blocked";

export interface BrainstormImportSource {
  slug: string;
  name: string;
  homepage: string;
  importMode: ImportMode;
  robotsUrl: string;
  sitemapUrls: string[];
  candidateUrlPatterns: string[];
  blockedReason?: string;
  notes: string;
}

export const brainstormImportSources: BrainstormImportSource[] = [
  {
    slug: "landezine",
    name: "Landezine",
    homepage: "https://landezine.com",
    importMode: "manual_review",
    robotsUrl: "https://landezine.com/robots.txt",
    sitemapUrls: ["https://landezine.com/sitemap.xml"],
    candidateUrlPatterns: ["^https://landezine\\.com/[^/?#]+/?$"],
    blockedReason: "Homepage discovery is protected against generic automated requests. Import curated URLs manually or through an approved feed.",
    notes: "Primary visual case-study source. Store source links, short snippets, tags, and credited thumbnails only when permitted.",
  },
  {
    slug: "landscape-performance-series",
    name: "Landscape Performance Series",
    homepage: "https://www.landscapeperformance.org",
    importMode: "sitemap",
    robotsUrl: "https://www.landscapeperformance.org/robots.txt",
    sitemapUrls: ["https://www.landscapeperformance.org/sitemap.xml"],
    candidateUrlPatterns: [
      "^https?://www\\.landscapeperformance\\.org/case-study-briefs/",
      "^https?://www\\.landscapeperformance\\.org/case-study/",
    ],
    notes: "Best source for quantified benefits and academically useful DOI-backed case-study briefs.",
  },
  {
    slug: "lila",
    name: "LILA",
    homepage: "https://landezine-award.com",
    importMode: "sitemap",
    robotsUrl: "https://landezine-award.com/robots.txt",
    sitemapUrls: ["https://landezine-award.com/wp-sitemap-posts-post-2.xml"],
    candidateUrlPatterns: ["^https://landezine-award\\.com/[^/?#]+/?$"],
    notes: "Awards archive for contemporary precedents. Exclude feeds, taxonomies, admin URLs, and non-project pages.",
  },
  {
    slug: "world-landscape-architecture",
    name: "World Landscape Architecture",
    homepage: "https://worldlandscapearchitect.com/general/project/",
    importMode: "manual_review",
    robotsUrl: "https://worldlandscapearchitect.com/robots.txt",
    sitemapUrls: ["https://worldlandscapearchitect.com/sitemap.xml"],
    candidateUrlPatterns: ["^https://worldlandscapearchitect\\.com/[^/?#]+/?$"],
    blockedReason: "Cloudflare blocks this environment. Import through browser review, official feeds, or publisher-approved access.",
    notes: "Useful for international projects, especially Asia, Australia, and emerging practices.",
  },
  {
    slug: "archdaily",
    name: "ArchDaily",
    homepage: "https://www.archdaily.com/search/projects/categories/landscape-architecture",
    importMode: "sitemap",
    robotsUrl: "https://www.archdaily.com/robots.txt",
    sitemapUrls: ["https://www.archdaily.com/sitemap.xml"],
    candidateUrlPatterns: ["^https://www\\.archdaily\\.com/[0-9]+/"],
    notes: "Very broad source. Filter later for landscape architecture and public-realm relevance.",
  },
  {
    slug: "asla",
    name: "ASLA Professional Awards",
    homepage: "https://www.asla.org/awards",
    importMode: "sitemap",
    robotsUrl: "https://www.asla.org/robots.txt",
    sitemapUrls: ["https://www.asla.org/sitemap.xml"],
    candidateUrlPatterns: [
      "^https://www\\.asla\\.org/awards-events-main-landing/honors-awards/pro-student-awards/[0-9]{4}-professional-awards/[0-9]+/?$",
    ],
    notes: "Strong source for award-winning ecological, resilience, planning, and research work.",
  },
  {
    slug: "landscape-architecture-magazine",
    name: "Landscape Architecture Magazine",
    homepage: "https://landscapearchitecturemagazine.org",
    importMode: "manual_review",
    robotsUrl: "https://landscapearchitecturemagazine.org/robots.txt",
    sitemapUrls: ["https://landscapearchitecturemagazine.org/sitemap.xml"],
    candidateUrlPatterns: ["^https://landscapearchitecturemagazine\\.org/"],
    blockedReason: "robots.txt blocks multiple AI crawlers. Use as a manual citation/context source unless explicit permission exists.",
    notes: "Professional context source. Store only article links, citations, and human-reviewed notes.",
  },
  {
    slug: "landscape-australia",
    name: "Landscape Australia",
    homepage: "https://landscapeaustralia.com",
    importMode: "manual_review",
    robotsUrl: "https://landscapeaustralia.com/robots.txt",
    sitemapUrls: ["https://landscapeaustralia.com/sitemap.xml"],
    candidateUrlPatterns: ["^https://landscapeaustralia\\.com/articles/"],
    blockedReason: "robots.txt blocks GPTBot and other AI crawlers. Use as a manual citation/context source unless explicit permission exists.",
    notes: "Australian climate-responsive and public landscape source.",
  },
];
