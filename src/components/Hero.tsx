"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { ArrowDown, Linkedin } from "lucide-react";
import Magnetic from "./Magnetic";
import { StartupTeaser } from "./Startup";

const LINKEDIN_URL = "https://linkedin.com/in/anchitboruah/";
const MARQUEE = "Discovery · Execution · Tracking · Delivery · ";
const EASE = [0.16, 1, 0.3, 1] as const;
// Served to the breakpoint that doesn't show an image, so phones never download the desktop layers and vice versa.
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/** Name letters rise in on load; on desktop they also thicken as the pointer nears them (Geist is variable, wght 100 to 900). */
function ProximityWord({ word, delay }: { word: string; delay: number }) {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        for (const el of lettersRef.current) {
          if (!el) continue;
          const r = el.getBoundingClientRect();
          const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
          const t = Math.max(0, 1 - d / 260);
          el.style.fontVariationSettings = `"wght" ${Math.round(560 + t * 300)}`;
        }
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span className="block overflow-hidden pb-[0.06em]">
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          ref={(el) => {
            lettersRef.current[i] = el;
          }}
          className="inline-block [font-variation-settings:'wght'_560] transition-[font-variation-settings] duration-500 ease-out"
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.045 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

const Tagline = ({ className }: { className?: string }) => (
  <p className={`text-balance leading-[1.15] tracking-[-0.02em] ${className ?? ""}`}>
    AI &amp; automation products people <span className="font-serif text-[1.15em] italic tracking-normal">actually use.</span>
  </p>
);
const FLOW_LINE = "At WPP Media I lead the whole flow: discovery, execution, tracking and delivery.";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

/**
 * Phones and tablets: one column that reads in order (name, role, portrait, tagline, startup, actions).
 * No sticky scroll scene and no JS-driven loops, so scrolling stays smooth on low-end phones.
 */
function MobileHero() {
  return (
    <div className="relative overflow-hidden px-5 pb-16 pt-24 text-center sm:px-8 sm:pt-28 lg:hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(25,24,27,0.14)_1px,transparent_1.4px)] [background-size:22px_22px] [mask-image:radial-gradient(80%_60%_at_50%_30%,black,transparent)]"
      />
      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <h1 className="text-[clamp(3.25rem,16vw,6rem)] leading-[0.84] tracking-[-0.055em]">
          <ProximityWord word="Anchit" delay={0.1} />
          <ProximityWord word="Boruah" delay={0.22} />
        </h1>
        <motion.p {...rise(0.45)} className="mt-4 text-balance font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/60">
          Senior Product Manager &amp; Analyst · WPP Media
        </motion.p>

        <motion.figure
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          className="relative mt-8 aspect-[4/5] h-[min(46svh,425px)] overflow-hidden rounded-[28px] bg-daylight-2 shadow-[0_30px_60px_-30px_rgba(25,24,27,0.6)]"
        >
          <picture>
            <source media="(min-width: 1024px)" srcSet={BLANK} />
            <img
              src="/hero/portrait.webp"
              alt="Anchit Boruah in a charcoal blazer, seated in a sunlit office"
              width={1122}
              height={1402}
              fetchPriority="high"
              className="kenburns h-full w-full object-cover object-[50%_18%]"
            />
          </picture>
        </motion.figure>

        {/* A slow ticker under the photo carries the motion that used to sit on top of it. */}
        <div aria-hidden="true" className="mt-5 w-full max-w-[340px] overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="marquee-track flex w-max whitespace-nowrap font-serif text-[1.35rem] italic leading-none text-ink/45">
            <span className="pr-[0.4em]">{MARQUEE}</span>
            <span className="pr-[0.4em]">{MARQUEE}</span>
          </div>
        </div>

        <motion.div {...rise(0.55)} className="mt-6">
          <Tagline className="text-[1.6rem] sm:text-[1.9rem]" />
          <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink/65">{FLOW_LINE}</p>
        </motion.div>

        <motion.div {...rise(0.65)} className="mt-7 w-full">
          <StartupTeaser />
        </motion.div>

        <motion.div {...rise(0.75)} className="mt-7 flex items-center justify-center gap-3">
          <a href="#work" className="inline-flex items-center gap-3 rounded-full bg-ink py-3.5 pl-6 pr-3.5 text-sm font-medium text-mist">
            See shipped work
            <span className="grid h-7 w-7 place-items-center rounded-full bg-mist/10">
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
            className="grid h-[50px] w-[50px] place-items-center rounded-full border border-ink/25"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

/** Desktop: the layered portrait scene with pointer parallax and a scroll push into the blazer. */
function DesktopHero({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const reduce = usePrefersReducedMotion();
  // Continuous effects only run where they are visible; on phones this component is display:none.
  const live = useMediaQuery("(min-width: 1024px)") && !reduce;

  // Pointer parallax, normalised to [-1, 1].
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.8 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.8 });
  useEffect(() => {
    if (!live || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [live, px, py]);

  const plateX = useTransform(sx, (v) => v * 18);
  const plateY = useTransform(sy, (v) => v * 10);
  const bandX = useTransform(sx, (v) => v * 7);
  const subjectX = useTransform(sx, (v) => v * -12);
  const subjectY = useTransform(sy, (v) => v * -6);
  const subjectRotY = useTransform(sx, (v) => v * 3);
  const subjectRotX = useTransform(sy, (v) => v * -1.5);
  const teaserRotY = useTransform(sx, (v) => v * 8);
  const teaserRotX = useTransform(sy, (v) => v * -6);

  // Scroll: copy lifts away while the camera pushes into the blazer and the page turns graphite.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.35], [0, -90]);
  const panelScale = useTransform(scrollYProgress, [0.05, 0.6, 1], [1, 2.6, 3.4]);
  const shade = useTransform(scrollYProgress, [0.45, 0.9], [0, 1]);

  return (
    <div className="sticky top-0 hidden h-[100svh] overflow-hidden lg:block">
      {/* Faint texture so the daylight side isn't flat: a fading dot grid and thin rings behind the copy. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[min(80svh,50vw)] right-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(25,24,27,0.16)_1px,transparent_1.4px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_65%_at_60%_45%,black,transparent)]" />
        <svg viewBox="0 0 800 800" className="absolute -right-[22%] top-1/2 h-[125svh] w-[125svh] -translate-y-1/2 text-ink">
          <circle cx="400" cy="400" r="395" fill="none" stroke="currentColor" strokeOpacity="0.06" />
          <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeOpacity="0.05" />
        </svg>
        {/* Rotated as a whole element so the turn stays on the compositor instead of repainting the SVG. */}
        <div className="absolute -right-[22%] top-1/2 h-[125svh] w-[125svh] -translate-y-1/2">
          <svg viewBox="0 0 800 800" className="hero-ring h-full w-full text-ink">
            <circle cx="400" cy="400" r="348" fill="none" stroke="currentColor" strokeOpacity="0.09" strokeDasharray="2 14" />
            <circle cx="400" cy="52" r="3" fill="var(--color-oak-deep)" fillOpacity="0.22" />
          </svg>
        </div>
      </div>

      {/* Copy sits right, where the portrait is looking */}
      <motion.div
        style={reduce ? undefined : { opacity: contentOpacity, y: contentY }}
        className="absolute inset-y-0 right-0 z-30 flex w-[calc(100%-min(80svh,50vw))] flex-col items-start justify-center pb-8 pl-[4.5vw] pr-12 pt-28 xl:pr-16"
      >
        <h1 className="text-[clamp(4.5rem,min(9vw,14vh),10.5rem)] leading-[0.84] tracking-[-0.055em]">
          <ProximityWord word="Anchit" delay={0.15} />
          <ProximityWord word="Boruah" delay={0.3} />
        </h1>
        <motion.p {...rise(0.55)} className="mt-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">
          <span className="h-px w-8 shrink-0 bg-ink/40" aria-hidden="true" />
          Senior Product Manager &amp; Analyst · WPP Media
        </motion.p>

        <div className="mt-7 max-w-[34rem]">
          <motion.div {...rise(0.75)}>
            <Tagline className="text-[1.6rem] xl:text-[1.85rem]" />
          </motion.div>
          <motion.p {...rise(0.82)} className="mt-4 text-[15px] leading-relaxed text-ink/65">
            {FLOW_LINE}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.95 }}
            className="mt-7 [perspective:900px]"
          >
            <motion.div style={live ? { rotateX: teaserRotX, rotateY: teaserRotY } : undefined} className="[transform-style:preserve-3d]">
              <StartupTeaser />
            </motion.div>
          </motion.div>
          <motion.div {...rise(0.95)} className="mt-7 flex items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-3 rounded-full bg-ink py-3.5 pl-6 pr-3.5 text-sm font-medium text-mist transition-colors hover:bg-oak-deep"
              >
                See shipped work
                <span className="grid h-7 w-7 place-items-center rounded-full bg-mist/10 transition-transform duration-500 group-hover:translate-y-0.5">
                  <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in new tab)"
                className="grid h-[50px] w-[50px] place-items-center rounded-full border border-ink/25 transition-colors hover:border-ink hover:bg-ink hover:text-mist"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
            </Magnetic>
          </motion.div>
          {/* In normal flow, so it can never sit on top of the buttons; dropped on short screens. */}
          <p className="mt-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55 [@media(max-height:900px)]:hidden">
            <span className="scroll-cue relative h-9 w-px overflow-hidden bg-ink/15 text-ink" aria-hidden="true" />
            Scroll to explore
          </p>
        </div>
      </motion.div>

      {/* Portrait: plate, a line of copy running behind the head, then the cut-out subject.
          The scaled layer spans the viewport so the frame's clipped edge stays under the fade. */}
      <motion.div style={reduce ? undefined : { scale: panelScale }} className="absolute inset-0 z-10 origin-[11%_88%]">
        <div className="absolute inset-y-0 left-0 w-[min(80svh,50vw)] overflow-hidden [container-type:size]">
          <div className="absolute left-1/2 top-0 aspect-[1122/1402] w-[max(100cqw,80cqh)] -translate-x-1/2 [perspective:1200px]">
            <motion.div className="absolute -inset-[3%]" style={live ? { x: plateX, y: plateY } : undefined}>
              <motion.div
                className="h-full w-full"
                initial={reduce ? false : { scale: 1.2, filter: "blur(18px)" }}
                animate={{ scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 2, ease: EASE }}
              >
                <motion.div
                  className="h-full w-full"
                  animate={live ? { x: ["0%", "-1.2%", "0.6%", "0%"], y: ["0%", "0.8%", "-0.4%", "0%"] } : undefined}
                  transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
                >
                  <picture>
                    <source media="(max-width: 1023px)" srcSet={BLANK} />
                    <img src="/hero/plate.webp" alt="" className="h-full w-full object-cover" fetchPriority="high" />
                  </picture>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 top-[26%] overflow-hidden"
              style={live ? { x: bandX } : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.6 }}
            >
              <div className="marquee-track flex w-max whitespace-nowrap font-serif text-[11cqw] italic leading-none text-ink/85">
                <span className="pr-[0.3em]">{MARQUEE}</span>
                <span className="pr-[0.3em]">{MARQUEE}</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0"
              style={live ? { x: subjectX, y: subjectY, rotateY: subjectRotY, rotateX: subjectRotX, transformOrigin: "50% 100%" } : undefined}
            >
              <motion.div
                className="h-full w-full origin-bottom"
                initial={reduce ? false : { y: "6%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1.5, ease: EASE, delay: 0.25 }}
              >
                <motion.div
                  className="h-full w-full origin-bottom"
                  animate={live ? { scale: [1, 1.008, 1] } : undefined}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <picture>
                    <source media="(max-width: 1023px)" srcSet={BLANK} />
                    <img
                      src="/hero/subject.webp"
                      alt="Anchit Boruah in a charcoal blazer, seated in a sunlit office"
                      className="h-full w-full scale-[1.06] object-cover"
                      fetchPriority="high"
                    />
                  </picture>
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="light-sweep pointer-events-none absolute inset-0 mix-blend-soft-light" aria-hidden="true" />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-[calc(min(80svh,50vw)*0.77)] w-[calc(min(80svh,50vw)*0.23+12px)] bg-gradient-to-l from-daylight from-[12px] via-daylight/40 to-transparent"
          aria-hidden="true"
        />
      </motion.div>

      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-40 bg-graphite" style={{ opacity: reduce ? 0 : shade }} />
    </div>
  );
}

export default function Hero() {
  const reduce = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section ref={sectionRef} id="top" aria-label="Introduction" className={`relative bg-daylight text-ink ${reduce ? "lg:h-[100svh]" : "lg:h-[170svh]"}`}>
      <MobileHero />
      <DesktopHero sectionRef={sectionRef} />
    </section>
  );
}
