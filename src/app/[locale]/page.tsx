import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { ManifestoStrip } from "@/components/home/ManifestoStrip";
import { HomeSections } from "@/components/home/HomeSections";
import type { Locale } from "@/lib/types";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");
  const tBrainstorming = await getTranslations("brainstorming");

  return (
    <>
      <Hero
        welcome={t("welcome")}
        line1={t("line1")}
        line2={t("line2")}
        line3={t("line3")}
        scrollLabel={t("scroll")}
        brainstormLabel={tBrainstorming("cta")}
        brainstormHref={`/${locale}/brainstorming-engine`}
      />
      <ManifestoStrip locale={locale as Locale} />
      <HomeSections />
    </>
  );
}
