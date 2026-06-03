export type ProjectCategory =
  | "landscape"
  | "urban"
  | "research"
  | "nbs"
  | "gis"
  | "competition";

export type PublicationType = "journal" | "conference" | "report";

export type Locale = "en" | "it" | "ro";

export type LocalizedString = Record<Locale, string>;

export interface Project {
  slug: string;
  title: LocalizedString;
  location: LocalizedString;
  year: string;
  categories: ProjectCategory[];
  tags: string[];
  description: LocalizedString;
  coverImage: string;
  heroImage: string;
  gallery: { src: string; caption?: LocalizedString }[];
  mapCoords?: [number, number];
  beforeAfter?: { before: string; after: string };
  insights?: LocalizedString[];
}

export interface ResearchItem {
  slug: string;
  title: LocalizedString;
  year: string;
  description: LocalizedString;
  tags: string[];
  coverImage: string;
  pdfUrl?: string;
  mapCoords?: [number, number];
}

export interface Publication {
  slug: string;
  title: LocalizedString;
  authors: string;
  year: string;
  type: PublicationType;
  venue: string;
  abstract: LocalizedString;
  pdfUrl?: string;
  tags: string[];
}

export interface NewsItem {
  slug: string;
  title: LocalizedString;
  date: string;
  excerpt: LocalizedString;
}

export function localized<T extends { en: string } & Partial<LocalizedString>>(
  obj: T,
  locale: Locale
): string {
  return obj[locale] ?? obj.en;
}
