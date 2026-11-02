"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Segment = string | { text: string; className?: string };

/**
 * Word-by-word masked reveal. Pass plain strings, or { text, className } segments to style
 * part of a line (e.g. the serif italic accent). Plays on scroll-in, or when `play` flips true.
 */
export default function RevealText({
  segments,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.045,
  play,
}: {
  segments: Segment[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  play?: boolean;
}) {
  const reduce = usePrefersReducedMotion();
  const MotionTag = motion[Tag];
  const words = segments.flatMap((seg) => {
    const { text, className: cls } = typeof seg === "string" ? { text: seg, className: undefined } : seg;
    return text.split(" ").filter(Boolean).map((w) => ({ w, cls }));
  });
  const label = segments.map((s) => (typeof s === "string" ? s : s.text)).join(" ");

  const trigger = play === undefined ? { whileInView: "show", viewport: { once: true, margin: "-12% 0px" } } : { animate: play ? "show" : "hidden" };

  return (
    <MotionTag className={className} aria-label={label} initial={reduce ? "show" : "hidden"} {...trigger}>
      {words.map(({ w, cls }, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
          <motion.span
            className={`inline-block will-change-transform ${cls ?? ""}`}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </MotionTag>
  );
}
