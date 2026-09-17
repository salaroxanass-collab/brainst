import { brainstormSources, type BrainstormReference } from "@/lib/brainstorming";
import type { Locale } from "@/lib/types";
import type { BrainstormProjectRecord, BrainstormSearchResult } from "./model";

function localizedTitle(title: string, locale: Locale) {
  return {
    en: title,
    it: locale === "it" ? title : title,
    ro: locale === "ro" ? title : title,
  };
}

export function projectToReference(project: BrainstormProjectRecord, locale: Locale): BrainstormReference {
  const image = project.images[0];
  const metadata = project.aiMetadata;

  return {
    id: project.id,
    title: {
      en: project.titleI18n?.en ?? project.title,
      it: project.titleI18n?.it ?? project.titleI18n?.en ?? project.title,
      ro: project.titleI18n?.ro ?? project.titleI18n?.en ?? project.title,
    },
    designer: project.designer ?? "Unknown designer",
    location: {
      en: project.descriptionI18n?.en ? (project.location ?? "") : (project.location ?? ""),
      it: project.descriptionI18n?.it ? (project.location ?? "") : (project.location ?? ""),
      ro: project.descriptionI18n?.ro ? (project.location ?? "") : (project.location ?? ""),
    },
    sourceId: brainstormSources.some((source) => source.id === project.sourceId)
      ? (project.sourceId as BrainstormReference["sourceId"])
      : "landezine",
    sourceUrl: project.sourceUrl,
    imageUrl:
      image?.thumbnailUrl ??
      image?.imageUrl ??
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
    imageCredit: image?.credit ?? project.attribution,
    snippet: project.descriptionI18n
      ? {
          en: project.descriptionI18n.en ?? project.descriptionSnippet ?? "",
          it: project.descriptionI18n.it ?? project.descriptionI18n.en ?? project.descriptionSnippet ?? "",
          ro: project.descriptionI18n.ro ?? project.descriptionI18n.en ?? project.descriptionSnippet ?? "",
        }
      : localizedTitle(project.descriptionSnippet ?? project.attribution, locale),
    aiSummary: localizedTitle(metadata?.aiSummary ?? project.descriptionSnippet ?? project.attribution, locale),
    tags: project.tags.map((tag) => tag.label),
    typology: metadata?.typology ?? metadata?.landscapeTypology ?? "Reference",
    materials: metadata?.materials ?? [],
    plantingStyle: metadata?.plantingStyle ?? "Mixed planting",
    climate: metadata?.climate ?? project.country ?? "Context-specific",
    colourPalette: metadata?.colourPalette ?? image?.dominantColours ?? [],
    scale: metadata?.projectScale ?? "Project",
    atmosphere: metadata?.atmosphere ?? metadata?.spatialCharacter ?? "Contextual",
    nbs: metadata?.natureBasedSolutions ?? [],
    healthThemes: metadata?.publicHealthThemes ?? [],
    yearCompleted: project.yearCompleted,
    historicalPeriod: typeof project.metadata.historicalPeriod === "string" ? project.metadata.historicalPeriod : undefined,
    movement: typeof project.metadata.movement === "string" ? project.metadata.movement : undefined,
    historicalContext: typeof project.metadata.historicalContext === "string" ? project.metadata.historicalContext : undefined,
  };
}

export function searchResultsToReferences(results: BrainstormSearchResult[], locale: Locale) {
  return results.map((result) => projectToReference(result.project, locale));
}
