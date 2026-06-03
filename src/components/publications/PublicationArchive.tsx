"use client";

import { useMemo, useState } from "react";
import type { Publication, PublicationType, Locale } from "@/lib/types";
import { localized } from "@/lib/types";

export function PublicationArchive({
  items,
  locale,
  searchPlaceholder,
  typeLabels,
  filterLabel,
  allLabel,
}: {
  items: Publication[];
  locale: Locale;
  searchPlaceholder: string;
  typeLabels: Record<PublicationType, string>;
  filterLabel: string;
  allLabel: string;
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<PublicationType | "all">("all");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const title = localized(item.title, locale).toLowerCase();
      const matchQuery =
        !query ||
        title.includes(query.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchType = type === "all" || item.type === type;
      return matchQuery && matchType;
    });
  }, [items, query, type, locale]);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-charcoal/10 pb-8 md:flex-row md:items-end md:justify-between">
        <label className="block flex-1">
          <span className="sr-only">{searchPlaceholder}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full border-b border-charcoal/20 bg-transparent py-3 font-serif text-xl outline-none focus:border-clay"
          />
        </label>
        <div>
          <span className="font-display text-[10px] tracking-[0.2em] text-charcoal-muted uppercase">
            {filterLabel}
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["all", "journal", "conference", "report"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setType(key)}
                className={`px-3 py-1 font-display text-[9px] tracking-[0.15em] uppercase ${
                  type === key
                    ? "bg-forest text-offwhite"
                    : "border border-charcoal/15 text-charcoal"
                }`}
              >
                {key === "all" ? allLabel : typeLabels[key]}
              </button>
            ))}
          </div>
        </div>
      </div>
      <ul className="mt-12 divide-y divide-charcoal/10">
        {filtered.map((pub) => (
          <li key={pub.slug} className="grid gap-4 py-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <span className="font-display text-[10px] tracking-[0.2em] text-clay uppercase">
                {typeLabels[pub.type]}
              </span>
              <p className="mt-1 font-display text-sm text-charcoal-muted">{pub.year}</p>
            </div>
            <div className="md:col-span-7">
              <h3 className="font-display text-xl tracking-[0.08em] text-forest uppercase md:text-2xl">
                {localized(pub.title, locale)}
              </h3>
              <p className="mt-2 font-serif text-lg text-charcoal-muted">
                {pub.authors} — {pub.venue}
              </p>
              <p className="mt-4 font-serif text-base text-charcoal/80">
                {localized(pub.abstract, locale)}
              </p>
            </div>
            <div className="md:col-span-3 md:text-right">
              {pub.pdfUrl && (
                <a
                  href={pub.pdfUrl}
                  className="font-display text-[10px] tracking-[0.2em] text-clay uppercase hover:text-forest"
                >
                  PDF ↓
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
