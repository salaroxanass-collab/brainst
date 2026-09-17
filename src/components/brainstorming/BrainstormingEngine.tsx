"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/types";
import { localized } from "@/lib/types";
import {
  brainstormArchitecture,
  brainstormReferences,
  pipelineTodos,
  searchBrainstormReferences,
  sourceName,
  type BrainstormReference,
} from "@/lib/brainstorming";
import {
  interpretLandscapeQuery,
  summarizeLandscapeIntent,
} from "@/lib/brainstorming/expert";

const examplePrompts = [
  "Italian civic landscape with planting, heritage and warm paving",
  "Climate-resilient schoolyard with nature-based solutions",
  "Biodiversity school with roof habitats and outdoor learning",
  "Urban plaza with shade structures and playful seating",
  "Primary schoolyard with playable topography and orchard planting",
];

const filterGroups = [
  {
    label: "Typology",
    values: ["Courtyard", "Schoolyard", "Public plaza", "Waterfront park"],
  },
  {
    label: "Location",
    values: ["Italy", "Rome", "Milan", "Bologna", "Mediterranean"],
  },
  {
    label: "Materials",
    values: ["Clay", "Timber", "Stone", "Porous paving"],
  },
  {
    label: "Planting Style",
    values: ["Dry Mediterranean", "Urban canopy", "Naturalistic wetland"],
  },
  {
    label: "Nature-Based Solutions",
    values: ["Rain gardens", "Shade trees", "Flood storage", "Passive cooling"],
  },
  {
    label: "Source",
    values: ["Landezine", "Landscape First"],
  },
];

