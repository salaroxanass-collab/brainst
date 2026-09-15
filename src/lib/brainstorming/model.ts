import type { LocalizedString } from "@/lib/types";

export type SourceStatus = "pending" | "approved" | "paused" | "blocked" | "retired";
export type PermissionStatus = "unknown" | "allowed" | "limited" | "denied";
export type ProjectStatus = "draft" | "needs_review" | "published" | "archived";
export type ImageStatus = "pending" | "approved" | "blocked";
export type JobStatus = "queued" | "running" | "succeeded" | "failed" | "cancelled";
export type JobType =
  | "robots_check"
  | "crawl_source"
  | "index_project"
  | "ai_tag_project"
  | "embed_project"
  | "refresh_source";
export type UserRole = "viewer" | "designer" | "editor" | "admin";
export type ExportFormat = "pdf" | "pptx";

export interface BrainstormSourceRecord {
  id: string;
  slug: string;
  name: string;
  homepageUrl: string;
  status: SourceStatus;
  robotsTxtUrl?: string;
  robotsCheckedAt?: string;
  permissionStatus: PermissionStatus;
  permissionNotes?: string;
  allowedContent: {
    title: boolean;
    designer: boolean;
    location: boolean;
    snippet: boolean;
    thumbnail: boolean;
    imageUrl: boolean;
    sourceUrl: boolean;
  };
  attributionTemplate: string;
  crawlDelaySeconds: number;
}

export interface BrainstormProjectRecord {
  id: string;
  sourceId: string;
  sourceUrl: string;
  canonicalUrl?: string;
  title: string;
  titleI18n?: Partial<LocalizedString>;
  designer?: string;
  collaborators: string[];
  location?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  yearCompleted?: number;
  descriptionSnippet?: string;
  descriptionI18n?: Partial<LocalizedString>;
  sourcePublishedAt?: string;
  sourceAccessedAt: string;
  attribution: string;
  status: ProjectStatus;
  metadata: Record<string, unknown>;
  aiMetadata?: BrainstormProjectAiMetadata;
  images: BrainstormProjectImageRecord[];
  tags: BrainstormTagRecord[];
}

export interface BrainstormProjectAiMetadata {
  typology?: string;
  landscapeTypology?: string;
  materials: string[];
  plantingStyle?: string;
  atmosphere?: string;
  climate?: string;
  colourPalette: string[];
  projectScale?: string;
  spatialCharacter?: string;
  designElements: string[];
  sustainabilityFeatures: string[];
  natureBasedSolutions: string[];
  biodiversityStrategies: string[];
  accessibilityFeatures: string[];
  publicHealthThemes: string[];
  environmentalThemes: string[];
  gisSpatialAnalysisThemes: string[];
  clientFacingKeywords: string[];
  aiSummary?: string;
  aiModel?: string;
  confidence?: number;
}

export interface BrainstormProjectImageRecord {
  id: string;
  projectId: string;
  sourceId: string;
  imageUrl: string;
  thumbnailUrl?: string;
  altText?: string;
  caption?: string;
  credit: string;
  licenseNotes?: string;
  permissionStatus: PermissionStatus;
  status: ImageStatus;
  width?: number;
  height?: number;
  dominantColours: string[];
  sortOrder: number;
}

export interface BrainstormTagRecord {
  id: string;
  slug: string;
  label: string;
  category: string;
  description?: string;
  isAiGenerated: boolean;
}

export interface BrainstormSearchInput {
  prompt: string;
  filters?: Record<string, string[]>;
  limit?: number;
  locale?: "en" | "it" | "ro";
}

export interface BrainstormSearchResult {
  project: BrainstormProjectRecord;
  similarity?: number;
  score?: number;
  matchedFields: string[];
}

export interface BrainstormMoodboardRecord {
  id: string;
  userId: string;
  savedSearchId?: string;
  title: string;
  conceptDescription?: string;
  tags: string[];
  colourPalette: string[];
  isPublic: boolean;
  items: BrainstormMoodboardItemRecord[];
}

export interface BrainstormMoodboardItemRecord {
  id: string;
  moodboardId: string;
  projectId: string;
  imageId?: string;
  caption?: string;
  sourceCredit: string;
  sourceUrl: string;
  sortOrder: number;
}

export interface BrainstormCrawlerJobRecord {
  id: string;
  sourceId?: string;
  type: JobType;
  status: JobStatus;
  targetUrl?: string;
  scheduledFor: string;
  attempts: number;
  maxAttempts: number;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  errorMessage?: string;
}

export interface BrainstormRepository {
  listSources(): Promise<BrainstormSourceRecord[]>;
  searchProjects(input: BrainstormSearchInput): Promise<BrainstormSearchResult[]>;
  getProject(id: string): Promise<BrainstormProjectRecord | null>;
  createMoodboard(input: {
    userId: string;
    title: string;
    conceptDescription?: string;
    projectIds: string[];
  }): Promise<BrainstormMoodboardRecord>;
  enqueueCrawlerJob(input: {
    sourceId?: string;
    type: JobType;
    targetUrl?: string;
    input?: Record<string, unknown>;
  }): Promise<BrainstormCrawlerJobRecord>;
}
