import { brainstormSources, searchBrainstormReferences, sourceName } from "@/lib/brainstorming";
import { createBrainstormingEmbedding, embeddingToSqlVector } from "./embeddings";
import type {
  BrainstormCrawlerJobRecord,
  BrainstormMoodboardRecord,
  BrainstormProjectAiMetadata,
  BrainstormProjectImageRecord,
  BrainstormProjectRecord,
  BrainstormRepository,
  BrainstormSearchInput,
  BrainstormSearchResult,
  BrainstormSourceRecord,
  BrainstormTagRecord,
} from "./model";
import {
  createPublicBrainstormingClient,
  createServiceBrainstormingClient,
  hasPublicSupabaseConfig,
  hasServiceSupabaseConfig,
} from "./supabase";

export const isBrainstormingDatabaseConfigured = hasPublicSupabaseConfig;

export function getBrainstormingRepository(): BrainstormRepository {
  if (hasPublicSupabaseConfig) {
    return new SupabaseBrainstormingRepository();
  }

  return new SeedBrainstormingRepository();
}

type SourceRow = {
  id: string;
  slug: string;
  name: string;
  homepage_url: string;
  status: BrainstormSourceRecord["status"];
  robots_txt_url: string | null;
  robots_checked_at: string | null;
  permission_status: BrainstormSourceRecord["permissionStatus"];
  permission_notes: string | null;
  allowed_content: BrainstormSourceRecord["allowedContent"];
  attribution_template: string;
  crawl_delay_seconds: number;
};

type ProjectRow = {
  id: string;
  source_id: string;
  source_url: string;
  canonical_url: string | null;
  title: string;
  title_i18n: Record<string, string> | null;
  designer: string | null;
  collaborators: string[];
  location: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  year_completed: number | null;
  description_snippet: string | null;
  description_i18n: Record<string, string> | null;
  source_published_at: string | null;
  source_accessed_at: string;
  attribution: string;
  status: BrainstormProjectRecord["status"];
  metadata: Record<string, unknown>;
};

type ProjectAiMetadataRow = {
  project_id: string;
  typology: string | null;
  landscape_typology: string | null;
  materials: string[];
  planting_style: string | null;
  atmosphere: string | null;
  climate: string | null;
  colour_palette: string[];
  project_scale: string | null;
  spatial_character: string | null;
  design_elements: string[];
  sustainability_features: string[];
  nature_based_solutions: string[];
  biodiversity_strategies: string[];
  accessibility_features: string[];
  public_health_themes: string[];
  environmental_themes: string[];
  gis_spatial_analysis_themes: string[];
  client_facing_keywords: string[];
  ai_summary: string | null;
  ai_model: string | null;
  confidence: number | null;
};

type ProjectImageRow = {
  id: string;
  project_id: string;
  source_id: string;
  image_url: string;
  thumbnail_url: string | null;
  alt_text: string | null;
  caption: string | null;
  credit: string;
  license_notes: string | null;
  permission_status: BrainstormProjectImageRecord["permissionStatus"];
  status: BrainstormProjectImageRecord["status"];
  width: number | null;
  height: number | null;
  dominant_colours: string[];
  sort_order: number;
};

type TagRow = {
  id: string;
  slug: string;
  label: string;
  category: string;
  description: string | null;
  is_ai_generated: boolean;
};

type MatchProjectRow = {
  project_id: string;
  similarity: number;
};

class SupabaseBrainstormingRepository implements BrainstormRepository {
  private publicClient = createPublicBrainstormingClient();
  private serviceClient = createServiceBrainstormingClient();

  async listSources(): Promise<BrainstormSourceRecord[]> {
    const client = this.publicClient;
    if (!client) return new SeedBrainstormingRepository().listSources();

    const { data, error } = await client
      .from("sources")
      .select("*")
      .order("name", { ascending: true });

    if (error || !data) return new SeedBrainstormingRepository().listSources();
    return (data as SourceRow[]).map(mapSourceRow);
  }

  async searchProjects(input: BrainstormSearchInput): Promise<BrainstormSearchResult[]> {
    const client = this.publicClient;
    if (!client) return new SeedBrainstormingRepository().searchProjects(input);

    const embedding = await createBrainstormingEmbedding(
      `${input.prompt}\n${Object.values(input.filters ?? {}).flat().join("\n")}`
    );

    if (embedding) {
      const { data, error } = await client.rpc("match_projects", {
        query_embedding: embeddingToSqlVector(embedding),
        match_count: input.limit ?? 24,
        similarity_threshold: 0.1,
        metadata_filter: {},
      });

      if (!error && data && data.length > 0) {
        const projectIds = (data as MatchProjectRow[]).map((result) => result.project_id);
        const projects = await this.getProjectsByIds(projectIds);
        const matchedResults = projectIds.reduce<BrainstormSearchResult[]>((items, id) => {
            const project = projects.find((item) => item.id === id);
            const match = (data as MatchProjectRow[]).find((item) => item.project_id === id);
            if (project) {
              items.push({
                project,
                similarity: match?.similarity,
                matchedFields: ["embedding"],
              });
            }
            return items;
          }, []);

        return matchedResults;
      }
    }

    return this.searchProjectsByText(input);
  }

