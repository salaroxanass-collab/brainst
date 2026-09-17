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
    subtitle: "Enter the forest.",
    kind: "district",
  },
];

const secondaryStreets = [
  "M-30 82 C105 96 228 94 390 72", "M-30 158 C108 151 225 160 369 185", "M-30 236 C104 226 222 239 332 276",
  "M18 330 C112 317 208 325 315 357", "M-20 420 C94 397 195 408 307 441", "M10 515 C112 487 211 490 326 521",
  "M48 610 C152 578 251 580 352 608", "M130 716 C221 671 293 654 379 657",
  "M92 75 C86 138 91 203 112 276", "M190 80 C183 143 189 213 207 292", "M286 70 C279 138 291 208 319 275",
  "M64 302 C65 365 76 430 101 487", "M174 314 C167 374 176 444 205 506", "M282 348 C274 410 286 476 320 535",
  "M92 535 C101 603 119 665 151 724", "M208 535 C215 596 240 654 277 704",
  "M690 78 C734 91 774 99 811 99", "M701 160 C746 175 786 187 826 205", "M709 239 C747 249 773 260 800 278",
  "M788 302 C892 286 1009 291 1162 322", "M776 370 C891 354 1007 366 1160 394", "M790 470 C904 467 1014 480 1168 511",
  "M754 550 C870 558 987 583 1154 632", "M741 631 C855 650 971 690 1128 756",
  "M846 276 C835 330 839 382 856 437", "M956 286 C944 346 948 407 967 462", "M1061 306 C1048 365 1052 429 1071 484",
  "M823 512 C816 569 829 630 857 690", "M936 520 C932 581 948 644 979 711", "M1049 527 C1041 590 1056 655 1088 724",
];

type BuildingFootprint = { x: number; y: number; w: number; h: number; shape?: "rect" | "l" | "u" };

const buildingFootprints: BuildingFootprint[] = [
  {x:18,y:98,w:66,h:42,shape:"l"},{x:94,y:100,w:58,h:45},{x:162,y:92,w:78,h:48,shape:"u"},{x:250,y:96,w:64,h:54,shape:"l"},{x:326,y:88,w:62,h:58},
  {x:20,y:168,w:84,h:44},{x:114,y:170,w:62,h:62,shape:"l"},{x:186,y:166,w:91,h:42,shape:"u"},{x:287,y:174,w:66,h:58},{x:363,y:165,w:60,h:55,shape:"l"},
  {x:18,y:246,w:54,h:38},{x:82,y:242,w:88,h:42,shape:"u"},{x:180,y:230,w:66,h:55,shape:"l"},{x:256,y:240,w:78,h:42},{x:344,y:234,w:54,h:48},
  {x:18,y:340,w:74,h:48,shape:"u"},{x:102,y:332,w:62,h:62},{x:174,y:340,w:82,h:42,shape:"l"},{x:266,y:350,w:54,h:52},{x:330,y:300,w:62,h:44,shape:"l"},
  {x:20,y:430,w:58,h:58,shape:"l"},{x:88,y:418,w:82,h:48},{x:180,y:424,w:66,h:62,shape:"u"},{x:256,y:432,w:62,h:46},{x:328,y:382,w:50,h:60,shape:"l"},
  {x:28,y:530,w:76,h:56,shape:"u"},{x:114,y:522,w:60,h:68},{x:184,y:526,w:86,h:48,shape:"l"},{x:280,y:536,w:58,h:56},{x:348,y:492,w:68,h:42,shape:"l"},
  {x:62,y:612,w:72,h:54},{x:144,y:604,w:64,h:72,shape:"l"},{x:218,y:594,w:78,h:54,shape:"u"},{x:306,y:602,w:58,h:64},{x:374,y:548,w:70,h:44},
  {x:150,y:688,w:72,h:46,shape:"l"},{x:232,y:670,w:66,h:58},{x:308,y:678,w:76,h:48,shape:"u"},{x:394,y:610,w:68,h:54,shape:"l"},{x:472,y:548,w:62,h:48},
  {x:548,y:548,w:62,h:52,shape:"u"},{x:620,y:532,w:66,h:56,shape:"l"},{x:696,y:500,w:62,h:46},{x:726,y:318,w:58,h:52,shape:"l"},
  {x:788,y:286,w:52,h:42},{x:852,y:278,w:76,h:48,shape:"l"},{x:940,y:286,w:68,h:54,shape:"u"},{x:1020,y:300,w:78,h:46},{x:792,y:382,w:58,h:52,shape:"l"},
  {x:862,y:370,w:78,h:48},{x:952,y:374,w:62,h:62,shape:"u"},{x:1026,y:386,w:72,h:48,shape:"l"},{x:786,y:474,w:66,h:54},{x:864,y:468,w:74,h:58,shape:"l"},
  {x:950,y:474,w:62,h:46},{x:1024,y:482,w:74,h:54,shape:"u"},{x:758,y:558,w:58,h:48},{x:828,y:552,w:72,h:58,shape:"l"},{x:912,y:566,w:62,h:48},
  {x:986,y:574,w:78,h:58,shape:"u"},{x:774,y:640,w:68,h:54,shape:"l"},{x:854,y:648,w:72,h:62},{x:938,y:654,w:66,h:50,shape:"u"},{x:1016,y:660,w:76,h:58,shape:"l"},
  {x:674,y:242,w:52,h:42},{x:692,y:438,w:54,h:40,shape:"l"},{x:620,y:240,w:42,h:38},
];

