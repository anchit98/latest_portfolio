"use client";

import { useSyncExternalStore } from "react";

/**
 * Hydration-safe media query: renders `false` on the server and during hydration,
 * then switches to the live value. (framer-motion's useReducedMotion reads the query
 * during the first client render, which mismatches server HTML.)
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
