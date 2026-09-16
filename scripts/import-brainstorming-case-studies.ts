import { gunzipSync } from "node:zlib";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { brainstormImportSources, type BrainstormImportSource } from "../src/lib/brainstorming/import-sources";

type Candidate = {
  source: string;
  sourceName: string;
  sourceUrl: string;
  importStatus: "candidate" | "manual_review_required";
  title?: string;
  description?: string;
  imageUrl?: string;
  reason?: string;
};

const args = new Map(
  process.argv
    .slice(2)
    .filter((arg) => arg.startsWith("--"))
    .map((arg) => {
      const [key, value = "true"] = arg.replace(/^--/, "").split("=");
      return [key, value] as const;
    })
);

const limitPerSource = Number.parseInt(args.get("limit") ?? "250", 10);
const includeMetadata = args.get("metadata") === "true";
const outputPath = args.get("out") ?? "data/brainstorming-case-study-candidates.json";

async function main() {
  const candidates: Candidate[] = [];
  const sourceReports = [];

  for (const source of brainstormImportSources) {
    if (source.importMode !== "sitemap") {
      sourceReports.push({
        source: source.slug,
        name: source.name,
        mode: source.importMode,
        count: 0,
        note: source.blockedReason ?? source.notes,
      });
      continue;
    }

    const sourceCandidates = await discoverFromSitemaps(source, limitPerSource);
    candidates.push(...sourceCandidates);
    sourceReports.push({
      source: source.slug,
      name: source.name,
      mode: source.importMode,
      count: sourceCandidates.length,
      note: source.notes,
    });
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    limitPerSource,
    includeMetadata,
    totalCandidates: candidates.length,
    sourceReports,
    candidates,
  };

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Wrote ${candidates.length} candidates to ${outputPath}`);
  console.log(JSON.stringify(sourceReports, null, 2));
}

async function discoverFromSitemaps(source: BrainstormImportSource, limit: number) {
  const patterns = source.candidateUrlPatterns.map((pattern) => new RegExp(pattern));
  const found = new Set<string>();
  const queue = [...source.sitemapUrls];
  const seenSitemaps = new Set<string>();

  while (queue.length > 0 && found.size < limit) {
    const sitemapUrl = queue.shift();
    if (!sitemapUrl || seenSitemaps.has(sitemapUrl)) continue;
    seenSitemaps.add(sitemapUrl);

    const body = await fetchSitemapText(sitemapUrl);
    if (!body) continue;

    for (const nested of extractLocs(body).filter((url) => looksLikeSitemap(url))) {
      if (!seenSitemaps.has(nested)) queue.push(nested);
    }

    for (const url of extractLocs(body)) {
      if (found.size >= limit) break;
      const normalized = normalizeUrl(url);
      if (!normalized) continue;
      if (patterns.some((pattern) => pattern.test(normalized)) && !isNonProjectUrl(normalized)) {
        found.add(normalized);
      }
    }
  }

  const candidates: Candidate[] = [];

  for (const sourceUrl of Array.from(found).sort()) {
    const metadata = includeMetadata ? await fetchPageMetadata(sourceUrl) : {};
    candidates.push({
      source: source.slug,
      sourceName: source.name,
      sourceUrl,
      importStatus: "candidate",
      ...metadata,
    });
  }

  return candidates;
}

async function fetchSitemapText(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "BrainSt source indexer; sitemap discovery for cited landscape architecture references",
      },
    });

    if (!response.ok) {
      console.error(`Skipping ${url}: ${response.status}`);
      return "";
    }

    const bytes = Buffer.from(await response.arrayBuffer());
    return url.endsWith(".gz") ? gunzipSync(bytes).toString("utf8") : bytes.toString("utf8");
  } catch (error) {
    console.error(`Skipping ${url}: ${error instanceof Error ? error.message : "unknown error"}`);
    return "";
  }
}

async function fetchPageMetadata(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "BrainSt source indexer; metadata extraction for cited references",
      },
    });
    if (!response.ok) return {};
    const html = await response.text();

    return {
      title: decodeHtml(getMeta(html, "og:title") ?? matchText(html, /<title>([^<]+)<\/title>/i)),
      description: decodeHtml(getMeta(html, "og:description") ?? getMetaName(html, "description")),
      imageUrl: getMeta(html, "og:image"),
    };
  } catch {
    return {};
  }
}

function extractLocs(xml: string) {
  return Array.from(xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi))
    .map((match) => match[1]?.trim())
    .filter((url): url is string => Boolean(url))
    .map((url) => decodeHtml(url))
    .filter((url): url is string => Boolean(url));
}

function looksLikeSitemap(url: string) {
  return /sitemap|wp-sitemap|\.xml|\.xml\.gz/i.test(url);
}

function normalizeUrl(url: string) {
  try {
    const parsed = new URL(url.replace(/^http:\/\//, "https://"));
    parsed.hash = "";
    parsed.search = "";
    return parsed.toString();
  } catch {
    return "";
  }
}

function isNonProjectUrl(url: string) {
  return (
    /\/(feed|wp-json|category|tag|author|page|about|contact|newsletter|events|jobs|search)\/?$/i.test(url) ||
    /\/portfolio-[^/]+\/?$/i.test(url)
  );
}

function getMeta(html: string, property: string) {
  return (
    matchText(html, new RegExp(`<meta[^>]+property=["']${escapeRegExp(property)}["'][^>]+content=["']([^"']+)["']`, "i")) ??
    matchText(html, new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${escapeRegExp(property)}["']`, "i"))
  );
}

function getMetaName(html: string, name: string) {
  return (
    matchText(html, new RegExp(`<meta[^>]+name=["']${escapeRegExp(name)}["'][^>]+content=["']([^"']+)["']`, "i")) ??
    matchText(html, new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${escapeRegExp(name)}["']`, "i"))
  );
}

function matchText(value: string, pattern: RegExp) {
  return value.match(pattern)?.[1]?.trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeHtml(value?: string) {
  if (!value) return undefined;
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&#8211;/g, "-")
    .replace(/&#8217;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