function footprintPath({x,y,w,h,shape="rect"}: BuildingFootprint) {
  if (shape === "l") return `M${x} ${y}H${x+w}V${y+h}H${x+w*0.42}V${y+h*0.48}H${x}Z`;
  if (shape === "u") return `M${x} ${y}H${x+w}V${y+h}H${x+w*0.72}V${y+h*0.38}H${x+w*0.28}V${y+h}H${x}Z`;
  return `M${x} ${y}H${x+w}V${y+h}H${x}Z`;
}

for (let i = 0; i < buildingFootprints.length; i += 1) {
  for (let j = i + 1; j < buildingFootprints.length; j += 1) {
    const a = buildingFootprints[i]; const b = buildingFootprints[j]; const gap = 2;
    if (a.x < b.x + b.w + gap && a.x + a.w + gap > b.x && a.y < b.y + b.h + gap && a.y + a.h + gap > b.y) {
      throw new Error(`Overlapping urban footprints: ${i} and ${j}`);
    }
  }
}

const forestTrees = [
  [774, 91, 18], [801, 78, 13], [824, 103, 22], [854, 75, 17], [882, 101, 24], [916, 78, 16], [946, 108, 21], [979, 83, 15], [1010, 112, 24], [1045, 88, 18],
  [755, 130, 14], [790, 145, 23], [833, 137, 16], [865, 157, 25], [907, 145, 18], [942, 165, 23], [985, 148, 17], [1024, 164, 22], [1065, 144, 16],
  [772, 190, 21], [814, 190, 15], [850, 211, 22], [894, 198, 16], [930, 222, 24], [973, 202, 18], [1014, 224, 20], [1055, 205, 15],
] as const;