const copy = {
  en: {
    eyebrow: "BrainSt product lab",
    title: "BrainStorming Engine",
    tagline: "BrainStorming is the fun part.",
    subtitle: "Explore ideas. Discover references. Build better landscapes.",
    intro:
      "An AI-powered landscape architecture intelligence platform for discovering real precedents, reading design intent, and turning references into presentation-ready moodboards.",
    searchLabel: "Search laboratory",
    placeholder: "What kind of landscape are you imagining today?",
    generate: "Generate BrainStorm",
    clear: "Clear",
    intent: "Design intent",
    atmosphere: "Atmosphere",
    materials: "Materials",
    planting: "Planting style",
    precedents: "Relevant precedents",
    results: "Reference results",
    selected: "Moodboard draft",
    select: "Add to board",
    selectedLabel: "Selected",
    remove: "Remove",
    selectedProjects: "Selected projects",
    selectHint: "Choose multiple projects to build a richer board.",
    clearSelection: "Clear selection",
    emptyBoard: "Select references or generate a BrainStorm to begin a board.",
    boardTitle: "Climate-aware reference board",
    concept:
      "A curated direction that combines precedent research, material intelligence, planting strategy, and credited source links.",
    exports: "Exports",
    pdf: "Credited PDF",
    pptx: "Editable PPTX",
    architecture: "Future data architecture",
    pipeline: "Implementation pipeline",
    sourceCredit: "Every result links back to the original source. Exports must include credits.",
    searching: "Searching real reference index",
    dataModeSeed: "Seed examples",
    dataModeDatabase: "Database results",
    viewReference: "View reference",
    sourcePage: "Source page",
    strongMatch: "Strong match",
    relatedMatch: "Closest verified",
    whyThis: "Why this reference",
    verifiedSource: "Verified source",
    exactMatches: "strong matches",
    relatedMatches: "related references",
    activeFilters: "Active filters",
    expertReading: "Landscape architect reading",
    historicalLens: "Historical lens",
    noVerifiedMatches: "No verified references satisfy all of the requested location, typology, period and historical criteria. Broaden the brief or remove one constraint to continue.",
    noExact:
      "No exact verified project matched every part of the brief, so the engine is showing the closest real references first.",
    timePeriodUnavailable:
      "The live reference index does not yet have verified dates for this time period, so year-specific requests are shown as related research only.",
    reasonLabels: {
      location: "Location",
      typology: "Typology",
      materials: "Materials",
      nbs: "Nature-based solution",
      planting: "Planting",
      brief: "Brief language",
      verified: "Verified precedent",
    },
  },
  it: {
    eyebrow: "Laboratorio prodotto BrainSt",
    title: "BrainStorming Engine",
    tagline: "Il BrainStorming è la parte divertente.",
    subtitle: "Esplora idee. Scopri riferimenti. Progetta paesaggi migliori.",
    intro:
      "Una piattaforma di intelligenza per l'architettura del paesaggio che aiuta a scoprire precedenti reali, leggere l'intento progettuale e trasformare riferimenti in moodboard pronte per la presentazione.",
    searchLabel: "Laboratorio di ricerca",
    placeholder: "Che tipo di paesaggio stai immaginando oggi?",
    generate: "Genera BrainStorm",
    clear: "Pulisci",
    intent: "Intento progettuale",
    atmosphere: "Atmosfera",
    materials: "Materiali",
    planting: "Stile vegetazionale",
    precedents: "Precedenti rilevanti",
    results: "Risultati di riferimento",
    selected: "Bozza moodboard",
    select: "Aggiungi alla board",
    selectedLabel: "Selezionato",
    remove: "Rimuovi",
    selectedProjects: "Progetti selezionati",
    selectHint: "Scegli piu progetti per costruire una board piu ricca.",
    clearSelection: "Pulisci selezione",
    emptyBoard: "Seleziona riferimenti o genera un BrainStorm per iniziare una board.",
    boardTitle: "Reference board climate-aware",
    concept:
      "Una direzione curata che combina ricerca sui precedenti, intelligenza materica, strategia vegetale e link accreditati alle fonti.",
    exports: "Export",
    pdf: "PDF con crediti",
    pptx: "PPTX editabile",
    architecture: "Architettura dati futura",
    pipeline: "Pipeline di implementazione",
    sourceCredit: "Ogni risultato rimanda alla fonte originale. Gli export devono includere i crediti.",
    searching: "Ricerca nell'indice reale",
    dataModeSeed: "Esempi seed",
    dataModeDatabase: "Risultati database",
    viewReference: "Apri riferimento",
    sourcePage: "Pagina fonte",
    strongMatch: "Match forte",
    relatedMatch: "Verificato vicino",
    whyThis: "Perche questo riferimento",
    verifiedSource: "Fonte verificata",
    exactMatches: "match forti",
    relatedMatches: "riferimenti correlati",
    activeFilters: "Filtri attivi",
    expertReading: "Lettura dell'architetto paesaggista",
    historicalLens: "Lente storica",
    noVerifiedMatches: "Nessun riferimento verificato soddisfa tutti i criteri richiesti di luogo, tipologia, periodo e storia. Amplia il brief o rimuovi un vincolo per continuare.",
    noExact:
      "Nessun progetto verificato corrisponde a tutte le parti del brief, quindi il motore mostra prima i riferimenti reali piu vicini.",
    timePeriodUnavailable:
      "L'indice live non ha ancora date verificate per questo periodo, quindi le richieste per anno vengono mostrate solo come ricerca correlata.",
    reasonLabels: {
      location: "Luogo",
      typology: "Tipologia",
      materials: "Materiali",
      nbs: "Soluzione nature-based",
      planting: "Vegetazione",
      brief: "Linguaggio del brief",
      verified: "Precedente verificato",
    },
  },
  ro: {
    eyebrow: "Laborator de produs BrainSt",
    title: "BrainStorming Engine",
    tagline: "BrainStorming-ul este partea distractiva.",
    subtitle: "Exploreaza idei. Descopera referinte. Construieste peisaje mai bune.",
    intro:
      "O platforma de inteligenta pentru arhitectura peisagera care ajuta la descoperirea precedentelor reale, intelegerea intentiei de design si transformarea referintelor in moodboard-uri pregatite pentru prezentare.",
    searchLabel: "Laborator de cautare",
    placeholder: "Ce fel de peisaj iti imaginezi astazi?",
    generate: "Genereaza BrainStorm",
    clear: "Curata",
    intent: "Intentie de design",
    atmosphere: "Atmosfera",
    materials: "Materiale",
    planting: "Stil de plantare",
    precedents: "Precedente relevante",
    results: "Rezultate de referinta",
    selected: "Ciorna moodboard",
    select: "Adauga in board",
    selectedLabel: "Selectat",
    remove: "Elimina",
    selectedProjects: "Proiecte selectate",
    selectHint: "Alege mai multe proiecte pentru a construi un board mai bogat.",
    clearSelection: "Curata selectia",
    emptyBoard: "Selecteaza referinte sau genereaza un BrainStorm pentru a incepe un board.",
    boardTitle: "Board de referinte climate-aware",
    concept:
      "O directie curatoriata care combina cercetarea precedentelor, inteligenta materialelor, strategia de plantare si linkuri creditate catre surse.",
    exports: "Exporturi",
    pdf: "PDF cu credite",
    pptx: "PPTX editabil",
    architecture: "Arhitectura de date viitoare",
    pipeline: "Pipeline de implementare",
    sourceCredit: "Fiecare rezultat trimite catre sursa originala. Exporturile trebuie sa includa credite.",
    searching: "Cautare in indexul real",
    dataModeSeed: "Exemple seed",
    dataModeDatabase: "Rezultate din baza de date",
    viewReference: "Vezi referinta",
    sourcePage: "Pagina sursa",
    strongMatch: "Potrivire puternica",
    relatedMatch: "Verificat apropiat",
    whyThis: "De ce acest exemplu",
    verifiedSource: "Sursa verificata",
    exactMatches: "potriviri puternice",
    relatedMatches: "referinte apropiate",
    activeFilters: "Filtre active",
    expertReading: "Interpretarea arhitectului peisagist",
    historicalLens: "Context istoric",
    noVerifiedMatches: "Nicio referinta verificata nu respecta toate criteriile de locatie, tipologie, perioada si istorie. Extinde brief-ul sau elimina o constrangere.",
    noExact:
      "Niciun proiect verificat nu corespunde tuturor partilor din brief, asa ca motorul arata mai intai cele mai apropiate referinte reale.",
    timePeriodUnavailable:
      "Indexul live nu are inca date verificate pentru aceasta perioada, asa ca cererile pe ani sunt afisate doar ca cercetare apropiata.",
    reasonLabels: {
      location: "Locatie",
      typology: "Tipologie",
      materials: "Materiale",
      nbs: "Solutie bazata pe natura",
      planting: "Plantare",
      brief: "Limbaj din brief",
      verified: "Precedent verificat",
    },
  },
};

