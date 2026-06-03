"use client";

import { cn } from "@/lib/utils";

export function DesignGrid({
  className,
  visible = true,
}: {
  className?: string;
  visible?: boolean;
}) {
  if (!visible) return null;
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 grid-overlay opacity-60",
        className
      )}
      aria-hidden
    />
  );
}
