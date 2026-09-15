import { NextResponse } from "next/server";
import { getBrainstormingRepository } from "@/lib/brainstorming/repository";
import type { JobType } from "@/lib/brainstorming/model";

export const runtime = "nodejs";

const jobTypes: JobType[] = [
  "robots_check",
  "crawl_source",
  "index_project",
  "ai_tag_project",
  "embed_project",
  "refresh_source",
];

export async function POST(request: Request) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Crawler jobs require SUPABASE_SERVICE_ROLE_KEY on the server." },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const type = typeof body.type === "string" && jobTypes.includes(body.type as JobType)
    ? (body.type as JobType)
    : "crawl_source";

  const repository = getBrainstormingRepository();
  const job = await repository.enqueueCrawlerJob({
    sourceId: typeof body.sourceId === "string" ? body.sourceId : undefined,
    targetUrl: typeof body.targetUrl === "string" ? body.targetUrl : undefined,
    type,
    input: body.input && typeof body.input === "object"
      ? (body.input as Record<string, unknown>)
      : {},
  });

  return NextResponse.json({ job });
}
