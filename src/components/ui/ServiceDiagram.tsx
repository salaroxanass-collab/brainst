"use client";

import { motion } from "framer-motion";

const icons: Record<string, React.ReactNode> = {
  landscape: (
    <path d="M4 20 L12 8 L20 14 L28 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
  ),
  urban: (
    <>
      <rect x="6" y="10" width="6" height="14" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="16" y="6" width="8" height="18" fill="none" stroke="currentColor" strokeWidth="1" />
    </>
  ),
  research: (
    <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
  ),
  gis: (
    <>
      <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path d="M16 4 L16 28 M4 16 L28 16" stroke="currentColor" strokeWidth="0.6" />
    </>
  ),
  assessment: (
    <path d="M8 24 Q16 4 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" />
  ),
  nbs: (
    <path d="M16 28 L16 12 M10 18 Q16 8 22 18" fill="none" stroke="currentColor" strokeWidth="1" />
  ),
  consultancy: (
    <path d="M6 16 H26 M16 6 V26" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
  ),
};

export function ServiceDiagram({
  serviceKey,
  title,
  description,
  index,
}: {
  serviceKey: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="group relative border-t border-charcoal/10 py-10 md:grid md:grid-cols-12 md:gap-8"
    >
      <div className="md:col-span-2">
        <svg viewBox="0 0 32 32" className="h-16 w-16 text-forest transition group-hover:text-clay" aria-hidden>
          {icons[serviceKey] ?? icons.research}
        </svg>
      </div>
      <div className="md:col-span-4">
        <h3 className="font-display text-2xl tracking-[0.12em] text-forest uppercase">
          {title}
        </h3>
      </div>
      <p className="mt-4 font-serif text-lg text-charcoal-muted md:col-span-6 md:mt-0">
        {description}
      </p>
      <span className="absolute top-10 right-0 font-display text-[10px] tracking-[0.2em] text-charcoal/30 uppercase">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}
