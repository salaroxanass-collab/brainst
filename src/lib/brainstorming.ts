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
    id: "uderzo-schoolyard",
    title: {
      en: "Uderzo Schoolyard",
      it: "Cortile Scolastico Uderzo",
      ro: "Curtea Scolara Uderzo",
    },
    designer: "Espace Libre",
    location: {
      en: "Mantes-la-Jolie, France",
      it: "Mantes-la-Jolie, Francia",
      ro: "Mantes-la-Jolie, Franta",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/uderzo-schoolyard-by-espace-libre/",
    imageUrl: "https://landezine.com/wp-content/uploads/2025/11/2-2-1270x714.jpg",
    imageCredit: "Photo from Landezine project page. Photo credit listed by Landezine: Julien Falsimagne. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A Cours Oasis schoolyard transformation with vegetation, flexible play landscapes, shade, biodiversity, and climate adaptation.",
      it: "Una trasformazione Cours Oasis con vegetazione, paesaggi ludici flessibili, ombra, biodiversita e adattamento climatico.",
      ro: "O transformare Cours Oasis cu vegetatie, peisaje de joaca flexibile, umbra, biodiversitate si adaptare climatica.",
    },
    aiSummary: {
      en: "Strong reference for climate-adapted schoolyards, loose play, social learning, and cooling through planting.",
      it: "Riferimento forte per cortili scolastici adattati al clima, gioco libero, apprendimento sociale e raffrescamento vegetale.",
      ro: "Referinta buna pentru curti scolare adaptate climatic, joaca libera, invatare sociala si racire prin plantare.",
    },
    tags: ["schoolyard", "playground", "cours oasis", "climate adaptation", "biodiversity", "shade"],
    typology: "Schoolyard",
    materials: ["Timber", "Planting beds", "Permeable surfaces"],
    plantingStyle: "Climate-adapted school garden",
    climate: "Temperate",
    colourPalette: ["#4f6b45", "#b7a77a", "#d6d0bd", "#7f4f32"],
    scale: "Medium",
    atmosphere: "Playful, planted, inclusive",
    nbs: ["Urban cooling", "Biodiversity planting", "Shade"],
    healthThemes: ["Children's wellbeing", "Outdoor learning", "Social play"],
  },
  {
    id: "estavannens-schoolyard",
    title: {
      en: "Estavannens Schoolyard",
      it: "Cortile Scolastico Estavannens",
      ro: "Curtea Scolara Estavannens",
    },
    designer: "VWA",
    location: {
      en: "Estavannens, Switzerland",
      it: "Estavannens, Svizzera",
      ro: "Estavannens, Elvetia",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/estavannens-schoolyard-by-vwa/",
    imageUrl: "https://landezine.com/wp-content/uploads/2021/12/Estavannens-2-Lionel-Henriod-@-RBCH-1270x953.jpg",
    imageCredit: "Photo from Landezine project page. Image filename credits Lionel Henriod / RBCH; confirm rights with the credited holder before reuse.",
    snippet: {
      en: "A primary school landscape using modulated topography, play routes, native groves, an orchard edge, and water-sensitive roof runoff management.",
      it: "Un paesaggio scolastico con topografia modellata, percorsi ludici, alberature native, margine a frutteto e gestione delle acque di copertura.",
      ro: "Un peisaj scolar cu topografie modelata, trasee de joaca, grupuri de arbori nativi, margine de livada si gestionarea apei de pe acoperis.",
    },
    aiSummary: {
      en: "Relevant for topographic play, biodiversity, shade, orchard learning, and compact primary school grounds.",
      it: "Rilevante per gioco topografico, biodiversita, ombra, apprendimento nel frutteto e spazi scolastici compatti.",
      ro: "Relevant pentru joaca topografica, biodiversitate, umbra, invatare in livada si curti scolare compacte.",
    },
    tags: ["schoolyard", "primary school", "playground", "topography", "orchard", "native trees", "water management"],
    typology: "Schoolyard",
    materials: ["Timber", "Native planting", "Play surfacing"],
    plantingStyle: "Native groves and orchard",
    climate: "Temperate",
    colourPalette: ["#38543a", "#8a8f67", "#c8b98f", "#6b5b48"],
    scale: "Small",
    atmosphere: "Topographic, playful, rural",
    nbs: ["Native groves", "Roofwater management", "Shade trees"],
    healthThemes: ["Outdoor learning", "Movement", "Children's wellbeing"],
  },
  {
    id: "fornuddens-school-landscape",
    title: {
      en: "Fornuddens School Landscape",
      it: "Paesaggio Scolastico Fornuddens",
      ro: "Peisajul Scolar Fornuddens",
    },
    designer: "Tengbom",
    location: {
      en: "Tyreso, Stockholm, Sweden",
      it: "Tyreso, Stoccolma, Svezia",
      ro: "Tyreso, Stockholm, Suedia",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/fornuddens-school-landscape-by-tengbom/",
    imageUrl: "https://landezine.com/wp-content/uploads/2022/01/Nola_Tyreso_Parco_DJI_0627web_PPoint_Retina_-1270x846.jpg",
    imageCredit: "Photo from Landezine project page for Fornuddens School Landscape by Tengbom. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A school landscape in Tyreso combining outdoor learning, play, social edges, and a strong relationship to the surrounding terrain.",
      it: "Un paesaggio scolastico a Tyreso che unisce apprendimento all'aperto, gioco, margini sociali e rapporto con il terreno circostante.",
      ro: "Un peisaj scolar in Tyreso care combina invatarea in aer liber, joaca, margini sociale si relatia cu terenul din jur.",
    },
    aiSummary: {
      en: "Useful for Nordic schoolyard briefs, terrain-led play, durable public school grounds, and outdoor learning landscapes.",
      it: "Utile per brief scolastici nordici, gioco guidato dal terreno, spazi scolastici durevoli e paesaggi didattici all'aperto.",
      ro: "Util pentru curti scolare nordice, joaca ghidata de teren, spatii scolare durabile si peisaje educative exterioare.",
    },
    tags: ["schoolyard", "school", "outdoor learning", "play", "sweden", "nordic"],
    typology: "Schoolyard",
    materials: ["Timber", "Stone", "Play surfacing"],
    plantingStyle: "Nordic school landscape",
    climate: "Cold temperate",
    colourPalette: ["#33473b", "#8b9a7a", "#c2b9a2", "#6b6b63"],
    scale: "Medium",
    atmosphere: "Open, robust, educational",
    nbs: ["Outdoor learning", "Terrain integration", "Shade planting"],
    healthThemes: ["Movement", "Outdoor learning", "Social play"],
  },
  {
    id: "gadehaveskolen",
    title: {
      en: "Gadehaveskolen",
      it: "Gadehaveskolen",
      ro: "Gadehaveskolen",
    },
    designer: "1:1 Landskab",
    location: {
      en: "Høje-Taastrup, Denmark",
      it: "Høje-Taastrup, Danimarca",
      ro: "Høje-Taastrup, Danemarca",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/gadehaveskolen-by-11-landskab/",
    imageUrl: "https://landezine.com/wp-content/uploads/2022/03/Gadehaveskolen-by-1till1-Landskab-019-1270x846.jpg",
    imageCredit: "Photo from Landezine project page for Gadehaveskolen by 1:1 Landskab. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A Danish school landscape focused on outdoor life, shared school identity, playable routes, and robust everyday use.",
      it: "Un paesaggio scolastico danese orientato alla vita all'aperto, identita condivisa, percorsi ludici e uso quotidiano robusto.",
      ro: "Un peisaj scolar danez orientat spre viata in aer liber, identitate comuna, trasee de joaca si utilizare zilnica robusta.",
    },
    aiSummary: {
      en: "Good precedent for everyday schoolyard identity, social gathering, active play, and simple durable detailing.",
      it: "Buon precedente per identita scolastica quotidiana, aggregazione sociale, gioco attivo e dettagli durevoli.",
      ro: "Precedent bun pentru identitate scolara cotidiana, socializare, joaca activa si detalii durabile.",
    },
    tags: ["schoolyard", "school", "playground", "denmark", "social space", "active play"],
    typology: "Schoolyard",
    materials: ["Asphalt", "Timber", "Planting"],
    plantingStyle: "Robust school planting",
    climate: "Temperate",
    colourPalette: ["#2f4d3a", "#7b8066", "#b7a27a", "#3d3a35"],
    scale: "Medium",
    atmosphere: "Active, social, everyday",
    nbs: ["Outdoor activity", "Planting pockets", "Social shade"],
    healthThemes: ["Movement", "Social connection", "Outdoor learning"],
  },
  {
    id: "school-of-biodiversity",
    title: {
      en: "School of Biodiversity",
      it: "Scuola della Biodiversita",
      ro: "Scoala Biodiversitatii",
    },
    designer: "ChartierDalix",
    location: {
      en: "France",
      it: "Francia",
      ro: "Franta",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/school-of-biodiversity-by-chartierdalix/",
    imageUrl: "https://landezine.com/wp-content/uploads/2026/07/00ChartierDalix-©yannmonel-0401-1270x846.jpg",
    imageCredit: "Photo from Landezine project page. Photo credits listed by Landezine: Yann Monel, Takuji Shimmura, Myr Muratet, Serp.",
    snippet: {
      en: "A school project centered on biodiversity, layered living systems, roof landscapes, and educational ecological habitat.",
      it: "Un progetto scolastico centrato su biodiversita, sistemi viventi stratificati, paesaggi di copertura e habitat ecologico educativo.",
      ro: "Un proiect scolar centrat pe biodiversitate, sisteme vii stratificate, peisaje pe acoperis si habitat ecologic educativ.",
    },
    aiSummary: {
      en: "Useful for briefs connecting schools with biodiversity, habitat creation, roof ecology, and environmental learning.",
      it: "Utile per brief che collegano scuola, biodiversita, habitat, ecologia dei tetti e apprendimento ambientale.",
      ro: "Util pentru briefuri care conecteaza scoala, biodiversitatea, habitatul, ecologia acoperisurilor si educatia de mediu.",
    },
    tags: ["school", "biodiversity", "roof", "habitat", "ecology", "outdoor learning"],
    typology: "School",
    materials: ["Concrete", "Green roof", "Habitat planting"],
    plantingStyle: "Biodiverse roof habitat",
    climate: "Temperate",
    colourPalette: ["#2f513b", "#8fa176", "#d8d2bd", "#5a5b4d"],
    scale: "Large",
    atmosphere: "Ecological, layered, experimental",
    nbs: ["Biodiversity habitat", "Green roofs", "Ecological learning"],
    healthThemes: ["Environmental learning", "Contact with nature", "Curiosity"],
  },
  {
    id: "piazza-cairoli",
    title: {
      en: "Piazza Cairoli",
      it: "Piazza Cairoli",
      ro: "Piazza Cairoli",
    },
    designer: "expandstudio",
    location: {
      en: "Velletri, Italy",
      it: "Velletri, Italia",
      ro: "Velletri, Italia",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/piazza-cairoli-by-expandstudio/",
    imageUrl: "https://landezine.com/wp-content/uploads/2025/11/06-1-e1762708987155-1270x904.jpg",
    imageCredit: "Photo from Landezine project page. Photo credit listed by Landezine: Federico Farinatti.",
    snippet: {
      en: "A real Italian public-space precedent in Velletri focused on conviviality, civic ground, planting, and renewed everyday use.",
      it: "Un vero precedente italiano a Velletri orientato a convivialita, suolo civico, vegetazione e nuovo uso quotidiano.",
      ro: "Un precedent real italian in Velletri axat pe convivialitate, spatiu civic, plantare si utilizare cotidiana reinnoita.",
    },
    aiSummary: {
      en: "Use this for Italian civic-space references, warm paving, planting pockets, social edges, and public-life atmosphere.",
      it: "Da usare per riferimenti italiani di spazio civico, pavimentazioni calde, tasche vegetali, margini sociali e vita pubblica.",
      ro: "Util pentru referinte italiene de spatiu civic, pavaje calde, insule plantate, margini sociale si viata publica.",
    },
    tags: ["italy", "italian", "plaza", "public space", "civic", "planting", "social seating"],
    typology: "Public plaza",
    materials: ["Stone", "Paving", "Planting"],
    plantingStyle: "Mediterranean civic planting",
    climate: "Mediterranean",
    colourPalette: ["#b46f4d", "#dfd2bd", "#4f6b45", "#3b3a32"],
    scale: "Medium",
    atmosphere: "Civic, warm, convivial",
    nbs: ["Urban planting", "Shade", "Public realm cooling"],
    healthThemes: ["Social connection", "Walkability", "Restorative pause"],
  },
  {
    id: "parco-reggia-rivalta",
    title: {
      en: "Parco Reggia di Rivalta",
      it: "Parco Reggia di Rivalta",
      ro: "Parco Reggia di Rivalta",
    },
    designer: "Openfabric",
    location: {
      en: "Reggio Emilia, Italy",
      it: "Reggio Emilia, Italia",
      ro: "Reggio Emilia, Italia",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/parco-reggia-di-rivalta-reggio-emilia-by-openfabric/",
    imageUrl: "https://landezine.com/wp-content/uploads/2026/06/01-Hero-image_Ph.©Tiwii_2025-1270x951.jpg",
    imageCredit: "Photo from Landezine project page. Photography credits listed by Landezine include Bruno Cattani, Tiwi, Diego Arbore, Jacopo Gennari Feslikenian, Giulia Ansaldi, Andrea Colzani.",
    snippet: {
      en: "A real Italian cultural-heritage park in Reggio Emilia, combining restoration, park systems, civic access, and landscape memory.",
      it: "Un vero parco italiano di patrimonio culturale a Reggio Emilia, tra restauro, sistema del parco, accesso civico e memoria del paesaggio.",
      ro: "Un parc italian real de patrimoniu cultural in Reggio Emilia, cu restaurare, sistem de parc, acces civic si memorie peisagera.",
    },
    aiSummary: {
      en: "Use this for Italian park, heritage, restoration, public access, and large-scale landscape strategy references.",
      it: "Da usare per riferimenti italiani di parco, patrimonio, restauro, accesso pubblico e strategia paesaggistica ampia.",
      ro: "Util pentru referinte italiene de parc, patrimoniu, restaurare, acces public si strategie peisagera ampla.",
    },
    tags: ["italy", "italian", "park", "heritage", "restoration", "public access", "cultural landscape"],
    typology: "Park",
    materials: ["Historic landscape", "Paths", "Planting"],
    plantingStyle: "Cultural landscape restoration",
    climate: "Humid subtropical",
    colourPalette: ["#314b35", "#819264", "#d4c8aa", "#8b6b4a"],
    scale: "Large",
    atmosphere: "Historic, open, restorative",
    nbs: ["Landscape restoration", "Tree canopy", "Public green space"],
    healthThemes: ["Walking", "Cultural connection", "Restorative exposure"],
  },
];

export function sourceName(sourceId: BrainstormSourceId) {
  return brainstormSources.find((source) => source.id === sourceId)?.name ?? sourceId;
}

export function searchBrainstormReferences(query: string, filters: string[]) {
  const rawTerms = tokenize(`${query} ${filters.join(" ")}`);
  if (rawTerms.length === 0) return brainstormReferences;

  const terms = expandSearchTerms(rawTerms);
  const wantsItaly = rawTerms.some((term) => ["italian", "italy", "italia"].includes(term));
  const wantsSchoolyard = rawTerms.some((term) =>
    ["schoolyard", "school", "playground", "scolastico", "scolastica"].includes(term)
  );

  const ranked = brainstormReferences
    .map((reference, index) => {
      const title = [
        reference.title.en,
        reference.title.it,
        reference.title.ro,
      ].join(" ").toLowerCase();
      const location = [
        reference.location.en,
        reference.location.it,
        reference.location.ro,
      ].join(" ").toLowerCase();
      const typology = reference.typology.toLowerCase();
      const tags = reference.tags.join(" ").toLowerCase();
      const haystack = [
        reference.title.en,
        reference.title.it,
        reference.title.ro,
        reference.designer,
        reference.location.en,
        reference.location.it,
        reference.location.ro,
        reference.snippet.en,
        reference.snippet.it,
        reference.snippet.ro,
        reference.aiSummary.en,
        reference.aiSummary.it,
        reference.aiSummary.ro,
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

      const score = terms.reduce((total, term) => {
        if (!haystack.includes(term)) return total;
        if (title.includes(term)) return total + 8;
        if (location.includes(term)) return total + 24;
        if (typology.includes(term)) return total + 12;
        if (tags.includes(term)) return total + 10;
        return total + 3;
      }, 0);

      const exactPhraseBoost = rawTerms.length > 1 && haystack.includes(rawTerms.join(" ")) ? 12 : 0;
      return {
        reference,
        score: score + exactPhraseBoost,
        index,
        matchesItaly:
          location.includes("italy") ||
          location.includes("italia") ||
          location.includes("rome") ||
          location.includes("roma") ||
          location.includes("milan") ||
          location.includes("milano") ||
          location.includes("bologna") ||
          tags.includes("italian") ||
          tags.includes("italy"),
        matchesSchoolyard:
          typology.includes("schoolyard") ||
          tags.includes("schoolyard") ||
          tags.includes("playground") ||
          haystack.includes("school garden") ||
          haystack.includes("cortile scolastico"),
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);
  const strictRanked = ranked.filter(
    (item) =>
      (!wantsItaly || item.matchesItaly) &&
      (!wantsSchoolyard || item.matchesSchoolyard)
  );

  const bestRanked =
    strictRanked.length > 0
      ? strictRanked
      : [...ranked].sort((a, b) => {
          if (wantsItaly && a.matchesItaly !== b.matchesItaly) return a.matchesItaly ? -1 : 1;
          if (wantsSchoolyard && a.matchesSchoolyard !== b.matchesSchoolyard) {
            return a.matchesSchoolyard ? -1 : 1;
          }
          return b.score - a.score || a.index - b.index;
        });

  return bestRanked.length > 0 ? bestRanked.map((item) => item.reference) : brainstormReferences;
}

function tokenize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 2);
}

function expandSearchTerms(terms: string[]) {
  const synonyms: Record<string, string[]> = {
    italian: ["italian", "italy", "italia", "roma", "rome", "milan", "milano", "bologna"],
    italy: ["italian", "italy", "italia"],
    school: ["school", "schoolyard", "scolastico", "scolastica"],
    schoolyard: ["schoolyard", "school", "scolastico", "scolastica", "playground"],
    playground: ["playground", "schoolyard", "play"],
    cortile: ["courtyard", "schoolyard", "cortile"],
  };

  return Array.from(new Set(terms.flatMap((term) => synonyms[term] ?? [term])));
}

// TODO: Replace mock search with vector retrieval backed by embeddings.
// TODO: Add crawler jobs that store only permitted metadata, thumbnails, URLs, snippets, and credits.
// TODO: Add admin review workflow before AI tags become public.
// TODO: Add PDF and PPTX export services with source credits on every generated board.
