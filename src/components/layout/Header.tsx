"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/types";

const navKeys = [
  "studio",
  "projects",
  "research",
  "publications",
  "services",
  "contact",
  "projectQuestionnaire",
  "brainstormingEngine",
] as const;

const languageKeys: Locale[] = ["en", "it", "ro"];

const navPaths: Record<(typeof navKeys)[number], string> = {
  studio: "studio",
  brainstormingEngine: "brainstorming-engine",
  projects: "projects",
  research: "research",
  publications: "publications",
  services: "services",
  contact: "contact",
  projectQuestionnaire: "project-questionnaire",
};

export function Header() {
  const t = useTranslations("nav");
  const tLang = useTranslations("lang");
  const tMenu = useTranslations("menu");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = /^\/(en|it|ro)\/?$/.test(pathname);

  const pathWithoutLocale = pathname.replace(/^\/(en|it|ro)/, "") || "/";

  return (
    <header className={cn("fixed top-0 right-0 left-0 z-50 border-b border-offwhite/10 text-offwhite shadow-[0_1px_24px_rgba(0,0,0,0.18)] backdrop-blur-md", isHome ? "bg-[#302231]/96" : "bg-forest/88")}>
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-6 md:px-10">
        <Link
          href={`/${locale}`}
          className="font-display text-2xl font-semibold tracking-[0.2em] text-offwhite uppercase drop-shadow-sm md:text-3xl"
          aria-label="BRAINST home"
        >
          BRAINST
        </Link>

        <div className="flex items-center gap-5 md:gap-7">
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {navKeys.map((key) => (
              <Link
                key={key}
                href={`/${locale}/${navPaths[key]}`}
                className={cn(
                  "font-display text-xs tracking-[0.25em] text-offwhite/82 uppercase drop-shadow-sm transition hover:text-offwhite",
                  pathname.includes(`/${navPaths[key]}`) && "text-offwhite",
                  key === "brainstormingEngine" &&
                    "font-semibold !text-clay hover:!text-clay",
                  key === "brainstormingEngine" &&
                    pathname.includes(`/${navPaths[key]}`) &&
                    "!text-clay"
                )}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <nav
            className="flex items-center gap-2"
            aria-label="Language"
          >
            {languageKeys.map((lang) => (
              <Link
                key={lang}
                href={`/${lang}${pathWithoutLocale}`}
                hrefLang={lang}
                aria-current={locale === lang ? "page" : undefined}
                className={cn(
                  "flex h-8 min-w-8 items-center justify-center border border-offwhite/20 px-2 font-display text-[10px] tracking-[0.16em] text-sand/80 uppercase transition hover:border-offwhite/50 hover:text-offwhite",
                  locale === lang &&
                    "border-offwhite/70 bg-offwhite/12 text-offwhite"
                )}
              >
                {tLang(lang)}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="font-display text-xs tracking-[0.25em] text-offwhite uppercase drop-shadow-sm lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? tMenu("close") : tMenu("open")}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-charcoal/10 bg-offwhite px-6 py-8 lg:hidden"
          >
            <nav className="flex flex-col gap-4" aria-label="Mobile">
              {navKeys.map((key) => (
                <Link
                  key={key}
                  href={`/${locale}/${navPaths[key]}`}
                  className={cn(
                    "font-display text-sm tracking-[0.2em] text-charcoal uppercase",
                    key === "brainstormingEngine" &&
                      "font-semibold !text-clay"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
