import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
import { brainstormSources } from "../src/lib/brainstorming";

type CandidateImportFile = {
  candidates: Array<{
    source: string;
    sourceName: string;
    sourceUrl: string;
    importStatus: string;
    title?: string;
    description?: string;
    imageUrl?: string;
  }>;
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

const inputPath = args.get("in") ?? "data/brainstorming-case-study-candidates.json";
const limit = Number.parseInt(args.get("limit") ?? "0", 10);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before queueing imports.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
}).schema("brainstorming");

async function main() {
  const payload = JSON.parse(await readFile(inputPath, "utf8")) as CandidateImportFile;
  const candidates = limit > 0 ? payload.candidates.slice(0, limit) : payload.candidates;

  const sourceIdBySlug = await upsertSources();
  let queued = 0;
  let skipped = 0;

  for (const candidate of candidates) {
    const sourceId = sourceIdBySlug.get(candidate.source);
    if (!sourceId) {
      skipped += 1;
      continue;
    }

    const { data: existing, error: existingError } = await supabase
      .from("crawler_jobs")
      .select("id")
      .eq("target_url", candidate.sourceUrl)
      .limit(1);

    if (existingError) throw new Error(existingError.message);
    if (existing && existing.length > 0) {
      skipped += 1;
      continue;
    }

    const { error } = await supabase.from("crawler_jobs").insert({
      source_id: sourceId,
      type: "index_project",
      status: "queued",
      target_url: candidate.sourceUrl,
      input: {
        sourceSlug: candidate.source,
        sourceName: candidate.sourceName,
        importStatus: candidate.importStatus,
        title: candidate.title,
        description: candidate.description,
        imageUrl: candidate.imageUrl,
        reviewRequired: true,
      },
    });

    if (error) throw new Error(error.message);
    queued += 1;
  }

  console.log(`Queued ${queued} crawler jobs from ${inputPath}. Skipped ${skipped}.`);
}

async function upsertSources() {
  const sourceIdBySlug = new Map<string, string>();

  for (const source of brainstormSources) {
    const { data, error } = await supabase
      .from("sources")
      .upsert(
        {
          slug: source.id,
          name: source.name,
          homepage_url: source.homepage,
          status: source.status,
          permission_status: "limited",
          permission_notes: source.focus,
          allowed_content: {
            title: true,
            designer: true,
            location: true,
            snippet: true,
            thumbnail: false,
            image_url: false,
            source_url: true,
          },
          attribution_template: `Project reference from ${source.name}. View original: {source_url}.`,
        },
        { onConflict: "slug" }
      )
      .select("id, slug")
      .single();

    if (error || !data) throw new Error(error?.message ?? `Could not upsert source ${source.name}`);
    sourceIdBySlug.set(data.slug, data.id);
  }

  return sourceIdBySlug;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
