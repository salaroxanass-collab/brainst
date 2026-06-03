import type { Project, Publication, ResearchItem } from "./types";

export const projects: Project[] = [
  {
    slug: "river-park-regeneration",
    title: { en: "River Park Regeneration", it: "Rigenerazione Parco Fluviale", ro: "Regenerarea Parcului Fluvial" },
    location: { en: "Emilia-Romagna, Italy", it: "Emilia-Romagna, Italia", ro: "Emilia-Romagna, Italia" },
    year: "2024",
    categories: ["landscape", "nbs"],
    tags: ["Hydrology", "Public realm", "Ecology"],
    description: {
      en: "A nature-based strategy reconnecting urban communities with the river corridor through resilient planting and accessible paths.",
      it: "Una strategia basata sulla natura che riconnette le comunità urbane al corridoio fluviale.",
      ro: "O strategie bazata pe natura care reconecteaza comunitatile urbane cu coridorul raului prin plantari reziliente si trasee accesibile.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80",
    mapCoords: [11.34, 44.49],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&q=80",
        caption: { en: "Existing riparian edge — field survey", it: "Bordo fluviale esistente — rilievo", ro: "Margine riverana existenta — studiu de teren" },
      },
      {
        src: "https://images.unsplash.com/photo-1518173946687-2a0b436caa8f?w=1400&q=80",
        caption: { en: "Proposed planting palette", it: "Palette vegetazionale proposta", ro: "Paleta de plantari propusa" },
      },
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1542273910-4c61dcc27e0e?w=1200&q=80",
      after: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
    },
    insights: [
      {
        en: "Floodplain expansion increases storage capacity by 18% in modelled scenarios.",
        it: "L'espansione della pianura alluvionale aumenta la capacità di accumulo del 18%.",
        ro: "Extinderea luncii inundabile creste capacitatea de stocare cu 18% in scenariile modelate.",
      },
    ],
  },
  {
    slug: "health-corridor-strategy",
    title: { en: "Urban Health Corridor", it: "Corridoio Urbano per la Salute", ro: "Coridor Urban pentru Sanatate" },
    location: { en: "Bologna, Italy", it: "Bologna, Italia", ro: "Bologna, Italia" },
    year: "2023",
    categories: ["urban", "research"],
    tags: ["Health", "Mobility", "Green infrastructure"],
    description: {
      en: "Spatial analysis linking green access, walkability, and health outcomes across neighbourhoods.",
      it: "Analisi spaziale che collega accesso al verde, camminabilità e salute nei quartieri.",
      ro: "Analiza spatiala care conecteaza accesul la verde, mersul pe jos si rezultatele de sanatate in cartiere.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1600&q=80",
    mapCoords: [11.3426, 44.4949],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=80",
        caption: { en: "GIS accessibility layers", it: "Strati GIS di accessibilità", ro: "Straturi GIS de accesibilitate" },
      },
    ],
  },
  {
    slug: "coastal-resilience-lab",
    title: { en: "Coastal Resilience Lab", it: "Laboratorio di Resilienza Costiera", ro: "Laborator de Rezilienta Costiera" },
    location: { en: "Adriatic Coast", it: "Costa Adriatica", ro: "Coasta Adriatica" },
    year: "2023",
    categories: ["research", "gis"],
    tags: ["Climate", "Dunes", "Monitoring"],
    description: {
      en: "Environmental intelligence framework for dune systems and storm-surge adaptation.",
      it: "Framework di intelligenza ambientale per dune e adattamento alle mareggiate.",
      ro: "Cadru de inteligenta de mediu pentru sisteme de dune si adaptare la furtuni costiere.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&q=80",
    mapCoords: [12.5, 44.1],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1400&q=80",
        caption: { en: "Lidar-derived terrain model", it: "Modello del terreno da lidar", ro: "Model de teren derivat din lidar" },
      },
    ],
  },
  {
    slug: "courtyard-microforest",
    title: { en: "Courtyard Microforest", it: "Microforesta di Cortile", ro: "Micro-padure de Curte" },
    location: { en: "Modena, Italy", it: "Modena, Italia", ro: "Modena, Italia" },
    year: "2022",
    categories: ["landscape", "nbs"],
    tags: ["Biodiversity", "Cooling", "Education"],
    description: {
      en: "Dense native planting in a school courtyard — a living laboratory for microclimate and wellbeing.",
      it: "Impianto nativo denso in un cortile scolastico — laboratorio di microclima e benessere.",
      ro: "Plantari native dense intr-o curte scolara — un laborator viu pentru microclimat si bunastare.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80",
    mapCoords: [10.9252, 44.6471],
    gallery: [],
  },
  {
    slug: "future-park-competition",
    title: { en: "Future Park — Competition", it: "Parco del Futuro — Concorso", ro: "Parcul Viitorului — Concurs" },
    location: { en: "International", it: "Internazionale", ro: "International" },
    year: "2022",
    categories: ["competition", "landscape"],
    tags: ["Competition", "Play", "Water"],
    description: {
      en: "Playful yet rigorous proposal for a flood-adaptive park with circular water systems.",
      it: "Proposta rigorosa e giocosa per un parco adattivo alle piene con sistemi idrici circolari.",
      ro: "Propunere ludica, dar riguroasa, pentru un parc adaptat inundatiilor, cu sisteme circulare de apa.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1586348943529-beaae1a28b7a?w=1600&q=80",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1598902108852-417f94950288?w=1400&q=80",
        caption: { en: "Process sketch — water loops", it: "Schizzo di processo — cicli idrici", ro: "Schita de proces — bucle de apa" },
      },
    ],
  },
  {
    slug: "wetland-monitoring",
    title: { en: "Wetland Monitoring Atlas", it: "Atlante di Monitoraggio delle Zone Umide", ro: "Atlas de Monitorizare a Zonelor Umede" },
    location: { en: "Po Valley", it: "Pianura Padana", ro: "Valea Po" },
    year: "2024",
    categories: ["gis", "research"],
    tags: ["Remote sensing", "Biodiversity", "Policy"],
    description: {
      en: "Multi-temporal GIS atlas supporting wetland restoration prioritisation.",
      it: "Atlante GIS multi-temporale per la prioritizzazione del restauro delle zone umide.",
      ro: "Atlas GIS multi-temporal care sustine prioritizarea restaurarii zonelor umede.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1426604966848-d7adac473bff?w=1600&q=80",
    mapCoords: [11.0, 45.0],
    gallery: [],
  },
  {
    slug: "healing-garden-study",
    title: { en: "Healing Garden Study", it: "Studio del Giardino Terapeutico", ro: "Studiu pentru Gradina Terapeutica" },
    location: { en: "Healthcare Campus", it: "Campus sanitario", ro: "Campus medical" },
    year: "2021",
    categories: ["research", "landscape"],
    tags: ["Health", "Sensory", "Evidence"],
    description: {
      en: "Research-led design guidelines for restorative outdoor spaces in clinical settings.",
      it: "Linee guida basate sulla ricerca per spazi esterni rigenerativi in contesti clinici.",
      ro: "Ghiduri de design bazate pe cercetare pentru spatii exterioare restaurative in contexte clinice.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1200&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1585320806297-9794bced3fae?w=1600&q=80",
    gallery: [],
  },
];

export const researchItems: ResearchItem[] = [
  {
    slug: "green-access-health",
    title: { en: "Green Access & Population Health", it: "Accesso al Verde e Salute della Popolazione", ro: "Accesul la Verde si Sanatatea Populatiei" },
    year: "2024",
    description: {
      en: "Spatial equity analysis of urban green exposure and health indicators.",
      it: "Analisi dell'equità spaziale dell'esposizione al verde urbano e indicatori di salute.",
      ro: "Analiza echitatii spatiale privind expunerea la verde urban si indicatorii de sanatate.",
    },
    tags: ["GIS", "Health", "Equity"],
    coverImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    mapCoords: [11.34, 44.49],
  },
  {
    slug: "nbs-performance-metrics",
    title: { en: "NbS Performance Metrics", it: "Metriche di Prestazione NbS", ro: "Metrici de Performanta pentru NbS" },
    year: "2023",
    description: {
      en: "Framework for measuring cooling, biodiversity, and hydrological benefits of nature-based solutions.",
      it: "Framework per misurare raffrescamento, biodiversità e benefici idrologici delle NbS.",
      ro: "Cadru pentru masurarea racirii, biodiversitatii si beneficiilor hidrologice ale solutiilor bazate pe natura.",
    },
    tags: ["NbS", "Monitoring"],
    coverImage:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5e240?w=1200&q=80",
  },
  {
    slug: "coastal-dune-digital-twin",
    title: { en: "Coastal Dune Digital Twin", it: "Gemello Digitale delle Dune Costiere", ro: "Geaman Digital al Dunelor Costiere" },
    year: "2023",
    description: {
      en: "Environmental dataset and visualisation layers for adaptive coastal management.",
      it: "Dataset ambientale e strati di visualizzazione per la gestione costiera adattiva.",
      ro: "Set de date de mediu si straturi de vizualizare pentru management costier adaptiv.",
    },
    tags: ["GIS", "Climate"],
    coverImage:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80",
    mapCoords: [12.5, 44.1],
  },
];

export const publications: Publication[] = [
  {
    slug: "urban-green-health-2024",
    title: {
      en: "Urban green infrastructure and health equity",
      it: "Infrastrutture verdi urbane ed equità sanitaria",
      ro: "Infrastructura verde urbana si echitatea in sanatate",
    },
    authors: "BrainSt Studio",
    year: "2024",
    type: "journal",
    venue: "Landscape & Urban Planning",
    abstract: {
      en: "Linking GIS-derived green access metrics with neighbourhood health outcomes.",
      it: "Collegamento tra metriche GIS di accesso al verde e salute di quartiere.",
      ro: "Conectarea metricilor de acces la verde derivate din GIS cu rezultatele de sanatate la nivel de cartier.",
    },
    tags: ["Health", "GIS"],
  },
  {
    slug: "nbs-cooling-ecca-2023",
    title: {
      en: "Nature-based cooling in dense urban fabrics",
      it: "Raffrescamento basato sulla natura nei tessuti urbani densi",
      ro: "Racire bazata pe natura in tesuturi urbane dense",
    },
    authors: "BrainSt Studio",
    year: "2023",
    type: "conference",
    venue: "ECCA 2023",
    abstract: {
      en: "Conference paper on microclimate performance of courtyard microforests.",
      it: "Articolo su microclima e microforeste di cortile.",
      ro: "Lucrare de conferinta despre performanta microclimatica a micro-padurilor de curte.",
    },
    tags: ["NbS", "Climate"],
  },
  {
    slug: "wetland-atlas-report",
    title: {
      en: "Wetland Restoration Prioritisation Atlas",
      it: "Atlante di Prioritizzazione del Restauro delle Zone Umide",
      ro: "Atlas pentru Prioritizarea Restaurarii Zonelor Umede",
    },
    authors: "BrainSt Studio",
    year: "2024",
    type: "report",
    venue: "Research Report",
    abstract: {
      en: "Downloadable atlas with GIS layers and restoration scenarios.",
      it: "Atlante scaricabile con strati GIS e scenari di restauro.",
      ro: "Atlas descarcabil cu straturi GIS si scenarii de restaurare.",
    },
    tags: ["GIS", "Ecology"],
    pdfUrl: "#",
  },
  {
    slug: "healing-gardens-review",
    title: {
      en: "Evidence-based healing gardens: a scoping review",
      it: "Giardini terapeutici basati sull'evidenza: scoping review",
      ro: "Gradini terapeutice bazate pe dovezi: analiza exploratorie",
    },
    authors: "BrainSt Studio",
    year: "2022",
    type: "journal",
    venue: "Health & Place",
    abstract: {
      en: "Synthesis of design parameters for restorative healthcare landscapes.",
      it: "Sintesi dei parametri di design per paesaggi sanitari rigenerativi.",
      ro: "Sinteza parametrilor de design pentru peisaje medicale restaurative.",
    },
    tags: ["Health", "Design"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
