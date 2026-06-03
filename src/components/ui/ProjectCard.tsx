"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project, Locale } from "@/lib/types";
import { localized } from "@/lib/types";

export function ProjectCard({
  project,
  locale,
  index,
  viewLabel,
}: {
  project: Project;
  locale: Locale;
  index: number;
  viewLabel: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      className="group relative"
    >
      <Link href={`/${locale}/projects/${project.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src={project.coverImage}
            alt={localized(project.title, locale)}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-forest/0 transition duration-500 group-hover:bg-forest/20" />
          <motion.div
            className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full border border-clay/40 bg-offwhite/30 backdrop-blur-sm"
            whileHover={{ scale: 1.08, rotate: 12 }}
          />
        </div>
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4 border-t border-charcoal/10 pt-6">
          <div>
            <h3 className="font-display text-xl tracking-[0.12em] text-charcoal uppercase md:text-2xl">
              {localized(project.title, locale)}
            </h3>
            <p className="mt-1 font-display text-[10px] tracking-[0.2em] text-charcoal-muted uppercase">
              {localized(project.location, locale)} · {project.year}
            </p>
          </div>
          <span className="font-display text-[10px] tracking-[0.25em] text-clay uppercase opacity-0 transition group-hover:opacity-100">
            {viewLabel} →
          </span>
        </div>
        <p className="mt-3 max-w-md font-serif text-base text-charcoal-muted">
          {localized(project.description, locale)}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-charcoal/15 px-3 py-1 font-display text-[9px] tracking-[0.15em] text-charcoal uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </motion.article>
  );
}
