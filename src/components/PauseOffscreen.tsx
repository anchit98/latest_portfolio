"use client";

import { useEffect } from "react";

/**
 * Marks sections well outside the viewport as idle so their looping CSS and SVG animations stop
 * (see [data-idle] in globals.css). Nothing renders.
 */
export default function PauseOffscreen() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          el.toggleAttribute("data-idle", !e.isIntersecting);
          el.querySelectorAll("svg").forEach((svg) => (e.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations()));
        }
      },
      { rootMargin: "300px 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return null;
}
