import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProject } from "@/lib/data";
import { localized, type Locale } from "@/lib/types";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { AnimatedMap } from "@/components/ui/AnimatedMap";
import { DesignGrid } from "@/components/layout/DesignGrid";

export async function generateStaticParams() {
  const { projects } = await import("@/lib/data");
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const loc = locale as Locale;
  const t = await getTranslations("projects");

  return (
    <article className="bg-offwhite">
      <header className="relative flex min-h-[70vh] items-end overflow-hidden bg-forest pt-28">
        <Image
          src={project.heroImage}
          alt={localized(project.title, loc)}
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <DesignGrid className="opacity-20" />
        <div className="relative z-10 mx-auto w-full max-w-[1800px] px-6 pb-16 md:px-10 md:pb-24">
          <Link
            href={`/${locale}/projects`}
            className="font-display text-[10px] tracking-[0.25em] text-sand/80 uppercase hover:text-clay"
          >
            ← {t("title")}
          </Link>
          <h1 className="mt-8 max-w-4xl font-display text-4xl leading-[0.95] tracking-[0.08em] text-offwhite uppercase md:text-6xl lg:text-7xl">
            {localized(project.title, loc)}
          </h1>
          <p className="mt-4 font-display text-xs tracking-[0.2em] text-sand uppercase">
            {localized(project.location, loc)} · {project.year}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-24">
        <p className="max-w-2xl font-serif text-2xl text-charcoal">
          {localized(project.description, loc)}
        </p>

        {project.beforeAfter && (
          <div className="mt-20">
            <BeforeAfterSlider
              before={project.beforeAfter.before}
              after={project.beforeAfter.after}
              labelBefore={t("before")}
              labelAfter={t("after")}
            />
          </div>
        )}

        {project.mapCoords && (
          <div className="mt-20">
            <p className="mb-6 font-display text-[10px] tracking-[0.3em] text-clay uppercase">
              {t("location")}
            </p>
            <AnimatedMap center={project.mapCoords} zoom={11} />
          </div>
        )}

        <div className="mt-20 space-y-20">
          {project.gallery.map((item, i) => (
            <figure key={i} className="grid gap-6 md:grid-cols-12">
              <div className="relative aspect-[16/10] md:col-span-10">
                <Image
                  src={item.src}
                  alt={item.caption ? localized(item.caption, loc) : ""}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 80vw"
                />
              </div>
              {item.caption && (
                <figcaption className="font-serif text-lg text-charcoal-muted md:col-span-2 md:pt-4">
                  {localized(item.caption, loc)}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {project.insights && project.insights.length > 0 && (
          <aside className="mt-24 border-l-2 border-clay pl-8">
            <p className="font-display text-[10px] tracking-[0.3em] text-clay uppercase">
              {t("researchInsight")}
            </p>
            <ul className="mt-6 space-y-4">
              {project.insights.map((insight, i) => (
                <li key={i} className="font-serif text-xl text-charcoal">
                  {localized(insight, loc)}
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </article>
  );
}
