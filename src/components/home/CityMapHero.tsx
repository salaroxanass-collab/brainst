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
  { key: "studio", path: "studio", position: "left-1/2 top-[8%] -translate-x-1/2", align: "text-center", road: "M565 0 C500 88 640 138 555 220 C505 270 590 280 565 315", district: "Ideas and approach" },
  { key: "projects", path: "projects", position: "left-[5%] top-[48%]", align: "text-left", road: "M470 390 L305 390 L105 430", district: "Built places" },
  { key: "research", path: "research", position: "left-[11%] bottom-[13%]", align: "text-left", road: "M500 450 L370 520 L175 625", district: "The field station" },
  { key: "publications", path: "publications", position: "left-[36%] bottom-[5%]", align: "text-center", road: "M565 465 L540 585 L475 705", district: "The archive" },
  { key: "services", path: "services", position: "right-[7%] top-[19%]", align: "text-right", road: "M635 330 L765 252 L980 175", district: "What we do" },
  { key: "contact", path: "contact", position: "right-[5%] top-[48%]", align: "text-right", road: "M660 390 L825 390 L1025 430", district: "Meet here" },
  { key: "projectQuestionnaire", path: "project-questionnaire", position: "right-[8%] bottom-[12%]", align: "text-right", road: "M635 450 L770 525 L955 635", district: "Begin a brief" },
  { key: "brainstormingEngine", path: "brainstorming-engine", position: "left-[7%] top-[19%]", align: "text-left", road: "M500 330 L365 252 L145 178", district: "Explore precedents" },
];

export function CityMapHero() {
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [departing, setDeparting] = useState<Destination | null>(null);
  const studioActive = hovered === "studio" || departing?.key === "studio";

  const navigate = (destination: Destination) => {
    if (departing) return;
    setDeparting(destination);
    window.setTimeout(() => router.push(`/${locale}/${destination.path}`), 620);
  };

  return (
    <section className="relative min-h-[92dvh] overflow-hidden bg-[#625158] pt-24 text-offwhite md:pt-28" aria-label="BrainSt city map navigation">
      <div className="absolute inset-x-0 top-24 bottom-0 md:top-28">
        <motion.div
          className="relative h-full min-h-[650px] w-full origin-center"
          animate={departing ? { scale: 1.12, opacity: 0.35 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1130 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <filter id="rough-map-line">
                <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="8" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
              </filter>
              <pattern id="paper-grain" width="7" height="7" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="2" r="0.65" fill="#f3eff0" opacity="0.1" />
                <circle cx="5" cy="5" r="0.5" fill="#291f23" opacity="0.13" />
              </pattern>
            </defs>
            <rect width="1130" height="760" fill="#625158" />
            <rect width="1130" height="760" fill="url(#paper-grain)" />
            <g fill="none" stroke="#d9cfd2" strokeWidth="2" opacity="0.18" filter="url(#rough-map-line)">
              <path d="M-40 154 C120 82 282 95 380 178 S610 250 760 158 S1010 70 1180 145" />
              <path d="M-50 195 C120 125 275 137 367 215 S606 295 775 202 S1014 112 1180 188" />
              <path d="M-35 555 C105 474 275 482 374 565 S602 660 760 575 S1018 470 1180 548" />
              <path d="M-45 604 C115 525 270 530 360 610 S612 705 775 620 S1020 525 1180 598" />
            </g>

            <motion.path d={destinations[0].road} fill="none" stroke="#f1edef" strokeWidth={studioActive ? 70 : 58} strokeLinecap="round" animate={{ strokeWidth: studioActive ? 70 : 58 }} filter="url(#rough-map-line)" />
            <motion.path d={destinations[0].road} fill="none" stroke={studioActive ? "#cddd63" : "#9abfc0"} strokeWidth={studioActive ? 48 : 38} strokeLinecap="round" animate={{ stroke: studioActive ? "#cddd63" : "#9abfc0", strokeWidth: studioActive ? 48 : 38 }} />
            <path d={destinations[0].road} fill="none" stroke="#f1edef" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 15" opacity="0.85" />

            {destinations.map(destination => {
              if (destination.key === "studio") return null;
              const active = hovered === destination.key || departing?.key === destination.key;
              return (
                <g key={destination.key}>
                  <motion.path d={destination.road} fill="none" stroke="#f1edef" strokeWidth={active ? 64 : 48} strokeLinecap="round" animate={{ strokeWidth: active ? 64 : 48 }} filter="url(#rough-map-line)" />
                  <motion.path d={destination.road} fill="none" stroke={active ? "#cddd63" : "#362a2f"} strokeWidth={active ? 7 : 2} strokeDasharray={active ? "1 0" : "11 12"} strokeLinecap="round" animate={{ stroke: active ? "#cddd63" : "#362a2f" }} />
                </g>
              );
            })}

            <circle cx="565" cy="390" r="106" fill="#f1edef" stroke="#362a2f" strokeWidth="4" filter="url(#rough-map-line)" />
            <circle cx="565" cy="390" r="82" fill="#cddd63" />
            <path d="M519 386 C534 346 590 336 616 372 C638 402 611 442 570 446 C532 449 502 422 519 386Z" fill="#b9d052" />
            <circle cx="540" cy="376" r="8" fill="#625158" /><circle cx="590" cy="411" r="10" fill="#625158" /><circle cx="574" cy="357" r="7" fill="#625158" />
          </svg>

          <div className="absolute left-1/2 top-1/2 z-20 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center md:h-44 md:w-44">
            <h1 className="font-display text-4xl font-bold tracking-[0.08em] text-[#362a2f] uppercase md:text-5xl">BrainSt</h1>
            <p className="mt-2 max-w-32 font-display text-[10px] font-semibold leading-4 tracking-[0.08em] text-[#362a2f] uppercase">Ideas meet landscape</p>
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
              className={`group absolute z-30 max-w-[210px] px-2 py-2 transition-transform duration-200 hover:scale-110 focus:scale-110 focus:outline-none ${destination.position} ${destination.align}`}
              aria-label={`${tNav(destination.key)}: ${destination.district}`}
            >
              <span className={`block px-1 py-1 font-display text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-200 md:text-xl ${destination.key === "brainstormingEngine" ? "text-[#cddd63]" : destination.key === "studio" ? "text-[#dceced] group-hover:bg-[#cddd63] group-hover:text-[#362a2f] group-focus:bg-[#cddd63] group-focus:text-[#362a2f]" : "text-[#f1edef] group-hover:bg-[#cddd63] group-hover:text-[#362a2f] group-focus:bg-[#cddd63] group-focus:text-[#362a2f]"}`}>
                {destination.key === "studio" ? "Studio philosophy" : tNav(destination.key)}
              </span>
              <span className="mt-1 hidden font-display text-[10px] font-semibold tracking-[0.08em] text-[#d9cfd2] uppercase md:block group-hover:text-[#cddd63] group-focus:text-[#cddd63]">{destination.district} <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">→</span></span>
            </button>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute left-6 top-32 z-30 hidden max-w-[180px] md:left-10 md:top-36 md:block md:max-w-xs">
        <p className="font-display text-[9px] font-bold tracking-[0.12em] text-[#cddd63] uppercase md:text-[11px]">The Brain Street plan</p>
        <p className="mt-2 font-display text-base font-bold leading-5 text-[#f1edef] md:text-2xl">Choose a street and follow it.</p>
      </div>

      <div className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2 font-display text-[8px] font-bold tracking-[0.12em] text-[#d9cfd2] uppercase md:bottom-6 md:text-[10px]">
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
