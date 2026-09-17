"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type DestinationKey = "studio" | "brainstormingEngine" | "research" | "projectQuestionnaire" | "contact" | "projects";

type Destination = {
  key: DestinationKey;
  path: string;
  route: string;
  position: string;
  align: string;
  subtitle: string;
  kind?: "stream" | "district";
};

const destinations: Destination[] = [
  {
    key: "studio",
    path: "studio",
    route: "M574 -55 C535 18 618 68 578 128 C548 173 607 202 565 254 C541 285 573 307 562 334",
    position: "left-1/2 top-[7%] -translate-x-1/2",
    align: "text-center",
    subtitle: "Ideas and approach",
    kind: "stream",
  },
  {
    key: "brainstormingEngine",
    path: "brainstorming-engine",
    route: "M414 365 C371 352 342 320 294 294 C205 245 111 207 -85 171",
    position: "left-[5%] top-[22%]",
    align: "text-left",
    subtitle: "Explore precedents",
  },
  {
    key: "research",
    path: "research",
    route: "M438 465 C407 495 386 530 331 567 C222 640 108 700 -80 810",
    position: "left-[8%] bottom-[11%]",
    align: "text-left",
    subtitle: "The field station",
  },
  {
    key: "projectQuestionnaire",
    path: "project-questionnaire",
    route: "M651 493 C706 508 748 542 818 577 C920 628 1039 696 1215 805",
    position: "right-[7%] bottom-[11%]",
    align: "text-right",
    subtitle: "Begin a brief",
  },
  {
    key: "contact",
    path: "contact",
    route: "M726 407 C773 394 823 403 882 420 C974 446 1062 451 1215 457",
    position: "right-[5%] top-[49%]",
    align: "text-right",
    subtitle: "Meet here",
  },
  {
    key: "projects",
    path: "projects",
    route: "M672 305 C712 286 754 259 805 235 C895 193 1003 149 1210 106",
    position: "right-[7%] top-[20%]",
    align: "text-right",
    subtitle: "Enter the neighbourhood",
    kind: "district",
  },
];

const secondaryStreets = [
  "M-30 92 C120 125 218 115 344 88 C432 69 493 72 530 94",
  "M-30 282 C115 298 190 330 292 355",
  "M18 520 C105 489 196 474 306 483",
  "M164 760 C204 688 258 651 334 624",
  "M724 82 C816 99 904 87 1162 40",
  "M822 303 C948 291 1051 307 1165 341",
  "M816 505 C938 529 1044 535 1174 520",
  "M768 650 C876 675 985 714 1148 760",
  "M348 70 C342 136 356 187 390 232",
  "M218 302 C240 381 242 431 218 500",
  "M875 112 C855 172 850 218 875 277",
  "M950 330 C930 392 932 451 958 512",
];

