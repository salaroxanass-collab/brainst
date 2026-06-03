import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DesignGrid } from "@/components/layout/DesignGrid";
import { AnimatedMap } from "@/components/ui/AnimatedMap";

const pillarKeys = [
  "curiosity",
  "design",
  "research",
  "intelligence",
  "human",
] as const;

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("studio");

  return (
    <div className="bg-offwhite pt-28 md:pt-36">
      <div className="mx-auto max-w-[1800px] px-6 pb-24 md:px-10 md:pb-40">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="relative mt-20 aspect-[21/9] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1586348943529-beaae1a28b7a?w=1600&q=80"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <DesignGrid className="opacity-40" />
        </div>

        <div className="mt-24 grid gap-16 md:grid-cols-12">
          {pillarKeys.map((key, i) => (
            <article
              key={key}
              className={`border-t border-charcoal/10 pt-10 ${
                i === 0 ? "md:col-span-12 md:grid md:grid-cols-12 md:gap-8" : "md:col-span-6"
              }`}
            >
              <span className="font-display text-[10px] tracking-[0.3em] text-clay uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-3xl tracking-[0.1em] text-forest uppercase md:text-4xl">
                {t(`pillars.${key}.title`)}
              </h3>
              <p className="mt-4 max-w-md font-serif text-xl text-charcoal-muted">
                {t(`pillars.${key}.text`)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-32 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative flex aspect-square items-center justify-center border border-charcoal/10">
            <svg viewBox="0 0 200 200" className="h-full w-full p-12 text-forest/40" aria-hidden>
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="6" fill="#c4754a" />
            </svg>
          </div>
          <AnimatedMap center={[11.34, 44.49]} zoom={8} />
        </div>
      </div>
    </div>
  );
}
