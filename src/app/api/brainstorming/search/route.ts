import { NextResponse } from "next/server";
import { searchResultsToReferences } from "@/lib/brainstorming/adapters";
import { getBrainstormingRepository, isBrainstormingDatabaseConfigured } from "@/lib/brainstorming/repository";
import type { Locale } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const locale = isLocale(body.locale) ? body.locale : "en";
  const prompt = typeof body.prompt === "string" ? body.prompt : "";
  const filters = normalizeFilters(body.filters);

  const repository = getBrainstormingRepository();
  const results = await repository.searchProjects({
    prompt,
    filters,
    limit: typeof body.limit === "number" ? body.limit : 24,
    locale,
  });

  return NextResponse.json({
    mode: isBrainstormingDatabaseConfigured ? "database" : "seed",
    results: searchResultsToReferences(results, locale),
  });
}

function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "it" || value === "ro";
}

function normalizeFilters(value: unknown) {
  if (!value || typeof value !== "object") return {};

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, items]) => [
      key,
      Array.isArray(items) ? items.filter((item): item is string => typeof item === "string") : [],
    ])
  );
}