const buildingFootprints = [
  "M22 118 L89 111 L99 151 L30 160Z", "M112 105 L166 114 L159 171 L108 164Z", "M184 105 L254 96 L267 145 L205 151Z",
  "M40 185 L93 176 L106 231 L48 238Z", "M125 192 L183 184 L194 221 L164 225 L162 247 L121 249Z", "M213 174 L283 183 L276 233 L240 231 L238 250 L205 247Z",
  "M21 333 L79 325 L91 369 L53 374 L52 394 L17 393Z", "M108 333 L178 325 L188 370 L118 382Z", "M205 348 L271 338 L279 391 L225 396Z",
  "M27 429 L76 420 L91 462 L61 470 L62 491 L20 493Z", "M108 416 L177 424 L166 475 L118 468Z", "M210 426 L286 418 L293 461 L263 466 L264 492 L213 488Z",
  "M36 558 L108 546 L117 595 L84 601 L86 628 L31 632Z", "M139 546 L197 552 L193 614 L148 609Z", "M224 550 L297 541 L307 591 L267 596 L269 620 L223 625Z",
  "M85 650 L143 644 L155 695 L100 704Z", "M175 659 L241 648 L252 702 L190 713Z", "M274 650 L332 645 L343 692 L306 697 L307 720 L270 718Z",
  "M790 80 L856 88 L850 135 L810 134 L806 153 L775 149Z", "M886 67 L955 76 L963 126 L899 132Z", "M988 77 L1061 69 L1075 120 L1015 128Z",
  "M748 157 L812 146 L822 194 L784 200 L782 222 L741 218Z", "M850 151 L923 159 L916 207 L878 207 L877 229 L843 226Z", "M958 147 L1031 156 L1027 211 L974 205Z",
  "M785 274 L848 267 L860 316 L819 320 L818 343 L779 339Z", "M887 269 L946 276 L952 330 L900 333Z", "M980 281 L1058 271 L1067 319 L1035 323 L1037 348 L984 345Z",
  "M789 463 L850 454 L860 505 L817 510Z", "M887 466 L960 455 L970 503 L932 510 L934 530 L890 527Z", "M997 458 L1064 467 L1056 520 L1004 514Z",
  "M754 553 L819 542 L827 592 L789 600 L788 622 L750 618Z", "M854 550 L923 558 L918 610 L878 607 L877 629 L845 624Z", "M957 548 L1038 542 L1045 596 L997 599 L999 620 L960 620Z",
  "M776 654 L840 647 L851 701 L799 708Z", "M875 655 L944 645 L954 696 L914 702 L916 722 L876 720Z", "M979 651 L1052 659 L1045 714 L989 709Z",
  "M329 107 L390 98 L404 142 L373 149 L375 171 L329 171Z", "M417 108 L479 99 L491 150 L445 155Z",
  "M333 543 L386 535 L397 580 L370 586 L371 607 L333 607Z", "M421 552 L478 541 L486 592 L438 596Z",
  "M662 105 L716 96 L728 143 L699 149 L700 172 L660 169Z", "M674 549 L731 539 L741 587 L710 593 L710 616 L668 610Z",
];

const courtyards = [
  [153, 287, 23], [294, 286, 17], [156, 520, 20], [334, 492, 15], [968, 248, 20], [817, 379, 18], [1035, 392, 15], [860, 640, 19],
] as const;

