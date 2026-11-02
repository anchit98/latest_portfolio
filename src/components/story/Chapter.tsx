"use client";

import { useRef } from "react";
import { motion, useScroll, type MotionValue } from "framer-motion";
import RevealText from "../RevealText";

export const pad = (n: number) => String(n).padStart(2, "0");

// Reading order of the biography; ids match each chapter section.
export const STORY = [
  { id: "story", title: "Roots" },
  { id: "analyst", title: "The Analyst" },
  { id: "pm", title: "The Product Manager" },
  { id: "aipm", title: "The AI Product Manager" },
  { id: "startup", title: "Zero to one" },
  { id: "builder", title: "The Builder" },
  { id: "beyond", title: "Skills forged" },
  { id: "work", title: "Proof of work" },
  { id: "toolkit", title: "What I build with" },
  { id: "principles", title: "How I work" },
  { id: "contact", title: "Next chapter" },
];

/**
 * Where this chapter sits in the story: one segment per chapter, earlier ones full, this one filling
 * as it is read. Segments jump to their chapter. Lives in the chapter header, so it never floats over content.
 */
export function StoryMap({ index, progress, tone = "dark" }: { index: number; progress?: MotionValue<number>; tone?: "dark" | "light" }) {
  const next = STORY[index + 1];
  const light = tone === "light";
  return (
    <nav aria-label="Story progress" className="relative mt-10 w-full max-w-md max-lg:mx-auto">
      <ol className="flex gap-1.5">
        {STORY.map((c, i) => (
          <li key={c.id} className="flex-1">
            <a href={`#${c.id}`} aria-label={`Chapter ${pad(i)}: ${c.title}`} aria-current={i === index ? "step" : undefined} className="group block py-2">
              <span className={`relative block h-[3px] overflow-hidden rounded-full ${light ? "bg-ink/10" : "bg-mist/10"} transition-transform duration-300 group-hover:scale-y-[1.8]`}>
                {i < index && <span className={`absolute inset-0 ${light ? "bg-oak-deep/70" : "bg-oak/60"}`} />}
                {i === index && (
                  <motion.span
                    className={`absolute inset-0 origin-left ${light ? "bg-oak-deep" : "bg-oak"}`}
                    style={progress ? { scaleX: progress } : undefined}
                    initial={progress ? undefined : { scaleX: 0 }}
                    whileInView={progress ? undefined : { scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                  />
                )}
              </span>
            </a>
          </li>
        ))}
      </ol>
      <p className={`mt-1 flex items-center justify-between gap-4 font-mono text-[10.5px] uppercase tracking-[0.18em] ${light ? "text-ink/45" : "text-mist/40"}`}>
        <span>
          {pad(index)} / {pad(STORY.length - 1)}
        </span>
        {next ? (
          <a href={`#${next.id}`} className={`group inline-flex items-center gap-2 transition-colors ${light ? "hover:text-ink" : "hover:text-mist"}`}>
            Next: {next.title}
            <span className="inline-block transition-transform duration-500 group-hover:translate-y-0.5" aria-hidden="true">
              ↓
            </span>
          </a>
        ) : (
          <span>The end, for now</span>
        )}
      </p>
    </nav>
  );
}

export function Sticker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block -rotate-2 rounded-full bg-oak px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink shadow-[0_8px_24px_-10px_rgba(227,178,131,0.7)]">
      {children}
    </span>
  );
}

/**
 * One chapter of the biography. "split" pins the title column while the graphics scroll past;
 * "stacked" puts the title on top for chapters whose content needs the full width.
 */
export default function Chapter({
  id,
  index,
  title,
  meta,
  sticker,
  role,
  hook,
  layout = "split",
  spotlight = false,
  children,
}: {
  id: string;
  index: number;
  title: string;
  meta: string;
  sticker?: string;
  role?: { title: string; company: string; logo: string };
  hook: string;
  layout?: "split" | "stacked";
  /** Sets the chapter apart: deeper background, warm glow and a banner. Used once, for the 0-to-1 product work. */
  spotlight?: boolean;
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 70%", "end 70%"] });

  const header = (
    <header className="relative max-lg:text-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-0 select-none max-lg:left-1/2 max-lg:right-auto max-lg:-translate-x-1/2 font-serif text-[clamp(7rem,15vw,15rem)] italic leading-none text-mist/[0.04] lg:-right-4"
      >
        {pad(index)}
      </span>
      <p className="relative flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-mist/50 max-lg:justify-center">
        <span className="text-oak">Chapter {pad(index)}</span>
        <span>{meta}</span>
      </p>
      {sticker && (
        <div className="relative mt-6">
          <Sticker>{sticker}</Sticker>
        </div>
      )}
      <RevealText
        as="h2"
        segments={[{ text: title, className: "font-serif italic font-normal" }]}
        className={`relative mt-4 leading-[0.92] tracking-[-0.01em] ${layout === "split" ? "text-[clamp(3rem,6vw,6.25rem)]" : "text-[clamp(3rem,7.4vw,7.5rem)]"}`}
      />
      {role && (
        <div className="relative mt-5 flex items-center gap-3 max-lg:justify-center max-lg:text-left">
          <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={role.logo} alt={`${role.company} logo`} className="h-full w-full object-contain" />
          </span>
          <span className="text-[15px] leading-tight">
            <span className="block font-medium">{role.title}</span>
            <span className="text-mist/55">{role.company}</span>
          </span>
        </div>
      )}
      <p className="relative mt-6 max-w-md text-[clamp(1.15rem,1.6vw,1.45rem)] leading-snug tracking-[-0.01em] text-mist/75 max-lg:mx-auto">{hook}</p>
      <StoryMap index={index} progress={scrollYProgress} />
    </header>
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      data-chapter={pad(index)}
      data-chapter-title={title}
      className={`grain relative z-20 py-24 text-mist lg:py-32 ${
        spotlight
          ? "overflow-hidden border-y border-oak/30 bg-[#141315] bg-[radial-gradient(70%_55%_at_15%_0%,rgba(227,178,131,0.16),transparent_70%),radial-gradient(50%_45%_at_100%_100%,rgba(227,178,131,0.08),transparent_70%)]"
          : "border-t border-mist/10 bg-graphite"
      }`}
    >
      {spotlight && (
        <div aria-hidden="true" className="absolute inset-x-0 top-0 flex justify-center">
          <span className="rounded-b-xl bg-oak px-4 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink">Spotlight · 0 to 1</span>
        </div>
      )}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-20">
        {layout === "split" ? (
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">{header}</div>
            <div className="grid content-start gap-4 sm:grid-cols-2">{children}</div>
          </div>
        ) : (
          <>
            {header}
            <div className="mt-14 lg:mt-20">{children}</div>
          </>
        )}
      </div>
    </section>
  );
}