  async getProject(id: string): Promise<BrainstormProjectRecord | null> {
    const [project] = await this.getProjectsByIds([id]);
    return project ?? null;
  }

  async createMoodboard(input: {
    userId: string;
    title: string;
    conceptDescription?: string;
    projectIds: string[];
  }): Promise<BrainstormMoodboardRecord> {
    const client = this.serviceClient;
    if (!client || !hasServiceSupabaseConfig) {
      return new SeedBrainstormingRepository().createMoodboard(input);
    }

    const { data: board, error } = await client
      .from("moodboards")
      .insert({
        user_id: input.userId,
        title: input.title,
        concept_description: input.conceptDescription,
      })
      .select("*")
      .single();

    if (error || !board) throw new Error(error?.message ?? "Could not create moodboard");

    if (input.projectIds.length > 0) {
      const projects = await this.getProjectsByIds(input.projectIds);
      const { error: itemError } = await client.from("moodboard_items").insert(
        projects.map((project, index) => ({
          moodboard_id: board.id,
          project_id: project.id,
          image_id: project.images[0]?.id,
          source_credit: project.attribution,
          source_url: project.sourceUrl,
          sort_order: index,
        }))
      );

      if (itemError) throw new Error(itemError.message);
    }

    return {
      id: board.id,
      userId: board.user_id,
      savedSearchId: board.saved_search_id ?? undefined,
      title: board.title,
      conceptDescription: board.concept_description ?? undefined,
      tags: board.tags ?? [],
      colourPalette: board.colour_palette ?? [],
      isPublic: board.is_public,
      items: [],
    };
  }

  async enqueueCrawlerJob(input: {
    sourceId?: string;
    type: BrainstormCrawlerJobRecord["type"];
    targetUrl?: string;
    input?: Record<string, unknown>;
  }): Promise<BrainstormCrawlerJobRecord> {
    const client = this.serviceClient;
    if (!client || !hasServiceSupabaseConfig) {
      return new SeedBrainstormingRepository().enqueueCrawlerJob(input);
    }

    const { data, error } = await client
      .from("crawler_jobs")
      .insert({
        source_id: input.sourceId,
        type: input.type,
        target_url: input.targetUrl,
        input: input.input ?? {},
      })
      .select("*")
      .single();

    if (error || !data) throw new Error(error?.message ?? "Could not queue crawler job");

    return {
      id: data.id,
      sourceId: data.source_id ?? undefined,
      type: data.type,
      status: data.status,
      targetUrl: data.target_url ?? undefined,
      scheduledFor: data.scheduled_for,
      attempts: data.attempts,
      maxAttempts: data.max_attempts,
      input: data.input as Record<string, unknown>,
      output: data.output as Record<string, unknown>,
      errorMessage: data.error_message ?? undefined,
    };
  }

  private async searchProjectsByText(input: BrainstormSearchInput): Promise<BrainstormSearchResult[]> {
    const client = this.publicClient;
    if (!client) return new SeedBrainstormingRepository().searchProjects(input);

    const terms = [input.prompt, ...Object.values(input.filters ?? {}).flat()]
      .join(" ")
      .trim();

    const { data, error } = await client
      .from("projects")
      .select("id")
      .eq("status", "published")
      .or(`title.ilike.%${terms}%,designer.ilike.%${terms}%,location.ilike.%${terms}%,description_snippet.ilike.%${terms}%`)
      .limit(input.limit ?? 24);

    if (error || !data || data.length === 0) {
      return new SeedBrainstormingRepository().searchProjects(input);
    }

    const projects = await this.getProjectsByIds(data.map((item) => item.id));
    return projects.map((project) => ({
      project,
      matchedFields: ["text"],
      score: 1,
    }));
  }

