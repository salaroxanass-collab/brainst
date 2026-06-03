import type { LocalizedString } from "./types";

export type BrainstormSourceId = "landezine" | "landscape-first";

export interface BrainstormSource {
  id: BrainstormSourceId;
  name: string;
  homepage: string;
  status: "approved" | "pending";
}

export interface BrainstormReference {
  id: string;
  title: LocalizedString;
  designer: string;
  location: LocalizedString;
  sourceId: BrainstormSourceId;
  sourceUrl: string;
  imageUrl: string;
  imageCredit: string;
  snippet: LocalizedString;
  aiSummary: LocalizedString;
  tags: string[];
  typology: string;
  materials: string[];
  plantingStyle: string;
  climate: string;
  colourPalette: string[];
  scale: string;
  atmosphere: string;
  nbs: string[];
  healthThemes: string[];
}

export interface BrainstormArchitectureTable {
  table: string;
  purpose: string;
}

export const brainstormSources: BrainstormSource[] = [
  {
    id: "landezine",
    name: "Landezine",
    homepage: "https://landezine.com",
    status: "approved",
  },
  {
    id: "landscape-first",
    name: "Landscape First",
    homepage: "https://www.landscapefirst.com",
    status: "approved",
  },
];

export const brainstormArchitecture: BrainstormArchitectureTable[] = [
  { table: "sources", purpose: "Approved publishers, robots.txt policy, crawl permissions, attribution rules." },
  { table: "projects", purpose: "Canonical project records with title, designer, location, source URL, snippets, and credits." },
  { table: "images", purpose: "Permitted thumbnails, image URLs, alt text, source credits, and usage constraints." },
  { table: "tags", purpose: "AI-generated and editor-approved metadata vocabulary." },
  { table: "embeddings", purpose: "OpenAI-compatible vectors for semantic project and image retrieval." },
  { table: "moodboards", purpose: "Saved presentation boards with title, concept, palette, credits, and export status." },
  { table: "moodboard_items", purpose: "Selected references, captions, ordering, and source links for each board." },
  { table: "users", purpose: "Future roles for designers, students, researchers, consultants, and admins." },
  { table: "saved_searches", purpose: "Reusable prompts, filters, and AI interpretation notes." },
  { table: "future_crawler_jobs", purpose: "Queued source indexing, AI tagging, embedding refresh, and review state." },
];

export const pipelineTodos = [
  "Crawler: respect robots.txt, website terms, crawl-delay, publisher opt-outs, and source-specific attribution rules.",
  "Indexing: store only permitted snippets, thumbnails, source URLs, image URLs, credits, and AI metadata.",
  "AI tagging: generate typology, materials, planting, atmosphere, climate, palette, scale, accessibility, public health, GIS, and NbS tags.",
  "Vector search: create OpenAI-compatible embeddings for project text, image captions, and approved metadata.",
  "Admin panel: approve sources, trigger indexing jobs, review AI tags, edit metadata, and manage users.",
  "Exports: generate credited PDF and editable PPTX moodboards with BrainSt branding.",
];

