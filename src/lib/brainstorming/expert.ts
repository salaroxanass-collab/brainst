import type { Locale } from "@/lib/types";

export type DateConstraint = {
  from?: number;
  to?: number;
  label: string;
};

export type LandscapeQueryIntent = {
  countries: string[];
  typologies: string[];
  traditions: string[];
  date?: DateConstraint;
  historicalLens: string[];
};

const countryPatterns: Array<[RegExp, string]> = [
  [/\b(english|england|uk|united kingdom|british)\b/i, "England / United Kingdom"],
  [/\b(italian|italy|italia)\b/i, "Italy"],
  [/\b(french|france)\b/i, "France"],
  [/\b(danish|denmark)\b/i, "Denmark"],
  [/\b(swedish|sweden)\b/i, "Sweden"],
  [/\b(swiss|switzerland)\b/i, "Switzerland"],
  [/\b(chinese|china)\b/i, "China"],
  [/\b(mexican|mexico)\b/i, "Mexico"],
];

const typologyPatterns: Array<[RegExp, string]> = [
  [/\b(garden|gardens|giardino|gradina)\b/i, "Garden"],
  [/\b(schoolyard|school yard|school garden|playground)\b/i, "Schoolyard"],
  [/\b(park|parks)\b/i, "Park"],
  [/\b(plaza|square|piazza)\b/i, "Public plaza"],
  [/\b(waterfront|riverfront)\b/i, "Waterfront"],
  [/\b(wetland|marsh)\b/i, "Wetland"],
  [/\b(courtyard|cortile)\b/i, "Courtyard"],
  [/\b(roof garden|rooftop)\b/i, "Roof garden"],
  [/\b(healing garden|therapeutic garden|hospital landscape)\b/i, "Healing landscape"],
];

const traditionPatterns: Array<[RegExp, string, string]> = [
  [
    /\benglish landscape (garden|movement|tradition|style)\b|\bpicturesque\b/i,
    "English Landscape Garden",
    "Eighteenth-century picturesque composition: pastoral ground, irregular water, tree groups, borrowed views and concealed boundaries, associated with designers including William Kent, Lancelot 'Capability' Brown and Humphry Repton.",
  ],
  [
    /\bitalian renaissance\b|\brenaissance garden\b/i,
    "Italian Renaissance Garden",
    "Geometric terraces, axial order, controlled views, water, sculpture and the architectural extension of the villa into the landscape.",
  ],
  [
    /\bfrench formal\b|\bjardin a la francaise\b|\bbaroque garden\b/i,
    "French Formal Garden",
    "Axial and hierarchical composition, parterres, allées, bosquets and long controlled perspectives associated with seventeenth-century court landscapes.",
  ],
  [
    /\barts and crafts\b/i,
    "Arts and Crafts Garden",
    "Garden rooms, craft, local materials and close architectural integration, often balancing formal structure with abundant planting.",
  ],
  [
    /\bmodernis(m|t)\b|\bmodern landscape\b/i,
    "Landscape Modernism",
    "Spatial abstraction, functional outdoor rooms, new materials and a reduced formal language developed through twentieth-century modern design.",
  ],
  [
    /\blandscape urbanism\b/i,
    "Landscape Urbanism",
    "Landscape as an organising medium for urban systems, infrastructure, ecology, process and change rather than as isolated decoration.",
  ],
  [
    /\becological design\b|\bdesign with nature\b/i,
    "Ecological Landscape Design",
    "Design led by hydrology, soils, habitat, succession and environmental performance, with form emerging from living systems and site processes.",
  ],
];

export function interpretLandscapeQuery(query: string, filters: string[] = []): LandscapeQueryIntent {
  const text = `${query} ${filters.join(" ")}`.replace(/\s+/g, " ").trim();
  const countries = countryPatterns.filter(([pattern]) => pattern.test(text)).map(([, label]) => label);
  const typologies = typologyPatterns.filter(([pattern]) => pattern.test(text)).map(([, label]) => label);
  const matchedTraditions = traditionPatterns.filter(([pattern]) => pattern.test(text));

  return {
    countries: Array.from(new Set(countries)),
    typologies: Array.from(new Set(typologies)),
    traditions: matchedTraditions.map(([, label]) => label),
    date: parseDateConstraint(text),
    historicalLens: matchedTraditions.map(([, , context]) => context),
  };
}

export function summarizeLandscapeIntent(intent: LandscapeQueryIntent, locale: Locale): string[] {
  const labels = {
    en: { location: "Location", typology: "Typology", period: "Period", tradition: "Historical tradition" },
    it: { location: "Luogo", typology: "Tipologia", period: "Periodo", tradition: "Tradizione storica" },
    ro: { location: "Locatie", typology: "Tipologie", period: "Perioada", tradition: "Traditie istorica" },
  }[locale];

  return [
    intent.countries.length ? `${labels.location}: ${intent.countries.join(", ")}` : "",
    intent.typologies.length ? `${labels.typology}: ${intent.typologies.join(", ")}` : "",
    intent.date ? `${labels.period}: ${intent.date.label}` : "",
    intent.traditions.length ? `${labels.tradition}: ${intent.traditions.join(", ")}` : "",
  ].filter(Boolean);
}

function parseDateConstraint(text: string): DateConstraint | undefined {
  const between = text.match(/\bbetween\s+((?:1[0-9]|20)\d{2})\s+(?:and|to)\s+((?:1[0-9]|20)\d{2})\b/i);
  if (between) return { from: Number(between[1]), to: Number(between[2]), label: `${between[1]}-${between[2]}` };

  const before = text.match(/\b(before|until|pre-)\s*((?:1[0-9]|20)\d{2})\b/i);
  if (before) return { to: Number(before[2]), label: `before ${before[2]}` };

  const after = text.match(/\b(after|since|from|post-)\s*((?:1[0-9]|20)\d{2})\b/i);
  if (after) return { from: Number(after[2]), label: `from ${after[2]}` };

  const decade = text.match(/\b((?:1[0-9]|20)\d)0s\b/i);
  if (decade) return { from: Number(`${decade[1]}0`), to: Number(`${decade[1]}9`), label: `${decade[1]}0s` };

  const exact = text.match(/\b((?:1[0-9]|20)\d{2})\b/);
  if (exact) {
    const year = Number(exact[1]);
    return { from: year - 5, to: year + 5, label: `around ${year}` };
  }

  return undefined;
}