export function BrainstormingEngine({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [query, setQuery] = useState(examplePrompts[0]);
  const [submittedQuery, setSubmittedQuery] = useState(examplePrompts[0]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [submittedFilters, setSubmittedFilters] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [brainstormed, setBrainstormed] = useState(false);
  const [remoteResults, setRemoteResults] = useState<BrainstormReference[] | null>(null);
  const [dataMode, setDataMode] = useState<"seed" | "database">("seed");
  const [isGenerating, setIsGenerating] = useState(false);
  const resultsSectionRef = useRef<HTMLDivElement | null>(null);

  const seedResults = useMemo(
    () => searchBrainstormReferences(submittedQuery, submittedFilters),
    [submittedFilters, submittedQuery]
  );

  const results = remoteResults ?? seedResults;

  const selectableReferences = useMemo(() => {
    const byId = new Map<string, BrainstormReference>();
    [...results, ...brainstormReferences].forEach((reference) => {
      byId.set(reference.id, reference);
    });
    return Array.from(byId.values());
  }, [results]);

  const selectedReferences = useMemo(
    () =>
      selectableReferences.filter((reference) =>
        selectedIds.includes(reference.id)
      ),
    [selectableReferences, selectedIds]
  );

  const inferred = inferBrainstorm(submittedQuery, submittedFilters, results, locale);
  const expertIntent = useMemo(
    () => interpretLandscapeQuery(submittedQuery, submittedFilters),
    [submittedFilters, submittedQuery]
  );
  const expertReading = useMemo(
    () => summarizeLandscapeIntent(expertIntent, locale),
    [expertIntent, locale]
  );
  const resultInsights = useMemo(
    () => buildResultInsights(results, submittedQuery, submittedFilters),
    [results, submittedFilters, submittedQuery]
  );
  const requestedYears = useMemo(
    () => extractRequestedYears(`${submittedQuery} ${submittedFilters.join(" ")}`),
    [submittedFilters, submittedQuery]
  );
  const strongMatchCount = resultInsights.filter((item) => item.strength === "strong").length;
  const relatedMatchCount = Math.max(results.length - strongMatchCount, 0);
  const showClosestNote = results.length > 0 && strongMatchCount === 0 && submittedQuery.trim().length > 0;
  const showTimePeriodNote = requestedYears.length > 0 && results.length === 0;

  function toggleFilter(value: string) {
    setActiveFilters((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  function toggleReference(reference: BrainstormReference) {
    setSelectedIds((current) =>
      current.includes(reference.id)
        ? current.filter((item) => item !== reference.id)
        : [...current, reference.id]
    );
  }

  async function generateBrainstorm() {
    if (isGenerating) return;

    const nextQuery = query.trim();
    const nextFilters = [...activeFilters];
    setIsGenerating(true);
    setSelectedIds([]);
    setSubmittedQuery(nextQuery);
    setSubmittedFilters(nextFilters);

    try {
      const response = await fetch("/api/brainstorming/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: nextQuery,
          filters: { selected: nextFilters },
          locale,
          limit: 24,
        }),
      });

      if (!response.ok) throw new Error("Search request failed");
      const payload = (await response.json()) as {
        mode?: "seed" | "database";
        results?: BrainstormReference[];
      };

      setRemoteResults(payload.results ?? null);
      setDataMode(payload.mode ?? "seed");
    } catch {
      setRemoteResults(null);
      setDataMode("seed");
    } finally {
      setBrainstormed(true);
      setIsGenerating(false);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          resultsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      });
    }
  }

  return (
    <div className="bg-offwhite">
      <section className="relative min-h-[92dvh] overflow-hidden bg-forest pt-32 text-offwhite md:pt-40">
        <Image
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1800&q=80"
          alt=""
          fill
          priority
          className="object-cover opacity-35 mix-blend-luminosity"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest via-forest/82 to-forest" />
        <div className="grid-overlay absolute inset-0 opacity-20" />

        <div className="relative z-10 mx-auto grid max-w-[1800px] gap-16 px-6 pb-24 md:grid-cols-12 md:px-10">
          <div className="md:col-span-7">
            <p className="font-display text-[10px] tracking-[0.35em] text-clay uppercase">
              {t.eyebrow}
            </p>
            <h1 className="mt-8 max-w-5xl font-display text-5xl leading-[0.9] tracking-[0.06em] uppercase md:text-7xl lg:text-[7rem]">
              {t.title}
            </h1>
            <p className="mt-8 font-serif text-3xl text-sand md:text-5xl">
              {t.tagline}
            </p>
            <p className="mt-6 max-w-2xl font-serif text-xl text-offwhite/78 md:text-2xl">
              {t.subtitle}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="self-end border border-offwhite/14 bg-offwhite/8 p-5 backdrop-blur-md md:col-span-5 md:p-7"
          >
            <p className="font-display text-[10px] tracking-[0.3em] text-sand uppercase">
              {t.searchLabel}
            </p>
            <textarea
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              rows={5}
              placeholder={t.placeholder}
              className="mt-5 w-full resize-none border-b border-offwhite/25 bg-transparent pb-4 font-serif text-2xl leading-snug text-offwhite outline-none placeholder:text-offwhite/42 focus:border-clay"
            />
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={generateBrainstorm}
                aria-busy={isGenerating}
                disabled={isGenerating}
                className={`bg-clay px-5 py-3 font-display text-[10px] tracking-[0.24em] text-offwhite uppercase transition hover:bg-clay-dark active:scale-95 ${
                  isGenerating ? "animate-pulse ring-2 ring-clay/40 ring-offset-2 ring-offset-forest" : ""
                }`}
              >
                {isGenerating ? t.searching : t.generate}
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveFilters([]);
                  setSubmittedQuery("");
                  setSubmittedFilters([]);
                  setRemoteResults(null);
                  setSelectedIds([]);
                  setBrainstormed(false);
                }}
                className="border border-offwhite/25 px-5 py-3 font-display text-[10px] tracking-[0.24em] text-offwhite/80 uppercase transition hover:border-offwhite hover:text-offwhite"
              >
                {t.clear}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-charcoal/10 bg-beige py-8">
        <div className="mx-auto flex max-w-[1800px] gap-4 overflow-x-auto px-6 md:px-10">
          {examplePrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setQuery(prompt)}
              className="shrink-0 border border-charcoal/15 bg-offwhite px-4 py-3 text-left font-display text-[10px] tracking-[0.18em] text-charcoal uppercase transition hover:border-clay hover:text-clay"
            >
              {prompt}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1800px] gap-12 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <aside className="md:col-span-3">
          <p className="font-display text-[10px] tracking-[0.3em] text-clay uppercase">
            Filters
          </p>
          <div className="mt-6 space-y-8">
            {filterGroups.map((group) => (
              <div key={group.label}>
                <p className="font-display text-xs tracking-[0.22em] text-forest uppercase">
                  {group.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.values.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleFilter(value)}
                      className={`border px-3 py-2 font-display text-[9px] tracking-[0.14em] uppercase transition ${
                        activeFilters.includes(value)
                          ? "border-forest bg-forest text-offwhite"
                          : "border-charcoal/15 text-charcoal hover:border-clay hover:text-clay"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="md:col-span-9">
          <BrainstormPanel
            active={brainstormed || submittedQuery.length > 0}
            inferred={inferred}
            labels={t}
          />

          {(expertReading.length > 0 || expertIntent.historicalLens.length > 0) && (
            <section className="mt-6 border-l-4 border-clay bg-forest p-5 text-offwhite">
              <p className="font-display text-[10px] tracking-[0.26em] text-sand uppercase">
                {t.expertReading}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {expertReading.map((item) => (
                  <span key={item} className="border border-offwhite/20 px-3 py-2 font-display text-[9px] tracking-[0.14em] uppercase">
                    {item}
                  </span>
                ))}
              </div>
              {expertIntent.historicalLens.length > 0 && (
                <div className="mt-5 border-t border-offwhite/15 pt-4">
                  <p className="font-display text-[9px] tracking-[0.22em] text-clay uppercase">
                    {t.historicalLens}
                  </p>
                  {expertIntent.historicalLens.map((item) => (
                    <p key={item} className="mt-2 max-w-4xl font-serif text-lg leading-relaxed text-sand">
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </section>
          )}

          {(submittedFilters.length > 0 || submittedQuery.trim().length > 0) && (
            <div className="mt-6 border border-charcoal/10 bg-offwhite p-4">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-display text-[9px] tracking-[0.22em] text-clay uppercase">
                  {t.activeFilters}
                </p>
                {submittedQuery.trim().length > 0 && (
                  <span className="border border-forest/15 bg-beige px-3 py-2 font-display text-[9px] tracking-[0.14em] text-forest uppercase">
                    {submittedQuery}
                  </span>
                )}
                {submittedFilters.map((filter) => (
                  <span
                    key={filter}
                    className="border border-charcoal/15 px-3 py-2 font-display text-[9px] tracking-[0.14em] text-charcoal uppercase"
                  >
                    {filter}
                  </span>
                ))}
              </div>
              {showClosestNote && (
                <p className="mt-3 max-w-3xl font-serif text-base text-charcoal-muted">
                  {t.noExact}
                </p>
              )}
              {showTimePeriodNote && (
                <p className="mt-3 max-w-3xl font-serif text-base text-charcoal-muted">
                  {t.timePeriodUnavailable}
                </p>
              )}
            </div>
          )}

          <div
            ref={resultsSectionRef}
            className="scroll-mt-28 mt-14 flex items-end justify-between gap-6 border-t border-charcoal/10 pt-8"
          >
            <div>
              <p className="font-display text-[10px] tracking-[0.3em] text-clay uppercase">
                {t.results} · {isGenerating ? t.searching : dataMode === "database" ? t.dataModeDatabase : t.dataModeSeed}
              </p>
              <h2 className="mt-2 font-display text-4xl tracking-[0.08em] text-forest uppercase md:text-5xl">
                {results.length} references
              </h2>
              <p className="mt-3 font-display text-[10px] tracking-[0.18em] text-charcoal-muted uppercase">
                {strongMatchCount} {t.exactMatches} · {relatedMatchCount} {t.relatedMatches}
              </p>
            </div>
            <p className="max-w-sm text-right font-serif text-base text-charcoal-muted">
              {t.sourceCredit}
            </p>
          </div>

          <div className="mt-8 border border-charcoal/10 bg-beige p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-[10px] tracking-[0.28em] text-clay uppercase">
                  {t.selectedProjects}
                </p>
                <p className="mt-1 font-serif text-xl text-charcoal">
                  {selectedReferences.length} selected · {t.selectHint}
                </p>
              </div>
              {selectedReferences.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedIds([])}
                  className="border border-charcoal/15 px-4 py-3 font-display text-[9px] tracking-[0.2em] text-charcoal uppercase transition hover:border-clay hover:text-clay"
                >
                  {t.clearSelection}
                </button>
              )}
            </div>
            {selectedReferences.length > 0 && (
              <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
                {selectedReferences.map((reference) => (
                  <button
                    key={reference.id}
                    type="button"
                    onClick={() => toggleReference(reference)}
                    className="flex shrink-0 items-center gap-3 border border-forest/20 bg-offwhite pr-4 text-left transition hover:border-clay"
                    aria-label={`${t.remove} ${localized(reference.title, locale)}`}
                  >
                    <span className="relative h-14 w-14 overflow-hidden bg-sand">
                      <Image
                        src={reference.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </span>
                    <span className="max-w-48 font-display text-[10px] tracking-[0.16em] text-forest uppercase">
                      {localized(reference.title, locale)}
                    </span>
                    <span className="font-display text-[12px] text-clay" aria-hidden>
                      ×
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {results.map((reference, index) => (
              <ReferenceCard
                key={reference.id}
                reference={reference}
                locale={locale}
                selected={selectedIds.includes(reference.id)}
                labelSelect={t.select}
                labelSelected={t.selectedLabel}
                labelRemove={t.remove}
                labelViewReference={t.viewReference}
                labelStrongMatch={t.strongMatch}
                labelRelatedMatch={t.relatedMatch}
                labelWhyThis={t.whyThis}
                labelVerifiedSource={t.verifiedSource}
                reasonLabels={t.reasonLabels}
                insight={resultInsights[index] ?? fallbackInsight}
                onToggle={() => toggleReference(reference)}
                index={index}
              />
            ))}
          </div>
          {results.length === 0 && (
            <div className="mt-8 border border-clay/35 bg-beige p-6">
              <p className="max-w-3xl font-serif text-xl text-charcoal">
                {t.noVerifiedMatches}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-charcoal/10 bg-forest py-20 text-offwhite md:py-28">
        <div className="mx-auto grid max-w-[1800px] gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <p className="font-display text-[10px] tracking-[0.3em] text-clay uppercase">
              {t.selected}
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-[0.08em] uppercase md:text-6xl">
              {t.boardTitle}
            </h2>
            <p className="mt-6 font-serif text-xl text-sand">{t.concept}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="border border-offwhite/20 px-4 py-3 font-display text-[10px] tracking-[0.22em] uppercase">
                {t.pdf}
              </span>
              <span className="border border-offwhite/20 px-4 py-3 font-display text-[10px] tracking-[0.22em] uppercase">
                {t.pptx}
              </span>
            </div>
          </div>
          <div className="md:col-span-8">
            {selectedReferences.length === 0 ? (
              <div className="flex min-h-72 items-center justify-center border border-dashed border-offwhite/20">
                <p className="max-w-md text-center font-serif text-2xl text-sand">
                  {t.emptyBoard}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-3">
                {selectedReferences.map((reference) => (
                  <figure key={reference.id}>
                    <div className="relative aspect-[4/5] overflow-hidden bg-offwhite/10">
                      <Image
                        src={reference.imageUrl}
                        alt={localized(reference.title, locale)}
                        fill
                        className="object-cover"
                        sizes="(max-width:768px) 100vw, 30vw"
                      />
                    </div>
                    <figcaption className="mt-4 font-serif text-lg text-sand">
                      {localized(reference.title, locale)}
                    </figcaption>
                    <p className="mt-2 font-display text-[9px] tracking-[0.18em] text-offwhite/60 uppercase">
                      {sourceName(reference.sourceId)} · {reference.designer}
                    </p>
                    <a
                      href={reference.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex border border-offwhite/20 px-3 py-2 font-display text-[9px] tracking-[0.18em] text-sand uppercase transition hover:border-clay hover:text-clay"
                    >
                      {t.sourcePage} →
                    </a>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1800px] gap-12 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
        <ArchitectureList title={t.architecture} items={brainstormArchitecture.map((item) => `${item.table}: ${item.purpose}`)} />
        <ArchitectureList title={t.pipeline} items={pipelineTodos} />
      </section>
    </div>
  );
}

function BrainstormPanel({
  active,
  inferred,
  labels,
}: {
  active: boolean;
  inferred: {
    intent: string;
    atmosphere: string;
    materials: string;
    planting: string;
    precedents: string;
  };
  labels: (typeof copy)[Locale];
}) {
  if (!active) return null;

  return (
    <div className="grid gap-4 border border-charcoal/10 bg-beige p-5 md:grid-cols-5 md:p-6">
      {[
        [labels.intent, inferred.intent],
        [labels.atmosphere, inferred.atmosphere],
        [labels.materials, inferred.materials],
        [labels.planting, inferred.planting],
        [labels.precedents, inferred.precedents],
      ].map(([label, value]) => (
        <div key={label}>
          <p className="font-display text-[9px] tracking-[0.22em] text-clay uppercase">
            {label}
          </p>
          <p className="mt-2 font-serif text-lg text-charcoal">{value}</p>
        </div>
      ))}
    </div>
  );
}

function ReferenceCard({
  reference,
  locale,
  selected,
  labelSelect,
  labelSelected,
  labelRemove,
  labelViewReference,
  labelStrongMatch,
  labelRelatedMatch,
  labelWhyThis,
  labelVerifiedSource,
  reasonLabels,
  insight,
  onToggle,
  index,
}: {
  reference: BrainstormReference;
  locale: Locale;
  selected: boolean;
  labelSelect: string;
  labelSelected: string;
  labelRemove: string;
  labelViewReference: string;
  labelStrongMatch: string;
  labelRelatedMatch: string;
  labelWhyThis: string;
  labelVerifiedSource: string;
  reasonLabels: Record<ReasonKey, string>;
  insight: ResultInsight;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      className="group border-t border-charcoal/10 pt-6"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-sand">
        <Image
          src={reference.imageUrl}
          alt={localized(reference.title, locale)}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width:1024px) 100vw, 45vw"
        />
        <div className="absolute inset-0 bg-forest/0 transition group-hover:bg-forest/20" />
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={selected}
          className={`absolute right-4 bottom-4 flex items-center gap-2 px-4 py-3 font-display text-[9px] tracking-[0.18em] uppercase transition ${
            selected
              ? "bg-forest text-offwhite"
              : "bg-offwhite/90 text-charcoal hover:bg-clay hover:text-offwhite"
          }`}
        >
          <span
            className={`flex h-4 w-4 items-center justify-center border ${
              selected ? "border-offwhite bg-clay" : "border-charcoal/30"
            }`}
            aria-hidden
          >
            {selected && "✓"}
          </span>
          <span>{selected ? labelSelected : labelSelect}</span>
        </button>
      </div>
      <div className="mt-5 flex items-start justify-between gap-5">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span
              className={`border px-3 py-1 font-display text-[8px] tracking-[0.16em] uppercase ${
                insight.strength === "strong"
                  ? "border-forest bg-forest text-offwhite"
                  : "border-clay/35 bg-clay/10 text-clay"
              }`}
            >
              {insight.strength === "strong" ? labelStrongMatch : labelRelatedMatch}
            </span>
            <span className="border border-charcoal/15 px-3 py-1 font-display text-[8px] tracking-[0.16em] text-charcoal-muted uppercase">
              {labelVerifiedSource}
            </span>
          </div>
          <h3 className="font-display text-2xl tracking-[0.08em] text-forest uppercase">
            {localized(reference.title, locale)}
          </h3>
          <p className="mt-1 font-display text-[10px] tracking-[0.18em] text-charcoal-muted uppercase">
            {reference.designer} · {localized(reference.location, locale)}
          </p>
          {(reference.yearCompleted || reference.movement) && (
            <p className="mt-2 font-display text-[9px] tracking-[0.16em] text-clay uppercase">
              {[reference.yearCompleted, reference.movement].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        <a
          href={reference.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 font-display text-[9px] tracking-[0.18em] text-clay uppercase hover:text-forest"
        >
          {sourceName(reference.sourceId)}
        </a>
      </div>
      <p className="mt-4 font-serif text-lg text-charcoal-muted">
        {localized(reference.aiSummary, locale)}
      </p>
      <a
        href={reference.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex border border-clay/40 px-4 py-3 font-display text-[9px] tracking-[0.18em] text-clay uppercase transition hover:border-forest hover:text-forest"
      >
        {labelViewReference} →
      </a>
      <div className="mt-4 border-l border-clay/40 pl-4">
        <p className="font-display text-[8px] tracking-[0.18em] text-clay uppercase">
          {labelWhyThis}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {insight.reasons.map((reason) => (
            <span
              key={reason}
              className="bg-beige px-3 py-1 font-display text-[8px] tracking-[0.12em] text-charcoal uppercase"
            >
              {reasonLabels[reason]}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {reference.tags.slice(0, 6).map((tag) => (
          <span
            key={tag}
            className="border border-charcoal/15 px-3 py-1 font-display text-[9px] tracking-[0.13em] text-charcoal uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-4 font-display text-[8px] tracking-[0.14em] text-charcoal-muted uppercase">
        {reference.imageCredit}
      </p>
      {selected && (
        <button
          type="button"
          onClick={onToggle}
          className="mt-4 font-display text-[9px] tracking-[0.18em] text-clay uppercase hover:text-forest"
        >
          {labelRemove} →
        </button>
      )}
    </motion.article>
  );
}

type ReasonKey =
  | "location"
  | "typology"
  | "materials"
  | "nbs"
  | "planting"
  | "brief"
  | "verified";

type ResultInsight = {
  strength: "strong" | "related";
  reasons: ReasonKey[];
};

const fallbackInsight: ResultInsight = {
  strength: "related",
  reasons: ["verified"],
};

function buildResultInsights(
  references: BrainstormReference[],
  query: string,
  filters: string[]
): ResultInsight[] {
  const terms = tokenizeBrief(`${query} ${filters.join(" ")}`);
  const wantsItaly = terms.some((term) => ["italian", "italy", "italia"].includes(term));
  const wantsSchoolyard = terms.some((term) =>
    ["schoolyard", "school", "playground", "scolastico", "scolastica"].includes(term)
  );

  return references.map((reference) => {
    const haystack = [
      reference.title.en,
      reference.title.it,
      reference.title.ro,
      reference.designer,
      reference.location.en,
      reference.location.it,
      reference.location.ro,
      reference.tags.join(" "),
      reference.typology,
      reference.materials.join(" "),
      reference.plantingStyle,
      reference.climate,
      reference.atmosphere,
      reference.nbs.join(" "),
      reference.healthThemes.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    const reasons = new Set<ReasonKey>();
    const locationText = `${reference.location.en} ${reference.location.it} ${reference.location.ro}`.toLowerCase();
    const tagText = reference.tags.join(" ").toLowerCase();
    const typology = reference.typology.toLowerCase();

    if (wantsItaly && /italy|italia|rome|roma|milan|milano|bologna|reggio|velletri/.test(locationText + " " + tagText)) {
      reasons.add("location");
    }
    if (wantsSchoolyard && /school|schoolyard|playground/.test(typology + " " + tagText + " " + haystack)) {
      reasons.add("typology");
    }
    if (terms.some((term) => reference.materials.join(" ").toLowerCase().includes(term))) {
      reasons.add("materials");
    }
    if (terms.some((term) => reference.nbs.join(" ").toLowerCase().includes(term))) {
      reasons.add("nbs");
    }
    if (terms.some((term) => reference.plantingStyle.toLowerCase().includes(term))) {
      reasons.add("planting");
    }
    if (terms.some((term) => haystack.includes(term)) && reasons.size === 0) {
      reasons.add("brief");
    }

    const strength =
      (!wantsItaly || reasons.has("location")) &&
      (!wantsSchoolyard || reasons.has("typology")) &&
      reasons.size > 0
        ? "strong"
        : "related";

    if (reasons.size === 0) {
      reasons.add("verified");
    }

    return {
      strength,
      reasons: Array.from(reasons).slice(0, 4),
    };
  });
}

function tokenizeBrief(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 2);
}

function extractRequestedYears(value: string) {
  return Array.from(value.matchAll(/\b(?:1[0-9]|20)\d{2}\b/g), (match) => match[0]);
}

function ArchitectureList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-display text-[10px] tracking-[0.3em] text-clay uppercase">
        {title}
      </p>
      <ul className="mt-6 divide-y divide-charcoal/10 border-t border-charcoal/10">
        {items.map((item) => (
          <li key={item} className="py-4 font-serif text-lg text-charcoal-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function inferBrainstorm(
  query: string,
  filters: string[],
  results: BrainstormReference[],
  locale: Locale
) {
  const selected = results[0];
  const words = `${query} ${filters.join(" ")}`.toLowerCase();
  const intent = words.includes("school")
    ? "Child-friendly climate resilience"
    : words.includes("water") || words.includes("flood")
      ? "Blue-green adaptation"
      : words.includes("courtyard")
        ? "Intimate microclimate and material warmth"
        : "Precedent discovery and atmospheric direction";

  return {
    intent,
    atmosphere: selected?.atmosphere ?? "No verified match",
    materials: selected?.materials.join(", ") ?? "Awaiting a verified precedent",
    planting: selected?.plantingStyle ?? "Awaiting a verified precedent",
    precedents: results
      .slice(0, 3)
      .map((reference) => localized(reference.title, locale))
      .join(" · "),
  };
}