export function CityMapHero() {
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const router = useRouter();
  const [hovered, setHovered] = useState<DestinationKey | null>(null);
  const [departing, setDeparting] = useState<Destination | null>(null);

  const navigate = (destination: Destination) => {
    if (departing) return;
    setDeparting(destination);
    window.setTimeout(() => router.push(`/${locale}/${destination.path}`), destination.kind === "district" ? 760 : 620);
  };

  return (
    <section className="relative min-h-[92dvh] overflow-hidden bg-[#e8e1d3] pt-24 text-[#302231] md:pt-28" aria-label="BrainSt city map navigation">
      <div className="absolute inset-x-0 top-24 bottom-0 md:top-28">
        <motion.div
          className="relative h-full min-h-[680px] w-full origin-center"
          animate={departing ? { scale: departing.kind === "district" ? 1.2 : 1.1, x: departing.kind === "district" ? "-6%" : 0, opacity: 0.32 } : { scale: 1, x: 0, opacity: 1 }}
          transition={{ duration: departing?.kind === "district" ? 0.76 : 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1130 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <filter id="paper-texture"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="12" result="noise" /><feColorMatrix in="noise" type="saturate" values="0" result="mono" /><feComponentTransfer in="mono"><feFuncA type="table" tableValues="0 0.05" /></feComponentTransfer></filter>
              <filter id="hand-drawn"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="19" result="wobble" /><feDisplacementMap in="SourceGraphic" in2="wobble" scale="1.6" /></filter>
              <pattern id="paper-dots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="0.6" fill="#302231" opacity="0.12" /><circle cx="7" cy="6" r="0.4" fill="#fff" opacity="0.22" /></pattern>
            </defs>
            <rect width="1130" height="760" fill="#e8e1d3" />
            <rect width="1130" height="760" fill="url(#paper-dots)" />
            <rect width="1130" height="760" fill="#302231" filter="url(#paper-texture)" opacity="0.45" />

            <g fill="none" stroke="#736b70" strokeWidth="0.7" opacity="0.22" filter="url(#hand-drawn)">
              {secondaryStreets.map((street, index) => <path key={index} d={street} />)}
            </g>

            <g fill="#ded6c9" stroke="#61575c" strokeWidth="0.65" opacity="0.38" filter="url(#hand-drawn)">
              {buildingFootprints.map((building, index) => <path key={index} d={building} />)}
            </g>
            <g fill="none" stroke="#61575c" strokeWidth="0.65" opacity="0.34">
              {courtyards.map(([cx, cy, r], index) => <g key={index}><circle cx={cx} cy={cy} r={r} /><circle cx={cx} cy={cy} r={r * 0.42} /></g>)}
            </g>

            <motion.path
              d="M742 98 C827 58 960 62 1082 112 L1098 270 C1012 294 913 281 820 245 C774 210 748 159 742 98Z"
              fill={hovered === "projects" ? "#c6d85b" : "#dce79b"}
              fillOpacity={hovered === "projects" ? 0.3 : 0.16}
              stroke="#302231"
              strokeWidth={hovered === "projects" ? 1.8 : 0.8}
              strokeDasharray="6 7"
              filter="url(#hand-drawn)"
            />

            {destinations.filter(destination => destination.kind !== "stream").map(destination => {
              const active = hovered === destination.key || departing?.key === destination.key;
              return (
                <g key={destination.key} className="cursor-pointer" onMouseEnter={() => setHovered(destination.key)} onMouseLeave={() => setHovered(null)} onClick={() => navigate(destination)}>
                  <motion.path d={destination.route} fill="none" stroke={active ? "#9fb33f" : "#302231"} strokeWidth={active ? 19 : destination.kind === "district" ? 16 : 14} strokeLinecap="round" strokeLinejoin="round" animate={{ stroke: active ? "#9fb33f" : "#302231", strokeWidth: active ? 19 : destination.kind === "district" ? 16 : 14 }} filter="url(#hand-drawn)" />
                  <motion.path d={destination.route} fill="none" stroke="#e8e1d3" strokeWidth={active ? 14 : destination.kind === "district" ? 12 : 10} strokeLinecap="round" strokeLinejoin="round" animate={{ strokeWidth: active ? 14 : destination.kind === "district" ? 12 : 10 }} />
                  <path d={destination.route} fill="none" stroke="#302231" strokeWidth="0.8" strokeDasharray="6 9" strokeLinecap="round" />
                </g>
              );
            })}

            <g className="cursor-pointer" onMouseEnter={() => setHovered("studio")} onMouseLeave={() => setHovered(null)} onClick={() => navigate(destinations[0])}>
              <motion.path d="M557 -30 C548 17 572 48 565 86 C558 125 577 153 568 193 C560 231 575 263 560 301 C555 314 552 326 551 340 C567 344 579 337 588 324 C600 305 595 281 603 258 C614 224 596 194 606 161 C617 124 598 95 606 58 C611 31 600 5 585 -30Z" fill={hovered === "studio" ? "#c6d85b" : "#bdca77"} fillOpacity={hovered === "studio" ? 0.72 : 0.48} stroke="#66703c" strokeWidth="0.9" filter="url(#hand-drawn)" />
              <path d="M572 -20 C565 24 584 52 576 89 C569 127 588 158 578 194 C569 229 585 258 570 294 C566 305 564 316 565 329" fill="none" stroke="#758044" strokeWidth="0.75" opacity="0.62" />
            </g>

            <path d="M398 350 C424 322 454 325 479 300 C516 308 547 296 579 286 C614 280 643 302 680 291 L712 315 L705 344 C731 359 739 386 726 412 L738 445 C726 463 708 470 716 494 C682 492 661 507 638 519 C608 527 581 510 550 524 L513 501 C487 508 462 499 442 481 L409 472 C416 452 408 436 389 420 C401 399 401 383 382 369Z" fill="#dce79b" fillOpacity="0.2" stroke="#302231" strokeWidth="0.9" filter="url(#hand-drawn)" />
            <path d="M523 321 C552 304 597 299 629 311 C653 322 674 344 677 367 C683 391 671 414 649 425 C619 438 576 430 554 408 C534 388 520 352 523 321Z" fill="#c6d85b" fillOpacity="0.1" stroke="none" />

            <g fill="none" stroke="#61575c" strokeWidth="0.65" opacity="0.58">
              <path d="M398 397 C443 382 484 381 522 397 C558 413 589 416 622 403 C653 391 690 393 729 414" />
              <path d="M449 318 C472 346 505 365 539 374 C574 383 610 374 641 351 C660 337 681 329 706 329" />
              <path d="M428 457 C472 438 512 436 548 452 C579 466 614 468 648 452 C671 441 695 439 726 445" />
              <path d="M494 306 C505 338 502 370 490 398 C480 423 482 463 500 497" />
            </g>
            <g fill="#9fad69" fillOpacity="0.2" stroke="#66703c" strokeWidth="0.55">
              <path d="M448 338 C468 308 507 296 536 309 C520 328 499 343 473 351Z" />
              <path d="M622 302 C653 296 682 315 696 343 C673 353 648 351 628 338Z" />
              <path d="M450 426 C470 445 492 456 519 458 C508 479 477 479 456 462Z" />
            </g>
            <g fill="none" stroke="#66703c" strokeWidth="0.55" opacity="0.7">
              {[ [462,330,8], [477,317,6], [493,325,9], [650,318,7], [668,327,10], [681,346,6], [456,445,7], [475,457,9], [495,462,6], [657,457,7], [676,444,9] ].map(([cx, cy, r], index) => <g key={index}><circle cx={cx} cy={cy} r={r} /><circle cx={cx + 2} cy={cy - 1} r={r * 0.62} /></g>)}
            </g>
            <path d="M600 414 L644 410 L650 433 L605 438Z" fill="#e8e1d3" stroke="#61575c" strokeWidth="0.65" />
          </svg>

          <div className="absolute left-1/2 top-1/2 z-20 flex h-36 w-44 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center md:h-44 md:w-56">
            <h1 className="font-display text-4xl font-bold tracking-[0.08em] text-[#302231] uppercase md:text-5xl">BrainSt</h1>
            <p className="mt-2 font-serif text-sm font-semibold text-[#302231]">Ideas meet landscape</p>
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
              className={`group absolute z-30 max-w-[220px] px-2 py-2 transition-transform duration-200 hover:-translate-y-0.5 focus:-translate-y-0.5 focus:outline-none ${destination.position} ${destination.align}`}
              aria-label={`${tNav(destination.key)}: ${destination.subtitle}`}
            >
              <span className="inline-block border-b border-l border-[#302231]/55 bg-[#eee8dc]/90 px-2 py-1 font-display text-[9px] font-semibold tracking-[0.1em] text-[#302231] uppercase transition-colors group-hover:border-[#87972f] group-hover:text-[#87972f] group-focus:border-[#87972f] group-focus:text-[#87972f] md:text-xs">
                {destination.key === "studio" ? "Studio philosophy" : destination.key === "projects" ? "Projects district" : tNav(destination.key)}
              </span>
              <span className={`mt-1 hidden border-l border-[#87972f]/70 bg-[#eee8dc]/88 px-2 py-0.5 font-serif text-[11px] italic text-[#594158] transition-opacity md:block ${hovered === destination.key ? "opacity-100" : "opacity-0"}`}>{destination.subtitle} →</span>
            </button>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute left-6 top-32 z-30 hidden md:left-10 md:top-36 md:block">
        <p className="font-display text-[10px] font-semibold tracking-[0.14em] text-[#302231] uppercase">The BrainSt city</p>
        <p className="mt-2 max-w-[230px] font-serif text-xl leading-6 text-[#302231]">Choose a route and follow it into the studio.</p>
      </div>

      <div className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2 font-display text-[8px] tracking-[0.16em] text-[#685969] uppercase md:bottom-6 md:text-[9px]">Scroll to continue ↓</div>

      <AnimatePresence>
        {departing && (
          <motion.div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-forest text-offwhite" initial={{ clipPath: "circle(0% at 50% 50%)" }} animate={{ clipPath: "circle(76% at 50% 50%)" }} exit={{ opacity: 0 }} transition={{ duration: departing.kind === "district" ? 0.76 : 0.62, ease: [0.65, 0, 0.35, 1] }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="font-display text-sm tracking-[0.25em] uppercase">{departing.key === "projects" ? "Projects district" : tNav(departing.key)}</motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
