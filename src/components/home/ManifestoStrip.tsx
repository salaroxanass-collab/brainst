"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/types";

export function ManifestoStrip({ locale }: { locale: Locale }) {
  const lines =
    locale === "ro"
      ? [
          "Fiecare proiect incepe cu o conversatie, o intrebare, o schita, o plimbare sau o harta.",
          "BrainStorming-ul este partea distractiva.",
          "Apoi transformam ideile in peisaje gandite, reziliente si sustinute de dovezi.",
        ]
      : locale === "it"
        ? [
          "Ogni progetto inizia con una conversazione, una domanda, uno schizzo.",
          "Il BrainStorming è la parte divertente.",
          "Poi si trasformano le idee in paesaggi resilienti e fondati sull'evidenza.",
        ]
        : [
          "Every project starts with a conversation, a question, a sketch, a walk, or a map.",
          "BrainStorming is the fun part.",
          "Then we transform ideas into thoughtful, resilient, evidence-grounded landscapes.",
        ];

  return (
    <section className="border-y border-charcoal/10 bg-forest py-20 text-offwhite md:py-28">
      <div className="mx-auto max-w-[1800px] px-6 md:px-10">
        <ul className="space-y-8 md:space-y-12">
          {lines.map((line, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="font-serif text-2xl leading-snug md:text-4xl lg:max-w-4xl"
            >
              {line}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
