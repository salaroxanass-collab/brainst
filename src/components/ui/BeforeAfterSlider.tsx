"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

export function BeforeAfterSlider({
  before,
  after,
  labelBefore = "Before",
  labelAfter = "After",
}: {
  before: string;
  after: string;
  labelBefore?: string;
  labelAfter?: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, x)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full cursor-ew-resize overflow-hidden bg-charcoal/5"
      onMouseMove={(e) => e.buttons === 1 && update(e.clientX)}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        if (touch) update(touch.clientX);
      }}
      role="slider"
      aria-valuenow={position}
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
      }}
    >
      <Image src={after} alt={labelAfter} fill className="object-cover" sizes="100vw" />
      <Image
        src={before}
        alt={labelBefore}
        fill
        className="object-cover"
        sizes="100vw"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />
      <div
        className="absolute top-0 bottom-0 z-10 w-px bg-offwhite shadow-lg"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-offwhite/80 bg-forest/90">
          <span className="font-display text-[8px] tracking-widest text-offwhite">↔</span>
        </div>
      </div>
      <span className="absolute bottom-4 left-4 font-display text-[10px] tracking-[0.2em] text-offwhite uppercase">
        {labelBefore}
      </span>
      <span className="absolute right-4 bottom-4 font-display text-[10px] tracking-[0.2em] text-offwhite uppercase">
        {labelAfter}
      </span>
    </div>
  );
}
