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
    <section className="relative min-h-[92dvh] overflow-hidden bg-[#e7e1d5] pt-24 text-charcoal md:pt-28" aria-label="BrainSt city map navigation">
      <div className="absolute inset-x-0 top-24 bottom-0 md:top-28">
        <motion.div
          className="relative h-full min-h-[650px] w-full origin-center"
          animate={departing ? { scale: 1.12, opacity: 0.35 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1130 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="1130" height="760" fill="#e7e1d5" />
            <path d="M0 85 C120 35 270 70 340 155 C390 215 330 275 210 284 C105 292 42 245 0 205Z" fill="#b9c7b5" opacity="0.72" />
            <path d="M1130 78 C1008 36 865 70 800 145 C748 205 790 278 920 288 C1028 296 1095 246 1130 198Z" fill="#d4b99f" opacity="0.68" />
            <path d="M0 500 C118 455 245 482 302 570 C338 626 300 704 190 760 L0 760Z" fill="#d6c6aa" opacity="0.72" />
            <path d="M1130 494 C1012 456 892 488 832 570 C795 622 830 706 942 760 L1130 760Z" fill="#afc2b9" opacity="0.76" />
            <path d="M250 38 C300 8 387 13 418 58 C447 102 411 143 350 145 C286 147 228 92 250 38Z" fill="#cbd0bc" opacity="0.62" />
            <path d="M720 30 C780 4 862 19 883 68 C900 110 855 146 793 140 C738 135 684 76 720 30Z" fill="#c7cfbc" opacity="0.62" />
            <g fill="#6f9277" opacity="0.48">
              <circle cx="85" cy="142" r="17" /><circle cx="122" cy="116" r="11" /><circle cx="178" cy="196" r="14" />
              <circle cx="1040" cy="126" r="18" /><circle cx="995" cy="183" r="12" /><circle cx="930" cy="116" r="14" />
              <circle cx="125" cy="610" r="19" /><circle cx="212" cy="664" r="14" /><circle cx="1010" cy="625" r="18" />
            </g>

            <motion.path d={destinations[0].road} fill="none" stroke="#f8f5ed" strokeWidth={studioActive ? 70 : 58} strokeLinecap="round" animate={{ strokeWidth: studioActive ? 70 : 58 }} />
            <motion.path d={destinations[0].road} fill="none" stroke={studioActive ? "#4e929f" : "#79a8ad"} strokeWidth={studioActive ? 48 : 38} strokeLinecap="round" animate={{ stroke: studioActive ? "#4e929f" : "#79a8ad", strokeWidth: studioActive ? 48 : 38 }} />
            <path d={destinations[0].road} fill="none" stroke="#dff2f0" strokeWidth="5" strokeLinecap="round" strokeDasharray="3 16" opacity="0.9" />

            {destinations.map(destination => {
              if (destination.key === "studio") return null;
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
            <h1 className="font-display text-4xl font-bold tracking-[0.13em] text-[#153c2d] uppercase drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] md:text-5xl">BrainSt</h1>
            <p className="mt-2 max-w-32 bg-[#f8f5ed]/75 px-2 py-1 font-serif text-base font-semibold leading-4 text-[#153c2d]">Ideas meet landscape</p>
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
              className={`group absolute z-30 max-w-[190px] px-2 py-2 transition-transform duration-300 hover:scale-110 focus:scale-110 focus:outline-none ${destination.position} ${destination.align}`}
              aria-label={`${tNav(destination.key)}: ${destination.district}`}
            >
              <span className={`block border-b-2 bg-[#f8f5ed]/90 px-2 py-1 font-display text-[10px] font-semibold tracking-[0.14em] uppercase shadow-[0_3px_0_rgba(27,61,47,0.12)] transition-all duration-300 md:text-sm ${destination.key === "brainstormingEngine" ? "border-clay text-clay" : destination.key === "studio" ? "border-[#4e929f] text-[#2f707c] group-hover:bg-[#4e929f] group-hover:text-white group-focus:bg-[#4e929f] group-focus:text-white" : "border-forest/40 text-forest group-hover:border-clay group-hover:bg-clay group-hover:text-white group-focus:border-clay group-focus:bg-clay group-focus:text-white"}`}>
                {destination.key === "studio" ? "Studio philosophy" : tNav(destination.key)}
              </span>
              <span className="mt-1 hidden font-serif text-xs font-semibold text-charcoal md:block group-hover:text-clay group-focus:text-clay">{destination.district} <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">→</span></span>
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
