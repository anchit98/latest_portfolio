"use client";

import { createContext, useContext, useEffect, useEffectEvent, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, ArrowLeft, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, type ProjectKind, type ProjectType } from "@/content/projects";

export { PROJECTS };

const GROUPS: { kind: ProjectKind; title: string; note: string; dot: string }[] = [
  { kind: "work", title: "Shipped at work", note: "Real products, real users, measured outcomes", dot: "bg-oak" },
  { kind: "build", title: "Built by me", note: "Independent AI products, live or working", dot: "bg-steel" },
  { kind: "case", title: "Product case studies", note: "Concept work on public problems", dot: "bg-mist/50" },
];
const KIND_LABEL: Record<ProjectKind, string> = { work: "Shipped at work", build: "Independent build", case: "Concept case study" };

const isLocalFile = (url: string) => url.startsWith("/files/");
const GLOW: Record<ProjectKind, string> = {
  work: "bg-[radial-gradient(90%_75%_at_100%_100%,rgba(227,178,131,0.22),transparent_65%)]",
  build: "bg-[radial-gradient(90%_75%_at_100%_100%,rgba(169,189,208,0.2),transparent_65%)]",
  case: "bg-[radial-gradient(90%_75%_at_100%_100%,rgba(236,233,228,0.1),transparent_65%)]",
};

/** A screenshot in a minimal window frame, so very different images read as one set. */
function Shot({ src, alt, fit = "cover", className }: { src: string; alt: string; fit?: "cover" | "contain"; className?: string }) {
  return (
    <span className={`flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#121214] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.85)] ${className ?? ""}`}>
      <span className="flex h-6 shrink-0 items-center gap-1.5 border-b border-white/5 px-3" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={fit === "cover" ? "min-h-0 w-full flex-1 bg-white object-cover object-left-top" : "max-h-[64vh] w-full bg-white object-contain"}
      />
    </span>
  );
}

/** Cover for internal work with no screenshot: the measured results, set large. */
function StatCover({ highlights, large = false, className }: { highlights: NonNullable<ProjectType["highlights"]>; large?: boolean; className?: string }) {
  return (
    <span
      className={`grid content-center gap-x-5 gap-y-5 rounded-xl border border-white/10 bg-[#141416] p-5 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.85)] ${
        highlights.length > 2 ? "grid-cols-3" : "grid-cols-2"
      } ${className ?? ""}`}
    >
      {highlights.map((h) => (
        <span key={h.label} className="block">
          <span className={`block whitespace-nowrap font-medium leading-none tracking-[-0.05em] text-mist ${large ? "text-[clamp(2.25rem,5vw,4.25rem)]" : highlights.length > 2 ? "text-[clamp(1.25rem,1.6vw,1.8rem)]" : "text-[clamp(1.5rem,2.3vw,2.2rem)]"}`}>
            {h.value}
          </span>
          <span className="mt-2 block text-[12px] leading-snug text-mist/55">{h.label}</span>
        </span>
      ))}
    </span>
  );
}

function ProjectTile({ project, index, wide, onOpen }: { project: ProjectType; index: number; wide: boolean; onOpen: (el: HTMLButtonElement) => void }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.08 }}
      className={wide ? "min-h-[420px] xl:min-h-[340px]" : "min-h-[440px]"}
    >
      <button
        data-cursor="Open"
        onClick={(e) => onOpen(e.currentTarget)}
        aria-label={`Open ${KIND_LABEL[project.kind].toLowerCase()}: ${project.title}`}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-[22px] border border-mist/10 bg-graphite-2 p-6 text-left max-sm:text-center transition-colors duration-500 hover:border-mist/25 sm:p-7"
      >
        <span aria-hidden="true" className={`absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-100 ${GLOW[project.kind]}`} />

        <span className={`relative z-10 flex flex-col ${wide ? "xl:max-w-[46%]" : ""}`}>
          <span className="flex items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-mist/45">
            <span>{project.role}</span>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-mist/15 text-mist transition-all duration-500 group-hover:rotate-45 group-hover:border-oak group-hover:bg-oak group-hover:text-ink">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </span>
          <span className={`mt-4 font-medium leading-[1.02] tracking-[-0.035em] ${wide ? "text-[clamp(1.75rem,2.6vw,2.6rem)]" : "text-[clamp(1.35rem,1.6vw,1.6rem)]"}`}>
            {project.title}
          </span>
          <span className="mt-3 text-[13.5px] leading-snug text-mist/60">{project.problem}</span>
          <span className="mt-4 flex items-center gap-2.5 text-[13px] text-oak max-sm:justify-center">
            <span className="h-px w-5 shrink-0 bg-oak/70" aria-hidden="true" />
            {project.metric}
          </span>
        </span>

        <span
          aria-hidden="true"
          className={`absolute transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3 ${
            !project.image
              ? // Figures must stay fully visible, so the results card sits inside the tile instead of bleeding off it.
                wide
                ? "bottom-6 left-6 right-6 top-[62%] sm:left-7 sm:right-7 xl:bottom-7 xl:left-[52%] xl:top-[22%]"
                : "bottom-6 left-6 right-6 top-[64%] sm:left-7 sm:right-7"
              : wide
                ? "bottom-[-10%] left-6 right-[-12%] top-[60%] -rotate-[1.5deg] group-hover:rotate-0 sm:left-7 xl:bottom-[-14%] xl:left-[52%] xl:right-[-6%] xl:top-[18%]"
                : "bottom-[-10%] left-6 right-[-16%] top-[64%] -rotate-[1.5deg] group-hover:-translate-x-2 group-hover:rotate-0 sm:left-7"
          }`}
        >
          {project.image ? (
            <Shot src={project.image} alt="" className="h-full w-full" />
          ) : (
            project.highlights && <StatCover highlights={project.highlights} className="h-full w-full" />
          )}
        </span>
      </button>
    </motion.li>
  );
}

