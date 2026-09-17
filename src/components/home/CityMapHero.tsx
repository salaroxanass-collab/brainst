"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type Destination = {
  key: "studio" | "projects" | "research" | "publications" | "services" | "contact" | "projectQuestionnaire" | "brainstormingEngine";
  path: string;
  position: string;
  align: string;
  road: string;
  district: string;
};

const destinations: Destination[] = [
  { key: "studio", path: "studio", position: "left-[7%] top-[19%]", align: "text-left", road: "M500 330 L365 252 L145 178", district: "The workshop" },
  { key: "projects", path: "projects", position: "left-[5%] top-[48%]", align: "text-left", road: "M470 390 L305 390 L105 430", district: "Built places" },
  { key: "research", path: "research", position: "left-[11%] bottom-[13%]", align: "text-left", road: "M500 450 L370 520 L175 625", district: "The field station" },
  { key: "publications", path: "publications", position: "left-[36%] bottom-[5%]", align: "text-center", road: "M565 465 L540 585 L475 705", district: "The archive" },
  { key: "services", path: "services", position: "right-[7%] top-[19%]", align: "text-right", road: "M635 330 L765 252 L980 175", district: "What we do" },
  { key: "contact", path: "contact", position: "right-[5%] top-[48%]", align: "text-right", road: "M660 390 L825 390 L1025 430", district: "Meet here" },
  { key: "projectQuestionnaire", path: "project-questionnaire", position: "right-[8%] bottom-[12%]", align: "text-right", road: "M635 450 L770 525 L955 635", district: "Begin a brief" },
  { key: "brainstormingEngine", path: "brainstorming-engine", position: "left-1/2 top-[12%] -translate-x-1/2", align: "text-center", road: "M565 315 L565 212 L565 92", district: "Explore precedents" },
];

const blocks = [
  [34, 95, 155, 88, "#d8d0bf"], [215, 75, 170, 115, "#b9c6b8"], [760, 72, 155, 118, "#d5b89f"], [945, 95, 145, 92, "#c9cfbd"],
  [42, 260, 190, 100, "#bdc8b6"], [880, 250, 205, 112, "#d7cfbd"], [55, 500, 178, 128, "#d2b49a"], [245, 550, 155, 115, "#c4cbb7"],
  [735, 555, 155, 110, "#b8c7bf"], [925, 500, 165, 132, "#d6c6aa"], [260, 235, 125, 98, "#d5c8b5"], [750, 235, 120, 98, "#b8c7b5"],
] as const;

export function CityMapHero() {
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [departing, setDeparting] = useState<Destination | null>(null);

  const navigate = (destination: Destination) => {
    if (departing) return;
    setDeparting(destination);
    window.setTimeout(() => router.push(`/${locale}/${destination.path}`), 620);
  };

  return (
    <section className="relative min-h-[92dvh] overflow-hidden bg-[#e7e1d5] pt-24 text-charcoal md:pt-28" aria-label="BrainSt city map navigation">
      <div className="absolute inset-x-0 top-24 bottom-0 md:top-28">
        <motion.div
          className="relative h-full min-h-[650px] w-full origin-center"
          animate={departing ? { scale: 1.12, opacity: 0.35 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1130 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="1130" height="760" fill="#e7e1d5" />
            {blocks.map(([x, y, width, height, fill], index) => (
              <g key={index}>
                <rect x={x} y={y} width={width} height={height} fill={fill} stroke="#46594d" strokeOpacity="0.2" />
                <path d={`M${x + 12} ${y + 20} H${x + width - 12} M${x + 12} ${y + 38} H${x + width - 32}`} stroke="#faf8f5" strokeOpacity="0.7" strokeWidth="3" />
              </g>
            ))}

            <path d="M0 40 C220 80 280 25 450 65 S805 100 1130 38" fill="none" stroke="#86a398" strokeWidth="22" strokeOpacity="0.8" />
            <path d="M0 40 C220 80 280 25 450 65 S805 100 1130 38" fill="none" stroke="#f7f3eb" strokeWidth="3" strokeDasharray="10 12" />

            {destinations.map(destination => {
              const active = hovered === destination.key || departing?.key === destination.key;
              return (
                <g key={destination.key}>
                  <motion.path d={destination.road} fill="none" stroke="#fbfaf6" strokeWidth={active ? 58 : 46} strokeLinecap="round" animate={{ strokeWidth: active ? 58 : 46 }} />
                  <motion.path d={destination.road} fill="none" stroke={active ? "#c4754a" : "#52685a"} strokeWidth={active ? 4 : 2} strokeDasharray={active ? "1 0" : "9 10"} strokeLinecap="round" animate={{ stroke: active ? "#c4754a" : "#52685a" }} />
                </g>
              );
            })}

            <circle cx="565" cy="390" r="102" fill="#f8f5ed" stroke="#52685a" strokeWidth="3" />
            <circle cx="565" cy="390" r="78" fill="#9eb293" />
            <path d="M520 385 C536 345 590 338 614 374 C630 405 608 438 570 443 C535 446 505 422 520 385Z" fill="#6f9277" />
            <circle cx="542" cy="377" r="9" fill="#f8f5ed" /><circle cx="588" cy="410" r="11" fill="#f8f5ed" /><circle cx="572" cy="359" r="7" fill="#f8f5ed" />
            <path d="M515 454 Q565 478 615 454" fill="none" stroke="#c4754a" strokeWidth="8" />
          </svg>

          <div className="absolute left-1/2 top-1/2 z-20 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center md:h-44 md:w-44">
            <p className="font-display text-[9px] tracking-[0.24em] text-forest uppercase">Central piazza</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-[0.13em] text-forest uppercase md:text-4xl">BrainSt</h1>
            <p className="mt-2 max-w-28 font-serif text-sm leading-4 text-forest">Ideas meet landscape</p>
          </div>

          {destinations.map(destination => (
            <button
              key={destination.key}
              type="button"
              onMouseEnter={() => setHovered(destination.key)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(destination.key)}
              onBlur={() => setHovered(null)}
              onClick={() => navigate(destination)}
              className={`group absolute z-30 max-w-[170px] ${destination.position} ${destination.align}`}
              aria-label={`${tNav(destination.key)}: ${destination.district}`}
            >
              <span className={`block font-display text-[10px] tracking-[0.16em] uppercase transition md:text-xs ${destination.key === "brainstormingEngine" ? "font-semibold text-clay" : "text-forest group-hover:text-clay"}`}>
                {tNav(destination.key)}
              </span>
              <span className="mt-1 hidden font-serif text-xs text-charcoal-muted md:block">{destination.district}</span>
            </button>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute left-6 top-32 z-30 hidden max-w-[180px] md:left-10 md:top-36 md:block md:max-w-xs">
        <p className="font-display text-[9px] tracking-[0.24em] text-charcoal-muted uppercase md:text-[10px]">The Brain Street plan</p>
        <p className="mt-2 font-serif text-base leading-5 text-forest md:text-xl">Choose a street and follow it into the studio.</p>
      </div>

      <div className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2 font-display text-[8px] tracking-[0.2em] text-charcoal-muted uppercase md:bottom-6 md:text-[9px]">
        Scroll to continue ↓
      </div>

      <AnimatePresence>
        {departing && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-forest text-offwhite"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(75% at 50% 50%)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.62, ease: [0.65, 0, 0.35, 1] }}
          >
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="font-display text-sm tracking-[0.25em] uppercase">
              {tNav(departing.key)}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