export function CityMapHero() {
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const router = useRouter();
  const [hovered, setHovered] = useState<DestinationKey | null>(null);
  const [departing, setDeparting] = useState<Destination | null>(null);
  const [wordmarkHovered, setWordmarkHovered] = useState(false);

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
              {buildingFootprints.map((building, index) => <path key={index} d={footprintPath(building)} />)}
            </g>

            <g className="cursor-pointer" onMouseEnter={() => setHovered("projects")} onMouseLeave={() => setHovered(null)} onClick={() => navigate(destinations[5])}>
              <path d="M730 72 C808 35 944 39 1094 82 C1115 135 1102 211 1070 268 C978 280 885 265 810 229 C766 191 740 137 730 72Z" fill="#b9c878" fillOpacity={hovered === "projects" ? 0.18 : 0.1} stroke="none" />
              <g fill="none" stroke="#66703c" strokeWidth="0.55" opacity="0.55">
                {forestTrees.map(([cx, cy, r], index) => <g key={index}><circle cx={cx} cy={cy} r={r} /><circle cx={cx - r * 0.18} cy={cy + r * 0.08} r={r * 0.68} /><circle cx={cx + r * 0.24} cy={cy - r * 0.17} r={r * 0.48} /></g>)}
              </g>
              <g fill="none" stroke="#726a60" strokeWidth="0.45" opacity="0.32">
                <path d="M744 68 C826 52 925 55 1074 96" /><path d="M750 82 C837 65 947 73 1090 116" /><path d="M778 230 C856 217 950 230 1066 259" />
              </g>
              <path d="M757 241 C818 205 864 183 923 166 C972 151 1025 135 1090 112" fill="none" stroke="#61575c" strokeWidth="1.1" strokeDasharray="2 3" />
              <path d="M899 132 C915 120 939 121 953 135 C946 151 921 156 902 147Z" fill="#e8e1d3" fillOpacity="0.8" stroke="#61575c" strokeWidth="0.55" />
            </g>

            {destinations.filter(destination => destination.kind !== "stream").map(destination => {
              const active = hovered === destination.key || departing?.key === destination.key;
              return (
                <g key={destination.key} className="cursor-pointer" onMouseEnter={() => setHovered(destination.key)} onMouseLeave={() => setHovered(null)} onClick={() => navigate(destination)}>
                  <motion.path d={destination.route} fill="none" stroke={active ? "#78852f" : "#51474d"} strokeWidth={active ? 13 : 9} strokeLinecap="butt" strokeLinejoin="round" animate={{ stroke: active ? "#78852f" : "#51474d", strokeWidth: active ? 13 : 9 }} filter="url(#hand-drawn)" />
                  <motion.path d={destination.route} fill="none" stroke="#e8e1d3" strokeWidth={active ? 9 : 6.5} strokeLinecap="butt" strokeLinejoin="round" animate={{ strokeWidth: active ? 9 : 6.5 }} />
                  <path d={destination.route} fill="none" stroke="#51474d" strokeWidth="0.65" strokeDasharray="5 8" strokeLinecap="butt" />
                </g>
              );
            })}

            <g className="cursor-pointer" onMouseEnter={() => setHovered("studio")} onMouseLeave={() => setHovered(null)} onClick={() => navigate(destinations[0])}>
              <motion.path d="M514 -30 C500 25 543 53 514 96 C492 130 542 165 506 209 C484 237 524 270 510 302 C503 320 504 343 493 360 C500 365 507 363 514 356 C524 347 520 327 529 309 C545 277 515 246 535 216 C567 169 527 137 558 103 C590 68 551 29 604 -30Z" fill="#cbd5a1" fillOpacity={hovered === "studio" ? 0.52 : 0.34} stroke="#66703c" strokeWidth="0.65" filter="url(#hand-drawn)" />
              <g fill="none" stroke="#758044" strokeWidth="0.45" opacity="0.42">
                <path d="M546 -12 C527 31 558 56 534 91" />
                <path d="M519 117 C514 143 545 164 521 196" />
                <path d="M508 228 C501 250 527 271 516 294" />
              </g>
              <g fill="#b8c58a" fillOpacity="0.12" stroke="#66703c" strokeWidth="0.48" opacity="0.64" filter="url(#hand-drawn)">
                {[[500,39,9],[514,60,6],[601,14,11],[580,65,7],[490,119,8],[479,136,6],[568,105,10],[493,184,7],[555,176,11],[566,192,6],[484,235,9],[492,253,6],[548,234,8],[502,294,6],[535,286,7]].map(([cx, cy, r], index) => (
                  <g key={index}><circle cx={cx} cy={cy} r={r} /><circle cx={cx + r * 0.2} cy={cy - r * 0.15} r={r * 0.6} /></g>
                ))}
                <path d="M486 106 C498 99 507 103 512 112 C503 119 493 121 484 116Z" />
                <path d="M546 151 C558 143 571 146 576 157 C565 164 553 164 544 158Z" />
                <path d="M478 218 C488 211 500 214 504 224 C494 230 485 230 476 225Z" />
              </g>
            </g>

            <path d="M398 350 C424 322 454 325 479 300 C516 308 547 296 579 286 C614 280 643 302 680 291 L712 315 L705 344 C731 359 739 386 726 412 L738 445 C726 463 708 470 716 494 C682 492 661 507 638 519 C608 527 581 510 550 524 L513 501 C487 508 462 499 442 481 L409 472 C416 452 408 436 389 420 C401 399 401 383 382 369Z" fill="#dce79b" fillOpacity="0.08" stroke="none" filter="url(#hand-drawn)" />
            <g opacity="0.42" filter="url(#hand-drawn)">
              <path d="M518 347 C529 338 544 340 554 350 C550 361 539 370 523 371 C515 365 513 356 518 347Z" fill="#aeba63" fillOpacity="0.2" stroke="#66703c" strokeWidth="0.45" />
              <path d="M539 362 C550 354 563 357 570 367 C565 377 554 381 542 377Z" fill="#aeba63" fillOpacity="0.14" stroke="none" />
              <g fill="none" stroke="#66703c" strokeWidth="0.45">
                <circle cx="523" cy="350" r="5" /><circle cx="531" cy="361" r="7" /><circle cx="548" cy="369" r="5" />
                <path d="M515 358 L541 347 M520 365 L550 354 M533 374 L561 362" />
              </g>
              <path d="M545 365 C536 373 529 378 522 383" fill="none" stroke="#758044" strokeWidth="0.55" strokeDasharray="2 3" />
            </g>
            <g fill="none" stroke="#66703c" strokeWidth="0.55" opacity="0.5">
              <path d="M398 350 C424 322 454 325 479 300" /><path d="M579 286 C614 280 643 302 680 291 L712 315" /><path d="M738 445 C726 463 708 470 716 494" /><path d="M638 519 C608 527 581 510 550 524" /><path d="M442 481 L409 472" />
            </g>
            <path d="M523 321 C552 304 597 299 629 311 C653 322 674 344 677 367 C683 391 671 414 649 425 C619 438 576 430 554 408 C534 388 520 352 523 321Z" fill="#c6d85b" fillOpacity="0.1" stroke="none" />

            <g fill="none" stroke="#61575c" strokeWidth="0.65" opacity="0.58">
              <path d="M414 365 C441 369 466 379 490 398" />
              <path d="M438 465 C466 450 485 437 505 421" />
              <path d="M651 493 C638 473 628 455 622 433" />
              <path d="M726 407 C696 410 672 414 649 425" />
              <path d="M672 305 C654 324 641 338 628 354" />
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

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-36 w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 md:h-44">
            <div className="absolute left-1/2 top-1/2 w-[min(92vw,520px)] -translate-x-1/2 -translate-y-[58%] text-center">
              <button
                type="button"
                className="pointer-events-auto relative inline-block cursor-default whitespace-nowrap focus:outline-none"
                onMouseEnter={() => setWordmarkHovered(true)}
                onMouseLeave={() => setWordmarkHovered(false)}
                onFocus={() => setWordmarkHovered(true)}
                onBlur={() => setWordmarkHovered(false)}
                aria-label="BrainSt. Hover to reveal Brainstorming."
              >
                <span className="font-display text-4xl font-bold tracking-[0.08em] text-[#302231] uppercase md:text-5xl">BrainSt</span>
                <AnimatePresence>
                  {wordmarkHovered && (
                    <motion.span
                      className="absolute left-full top-0 font-display text-4xl font-bold tracking-[0.08em] text-[#302231] uppercase md:text-5xl"
                      initial={{ x: 24, opacity: 0, clipPath: "inset(0 0 0 100%)" }}
                      animate={{ x: 0, opacity: 1, clipPath: "inset(0 0 0 0%)" }}
                      transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
                      exit={{ x: 18, opacity: 0, clipPath: "inset(0 0 0 100%)", transition: { duration: 0.22, delay: 0.56, ease: [0.65, 0, 0.35, 1] } }}
                    >
                      orming
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <div className="relative z-30 mt-2 h-8 w-full">
                <motion.p
                  className="absolute inset-x-0 top-0 whitespace-nowrap font-serif text-sm font-semibold text-[#302231]"
                  initial={false}
                  animate={{ opacity: wordmarkHovered ? 0 : 1 }}
                  transition={{ duration: 0.22, delay: wordmarkHovered ? 0.1 : 0.78, ease: "easeOut" }}
                >
                  Ideas that meet landscape
                </motion.p>
                <AnimatePresence>
                  {wordmarkHovered && (
                    <motion.p className="absolute inset-x-0 top-[-3px] flex items-baseline justify-center gap-2.5 whitespace-nowrap font-serif text-base font-bold text-[#87972f] md:gap-3.5 md:text-xl">
                      {["IDEAS", "THAT", "MEET", "LANDSCAPE"].map((word, index) => (
                        <motion.span
                          key={word}
                          className="inline-block origin-bottom"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.2, delay: (3 - index) * 0.1, ease: [0.4, 0, 1, 1] } }}
                          transition={{
                            duration: 0.32,
                            delay: 0.25 + index * 0.25,
                            ease: [0.32, 0, 0.2, 1],
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
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
              className={`group absolute z-30 max-w-[240px] px-2 py-2 transition-transform duration-300 hover:-translate-y-0.5 focus:-translate-y-0.5 focus:outline-none ${destination.position} ${destination.align}`}
              aria-label={`${tNav(destination.key)}: ${destination.subtitle}`}
            >
              <span className="inline-block bg-[#302231] px-2.5 py-1.5 font-display text-[10px] font-bold tracking-[0.1em] text-[#f5f1e9] uppercase transition-colors duration-300 group-hover:bg-[#594158] group-focus:bg-[#594158] md:text-sm">
                {destination.key === "studio" ? "Studio philosophy" : destination.key === "projects" ? "Projects" : tNav(destination.key)}
              </span>
              <span className={`mt-1 hidden w-max max-w-[230px] bg-[#e8e1d3] px-2.5 py-1.5 font-serif text-xs text-[#302231] transition-opacity duration-300 md:block ${hovered === destination.key ? "opacity-100" : "pointer-events-none opacity-0"}`}>{destination.subtitle} →</span>
            </button>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute left-6 top-32 z-30 hidden md:left-10 md:top-36 md:block">
        <p className="font-display text-[10px] font-semibold tracking-[0.14em] text-[#302231] uppercase">Welcome to BrainSt</p>
        <p className="mt-2 max-w-[260px] font-serif text-xl leading-6 text-[#302231]">All roads lead to Brainst.<br />Choose one.</p>
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
