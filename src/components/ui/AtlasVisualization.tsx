"use client";

import { motion } from "framer-motion";

const layers = [
  { id: "green", label: "Green cover", color: "#1b3d2f", delay: 0 },
  { id: "water", label: "Hydrology", color: "#5c8f9e", delay: 0.15 },
  { id: "heat", label: "Heat stress", color: "#c4754a", delay: 0.3 },
  { id: "access", label: "Access", color: "#e8dfd0", delay: 0.45 },
];

export function AtlasVisualization() {
  return (
    <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-full border border-charcoal/10 bg-offwhite p-8">
      <div className="absolute inset-0 grid-overlay opacity-30" aria-hidden />
      {layers.map((layer, i) => (
        <motion.div
          key={layer.id}
          className="absolute rounded-full border"
          style={{
            borderColor: layer.color,
            backgroundColor: `${layer.color}22`,
            inset: `${12 + i * 10}%`,
          }}
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: layer.delay, duration: 0.8 }}
        />
      ))}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <p className="font-display text-[10px] tracking-[0.3em] text-clay uppercase">
          Environmental layers
        </p>
        <ul className="mt-6 space-y-2">
          {layers.map((l) => (
            <li
              key={l.id}
              className="font-display text-[9px] tracking-[0.15em] text-charcoal uppercase"
            >
              <span
                className="mr-2 inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: l.color }}
              />
              {l.label}
            </li>
          ))}
        </ul>
      </div>
      <motion.div
        className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      />
    </div>
  );
}
