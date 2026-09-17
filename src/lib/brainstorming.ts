import type { LocalizedString } from "./types";

export type BrainstormSourceId =
  | "landezine"
  | "landscape-performance-series"
  | "lila"
  | "world-landscape-architecture"
  | "archdaily"
  | "asla"
  | "landscape-architecture-magazine"
  | "landscape-australia"
  | "landscape-first";

export interface BrainstormSource {
  id: BrainstormSourceId;
  name: string;
  homepage: string;
  status: "approved" | "pending";
  focus: string;
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
    focus: "Curated landscape architecture projects, awards, essays, photographs, drawings and typology-led precedent research.",
  },
  {
    id: "landscape-performance-series",
    name: "Landscape Performance Series",
    homepage: "https://www.landscapeperformance.org",
    status: "pending",
    focus: "Peer-reviewed performance case studies with quantified environmental, social and economic benefits.",
  },
  {
    id: "lila",
    name: "LILA",
    homepage: "https://landezine-award.com",
    status: "pending",
    focus: "Landezine International Landscape Award winners, distinctions and submitted contemporary projects.",
  },
  {
    id: "world-landscape-architecture",
    name: "World Landscape Architecture",
    homepage: "https://worldlandscapearchitect.com/general/project/",
    status: "pending",
    focus: "International project coverage across parks, plazas, gardens, schools, waterfronts, wetlands and emerging practices.",
  },
  {
    id: "archdaily",
    name: "ArchDaily",
    homepage: "https://www.archdaily.com/search/projects/categories/landscape-architecture",
    status: "pending",
    focus: "Large architecture and landscape project database for architecture-public realm-landscape relationships.",
  },
  {
    id: "asla",
    name: "ASLA Professional Awards",
    homepage: "https://www.asla.org/awards",
    status: "pending",
    focus: "Awarded landscape architecture projects with strong ecological, resilience, planning and research documentation.",
  },
  {
    id: "landscape-architecture-magazine",
    name: "Landscape Architecture Magazine",
    homepage: "https://landscapearchitecturemagazine.org",
    status: "pending",
    focus: "Critical professional context, essays and project discussion for understanding why a precedent matters.",
  },
  {
    id: "landscape-australia",
    name: "Landscape Australia",
    homepage: "https://landscapeaustralia.com",
    status: "pending",
    focus: "Australian public landscape, climate-responsive design, professional critique and regional precedent research.",
  },
  {
    id: "landscape-first",
    name: "Landscape First",
    homepage: "https://www.landscapefirst.com",
    status: "pending",
    focus: "Supplementary landscape architecture references and professional project coverage.",
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
  {
    id: "superkilen",
    title: {
      en: "Superkilen",
      it: "Superkilen",
      ro: "Superkilen",
    },
    designer: "TOPOTEK 1, BIG, Superflex",
    location: {
      en: "Copenhagen, Denmark",
      it: "Copenaghen, Danimarca",
      ro: "Copenhaga, Danemarca",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/urban-revitalization-superkilen-by-topotek1-big-superflex/",
    imageUrl: "https://landezine.com/wp-content/uploads/2013/02/20130205-Urban-Revitalization-Superkilen-by-Topotek1-BIG-Superflex-730x486.jpg",
    imageCredit: "Photo from Landezine project page. Credits on the source page include Iwan Baan, Hanns Joosten, Torben Eskerod, Jens Lindhe and Mike Magnussen.",
    snippet: {
      en: "A multicultural Copenhagen public space made as a sequence of red, black, and green urban rooms with global objects, sport, movement, and gathering.",
      it: "Uno spazio pubblico multiculturale a Copenaghen organizzato in stanze urbane rosse, nere e verdi con oggetti globali, sport, movimento e incontro.",
      ro: "Un spatiu public multicultural in Copenhaga, format din camere urbane rosii, negre si verzi, cu obiecte globale, sport, miscare si intalnire.",
    },
    aiSummary: {
      en: "Strong precedent for identity-led public space, playful urbanism, colour, multicultural storytelling, and active civic life.",
      it: "Precedente forte per spazio pubblico identitario, urbanismo ludico, colore, narrazione multiculturale e vita civica attiva.",
      ro: "Precedent puternic pentru spatiu public cu identitate, urbanism ludic, culoare, poveste multiculturala si viata civica activa.",
    },
    tags: ["public space", "plaza", "playground", "street", "copenhagen", "colour", "multicultural", "active play"],
    typology: "Public plaza",
    materials: ["Coloured asphalt", "Urban furniture", "Concrete", "Planting"],
    plantingStyle: "Urban park strips",
    climate: "Temperate",
    colourPalette: ["#c7352f", "#111111", "#49794a", "#d9d3c2"],
    scale: "Large",
    atmosphere: "Bold, urban, multicultural",
    nbs: ["Urban tree planting", "Active mobility", "Public green space"],
    healthThemes: ["Social connection", "Movement", "Cultural identity"],
  },
  {
    id: "qunli-national-urban-wetland",
    title: {
      en: "Qunli National Urban Wetland",
      it: "Qunli National Urban Wetland",
      ro: "Qunli National Urban Wetland",
    },
    designer: "Turenscape",
    location: {
      en: "Harbin, China",
      it: "Harbin, Cina",
      ro: "Harbin, China",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/qunli-national-urban-wetland-by-turenscape/",
    imageUrl: "https://landezine.com/wp-content/uploads/2014/01/Qunli-wetland-park-730x312.jpg",
    imageCredit: "Photo from Landezine project page for Qunli National Urban Wetland by Turenscape. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A sponge-city wetland park that protects a threatened wetland, stores stormwater, and makes ecological processes visible through paths and platforms.",
      it: "Un parco umido sponge-city che protegge una wetland minacciata, accumula acque meteoriche e rende visibili i processi ecologici con percorsi e piattaforme.",
      ro: "Un parc umed de tip sponge-city care protejeaza o zona umeda amenintata, stocheaza apa pluviala si face vizibile procesele ecologice prin trasee si platforme.",
    },
    aiSummary: {
      en: "Use this for stormwater, wetland conservation, sponge-city strategy, ecological education, and low-impact public access.",
      it: "Da usare per stormwater, conservazione wetland, strategia sponge-city, educazione ecologica e accesso pubblico a basso impatto.",
      ro: "Util pentru ape pluviale, conservarea zonelor umede, strategie sponge-city, educatie ecologica si acces public cu impact redus.",
    },
    tags: ["wetland", "sponge city", "stormwater", "flood resilience", "china", "ecology", "boardwalk"],
    typology: "Wetland park",
    materials: ["Boardwalks", "Wetland planting", "Observation platforms"],
    plantingStyle: "Wetland restoration",
    climate: "Cold temperate",
    colourPalette: ["#385a3c", "#8f9f6a", "#c3b777", "#5d4f3f"],
    scale: "Large",
    atmosphere: "Ecological, immersive, resilient",
    nbs: ["Stormwater storage", "Wetland habitat", "Flood mitigation"],
    healthThemes: ["Ecological learning", "Walking", "Contact with nature"],
  },
  {
    id: "yanweizhou-park",
    title: {
      en: "Yanweizhou Park",
      it: "Parco Yanweizhou",
      ro: "Parcul Yanweizhou",
    },
    designer: "Turenscape",
    location: {
      en: "Jinhua, China",
      it: "Jinhua, Cina",
      ro: "Jinhua, China",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/a-resilient-landscape-yanweizhou-park-in-jinhua-city-by-turenscape/",
    imageUrl: "https://landezine.com/wp-content/uploads/2015/03/yanweizhou-terrace-730x270.jpg",
    imageCredit: "Photo from Landezine project page for Yanweizhou Park by Turenscape. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A flood-adaptive river park where resilient terrain, bridges, paths, and plantings respond to monsoon water levels and daily public use.",
      it: "Un parco fluviale adattivo alle piene, dove terreno, ponti, percorsi e vegetazione rispondono ai livelli monsonici e all'uso quotidiano.",
      ro: "Un parc fluvial adaptat inundatiilor, unde terenul, podurile, traseele si plantarile raspund nivelurilor musonice si utilizarii zilnice.",
    },
    aiSummary: {
      en: "Strong reference for floodable public space, riverfront resilience, flexible events, and landscape infrastructure.",
      it: "Riferimento forte per spazio pubblico allagabile, resilienza fluviale, eventi flessibili e infrastruttura paesaggistica.",
      ro: "Referinta puternica pentru spatiu public inundabil, rezilienta fluviala, evenimente flexibile si infrastructura peisagera.",
    },
    tags: ["riverfront", "flood resilience", "waterfront", "bridge", "china", "landscape infrastructure"],
    typology: "Waterfront park",
    materials: ["Terraces", "Bridges", "Native planting", "Paths"],
    plantingStyle: "Flood-adapted riparian planting",
    climate: "Monsoon",
    colourPalette: ["#3f603f", "#9a8e5c", "#b44d39", "#d6cbb5"],
    scale: "Large",
    atmosphere: "Resilient, civic, dynamic",
    nbs: ["Floodable terraces", "Riparian habitat", "Water resilience"],
    healthThemes: ["Walking", "Public gathering", "Climate safety"],
  },
  {
    id: "tianjin-qiaoyuan-park",
    title: {
      en: "Tianjin Qiaoyuan Park",
      it: "Parco Tianjin Qiaoyuan",
      ro: "Parcul Tianjin Qiaoyuan",
    },
    designer: "Turenscape",
    location: {
      en: "Tianjin, China",
      it: "Tianjin, Cina",
      ro: "Tianjin, China",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/tianjin-qiaoyuan-park-by-turenscape-landscape-architecture/",
    imageUrl: "https://landezine.com/wp-content/uploads/2011/03/20110314-Tianjin-Qiaoyuan-Park-by-Turenscape-Landscape-Architecture-730x439.jpg",
    imageCredit: "Photo from Landezine project page for Tianjin Qiaoyuan Park by Turenscape. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A regenerative park made from a polluted drainage sink, using landform, ponds, and adaptive planting to clean stormwater and repair saline soil.",
      it: "Un parco rigenerativo nato da un bacino di drenaggio inquinato, con morfologie, stagni e vegetazione adattiva per depurare acque e suoli salini.",
      ro: "Un parc regenerativ creat dintr-o depresiune de drenaj poluata, cu relief, iazuri si plantare adaptiva pentru apa pluviala si soluri saline.",
    },
    aiSummary: {
      en: "Useful for polluted sites, stormwater purification, soil repair, adaptive planting, and ecological education.",
      it: "Utile per siti inquinati, depurazione delle acque meteoriche, riparazione del suolo, vegetazione adattiva ed educazione ecologica.",
      ro: "Util pentru situri poluate, purificarea apelor pluviale, repararea solului, plantare adaptiva si educatie ecologica.",
    },
    tags: ["brownfield", "stormwater", "soil remediation", "park", "china", "wetland", "regeneration"],
    typology: "Regenerative park",
    materials: ["Ponds", "Earthworks", "Wetland planting", "Paths"],
    plantingStyle: "Adaptive native planting",
    climate: "Coastal temperate",
    colourPalette: ["#3b533a", "#7f8f68", "#b5a16b", "#6d5949"],
    scale: "Large",
    atmosphere: "Regenerative, experimental, ecological",
    nbs: ["Stormwater purification", "Soil remediation", "Habitat creation"],
    healthThemes: ["Environmental learning", "Walking", "Restoration"],
  },
  {
    id: "shanghai-houtan-park",
    title: {
      en: "Shanghai Houtan Park",
      it: "Shanghai Houtan Park",
      ro: "Shanghai Houtan Park",
    },
    designer: "Turenscape",
    location: {
      en: "Shanghai, China",
      it: "Shanghai, Cina",
      ro: "Shanghai, China",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/shanghai-houtan-park-by-turenscape/",
    imageUrl: "https://landezine.com/wp-content/uploads/2011/02/20110222-Shanghai-Houtan-Park-by-Turenscape2-730x486.jpg",
    imageCredit: "Photo from Landezine project page for Shanghai Houtan Park by Turenscape. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A former industrial riverfront transformed into a living landscape with constructed wetlands, productive planting, water cleaning, and public promenades.",
      it: "Un ex waterfront industriale trasformato in paesaggio vivo con wetland costruite, vegetazione produttiva, depurazione dell'acqua e passeggiate pubbliche.",
      ro: "Un fost front industrial transformat intr-un peisaj viu, cu zone umede construite, plantare productiva, curatarea apei si promenade publice.",
    },
    aiSummary: {
      en: "Strong reference for brownfield waterfronts, constructed wetlands, productive landscapes, and visible ecological infrastructure.",
      it: "Riferimento forte per waterfront post-industriali, wetland costruite, paesaggi produttivi e infrastruttura ecologica visibile.",
      ro: "Referinta puternica pentru waterfronturi post-industriale, zone umede construite, peisaje productive si infrastructura ecologica vizibila.",
    },
    tags: ["brownfield", "waterfront", "constructed wetland", "productive landscape", "post-industrial", "china"],
    typology: "Waterfront park",
    materials: ["Constructed wetland", "Boardwalks", "Industrial remnants", "Paths"],
    plantingStyle: "Productive wetland planting",
    climate: "Humid subtropical",
    colourPalette: ["#31533d", "#84965e", "#b99362", "#514b43"],
    scale: "Large",
    atmosphere: "Productive, restorative, industrial",
    nbs: ["Water purification", "Wetland habitat", "Brownfield regeneration"],
    healthThemes: ["Walking", "Ecological learning", "Restorative exposure"],
  },
  {
    id: "sanlihe-ecological-corridor",
    title: {
      en: "Sanlihe Ecological Corridor",
      it: "Corridoio Ecologico Sanlihe",
      ro: "Coridorul Ecologic Sanlihe",
    },
    designer: "Turenscape",
    location: {
      en: "Qian'an, China",
      it: "Qian'an, Cina",
      ro: "Qian'an, China",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/ecological-coridor-landscape-architecture/",
    imageUrl: "https://landezine.com/wp-content/uploads/2012/01/20120102-Sanlihe-Ecological-Corridor-by-Turenscape-730x486.jpg",
    imageCredit: "Photo from Landezine project page for Sanlihe Ecological Corridor by Turenscape. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A 13.4 km ecological corridor that revives a river as urban infrastructure, reducing pollution and reconnecting city development with ecological function.",
      it: "Un corridoio ecologico di 13,4 km che riattiva un fiume come infrastruttura urbana, riducendo l'inquinamento e riconnettendo sviluppo urbano ed ecologia.",
      ro: "Un coridor ecologic de 13,4 km care reactiveaza un rau ca infrastructura urbana, reducand poluarea si reconectand dezvoltarea orasului cu ecologia.",
    },
    aiSummary: {
      en: "Use this for linear parks, river restoration, ecological corridors, infrastructure landscapes, and city-scale regeneration.",
      it: "Da usare per parchi lineari, rinaturalizzazione fluviale, corridoi ecologici, paesaggi infrastrutturali e rigenerazione urbana.",
      ro: "Util pentru parcuri liniare, restaurare fluviala, coridoare ecologice, peisaje infrastructurale si regenerare urbana.",
    },
    tags: ["ecological corridor", "river restoration", "linear park", "infrastructure", "china", "waterfront"],
    typology: "Ecological corridor",
    materials: ["River edges", "Wetland planting", "Paths", "Bridges"],
    plantingStyle: "Riparian ecological restoration",
    climate: "Temperate monsoon",
    colourPalette: ["#35583c", "#78926a", "#c2aa6e", "#5f5547"],
    scale: "Regional",
    atmosphere: "Linear, restorative, infrastructural",
    nbs: ["River restoration", "Pollution reduction", "Habitat corridor"],
    healthThemes: ["Active mobility", "Ecological learning", "Urban reconnection"],
  },
  {
    id: "hospital-karsudden",
    title: {
      en: "Hospital Karsudden",
      it: "Ospedale Karsudden",
      ro: "Spitalul Karsudden",
    },
    designer: "Urbio",
    location: {
      en: "Katrineholm, Sweden",
      it: "Katrineholm, Svezia",
      ro: "Katrineholm, Suedia",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/hospital-karsudden-by-urbio/",
    imageUrl: "https://landezine.com/wp-content/uploads/2018/10/main-4-1270x846.jpg",
    imageCredit: "Photo from Landezine project page for Hospital Karsudden by Urbio. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A hospital landscape based on biophilic values, daily access to nature, calm outdoor rooms, and therapeutic contact with planting.",
      it: "Un paesaggio ospedaliero basato su valori biofilici, accesso quotidiano alla natura, stanze esterne calme e contatto terapeutico con la vegetazione.",
      ro: "Un peisaj spitalicesc bazat pe valori biofilice, acces zilnic la natura, camere exterioare linistite si contact terapeutic cu plantarea.",
    },
    aiSummary: {
      en: "Strong reference for healthcare landscape, mental wellbeing, secure gardens, restorative planting, and calm outdoor rooms.",
      it: "Riferimento forte per paesaggi sanitari, benessere mentale, giardini protetti, vegetazione rigenerativa e spazi esterni calmi.",
      ro: "Referinta puternica pentru peisaje de sanatate, wellbeing mental, gradini protejate, plantare restaurativa si spatii exterioare calme.",
    },
    tags: ["hospital", "healing garden", "healthcare", "biophilic", "mental health", "sweden", "therapeutic"],
    typology: "Healthcare landscape",
    materials: ["Timber", "Planting", "Paths", "Garden rooms"],
    plantingStyle: "Restorative biophilic planting",
    climate: "Cold temperate",
    colourPalette: ["#2f4e3b", "#7d8b65", "#c9b991", "#6b5c4f"],
    scale: "Medium",
    atmosphere: "Calm, therapeutic, protected",
    nbs: ["Restorative planting", "Shade", "Biodiversity"],
    healthThemes: ["Mental health", "Restoration", "Accessible walking"],
  },
  {
    id: "jin-wellbeing-county",
    title: {
      en: "Jin Wellbeing County",
      it: "Jin Wellbeing County",
      ro: "Jin Wellbeing County",
    },
    designer: "SHMA",
    location: {
      en: "Pathum Thani, Thailand",
      it: "Pathum Thani, Thailandia",
      ro: "Pathum Thani, Thailanda",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/jin-wellbeing-county-shma/",
    imageUrl: "https://landezine.com/wp-content/uploads/2020/09/Wandering-paths-through-Jin-Wellbeing-1270x847.jpg",
    imageCredit: "Photo from Landezine project page for Jin Wellbeing County by SHMA. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A wellness and hospital-adjacent landscape for ageing society, with therapeutic gardens, universal access, sensory planting, and resting points.",
      it: "Un paesaggio per il benessere e la sanita dedicato all'invecchiamento, con giardini terapeutici, accesso universale, piante sensoriali e punti di sosta.",
      ro: "Un peisaj de wellbeing langa zona medicala, pentru societatea imbatranita, cu gradini terapeutice, acces universal, plantare senzoriala si locuri de pauza.",
    },
    aiSummary: {
      en: "Use this for senior-friendly landscapes, therapeutic routes, sensory gardens, universal design, and multigenerational community.",
      it: "Da usare per paesaggi age-friendly, percorsi terapeutici, giardini sensoriali, universal design e comunita multigenerazionale.",
      ro: "Util pentru peisaje age-friendly, trasee terapeutice, gradini senzoriale, design universal si comunitate multigenerationala.",
    },
    tags: ["wellbeing", "therapeutic garden", "universal design", "senior living", "healthcare", "sensory garden", "thailand"],
    typology: "Wellbeing landscape",
    materials: ["Ramps", "Handrails", "Water", "Sensory planting"],
    plantingStyle: "Tropical sensory planting",
    climate: "Tropical",
    colourPalette: ["#2d5c3d", "#8ab06a", "#d6bf72", "#6e5b44"],
    scale: "Large",
    atmosphere: "Therapeutic, lush, inclusive",
    nbs: ["Therapeutic planting", "Cooling vegetation", "Water-sensitive landscape"],
    healthThemes: ["Universal access", "Senior wellbeing", "Sensory therapy"],
  },
  {
    id: "sechselautenplatz",
    title: {
      en: "Sechselautenplatz, Zurich",
      it: "Sechselautenplatz, Zurigo",
      ro: "Sechselautenplatz, Zurich",
    },
    designer: "vetschpartner Landschaftsarchitekten",
    location: {
      en: "Zurich, Switzerland",
      it: "Zurigo, Svizzera",
      ro: "Zurich, Elvetia",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/sechselautenplatz-by-vetschpartner-landscape-architecture/",
    imageUrl: "https://landezine.com/wp-content/uploads/2015/02/Sechselautenplatz-vetschpartner_Landscape_Architecture-00-730x485.jpg",
    imageCredit: "Photo from Landezine project page for Sechselautenplatz by vetschpartner. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A large urban square beside Zurich's opera house, designed as a civic stage for everyday public life and major events.",
      it: "Una grande piazza urbana accanto all'opera di Zurigo, concepita come palcoscenico civico per vita quotidiana ed eventi.",
      ro: "O mare piata urbana langa opera din Zurich, gandita ca scena civica pentru viata zilnica si evenimente.",
    },
    aiSummary: {
      en: "Useful for hardscape plazas, flexible civic programming, minimal detailing, and event-ready public space.",
      it: "Utile per piazze minerali, programmazione civica flessibile, dettagli essenziali e spazi pubblici per eventi.",
      ro: "Util pentru piete minerale, programare civica flexibila, detalii minimale si spatii publice pregatite pentru evenimente.",
    },
    tags: ["plaza", "public space", "civic", "event space", "switzerland", "stone paving"],
    typology: "Public plaza",
    materials: ["Stone paving", "Water feature", "Urban furniture"],
    plantingStyle: "Minimal urban tree setting",
    climate: "Temperate",
    colourPalette: ["#c9c5b9", "#8a877d", "#425742", "#2f2f2d"],
    scale: "Large",
    atmosphere: "Civic, open, refined",
    nbs: ["Urban cooling", "Public realm", "Flexible open space"],
    healthThemes: ["Social connection", "Walkability", "Civic life"],
  },
  {
    id: "zurichhorn-childrens-playground",
    title: {
      en: "Zurichhorn Children's Playground",
      it: "Playground Zurichhorn",
      ro: "Locul de joaca Zurichhorn",
    },
    designer: "vetschpartner Landschaftsarchitekten",
    location: {
      en: "Zurich, Switzerland",
      it: "Zurigo, Svizzera",
      ro: "Zurich, Elvetia",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/the-zurichhorn-playground-by-vetschpartner-landscape-architects/",
    imageUrl: "https://landezine.com/wp-content/uploads/2011/02/Zurichhorn-Children-Playground-Zurich-vetschpartner-landschaftsarchitekten-00-1270x845.jpg",
    imageCredit: "Photo from Landezine project page. Photograph credits listed by Landezine include vetschpartner and Manuel Bauer.",
    snippet: {
      en: "A lakeside children's playground embedded in Zurich's intensively used public greenspace, balancing robust play with a park setting.",
      it: "Un playground per bambini sul lago, inserito in un parco pubblico molto usato a Zurigo, tra gioco robusto e contesto paesaggistico.",
      ro: "Un loc de joaca pe malul lacului, integrat intr-un spatiu verde public intens folosit din Zurich, intre joaca robusta si parc.",
    },
    aiSummary: {
      en: "Good precedent for park playgrounds, inclusive family spaces, timber play, public durability, and child-friendly waterfront parks.",
      it: "Buon precedente per playground in parchi, spazi familiari inclusivi, gioco in legno, durabilita pubblica e waterfront per bambini.",
      ro: "Precedent bun pentru locuri de joaca in parc, spatii familiale incluzive, joaca din lemn, durabilitate publica si parcuri pe apa pentru copii.",
    },
    tags: ["playground", "children", "park", "waterfront", "zurich", "family", "timber play"],
    typology: "Playground",
    materials: ["Timber", "Sand", "Play equipment", "Planting"],
    plantingStyle: "Park-edge planting",
    climate: "Temperate",
    colourPalette: ["#35563f", "#b98e57", "#d8c9a3", "#5d5648"],
    scale: "Small",
    atmosphere: "Playful, public, family-oriented",
    nbs: ["Shade trees", "Public green space", "Nature play"],
    healthThemes: ["Children's wellbeing", "Movement", "Family gathering"],
  },
  {
    id: "tumbling-bay-playground",
    title: {
      en: "Tumbling Bay Playground",
      it: "Tumbling Bay Playground",
      ro: "Tumbling Bay Playground",
    },
    designer: "LUC",
    location: {
      en: "London, United Kingdom",
      it: "Londra, Regno Unito",
      ro: "Londra, Regatul Unit",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/tumbling-bay-playground-by-luc/",
    imageUrl: "https://landezine.com/wp-content/uploads/2019/07/Tumbling-Bay-Playground-Main-Photo-1270x850.jpg",
    imageCredit: "Photo from Landezine project page for Tumbling Bay Playground by LUC. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A post-Olympic play landscape with adventurous timber structures, planting, water play, and everyday family use in Queen Elizabeth Olympic Park.",
      it: "Un paesaggio ludico post-olimpico con strutture in legno avventurose, vegetazione, gioco d'acqua e uso quotidiano familiare.",
      ro: "Un peisaj de joaca post-olimpic cu structuri din lemn aventuroase, plantare, joc cu apa si utilizare zilnica pentru familii.",
    },
    aiSummary: {
      en: "Strong reference for nature play, adventurous schoolyard ideas, timber structures, water play, and regeneration landscapes.",
      it: "Riferimento forte per nature play, idee per cortili scolastici avventurosi, strutture in legno, acqua e rigenerazione.",
      ro: "Referinta puternica pentru joaca in natura, idei pentru curti scolare aventuroase, structuri din lemn, apa si regenerare.",
    },
    tags: ["playground", "nature play", "water play", "timber", "london", "park", "children"],
    typology: "Playground",
    materials: ["Timber", "Sand", "Water play", "Planting"],
    plantingStyle: "Naturalistic play planting",
    climate: "Temperate",
    colourPalette: ["#365a40", "#a47545", "#d1c09a", "#4d4b43"],
    scale: "Medium",
    atmosphere: "Adventurous, natural, family-friendly",
    nbs: ["Nature play", "Water play", "Shade planting"],
    healthThemes: ["Children's wellbeing", "Movement", "Outdoor learning"],
  },
  {
    id: "schoolyard-st-lutgardiscollege",
    title: {
      en: "Schoolyard St Lutgardiscollege",
      it: "Cortile Scolastico St Lutgardiscollege",
      ro: "Curtea Scolara St Lutgardiscollege",
    },
    designer: "Studio Basta",
    location: {
      en: "Belgium",
      it: "Belgio",
      ro: "Belgia",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/schoolyard-st-lutgardiscollege-by-studio-basta/",
    imageUrl: "https://landezine.com/wp-content/uploads/2019/02/MAIN-1-1270x741.jpg",
    imageCredit: "Photo from Landezine project page for Schoolyard St Lutgardiscollege by Studio Basta. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A grey schoolyard transformed into a greener, more challenging and varied playground for students.",
      it: "Un cortile scolastico grigio trasformato in un playground piu verde, stimolante e vario per gli studenti.",
      ro: "O curte scolara gri transformata intr-un loc de joaca mai verde, mai provocator si mai variat pentru elevi.",
    },
    aiSummary: {
      en: "Good precedent for converting hard schoolyards into greener, more active and more engaging outdoor learning environments.",
      it: "Buon precedente per trasformare cortili minerali in ambienti scolastici esterni piu verdi, attivi e coinvolgenti.",
      ro: "Precedent bun pentru transformarea curtilor minerale in medii scolare exterioare mai verzi, active si captivante.",
    },
    tags: ["schoolyard", "school", "playground", "belgium", "greening", "active play", "outdoor learning"],
    typology: "Schoolyard",
    materials: ["Play surfacing", "Planting", "Timber", "Paving"],
    plantingStyle: "Green schoolyard planting",
    climate: "Temperate",
    colourPalette: ["#38583d", "#91a36e", "#c8b788", "#6b6254"],
    scale: "Medium",
    atmosphere: "Green, active, challenging",
    nbs: ["Schoolyard greening", "Shade planting", "Biodiversity"],
    healthThemes: ["Children's wellbeing", "Movement", "Outdoor learning"],
  },
  {
    id: "sipoonlahti-school",
    title: {
      en: "Sipoonlahti School",
      it: "Scuola Sipoonlahti",
      ro: "Scoala Sipoonlahti",
    },
    designer: "LOCUS Landscape Architects",
    location: {
      en: "Sipoo, Finland",
      it: "Sipoo, Finlandia",
      ro: "Sipoo, Finlanda",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/the-sipoonlahti-school/",
    imageUrl: "https://landezine.com/wp-content/uploads/2021/02/1_Martin_Sommerschield-1270x952.jpg",
    imageCredit: "Photo from Landezine project page. Photo credit listed by Landezine: Martin Sommerschield / Kuvio.",
    snippet: {
      en: "A large Finnish schoolyard renovated as a versatile learning environment and public outdoor place outside school hours.",
      it: "Un grande cortile scolastico finlandese rinnovato come ambiente di apprendimento versatile e spazio pubblico fuori dall'orario scolastico.",
      ro: "O curte scolara finlandeza mare, renovata ca mediu de invatare versatil si spatiu public in afara orelor de scoala.",
    },
    aiSummary: {
      en: "Strong reference for schoolyards that work as public parks, with sport, outdoor learning, social use and robust everyday design.",
      it: "Riferimento forte per cortili scolastici che funzionano come parchi pubblici, con sport, apprendimento esterno, socialita e robustezza.",
      ro: "Referinta puternica pentru curti scolare care functioneaza ca parcuri publice, cu sport, invatare afara, socializare si design robust.",
    },
    tags: ["schoolyard", "school", "public park", "finland", "sport", "outdoor learning", "community"],
    typology: "Schoolyard",
    materials: ["Play surfacing", "Sports courts", "Planting", "Paving"],
    plantingStyle: "Nordic public school landscape",
    climate: "Cold temperate",
    colourPalette: ["#334f3c", "#7e916d", "#c7b98e", "#555851"],
    scale: "Large",
    atmosphere: "Open, public, versatile",
    nbs: ["Public green space", "Outdoor learning", "Shade planting"],
    healthThemes: ["Movement", "Community use", "Children's wellbeing"],
  },
  {
    id: "stanislas-institute",
    title: {
      en: "Stanislas Institute",
      it: "Istituto Stanislas",
      ro: "Institutul Stanislas",
    },
    designer: "Atelier CLAP",
    location: {
      en: "France",
      it: "Francia",
      ro: "Franta",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/stanislas-institute-by-atelier-clap/",
    imageUrl: "https://landezine.com/wp-content/uploads/2025/04/0_22_ELEMENTARY-2-1270x512.jpeg",
    imageCredit: "Photo from Landezine project page for Stanislas Institute by Atelier CLAP. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A school landscape focused on atmosphere, storytelling, outdoor rooms, and emotionally rich spaces for learning and gathering.",
      it: "Un paesaggio scolastico orientato ad atmosfera, narrazione, stanze esterne e spazi emotivamente ricchi per apprendimento e incontro.",
      ro: "Un peisaj scolar axat pe atmosfera, poveste, camere exterioare si spatii bogate emotional pentru invatare si intalnire.",
    },
    aiSummary: {
      en: "Useful for poetic school grounds, outdoor rooms, child-scale gathering, narrative design, and softer educational landscapes.",
      it: "Utile per spazi scolastici poetici, stanze esterne, incontro a scala bambino, design narrativo e paesaggi educativi piu morbidi.",
      ro: "Util pentru curti scolare poetice, camere exterioare, intalnire la scara copilului, design narativ si peisaje educative mai blande.",
    },
    tags: ["school", "schoolyard", "outdoor rooms", "france", "playground", "learning landscape"],
    typology: "Schoolyard",
    materials: ["Paving", "Planting", "Play surfaces", "Seating"],
    plantingStyle: "Layered school planting",
    climate: "Temperate",
    colourPalette: ["#3b5b40", "#8d9c70", "#d1c2a2", "#7a6551"],
    scale: "Medium",
    atmosphere: "Poetic, social, educational",
    nbs: ["Outdoor rooms", "Schoolyard greening", "Shade planting"],
    healthThemes: ["Outdoor learning", "Children's wellbeing", "Social connection"],
  },
  {
    id: "jules-ferry-park-lorient",
    title: {
      en: "Jules Ferry Park in Lorient",
      it: "Parco Jules Ferry a Lorient",
      ro: "Parcul Jules Ferry din Lorient",
    },
    designer: "In Situ",
    location: {
      en: "Lorient, France",
      it: "Lorient, Francia",
      ro: "Lorient, Franta",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/jules-ferry-park-in-lorient-by-in-situ/",
    imageUrl: "https://landezine.com/wp-content/uploads/2022/11/IS_Jules-Ferry-Park_-Lorient_credit-Samborska-05-copy-1-e1669027331259-1270x676.jpg",
    imageCredit: "Photo from Landezine project page. Image filename credits Samborska; confirm rights with the credited holder before reuse.",
    snippet: {
      en: "A city-centre landscape that combines mall, square, and park to connect Lorient's centre with the sea.",
      it: "Un paesaggio urbano centrale che combina boulevard, piazza e parco per collegare il centro di Lorient al mare.",
      ro: "Un peisaj urban central care combina promenada, piata si parc pentru a conecta centrul orasului Lorient cu marea.",
    },
    aiSummary: {
      en: "Use this for coastal urban regeneration, civic park-plaza hybrids, large pedestrian links, and public-space sequencing.",
      it: "Da usare per rigenerazione urbana costiera, ibridi parco-piazza, collegamenti pedonali ampi e sequenze di spazio pubblico.",
      ro: "Util pentru regenerare urbana costiera, hibride parc-piata, legaturi pietonale mari si secvente de spatiu public.",
    },
    tags: ["park", "plaza", "coastal city", "public space", "france", "urban regeneration"],
    typology: "Park and plaza",
    materials: ["Paving", "Lawns", "Trees", "Urban furniture"],
    plantingStyle: "Urban coastal planting",
    climate: "Oceanic",
    colourPalette: ["#3b6146", "#8e9b69", "#d2c4a4", "#75685a"],
    scale: "Large",
    atmosphere: "Civic, coastal, connective",
    nbs: ["Tree canopy", "Public green space", "Cooling"],
    healthThemes: ["Walkability", "Social connection", "Restorative pause"],
  },
  {
    id: "place-des-montrealaises",
    title: {
      en: "Place des Montrealaises",
      it: "Place des Montrealaises",
      ro: "Place des Montrealaises",
    },
    designer: "Lemay",
    location: {
      en: "Montreal, Canada",
      it: "Montreal, Canada",
      ro: "Montreal, Canada",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/place-des-montrealaises-by-lemay/",
    imageUrl: "https://landezine.com/wp-content/uploads/2026/09/0-Hero-Place_des_Montrealaises_Lemay_AngelaSilver_AtkinsRealiscredit_Vincent_Brillant-1270x953.jpg",
    imageCredit: "Photo from Landezine project page. Image filename credits Angela Silver, AtkinsRealis and Vincent Brillant.",
    snippet: {
      en: "A new public landscape over infrastructure that reconnects Montreal's urban fabric and memorializes women's civic contribution.",
      it: "Un nuovo paesaggio pubblico sopra infrastrutture che riconnette il tessuto urbano di Montreal e celebra il contributo civico delle donne.",
      ro: "Un nou peisaj public peste infrastructura, care reconecteaza tesutul urban al Montrealului si comemoreaza contributia civica a femeilor.",
    },
    aiSummary: {
      en: "Useful for infrastructure decks, memorial landscapes, civic identity, inclusive public space, and urban reconnection.",
      it: "Utile per coperture infrastrutturali, paesaggi memoriali, identita civica, spazio pubblico inclusivo e riconnessione urbana.",
      ro: "Util pentru platforme peste infrastructura, peisaje memoriale, identitate civica, spatiu public incluziv si reconectare urbana.",
    },
    tags: ["plaza", "memorial", "infrastructure", "canada", "public space", "urban reconnection"],
    typology: "Memorial plaza",
    materials: ["Paving", "Planting", "Integrated infrastructure", "Seating"],
    plantingStyle: "Urban civic planting",
    climate: "Cold continental",
    colourPalette: ["#d6d0c0", "#4d634d", "#b87056", "#3f3f3c"],
    scale: "Medium",
    atmosphere: "Civic, symbolic, connective",
    nbs: ["Urban greening", "Deck landscape", "Cooling"],
    healthThemes: ["Civic memory", "Walkability", "Social connection"],
  },
  {
    id: "glasgow-claypits",
    title: {
      en: "Glasgow Claypits",
      it: "Glasgow Claypits",
      ro: "Glasgow Claypits",
    },
    designer: "LUC",
    location: {
      en: "Glasgow, Scotland",
      it: "Glasgow, Scozia",
      ro: "Glasgow, Scotia",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/glasgow-claypits-by-luc/",
    imageUrl: "https://landezine.com/wp-content/uploads/2024/06/An-observation-point-at-Glasgow-Claypits-offering-views-of-the-surrounding-housing-and-community-1270x572.jpg",
    imageCredit: "Photo from Landezine project page for Glasgow Claypits by LUC. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A canal-side nature path and restored post-industrial landscape reconnecting disadvantaged communities with habitat, views, and access.",
      it: "Un percorso naturalistico lungo il canale e paesaggio post-industriale restaurato che riconnette comunita fragili con habitat, viste e accesso.",
      ro: "Un traseu natural pe canal si peisaj post-industrial restaurat, care reconecteaza comunitati vulnerabile cu habitat, privelisti si acces.",
    },
    aiSummary: {
      en: "Strong precedent for community regeneration, post-industrial ecology, nature paths, access, and everyday wellbeing.",
      it: "Riferimento forte per rigenerazione comunitaria, ecologia post-industriale, percorsi naturalistici, accesso e benessere quotidiano.",
      ro: "Referinta puternica pentru regenerare comunitara, ecologie post-industriala, trasee naturale, acces si wellbeing cotidian.",
    },
    tags: ["post-industrial", "nature path", "community", "canal", "restoration", "scotland", "access"],
    typology: "Nature path",
    materials: ["Paths", "Observation points", "Grassland", "Habitat planting"],
    plantingStyle: "Post-industrial habitat restoration",
    climate: "Oceanic",
    colourPalette: ["#36543c", "#89976a", "#c0b18d", "#56584d"],
    scale: "Large",
    atmosphere: "Community-led, ecological, restorative",
    nbs: ["Habitat restoration", "Canal landscape", "Community green space"],
    healthThemes: ["Walking", "Social equity", "Contact with nature"],
  },
  {
    id: "parque-el-jaguar",
    title: {
      en: "Parque El Jaguar",
      it: "Parque El Jaguar",
      ro: "Parque El Jaguar",
    },
    designer: "Colectivo C733",
    location: {
      en: "Mexico",
      it: "Messico",
      ro: "Mexic",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/parque-el-jaguar-by-colectivo-c733/",
    imageUrl: "https://landezine.com/wp-content/uploads/2026/06/A_HEROPhoto-1270x951.jpg",
    imageCredit: "Photo from Landezine project page for Parque El Jaguar by Colectivo C733. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A large infrastructure and park intervention protecting natural and cultural heritage while improving public access and environmental performance.",
      it: "Un grande intervento di infrastruttura e parco che protegge patrimonio naturale e culturale migliorando accesso pubblico e prestazioni ambientali.",
      ro: "O interventie mare de infrastructura si parc care protejeaza patrimoniul natural si cultural si imbunatateste accesul public si performanta ecologica.",
    },
    aiSummary: {
      en: "Use this for heritage landscapes, tropical infrastructure, ecological protection, cultural identity, and public-access strategies.",
      it: "Da usare per paesaggi di patrimonio, infrastrutture tropicali, protezione ecologica, identita culturale e strategie di accesso pubblico.",
      ro: "Util pentru peisaje de patrimoniu, infrastructura tropicala, protectie ecologica, identitate culturala si strategii de acces public.",
    },
    tags: ["park", "heritage", "infrastructure", "mexico", "tropical", "public access", "ecology"],
    typology: "Heritage park",
    materials: ["Paths", "Tropical planting", "Infrastructure", "Public facilities"],
    plantingStyle: "Tropical ecological planting",
    climate: "Tropical",
    colourPalette: ["#24563d", "#8fa85d", "#c9a354", "#5b4936"],
    scale: "Large",
    atmosphere: "Tropical, protective, civic",
    nbs: ["Habitat protection", "Cooling vegetation", "Cultural landscape"],
    healthThemes: ["Walking", "Cultural connection", "Public access"],
  },
  {
    id: "heartwood-preserve",
    title: {
      en: "Heartwood Preserve",
      it: "Heartwood Preserve",
      ro: "Heartwood Preserve",
    },
    designer: "Meyer Studio Land Architects",
    location: {
      en: "Omaha, Nebraska, USA",
      it: "Omaha, Nebraska, USA",
      ro: "Omaha, Nebraska, SUA",
    },
    sourceId: "landezine",
    sourceUrl: "https://landezine.com/heartwood-preserve-by-meyer-studio-land-architects/",
    imageUrl: "https://landezine.com/wp-content/uploads/2026/06/Axial_1_DM-1270x953.jpg",
    imageCredit: "Photo from Landezine project page for Heartwood Preserve by Meyer Studio Land Architects. Image use requires permission from the credited rights holder.",
    snippet: {
      en: "A 500-acre mixed-use landscape within a watershed affected by severe storms, using open space as ecological and civic infrastructure.",
      it: "Un paesaggio mixed-use di 500 acri in un bacino segnato da forti eventi meteorici, dove lo spazio aperto diventa infrastruttura ecologica e civica.",
      ro: "Un peisaj mixed-use de 500 acri intr-un bazin afectat de furtuni severe, unde spatiul deschis devine infrastructura ecologica si civica.",
    },
    aiSummary: {
      en: "Good precedent for watershed planning, flood resilience, large-scale development landscapes, and open-space frameworks.",
      it: "Buon precedente per pianificazione di bacino, resilienza idraulica, paesaggi di sviluppo a grande scala e sistemi di spazio aperto.",
      ro: "Precedent bun pentru planificare de bazin, rezilienta la inundatii, peisaje de dezvoltare la scara mare si sisteme de spatiu deschis.",
    },
    tags: ["flood resilience", "watershed", "mixed-use", "usa", "park", "open space", "stormwater"],
    typology: "Regional open space",
    materials: ["Native planting", "Stormwater basins", "Paths", "Open lawns"],
    plantingStyle: "Prairie and watershed planting",
    climate: "Continental",
    colourPalette: ["#3a5a36", "#9a9f5d", "#d4b46c", "#5c5146"],
    scale: "Regional",
    atmosphere: "Open, resilient, civic",
    nbs: ["Watershed management", "Flood storage", "Native habitat"],
    healthThemes: ["Walking", "Climate safety", "Community open space"],
  },
];

export function sourceName(sourceId: BrainstormSourceId) {
  return brainstormSources.find((source) => source.id === sourceId)?.name ?? sourceId;
}

export function searchBrainstormReferences(query: string, filters: string[]) {
  const searchText = `${query} ${filters.join(" ")}`.toLowerCase();
  const rawTerms = tokenize(searchText);
  if (rawTerms.length === 0) return brainstormReferences;

  const terms = expandSearchTerms(rawTerms);
  const wantsEnglishGarden = /\b(english|landscape)\s+(landscape\s+)?garden\b/.test(searchText);
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
      const referenceClassification = `${typology} ${tags}`;
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

      const matchesEnglishGarden =
        /(heritage|cultural landscape|estate|historic garden)/.test(referenceClassification) ||
        typology === "park" ||
        typology === "park and plaza";
      const exactPhraseBoost = rawTerms.length > 1 && haystack.includes(rawTerms.join(" ")) ? 12 : 0;
      const semanticIntentBoost =
        wantsEnglishGarden && matchesEnglishGarden
          ? /(heritage|cultural landscape|estate|historic garden)/.test(referenceClassification)
            ? 52
            : 32
          : 0;
      return {
        reference,
        score: score + exactPhraseBoost + semanticIntentBoost,
        index,
        matchesEnglishGarden,
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
      (!wantsEnglishGarden || item.matchesEnglishGarden) &&
      (!wantsItaly || item.matchesItaly) &&
      (!wantsSchoolyard || item.matchesSchoolyard)
  );

  const bestRanked =
    strictRanked.length > 0
      ? strictRanked
      : [...ranked].sort((a, b) => {
          if (wantsItaly && a.matchesItaly !== b.matchesItaly) return a.matchesItaly ? -1 : 1;
          if (wantsEnglishGarden && a.matchesEnglishGarden !== b.matchesEnglishGarden) {
            return a.matchesEnglishGarden ? -1 : 1;
          }
          if (wantsSchoolyard && a.matchesSchoolyard !== b.matchesSchoolyard) {
            return a.matchesSchoolyard ? -1 : 1;
          }
          return b.score - a.score || a.index - b.index;
        });

  return bestRanked.map((item) => item.reference);
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