  private async getProjectsByIds(ids: string[]) {
    const client = this.publicClient;
    if (!client || ids.length === 0) return [];

    const { data: projectRows, error } = await client
      .from("projects")
      .select("*")
      .in("id", ids)
      .eq("status", "published");

    if (error || !projectRows) return [];

    const sourceIds = Array.from(new Set((projectRows as ProjectRow[]).map((project) => project.source_id)));
    const { data: sourceRows } = await client.from("sources").select("*").in("id", sourceIds);
    const sources = ((sourceRows ?? []) as SourceRow[]).map(mapSourceRow);

    const { data: metadataRows } = await client
      .from("project_ai_metadata")
      .select("*")
      .in("project_id", ids);

    const { data: imageRows } = await client
      .from("project_images")
      .select("*")
      .in("project_id", ids)
      .eq("status", "approved")
      .order("sort_order", { ascending: true });

    const { data: projectTagRows } = await client
      .from("project_tags")
      .select("project_id, tags(*)")
      .in("project_id", ids);

    const tagsByProject = new Map<string, BrainstormTagRecord[]>();
    for (const row of (projectTagRows ?? []) as unknown as { project_id: string; tags: TagRow | null }[]) {
      if (!row.tags) continue;
      const current = tagsByProject.get(row.project_id) ?? [];
      current.push(mapTagRow(row.tags));
      tagsByProject.set(row.project_id, current);
    }

    return (projectRows as ProjectRow[]).map((project) =>
      mapProjectRow({
        project,
        source: sources.find((source) => source.id === project.source_id),
        aiMetadata: ((metadataRows ?? []) as ProjectAiMetadataRow[]).find(
          (metadata) => metadata.project_id === project.id
        ),
        images: ((imageRows ?? []) as ProjectImageRow[]).filter((image) => image.project_id === project.id),
        tags: tagsByProject.get(project.id) ?? [],
      })
    );
  }
}

function mapSourceRow(row: SourceRow): BrainstormSourceRecord {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    homepageUrl: row.homepage_url,
    status: row.status,
    robotsTxtUrl: row.robots_txt_url ?? undefined,
    robotsCheckedAt: row.robots_checked_at ?? undefined,
    permissionStatus: row.permission_status,
    permissionNotes: row.permission_notes ?? undefined,
    allowedContent: row.allowed_content,
    attributionTemplate: row.attribution_template,
    crawlDelaySeconds: row.crawl_delay_seconds,
  };
}

function mapAiMetadata(row?: ProjectAiMetadataRow): BrainstormProjectAiMetadata | undefined {
  if (!row) return undefined;

  return {
    typology: row.typology ?? undefined,
    landscapeTypology: row.landscape_typology ?? undefined,
    materials: row.materials,
    plantingStyle: row.planting_style ?? undefined,
    atmosphere: row.atmosphere ?? undefined,
    climate: row.climate ?? undefined,
    colourPalette: row.colour_palette,
    projectScale: row.project_scale ?? undefined,
    spatialCharacter: row.spatial_character ?? undefined,
    designElements: row.design_elements,
    sustainabilityFeatures: row.sustainability_features,
    natureBasedSolutions: row.nature_based_solutions,
    biodiversityStrategies: row.biodiversity_strategies,
    accessibilityFeatures: row.accessibility_features,
    publicHealthThemes: row.public_health_themes,
    environmentalThemes: row.environmental_themes,
    gisSpatialAnalysisThemes: row.gis_spatial_analysis_themes,
    clientFacingKeywords: row.client_facing_keywords,
    aiSummary: row.ai_summary ?? undefined,
    aiModel: row.ai_model ?? undefined,
    confidence: row.confidence ?? undefined,
  };
}

function mapImageRow(row: ProjectImageRow): BrainstormProjectImageRecord {
  return {
    id: row.id,
    projectId: row.project_id,
    sourceId: row.source_id,
    imageUrl: row.image_url,
    thumbnailUrl: row.thumbnail_url ?? undefined,
    altText: row.alt_text ?? undefined,
    caption: row.caption ?? undefined,
    credit: row.credit,
    licenseNotes: row.license_notes ?? undefined,
    permissionStatus: row.permission_status,
    status: row.status,
    width: row.width ?? undefined,
    height: row.height ?? undefined,
    dominantColours: row.dominant_colours,
    sortOrder: row.sort_order,
  };
}

function mapTagRow(row: TagRow): BrainstormTagRecord {
  return {
    id: row.id,
    slug: row.slug,
    label: row.label,
    category: row.category,
    description: row.description ?? undefined,
    isAiGenerated: row.is_ai_generated,
  };
}

function mapProjectRow(input: {
  project: ProjectRow;
  source?: BrainstormSourceRecord;
  aiMetadata?: ProjectAiMetadataRow;
  images: ProjectImageRow[];
  tags: BrainstormTagRecord[];
}): BrainstormProjectRecord {
  return {
    id: input.project.id,
    sourceId: input.source?.slug ?? input.project.source_id,
    sourceUrl: input.project.source_url,
    canonicalUrl: input.project.canonical_url ?? undefined,
    title: input.project.title,
    titleI18n: input.project.title_i18n ?? undefined,
    designer: input.project.designer ?? undefined,
    collaborators: input.project.collaborators,
    location: input.project.location ?? undefined,
    country: input.project.country ?? undefined,
    latitude: input.project.latitude ?? undefined,
    longitude: input.project.longitude ?? undefined,
    yearCompleted: input.project.year_completed ?? undefined,
    descriptionSnippet: input.project.description_snippet ?? undefined,
    descriptionI18n: input.project.description_i18n ?? undefined,
    sourcePublishedAt: input.project.source_published_at ?? undefined,
    sourceAccessedAt: input.project.source_accessed_at,
    attribution: input.project.attribution,
    status: input.project.status,
    metadata: input.project.metadata,
    aiMetadata: mapAiMetadata(input.aiMetadata),
    images: input.images.map(mapImageRow),
    tags: input.tags,
  };
}

