import { setRequestLocale } from "next-intl/server";
import { CityMapHero } from "@/components/home/CityMapHero";
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
  return (
    <>
      <CityMapHero />
      <ManifestoStrip locale={locale as Locale} />
      <HomeSections />
    </>
  );
}
