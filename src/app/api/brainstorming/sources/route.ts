import { NextResponse } from "next/server";
import { getBrainstormingRepository, isBrainstormingDatabaseConfigured } from "@/lib/brainstorming/repository";

export const runtime = "nodejs";

export async function GET() {
  const repository = getBrainstormingRepository();
  const sources = await repository.listSources();

  return NextResponse.json({
    mode: isBrainstormingDatabaseConfigured ? "database" : "seed",
    sources,
  });
}