export const brainstormReferences: BrainstormReference[] = [
  {
    id: "mediterranean-courtyard",
    title: {
      en: "Mediterranean Courtyard Atlas",
      it: "Atlante del Cortile Mediterraneo",
      ro: "Atlasul Curtii Mediteraneene",
    },
    designer: "Studio Terra Forma",
    location: {
      en: "Mallorca, Spain",
      it: "Maiorca, Spagna",
      ro: "Mallorca, Spania",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com",
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    imageCredit: "Reference thumbnail via Unsplash. Replace with permitted publisher thumbnail during indexing.",
    snippet: {
      en: "Clay paving, dry gardens, lime walls, and shaded thresholds create a quiet domestic microclimate.",
      it: "Pavimentazioni in argilla, giardini asciutti, muri a calce e soglie ombreggiate creano un microclima domestico silenzioso.",
      ro: "Pavaje de argila, gradini uscate, ziduri de var si praguri umbrite creeaza un microclimat domestic calm.",
    },
    aiSummary: {
      en: "Useful for intimate hospitality courtyards, drought-resistant planting palettes, and warm material studies.",
      it: "Utile per cortili hospitality intimi, palette vegetali resistenti alla siccita e studi materici caldi.",
      ro: "Util pentru curti intime de ospitalitate, palete de plantare rezistente la seceta si studii de materiale calde.",
    },
    tags: ["courtyard", "clay paving", "drought-resistant", "shade", "hospitality"],
    typology: "Courtyard",
    materials: ["Clay", "Lime", "Gravel"],
    plantingStyle: "Dry Mediterranean",
    climate: "Mediterranean",
    colourPalette: ["#c4754a", "#e8dfd0", "#6f7b55", "#faf8f5"],
    scale: "Small",
    atmosphere: "Warm, quiet, tactile",
    nbs: ["Water-wise planting", "Passive cooling"],
    healthThemes: ["Restorative calm", "Thermal comfort"],
  },
  {
    id: "climate-schoolyard",
    title: {
      en: "Climate-Resilient Schoolyard",
      it: "Cortile Scolastico Resiliente al Clima",
      ro: "Curte Scolara Rezilienta la Clima",
    },
    designer: "Open Ground Lab",
    location: {
      en: "Copenhagen, Denmark",
      it: "Copenaghen, Danimarca",
      ro: "Copenhaga, Danemarca",
    },
    sourceId: "landscape-first",
    sourceUrl: "https://www.landscapefirst.com",
    imageUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1200&q=80",
    imageCredit: "Reference thumbnail via Unsplash. Replace with permitted publisher thumbnail during indexing.",
    snippet: {
      en: "A schoolyard organized around rain gardens, playable topography, porous surfacing, and outdoor learning rooms.",
      it: "Un cortile scolastico organizzato attorno a rain garden, topografie ludiche, superfici permeabili e aule all'aperto.",
      ro: "O curte scolara organizata in jurul gradinilor de ploaie, topografiei de joaca, suprafetelor permeabile si salilor in aer liber.",
    },
    aiSummary: {
      en: "Strong precedent for NbS, child-friendly resilience, cooling, drainage, and educational landscapes.",
      it: "Precedente forte per NbS, resilienza per bambini, raffrescamento, drenaggio e paesaggi educativi.",
      ro: "Precedent puternic pentru NbS, rezilienta pentru copii, racire, drenaj si peisaje educationale.",
    },
    tags: ["schoolyard", "rain garden", "play", "learning", "porous surface"],
    typology: "Schoolyard",
    materials: ["Timber", "Porous paving", "Planting beds"],
    plantingStyle: "Robust urban meadow",
    climate: "Temperate",
    colourPalette: ["#1b3d2f", "#8a9a6a", "#d8c8a8", "#a85f38"],
    scale: "Medium",
    atmosphere: "Playful, resilient, social",
    nbs: ["Rain gardens", "Shade trees", "Infiltration"],
    healthThemes: ["Outdoor learning", "Movement", "Children's wellbeing"],
  },
  {
    id: "urban-shade-plaza",
    title: {
      en: "Urban Shade Plaza",
      it: "Piazza Urbana Ombreggiata",
      ro: "Piata Urbana Umbrita",
    },
    designer: "Civic Canopy Studio",
    location: {
      en: "Melbourne, Australia",
      it: "Melbourne, Australia",
      ro: "Melbourne, Australia",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com",
    imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80",
    imageCredit: "Reference thumbnail via Unsplash. Replace with permitted publisher thumbnail during indexing.",
    snippet: {
      en: "A civic plaza with shade structures, generous seating edges, misting, and flexible public programming.",
      it: "Una piazza civica con strutture ombreggianti, sedute generose, nebulizzazione e programmazione pubblica flessibile.",
      ro: "O piata civica cu structuri de umbrire, margini generoase de sedere, pulverizare fina si program public flexibil.",
    },
    aiSummary: {
      en: "Relevant for heat mitigation, social gathering, playful seating, and civic identity in dense centers.",
      it: "Rilevante per mitigazione del calore, aggregazione sociale, sedute giocose e identita civica nei centri densi.",
      ro: "Relevant pentru reducerea caldurii, intalniri sociale, sezut ludic si identitate civica in centre dense.",
    },
    tags: ["plaza", "shade", "public seating", "heat mitigation", "civic"],
    typology: "Public plaza",
    materials: ["Timber", "Steel", "Stone"],
    plantingStyle: "Urban canopy",
    climate: "Hot temperate",
    colourPalette: ["#2a2a28", "#c4754a", "#e8dfd0", "#6c8c7a"],
    scale: "Large",
    atmosphere: "Civic, animated, shaded",
    nbs: ["Canopy cooling", "Water mist", "Permeable edges"],
    healthThemes: ["Heat relief", "Social connection", "Accessible seating"],
  },
  {
    id: "ecological-waterfront",
    title: {
      en: "Ecological Waterfront Park",
      it: "Parco Fluviale Ecologico",
      ro: "Parc Waterfront Ecologic",
    },
    designer: "Delta Works Collective",
    location: {
      en: "Rotterdam, Netherlands",
      it: "Rotterdam, Paesi Bassi",
      ro: "Rotterdam, Tarile de Jos",
    },
    sourceId: "landscape-first",
    sourceUrl: "https://www.landscapefirst.com",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
    imageCredit: "Reference thumbnail via Unsplash. Replace with permitted publisher thumbnail during indexing.",
    snippet: {
      en: "A tidal edge park using naturalistic planting, floodable terraces, habitat shelves, and slow public promenades.",
      it: "Un parco di margine tidale con impianti naturalistici, terrazze allagabili, habitat e passeggiate lente.",
      ro: "Un parc de margine tidala cu plantari naturaliste, terase inundabile, rafturi de habitat si promenade lente.",
    },
    aiSummary: {
      en: "A strong match for ecological waterfronts, flood adaptation, biodiversity, and soft public access.",
      it: "Un riferimento forte per waterfront ecologici, adattamento alle piene, biodiversita e accesso pubblico morbido.",
      ro: "O potrivire puternica pentru waterfront-uri ecologice, adaptare la inundatii, biodiversitate si acces public bland.",
    },
    tags: ["waterfront", "floodable", "biodiversity", "promenade", "naturalistic"],
    typology: "Waterfront park",
    materials: ["Wetland planting", "Timber deck", "Stone edge"],
    plantingStyle: "Naturalistic wetland",
    climate: "Maritime",
    colourPalette: ["#1b3d2f", "#6d8a77", "#b9bea8", "#5c5c58"],
    scale: "Large",
    atmosphere: "Ecological, immersive, slow",
    nbs: ["Flood storage", "Habitat shelves", "Wetland planting"],
    healthThemes: ["Walking", "Blue-green exposure", "Restoration"],
  },
];

export function sourceName(sourceId: BrainstormSourceId) {
  return brainstormSources.find((source) => source.id === sourceId)?.name ?? sourceId;
}

export function searchBrainstormReferences(query: string, filters: string[]) {
  const terms = `${query} ${filters.join(" ")}`.toLowerCase().trim();
  if (!terms) return brainstormReferences;

  return brainstormReferences.filter((reference) => {
    const haystack = [
      reference.title.en,
      reference.title.it,
      reference.title.ro,
      reference.designer,
      reference.location.en,
      reference.snippet.en,
      reference.aiSummary.en,
      reference.tags.join(" "),
      reference.typology,
      reference.materials.join(" "),
      reference.plantingStyle,
      reference.climate,
      reference.scale,
      reference.atmosphere,
      reference.nbs.join(" "),
      reference.healthThemes.join(" "),
      sourceName(reference.sourceId),
    ]
      .join(" ")
      .toLowerCase();

    return terms
      .split(/\s+/)
      .filter((term) => term.length > 2)
      .some((term) => haystack.includes(term));
  });
}

// TODO: Replace mock search with vector retrieval backed by embeddings.
// TODO: Add crawler jobs that store only permitted metadata, thumbnails, URLs, snippets, and credits.
// TODO: Add admin review workflow before AI tags become public.
// TODO: Add PDF and PPTX export services with source credits on every generated board.
