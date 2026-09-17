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
    route: "M500 353 C424 321 371 274 308 245 C220 204 126 180 -85 137",
    position: "left-[5%] top-[22%]",
    align: "text-left",
    subtitle: "Explore precedents",
  },
  {
    key: "research",
    path: "research",
    route: "M503 439 C437 478 401 520 329 561 C230 618 116 682 -80 810",
    position: "left-[8%] bottom-[11%]",
    align: "text-left",
    subtitle: "The field station",
  },
  {
    key: "projectQuestionnaire",
    path: "project-questionnaire",
    route: "M630 445 C696 480 742 530 813 563 C912 611 1034 690 1215 805",
    position: "right-[7%] bottom-[11%]",
    align: "text-right",
    subtitle: "Begin a brief",
  },
  {
    key: "contact",
    path: "contact",
    route: "M657 389 C735 373 808 391 878 410 C970 435 1058 448 1215 457",
    position: "right-[5%] top-[49%]",
    align: "text-right",
    subtitle: "Meet here",
  },
  {
    key: "projects",
    path: "projects",
    route: "M627 342 C690 301 742 266 801 237 C888 195 997 150 1210 106",
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

            <g fill="none" stroke="#736b70" strokeWidth="1.15" opacity="0.24" filter="url(#hand-drawn)">
              {secondaryStreets.map((street, index) => <path key={index} d={street} />)}
            </g>

            <g fill="#e1dacd" stroke="#61575c" strokeWidth="1.15" opacity="0.34" filter="url(#hand-drawn)">
              {buildingFootprints.map((building, index) => <path key={index} d={building} />)}
            </g>
            <g fill="none" stroke="#61575c" strokeWidth="1" opacity="0.34">
              {courtyards.map(([cx, cy, r], index) => <g key={index}><circle cx={cx} cy={cy} r={r} /><circle cx={cx} cy={cy} r={r * 0.42} /></g>)}
            </g>

            <motion.path
              d="M742 98 C827 58 960 62 1082 112 L1098 270 C1012 294 913 281 820 245 C774 210 748 159 742 98Z"
              fill={hovered === "projects" ? "#c6d85b" : "#dce79b"}
              fillOpacity={hovered === "projects" ? 0.3 : 0.16}
              stroke="#302231"
              strokeWidth={hovered === "projects" ? 3 : 1.4}
              strokeDasharray="9 8"
              filter="url(#hand-drawn)"
            />

            {destinations.filter(destination => destination.kind !== "stream").map(destination => {
              const active = hovered === destination.key || departing?.key === destination.key;
              return (
                <g key={destination.key} className="cursor-pointer" onMouseEnter={() => setHovered(destination.key)} onMouseLeave={() => setHovered(null)} onClick={() => navigate(destination)}>
                  <motion.path d={destination.route} fill="none" stroke={active ? "#c6d85b" : "#302231"} strokeWidth={active ? 32 : destination.kind === "district" ? 27 : 24} strokeLinecap="round" strokeLinejoin="round" animate={{ stroke: active ? "#c6d85b" : "#302231", strokeWidth: active ? 32 : destination.kind === "district" ? 27 : 24 }} filter="url(#hand-drawn)" />
                  <motion.path d={destination.route} fill="none" stroke="#e8e1d3" strokeWidth={active ? 22 : destination.kind === "district" ? 20 : 17} strokeLinecap="round" strokeLinejoin="round" animate={{ strokeWidth: active ? 22 : destination.kind === "district" ? 20 : 17 }} />
                  <path d={destination.route} fill="none" stroke="#302231" strokeWidth="1.4" strokeDasharray="9 11" strokeLinecap="round" />
                </g>
              );
            })}

            <g className="cursor-pointer" onMouseEnter={() => setHovered("studio")} onMouseLeave={() => setHovered(null)} onClick={() => navigate(destinations[0])}>
              <path d="M574 -55 C535 18 618 68 578 128 C548 173 607 202 565 254 C541 285 573 307 562 340" fill="none" stroke="#302231" strokeWidth="50" strokeLinecap="round" filter="url(#hand-drawn)" />
              <motion.path d="M574 -55 C535 18 618 68 578 128 C548 173 607 202 565 254 C541 285 573 307 562 340" fill="none" stroke={hovered === "studio" ? "#dbe77a" : "#c6d85b"} strokeWidth={hovered === "studio" ? 44 : 40} strokeLinecap="round" animate={{ stroke: hovered === "studio" ? "#dbe77a" : "#c6d85b" }} />
              <path d="M548 24 C522 58 538 91 565 109 C541 131 536 160 552 180 C520 209 519 238 538 257" fill="none" stroke="#afc342" strokeWidth="16" strokeLinecap="round" opacity="0.75" />
              <path d="M597 53 C615 83 606 108 582 126 C600 154 599 179 578 199" fill="none" stroke="#dce79b" strokeWidth="13" strokeLinecap="round" opacity="0.72" />
            </g>

            <path d="M553 278 C621 269 680 307 672 368 C694 421 650 487 584 501 C521 515 452 479 463 414 C441 355 483 291 553 278Z" fill="#eee8dc" stroke="#302231" strokeWidth="2.5" filter="url(#hand-drawn)" />
            <path d="M558 306 C611 296 652 333 648 378 C662 421 630 463 580 475 C530 486 487 458 489 414 C473 367 507 317 558 306Z" fill="#c6d85b" stroke="#302231" strokeWidth="1.1" filter="url(#hand-drawn)" />

            <g fill="#afc342" stroke="#302231" strokeWidth="0.85" opacity="0.82">
              <path d="M478 330 C491 314 506 310 521 316 L513 338 C500 341 487 338 478 330Z" />
              <path d="M619 314 C634 311 648 322 655 338 L627 343 C619 335 616 324 619 314Z" />
              <path d="M480 440 C490 451 505 460 522 463 L516 440 C504 433 490 432 480 440Z" />
              <path d="M619 439 C634 431 647 437 655 448 C642 459 629 465 615 467Z" />
            </g>
            <path d="M509 365 C530 347 604 346 622 365 C635 383 629 414 612 428 C590 443 535 442 514 426 C498 413 496 382 509 365Z" fill="#c6d85b" />
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
              className={`group absolute z-30 max-w-[220px] px-2 py-2 transition-transform duration-200 hover:scale-105 focus:scale-105 focus:outline-none ${destination.position} ${destination.align}`}
              aria-label={`${tNav(destination.key)}: ${destination.subtitle}`}
            >
              <span className="block bg-[#302231] px-2 py-1 font-display text-[10px] font-semibold tracking-[0.1em] text-[#c6d85b] uppercase shadow-[2px_2px_0_rgba(198,216,91,0.35)] transition-colors group-hover:bg-[#c6d85b] group-hover:text-[#302231] group-focus:bg-[#c6d85b] group-focus:text-[#302231] md:text-base">
                {destination.key === "studio" ? "Studio philosophy" : destination.key === "projects" ? "Projects district" : tNav(destination.key)}
              </span>
              <span className={`mt-1 hidden bg-[#eee8dc]/94 px-1 font-serif text-xs text-[#302231] transition-opacity md:block ${hovered === destination.key ? "opacity-100" : "opacity-0"}`}>{destination.subtitle} →</span>
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
