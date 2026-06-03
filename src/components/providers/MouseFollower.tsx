"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export function MouseFollower() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 120, damping: 20 });
  const y = useSpring(0, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      <motion.div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest/20 mix-blend-multiply md:block"
        style={{ x, y }}
        aria-hidden
      />
      <motion.div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[91] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay md:block"
        style={{ x, y }}
        aria-hidden
      />
    </>
  );
}
