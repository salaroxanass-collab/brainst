import { NextResponse } from "next/server";
import { getBrainstormingRepository } from "@/lib/brainstorming/repository";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  if (typeof body.userId !== "string" || body.userId.length === 0) {
    return NextResponse.json(
      { error: "A signed-in user is required before saving moodboards." },
      { status: 401 }
    );
  }

  const repository = getBrainstormingRepository();
  const moodboard = await repository.createMoodboard({
    userId: body.userId,
    title: typeof body.title === "string" && body.title.length > 0 ? body.title : "Untitled moodboard",
    conceptDescription:
      typeof body.conceptDescription === "string" ? body.conceptDescription : undefined,
    projectIds: Array.isArray(body.projectIds)
      ? body.projectIds.filter((item: unknown): item is string => typeof item === "string")
      : [],
  });

  return NextResponse.json({ moodboard });
}
