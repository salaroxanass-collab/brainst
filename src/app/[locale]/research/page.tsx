import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AtlasVisualization } from "@/components/ui/AtlasVisualization";
import { AnimatedMap } from "@/components/ui/AnimatedMap";
import { researchItems } from "@/lib/data";
import { localized, type Locale } from "@/lib/types";

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("research");
  const loc = locale as Locale;

  return (
    <div className="bg-beige pt-28 md:pt-36">
      <div className="mx-auto max-w-[1800px] px-6 pb-24 md:px-10 md:pb-40">
        <div className="grid gap-16 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7">
            <SectionHeading title={t("title")} subtitle={t("subtitle")} />
          </div>
          <div className="flex justify-center md:col-span-5">
            <AtlasVisualization />
          </div>
        </div>

        <div className="mt-20">
          <p className="font-display text-[10px] tracking-[0.3em] text-clay uppercase">
            {t("layers")}
          </p>
          <AnimatedMap className="mt-6" center={[11.34, 44.49]} zoom={7} />
        </div>

        <div className="mt-24 grid gap-12 md:grid-cols-2">
          {researchItems.map((item) => (
            <article
              key={item.slug}
              className="group border-t border-charcoal/10 pt-8"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                <Image
                  src={item.coverImage}
                  alt={localized(item.title, loc)}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
              <h3 className="mt-6 font-display text-2xl tracking-[0.1em] text-forest uppercase">
                {localized(item.title, loc)}
              </h3>
              <p className="mt-2 font-display text-[10px] tracking-[0.2em] text-charcoal-muted uppercase">
                {item.year}
              </p>
              <p className="mt-4 font-serif text-lg text-charcoal-muted">
                {localized(item.description, loc)}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-display text-[9px] tracking-[0.15em] text-charcoal uppercase"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              {item.pdfUrl && (
                <Link
                  href={item.pdfUrl}
                  className="mt-6 inline-block font-display text-[10px] tracking-[0.25em] text-clay uppercase hover:text-forest"
                >
                  {t("download")} ↓
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
