import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceDiagram } from "@/components/ui/ServiceDiagram";
import type { Locale, LocalizedString } from "@/lib/types";

const serviceKeys = [
  "landscape",
  "urban",
  "research",
  "gis",
  "assessment",
  "nbs",
  "consultancy",
] as const;

const descriptions: Record<(typeof serviceKeys)[number], LocalizedString> = {
  landscape: {
    en: "From concept sketches to detailed planting — places shaped by ecology and experience.",
    it: "Dagli schizzi concettuali all'impianto dettagliato — luoghi modellati da ecologia ed esperienza.",
    ro: "De la schite conceptuale la plantari detaliate — locuri modelate de ecologie si experienta.",
  },
  urban: {
    en: "Strategies for streets, corridors, and public realms that connect neighbourhoods to nature.",
    it: "Strategie per strade, corridoi e spazi pubblici che collegano i quartieri alla natura.",
    ro: "Strategii pentru strazi, coridoare si spatii publice care conecteaza cartierele cu natura.",
  },
  research: {
    en: "Evidence-led studies at the intersection of health, climate, and landscape performance.",
    it: "Studi basati sull'evidenza tra salute, clima e prestazioni del paesaggio.",
    ro: "Studii bazate pe dovezi la intersectia dintre sanatate, clima si performanta peisajului.",
  },
  gis: {
    en: "Spatial analysis, atlases, and environmental datasets that inform design decisions.",
    it: "Analisi spaziale, atlanti e dataset ambientali per le decisioni di progetto.",
    ro: "Analize spatiale, atlase si seturi de date de mediu care informeaza deciziile de proiectare.",
  },
  assessment: {
    en: "Environmental assessment supporting planning, policy, and resilient development.",
    it: "Valutazioni ambientali per pianificazione, policy e sviluppo resiliente.",
    ro: "Evaluari de mediu care sustin planificarea, politicile si dezvoltarea rezilienta.",
  },
  nbs: {
    en: "Nature-based solutions for cooling, biodiversity, and hydrological resilience.",
    it: "Soluzioni basate sulla natura per raffrescamento, biodiversità e resilienza idrologica.",
    ro: "Solutii bazate pe natura pentru racire, biodiversitate si rezilienta hidrologica.",
  },
  consultancy: {
    en: "Independent advice for institutions, competitions, and interdisciplinary teams.",
    it: "Consulenza indipendente per istituzioni, concorsi e team interdisciplinari.",
    ro: "Consultanta independenta pentru institutii, concursuri si echipe interdisciplinare.",
  },
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const loc = locale as Locale;

  return (
    <div className="bg-beige pt-28 md:pt-36">
      <div className="mx-auto max-w-[1800px] px-6 pb-24 md:px-10 md:pb-40">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-16">
          {serviceKeys.map((key, index) => (
            <ServiceDiagram
              key={key}
              serviceKey={key}
              title={t(`items.${key}`)}
              description={descriptions[key][loc]}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