function ProjectLink({ url, text }: { url: string; text: string }) {
  const local = isLocalFile(url);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      download={local || undefined}
      className="group flex items-center justify-between gap-4 rounded-full bg-ink py-3 pl-6 pr-3 text-sm font-medium text-mist transition-colors duration-300 hover:bg-oak-deep"
    >
      {text}
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist/10 transition-transform duration-500 group-hover:rotate-45">
        {local ? <Download className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-45" aria-hidden="true" /> : <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
      </span>
    </a>
  );
}

function CaseStudy({ index, onClose, onNavigate }: { index: number | null; onClose: () => void; onNavigate: (i: number) => void }) {
  const project = index === null ? null : PROJECTS[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (index === null) return;
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") onNavigate((index + 1) % PROJECTS.length);
    if (e.key === "ArrowLeft") onNavigate((index - 1 + PROJECTS.length) % PROJECTS.length);
  });
  const isOpen = index !== null;
  useEffect(() => {
    if (!isOpen) return;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [isOpen]);

  useEffect(() => {
    if (index === null) return;
    scrollRef.current?.scrollTo({ top: 0 });
    closeRef.current?.focus({ preventScroll: true });
  }, [index]);

  const next = index === null ? 0 : (index + 1) % PROJECTS.length;
  const prev = index === null ? 0 : (index - 1 + PROJECTS.length) % PROJECTS.length;
  const label = "font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/45";

  return (
    <AnimatePresence>
      {project && (
        <motion.div key="case-study" className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-labelledby="case-study-title" exit={{ opacity: 1 }}>
          <motion.div
            className="absolute inset-0 bg-ink/75 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            ref={scrollRef}
            data-lenis-prevent
            className="no-scrollbar absolute inset-x-0 bottom-0 top-3 overflow-y-auto overscroll-contain rounded-t-[28px] bg-daylight text-ink sm:top-5 lg:inset-x-5"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-ink/10 bg-daylight/85 px-5 py-3.5 backdrop-blur-md sm:px-8 lg:px-12">
              <span className={label}>
                {project.id} <span className="mx-1.5 text-ink/25">/</span> {KIND_LABEL[project.kind]}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate(prev)}
                  className="hidden h-10 w-10 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-mist sm:grid"
                  aria-label={`Previous: ${PROJECTS[prev].title}`}
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => onNavigate(next)}
                  className="hidden h-10 w-10 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-mist sm:grid"
                  aria-label={`Next: ${PROJECTS[next].title}`}
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  className="group ml-1 flex items-center gap-3 rounded-full bg-ink py-1.5 pl-4 pr-1.5 text-xs font-medium text-mist"
                  aria-label="Close case study"
                >
                  <span className="hidden font-mono uppercase tracking-[0.18em] sm:inline">Close</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-mist/10 transition-transform duration-500 group-hover:rotate-90">
                    <X className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 } }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
                className="mx-auto max-w-[1280px] px-5 pb-16 pt-10 max-sm:text-center sm:px-8 lg:px-12 lg:pt-16"
              >
                <p className={label}>{project.context}</p>
                <h2 id="case-study-title" className="mt-4 max-w-[18ch] text-[clamp(2.6rem,6vw,5.75rem)] font-medium leading-[0.95] tracking-[-0.045em]">
                  {project.title}
                </h2>

                {/* The brief: what a hiring manager asks first */}
                <dl className="mt-10 grid border-t border-ink/15 md:grid-cols-[1.3fr_1fr_1fr]">
                  {[
                    ["The problem", project.problem],
                    ["My role", project.myRole],
                    ["Outcome", project.metric],
                  ].map(([k, v], i) => (
                    <div key={k} className={`border-b border-ink/15 py-5 md:py-6 md:pr-6 ${i > 0 ? "md:border-l md:pl-6" : ""}`}>
                      <dt className={label}>{k}</dt>
                      <dd className={`mt-2 leading-snug ${k === "Outcome" ? "text-lg font-medium text-oak-deep" : "text-[16px] text-ink/80"}`}>{v}</dd>
                    </div>
                  ))}
                </dl>

                {/* Stage: the full screenshot, or the measured results for internal work */}
                <motion.div
                  className="relative mt-12 overflow-hidden rounded-[24px] bg-graphite px-5 py-8 sm:px-[6%] sm:py-14 lg:mt-16"
                  initial={{ clipPath: "inset(6% 4% 6% 4% round 32px)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                >
                  <span aria-hidden="true" className={`absolute inset-0 ${GLOW[project.kind]}`} />
                  {project.image ? (
                    <Shot src={project.image} alt={`Screenshot of ${project.title}`} fit="contain" className="relative mx-auto w-fit max-w-full" />
                  ) : (
                    project.highlights && <StatCover highlights={project.highlights} large className="relative mx-auto max-w-4xl border-none bg-transparent shadow-none" />
                  )}
                </motion.div>

                {/* Story */}
                <div className="mt-16 grid gap-x-16 gap-y-12 lg:mt-24 lg:grid-cols-[13rem_1fr]">
                  <h3 className={label}>Approach</h3>
                  <p className="max-w-3xl text-xl leading-[1.6] text-ink/80 sm:text-[1.35rem]">{project.fullDescription}</p>

                  <h3 className={label}>{project.kind === "case" ? "Key findings" : "What shipped"}</h3>
                  <ol className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="bg-daylight p-6">
                        <span className="font-mono text-xs text-oak-deep">{String(i + 1).padStart(2, "0")}</span>
                        <p className="mt-3 text-[15.5px] leading-relaxed text-ink/80">{feature}</p>
                      </li>
                    ))}
                  </ol>

                  <h3 className={label}>{project.kind === "work" ? "Skills applied" : "Tools & methods"}</h3>
                  <ul className="flex flex-wrap gap-2 max-sm:justify-center">
                    {project.tools.map((tool) => (
                      <li key={tool} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[13px] text-ink/75">
                        {tool}
                      </li>
                    ))}
                  </ul>

                  {(project.downloadUrl || project.downloads) && (
                    <>
                      <h3 className={label}>Explore</h3>
                      <div className="flex flex-wrap gap-3 max-sm:justify-center">
                        {project.downloadUrl && <ProjectLink url={project.downloadUrl} text={project.downloadText || "Download File"} />}
                        {project.downloads?.map((dl) => <ProjectLink key={dl.url} url={dl.url} text={dl.text} />)}
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={() => onNavigate(next)}
                  className="group mt-20 grid w-full items-center gap-6 border-t border-ink/15 pt-8 text-left max-sm:text-center sm:grid-cols-[1fr_auto] lg:mt-28"
                >
                  <span>
                    <span className={label}>Next · {KIND_LABEL[PROJECTS[next].kind]}</span>
                    <span className="mt-3 block text-[clamp(1.9rem,4.2vw,3.75rem)] font-medium leading-none tracking-[-0.04em] transition-colors group-hover:text-oak-deep">
                      {PROJECTS[next].title}
                    </span>
                  </span>
                  {PROJECTS[next].image && (
                    <span className="relative hidden h-28 w-44 overflow-hidden rounded-xl sm:block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={PROJECTS[next].image} alt="" className="h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-105" />
                    </span>
                  )}
                </button>
              </motion.article>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const CaseStudyContext = createContext<(index: number, trigger?: HTMLElement | null) => void>(() => {});
/** Opens the case-study sheet for PROJECTS[index]; focus returns to `trigger` on close. */
export const useOpenCaseStudy = () => useContext(CaseStudyContext);

export function CaseStudyProvider({ children }: { children: React.ReactNode }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = (index: number, trigger?: HTMLElement | null) => {
    triggerRef.current = trigger ?? null;
    setOpenIdx(index);
  };
  const close = () => {
    setOpenIdx(null);
    triggerRef.current?.focus({ preventScroll: true });
  };

  return (
    <CaseStudyContext.Provider value={open}>
      {children}
      <CaseStudy index={openIdx} onClose={close} onNavigate={setOpenIdx} />
    </CaseStudyContext.Provider>
  );
}

/** Every project in one view, grouped so it's clear what shipped at work, what I built, and what is concept work. */
export default function ProjectGrid() {
  const open = useOpenCaseStudy();
  return (
    <div className="space-y-14">
      {GROUPS.map((g) => {
        const items = PROJECTS.map((p, i) => ({ p, i })).filter(({ p }) => p.kind === g.kind);
        return (
          <section key={g.kind} aria-label={g.title}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 max-sm:flex-col max-sm:items-center max-sm:text-center border-b border-mist/10 pb-4">
              <h3 className="flex items-center gap-3 text-xl font-medium tracking-[-0.02em]">
                <span className={`h-2 w-2 rounded-full ${g.dot}`} aria-hidden="true" />
                {g.title}
                <span className="font-mono text-[11px] text-mist/35">{String(items.length).padStart(2, "0")}</span>
              </h3>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-mist/40">{g.note}</p>
            </div>
            <ul className={`mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 ${g.kind === "work" ? "" : "lg:grid-cols-4"}`}>
              {items.map(({ p, i }, k) => (
                <ProjectTile key={p.id} project={p} index={k} wide={g.kind === "work"} onOpen={(el) => open(i, el)} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
