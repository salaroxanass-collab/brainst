"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { DesignGrid } from "@/components/layout/DesignGrid";

export function Hero({
  welcome,
  line1,
  line2,
  line3,
  scrollLabel,
  brainstormLabel,
  brainstormHref,
}: {
  welcome: string;
  line1: string;
  line2: string;
  line3: string;
  scrollLabel: string;
  brainstormLabel: string;
  brainstormHref: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    if (!orbRef.current) return;
    gsap.to(orbRef.current, {
      rotation: 360,
      duration: 48,
      repeat: -1,
      ease: "none",
    });
    gsap.to(".hero-line", {
      x: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-forest"
    >
      <Image
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=85"
        alt=""
        fill
        priority
        className="object-cover opacity-50 mix-blend-luminosity"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-forest/30" />
      <DesignGrid className="opacity-30" />

      <div
        ref={orbRef}
        className="pointer-events-none absolute top-[20%] right-[10%] h-[min(40vw,320px)] w-[min(40vw,320px)] rounded-full border border-clay/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[25%] right-[14%] h-[min(28vw,200px)] w-[min(28vw,200px)] rounded-full bg-clay/10"
        aria-hidden
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-[1800px] px-6 pb-24 pt-32 md:px-10 md:pb-32"
      >
        <p className="hero-line translate-x-[-12px] font-display text-[10px] tracking-[0.4em] text-sand/80 uppercase opacity-0 md:text-xs">
          {welcome}
        </p>
        <h1 className="mt-8 max-w-5xl">
          <span className="hero-line block translate-x-[-16px] font-display text-5xl leading-[0.9] tracking-[0.06em] text-offwhite uppercase opacity-0 md:text-7xl lg:text-[6.5rem]">
            {line1}
          </span>
          <span className="hero-line mt-2 block translate-x-[-16px] font-serif text-3xl text-sand opacity-0 md:text-4xl lg:text-5xl">
            {line2}
          </span>
          <span className="hero-line mt-6 block translate-x-[-16px] font-display text-2xl tracking-[0.2em] text-clay uppercase opacity-0 md:text-3xl">
            {line3}
          </span>
        </h1>

        <motion.div
          className="mt-16 flex flex-wrap items-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Link
            href={brainstormHref}
            className="bg-clay px-5 py-4 font-display text-[10px] tracking-[0.28em] text-offwhite uppercase transition hover:bg-clay-dark"
          >
            {brainstormLabel}
          </Link>
          <a
            href="#journey"
            className="inline-flex items-center gap-4 font-display text-[10px] tracking-[0.3em] text-offwhite/70 uppercase transition hover:text-clay"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-offwhite/30">
              ↓
            </span>
            {scrollLabel}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