class SeedBrainstormingRepository implements BrainstormRepository {
  async listSources(): Promise<BrainstormSourceRecord[]> {
    return brainstormSources.map((source) => ({
      id: source.id,
      slug: source.id,
      name: source.name,
      homepageUrl: source.homepage,
      status: source.status,
      permissionStatus: "unknown",
      allowedContent: {
        title: true,
        designer: true,
        location: true,
        snippet: true,
        thumbnail: false,
        imageUrl: false,
        sourceUrl: true,
      },
      attributionTemplate: `Project reference from ${source.name}. View original: {source_url}.`,
      crawlDelaySeconds: 10,
    }));
  }

  async searchProjects(input: BrainstormSearchInput): Promise<BrainstormSearchResult[]> {
    const references = searchBrainstormReferences(
      input.prompt,
      Object.values(input.filters ?? {}).flat()
    ).slice(0, input.limit ?? 24);

    return references.map((reference) => ({
      project: {
        id: reference.id,
        sourceId: reference.sourceId,
        sourceUrl: reference.sourceUrl,
        title: reference.title.en,
        titleI18n: reference.title,
        designer: reference.designer,
        collaborators: [],
        location: reference.location.en,
        descriptionSnippet: reference.snippet.en,
        descriptionI18n: reference.snippet,
        sourceAccessedAt: new Date().toISOString(),
        attribution: `${sourceName(reference.sourceId)}: ${reference.sourceUrl}`,
        status: "published",
        metadata: {},
        aiMetadata: {
          typology: reference.typology,
          materials: reference.materials,
          plantingStyle: reference.plantingStyle,
          atmosphere: reference.atmosphere,
          climate: reference.climate,
          colourPalette: reference.colourPalette,
          projectScale: reference.scale,
          natureBasedSolutions: reference.nbs,
          publicHealthThemes: reference.healthThemes,
          landscapeTypology: reference.typology,
          spatialCharacter: reference.atmosphere,
          designElements: reference.tags,
          sustainabilityFeatures: reference.nbs,
          biodiversityStrategies: [],
          accessibilityFeatures: [],
          environmentalThemes: [],
          gisSpatialAnalysisThemes: [],
          clientFacingKeywords: reference.tags,
          aiSummary: reference.aiSummary.en,
        },
        images: [
          {
            id: `${reference.id}-hero`,
            projectId: reference.id,
            sourceId: reference.sourceId,
            imageUrl: reference.imageUrl,
            credit: reference.imageCredit,
            permissionStatus: "unknown",
            status: "pending",
            dominantColours: reference.colourPalette,
            sortOrder: 0,
          },
        ],
        tags: reference.tags.map((tag) => ({
          id: tag,
          slug: tag,
          label: tag,
          category: "ai",
          isAiGenerated: true,
        })),
      },
      score: 1,
      matchedFields: ["seed"],
    }));
  }

  async getProject(id: string): Promise<BrainstormProjectRecord | null> {
    const [result] = await this.searchProjects({ prompt: id, limit: 1 });
    return result?.project ?? null;
  }

  async createMoodboard(input: {
    userId: string;
    title: string;
    conceptDescription?: string;
    projectIds: string[];
  }): Promise<BrainstormMoodboardRecord> {
    return {
      id: crypto.randomUUID(),
      userId: input.userId,
      title: input.title,
      conceptDescription: input.conceptDescription,
      tags: [],
      colourPalette: [],
      isPublic: false,
      items: input.projectIds.map((projectId, index) => ({
        id: crypto.randomUUID(),
        moodboardId: "seed",
        projectId,
        sourceCredit: "Seed reference. Replace with source credit from database.",
        sourceUrl: "#",
        sortOrder: index,
      })),
    };
  }

  async enqueueCrawlerJob(input: {
    sourceId?: string;
    type: BrainstormCrawlerJobRecord["type"];
    targetUrl?: string;
    input?: Record<string, unknown>;
  }): Promise<BrainstormCrawlerJobRecord> {
    return {
      id: crypto.randomUUID(),
      sourceId: input.sourceId,
      type: input.type,
      status: "queued",
      targetUrl: input.targetUrl,
      scheduledFor: new Date().toISOString(),
      attempts: 0,
      maxAttempts: 3,
      input: input.input ?? {},
      output: {},
    };
  }
}
