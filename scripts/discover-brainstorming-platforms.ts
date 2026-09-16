type PlatformDiscoveryConfig = {
  slug: string;
  name: string;
  startUrls: string[];
  include: RegExp[];
  exclude?: RegExp[];
};

const platforms: PlatformDiscoveryConfig[] = [
  {
    slug: "landezine",
    name: "Landezine",
    startUrls: ["https://landezine.com/"],
    include: [/^https:\/\/landezine\.com\/[^/?#]+\/$/],
    exclude: [/\/topics\//, /\/products\//, /\/offices\//],
  },
  {
    slug: "landscape-performance-series",
    name: "Landscape Performance Series",
    startUrls: ["https://www.landscapeperformance.org/"],
    include: [/^https:\/\/www\.landscapeperformance\.org\/case-study-briefs\//],
  },
  {
    slug: "lila",
    name: "LILA",
    startUrls: ["https://landezine-award.com/"],
    include: [/^https:\/\/landezine-award\.com\/[^/?#]+\/$/],
    exclude: [/\/category\//, /\/author\//, /\/feed\/$/, /\/wp-json\/$/],
  },
  {
    slug: "world-landscape-architecture",
    name: "World Landscape Architecture",
    startUrls: ["https://worldlandscapearchitect.com/general/project/"],
    include: [/^https:\/\/worldlandscapearchitect\.com\/[^/?#]+\/$/],
    exclude: [/\/general\//, /\/about\//, /\/jobs\//],
  },
  {
    slug: "archdaily",
    name: "ArchDaily",
    startUrls: ["https://www.archdaily.com/search/projects/categories/landscape-architecture"],
    include: [/^https:\/\/www\.archdaily\.com\/\d+\//],
  },
  {
    slug: "asla",
    name: "ASLA Professional Awards",
    startUrls: ["https://www.asla.org/awards"],
    include: [/^https:\/\/www\.asla\.org\/\d{4}awards\//, /^https:\/\/www\.asla\.org\/professionalawards\//],
  },
  {
    slug: "landscape-architecture-magazine",
    name: "Landscape Architecture Magazine",
    startUrls: ["https://landscapearchitecturemagazine.org/"],
    include: [/^https:\/\/landscapearchitecturemagazine\.org\/\d{4}\//],
  },
  {
    slug: "landscape-australia",
    name: "Landscape Australia",
    startUrls: ["https://landscapeaustralia.com/"],
    include: [/^https:\/\/landscapeaustralia\.com\/articles\//],
  },
];

const maxPerPlatform = Number.parseInt(
  process.argv.find((arg) => arg.startsWith("--limit="))?.replace("--limit=", "") ?? "25",
  10
);

async function main() {
  const discovered = [];

  for (const platform of platforms) {
    const urls = new Set<string>();

    for (const startUrl of platform.startUrls) {
      const html = await fetchText(startUrl);
      if (!html) continue;

      for (const href of extractLinks(html, startUrl)) {
        if (urls.size >= maxPerPlatform) break;
        if (!platform.include.some((pattern) => pattern.test(href))) continue;
        if (platform.exclude?.some((pattern) => pattern.test(href))) continue;
        urls.add(href);
      }
    }

    discovered.push({
      source: platform.slug,
      name: platform.name,
      count: urls.size,
      urls: Array.from(urls).sort(),
    });
  }

  console.log(JSON.stringify({ discoveredAt: new Date().toISOString(), discovered }, null, 2));
}

async function fetchText(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "BrainSt research indexer; source discovery only; contact site owner for permission before bulk import",
      },
    });

    if (!response.ok) {
      console.error(`Skipping ${url}: ${response.status}`);
      return "";
    }

    return await response.text();
  } catch (error) {
    console.error(`Skipping ${url}: ${error instanceof Error ? error.message : "unknown error"}`);
    return "";
  }
}

function extractLinks(html: string, baseUrl: string) {
  const links = new Set<string>();
  const hrefPattern = /href=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;

  while ((match = hrefPattern.exec(html))) {
    const rawHref = match[1];
    if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:")) continue;

    try {
      const url = new URL(rawHref, baseUrl);
      url.hash = "";
      url.search = "";
      links.add(url.toString());
    } catch {
      continue;
    }
  }

  return links;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
