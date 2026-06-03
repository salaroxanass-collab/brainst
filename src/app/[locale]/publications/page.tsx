import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PublicationArchive } from "@/components/publications/PublicationArchive";
import { publications } from "@/lib/data";
import type { Locale, PublicationType } from "@/lib/types";

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("publications");
  const loc = locale as Locale;

  const typeLabels = {
    journal: t("types.journal"),
    conference: t("types.conference"),
    report: t("types.report"),
  } as Record<PublicationType, string>;

  return (
    <div className="bg-offwhite pt-28 md:pt-36">
      <div className="mx-auto max-w-[1800px] px-6 pb-24 md:px-10 md:pb-40">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-16">
          <PublicationArchive
            items={publications}
            locale={loc}
            searchPlaceholder={t("search")}
            typeLabels={typeLabels}
            filterLabel={t("filter")}
            allLabel={t("all")}
          />
        </div>
      </div>
    </div>
  );
}
