"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-beige">
      <div className="mx-auto grid max-w-[1800px] gap-12 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <div className="md:col-span-5">
          <p className="font-display text-4xl tracking-[0.15em] text-forest uppercase md:text-5xl">
            BRAINST
          </p>
          <p className="mt-4 max-w-sm font-serif text-lg text-charcoal-muted">
            {t("tagline")}
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-4 md:col-start-7"
          aria-label="Footer"
        >
          {(["studio", "projects", "research", "contact"] as const).map(
            (key) => (
              <Link
                key={key}
                href={`/${locale}/${key}`}
                className="font-display text-xs tracking-[0.2em] text-charcoal uppercase transition hover:text-clay"
              >
                {tNav(key)}
              </Link>
            )
          )}
        </nav>
        <p className="font-display text-[10px] tracking-[0.15em] text-charcoal-muted uppercase md:col-span-12">
          © {year} BRAINST. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
