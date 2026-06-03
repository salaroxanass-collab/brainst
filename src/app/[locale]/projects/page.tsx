import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { projects } from "@/lib/data";
import type { Locale, ProjectCategory } from "@/lib/types";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const loc = locale as Locale;

  const categoryLabels = {
    landscape: t("categories.landscape"),
    urban: t("categories.urban"),
    research: t("categories.research"),
    nbs: t("categories.nbs"),
    gis: t("categories.gis"),
    competition: t("categories.competition"),
  } as Record<ProjectCategory, string>;

  return (
    <div className="bg-offwhite pt-28 md:pt-36">
      <div className="mx-auto max-w-[1800px] px-6 pb-24 md:px-10 md:pb-40">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-16">
          <ProjectFilter
            projects={projects}
            locale={loc}
            labels={{ all: t("filterAll") }}
            categoryLabels={categoryLabels}
            viewLabel={t("viewProject")}
          />
        </div>
      </div>
    </div>
  );
}
