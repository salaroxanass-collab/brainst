"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
}: {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "text-center" : ""}
    >
      {label && (
        <p className="font-display text-[10px] tracking-[0.35em] text-clay uppercase">
          {label}
        </p>
      )}
      <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-[0.08em] text-forest uppercase md:text-6xl lg:text-7xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 max-w-xl font-serif text-xl text-charcoal-muted md:text-2xl">
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
