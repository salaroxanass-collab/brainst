"use client";

import { useState } from "react";
import type { Project, ProjectCategory, Locale } from "@/lib/types";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function ProjectFilter({
  projects,
  locale,
  labels,
  categoryLabels,
  viewLabel,
}: {
  projects: Project[];
  locale: Locale;
  labels: { all: string };
  categoryLabels: Record<ProjectCategory, string>;
  viewLabel: string;
}) {
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const categories = Array.from(
    new Set(projects.flatMap((p) => p.categories))
  ) as ProjectCategory[];

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(active));

  return (
    <>
      <div className="flex flex-wrap gap-3" role="tablist" aria-label="Filter projects">
        <button
          type="button"
          role="tab"
          aria-selected={active === "all"}
          onClick={() => setActive("all")}
          className={`rounded-full border px-4 py-2 font-display text-[10px] tracking-[0.2em] uppercase transition ${
            active === "all"
              ? "border-forest bg-forest text-offwhite"
              : "border-charcoal/20 text-charcoal hover:border-clay"
          }`}
        >
          {labels.all}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-2 font-display text-[10px] tracking-[0.2em] uppercase transition ${
              active === cat
                ? "border-forest bg-forest text-offwhite"
                : "border-charcoal/20 text-charcoal hover:border-clay"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>
      <div className="mt-16 grid gap-16 md:grid-cols-2 lg:grid-cols-2">
        {filtered.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            locale={locale}
            index={index}
            viewLabel={viewLabel}
          />
        ))}
      </div>
    </>
  );
}
