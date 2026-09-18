"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { AtlasVisualization } from "@/components/ui/AtlasVisualization";
import { projects } from "@/lib/data";
import type { Locale } from "@/lib/types";

const sectionKeys = [
  "studio",
  "projects",
  "research",
  "publications",
  "services",
  "contact",
] as const;

export function HomeSections() {
  const locale = useLocale() as Locale;
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const tProjects = useTranslations("projects");

  return (
    <div id="journey">
      <section className="relative bg-offwhite py-24 md:py-40">
        <div className="mx-auto max-w-[1800px] px-6 md:px-10">
          <SectionHeading
            title={t("manifestoTitle")}
            subtitle={t("manifesto")}
          />
          <p className="mt-12 max-w-2xl font-serif text-2xl text-charcoal md:ml-auto md:text-right">
            {t("intersection")}
          </p>
        </div>
      </section>

      {sectionKeys.map((key, i) => (
        <section
          key={key}
          className={`border-t border-charcoal/10 py-20 md:py-32 ${
            i % 2 === 0 ? "bg-beige" : "bg-offwhite"
          }`}
        >
          <div className="mx-auto grid max-w-[1800px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-10">
            <div className="md:col-span-5">
              <SectionHeading
                label={String(i + 1).padStart(2, "0")}
                title={tNav(key)}
                subtitle={t(`sections.${key}`)}
              />
              <Link
                href={`/${locale}/${key}`}
                className="mt-8 inline-block font-display text-base font-bold tracking-[0.16em] text-clay uppercase transition hover:text-forest md:text-lg"
              >
                {t("ctaExplore")} →
              </Link>
            </div>
            <div className="md:col-span-7">
              {key === "projects" && (
                <div className="grid gap-12 md:grid-cols-2">
                  {projects.slice(0, 2).map((p, idx) => (
                    <ProjectCard
                      key={p.slug}
                      project={p}
                      locale={locale}
                      index={idx}
                      viewLabel={tProjects("viewProject")}
                    />
                  ))}
                </div>
              )}
              {key === "research" && (
                <div className="flex justify-center md:justify-end">
                  <AtlasVisualization />
                </div>
              )}
              {key === "studio" && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1586348943529-beaae1a28b7a?w=1200&q=80"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 grid-overlay opacity-50" />
                </div>
              )}
              {!["projects", "research", "studio"].includes(key) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex h-48 items-center justify-center border border-dashed border-charcoal/20 md:h-64"
                >
                  <span className="font-display text-[10px] tracking-[0.3em] text-charcoal-muted uppercase">
                    {tNav(key)}
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
