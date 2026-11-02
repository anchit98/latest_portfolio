"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { ArrowUpRight, ArrowDown, Linkedin } from "lucide-react";
import Magnetic from "./Magnetic";
import { StartupTeaser } from "./Startup";

const RESUME_URL = "https://drive.google.com/file/d/1bNt2ZAid8TBx8o7Vl5tIOGQKbAUJG1B6/view?usp=sharing";
const LINKEDIN_URL = "https://linkedin.com/in/anchitboruah/";
const SUMMARY = "I lead automation and AI products end to end at WPP Media, and build AI products hands-on.";

/** Small screens show the startup card right after the cover, since the portrait fills the first screen. */
export function MobileProof() {
  return (
    <div className="relative z-20 bg-graphite px-5 pb-4 pt-10 text-mist sm:px-8 lg:hidden">
      <StartupTeaser tone="dark" />
    </div>
  );
}
const MARQUEE = "Discovery · Execution · Tracking · Delivery · ";
const EASE = [0.16, 1, 0.3, 1] as const;

/** Name letters thicken as the pointer nears them (Geist is a variable font, wght 100 to 900). */
function ProximityWord({ word, play, delay }: { word: string; play: boolean; delay: number }) {
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
          animate={play ? { y: "0%" } : { y: "105%" }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.045 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const reduce = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // No intro screen: recruiters get the name, role and proof in the first second; entrance motion runs on mount.
  const play = true;

  // Pointer parallax, normalised to [-1, 1].
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.8 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.8 });
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

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
    <section
      ref={sectionRef}
      id="top"
      aria-label="Introduction"
      className={`relative bg-daylight text-ink ${reduce ? "h-[100svh]" : "h-[170svh]"}`}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Faint texture so the daylight side isn't flat: a fading dot grid and thin rings behind the copy. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 lg:left-[min(80svh,50vw)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(25,24,27,0.16)_1px,transparent_1.4px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_65%_at_60%_45%,black,transparent)]" />
          <svg viewBox="0 0 800 800" className="absolute -right-[22%] top-1/2 h-[125svh] w-[125svh] -translate-y-1/2 text-ink">
            <circle cx="400" cy="400" r="395" fill="none" stroke="currentColor" strokeOpacity="0.06" />
            <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeOpacity="0.05" />
            <g className="hero-ring" style={{ transformOrigin: "400px 400px" }}>
              <circle cx="400" cy="400" r="348" fill="none" stroke="currentColor" strokeOpacity="0.09" strokeDasharray="2 14" />
              <circle cx="400" cy="52" r="3" fill="var(--color-oak-deep)" fillOpacity="0.22" />
            </g>
          </svg>
        </div>
        {/* Copy: stacked above the portrait on small screens; on desktop it sits right, where the portrait is looking */}
        <motion.div
          style={reduce ? undefined : { opacity: contentOpacity, y: contentY }}
          className="relative z-30 flex flex-col items-center px-5 pt-24 text-center sm:px-8 sm:pt-28 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[calc(100%-min(80svh,50vw))] lg:items-start lg:justify-center lg:pb-8 lg:pl-[4.5vw] lg:pr-12 lg:pt-28 lg:text-left xl:pr-16"
        >
          <h1 className="font-sans text-[clamp(3.4rem,16vw,9rem)] leading-[0.84] tracking-[-0.055em] lg:text-[clamp(4.5rem,min(9vw,14vh),10.5rem)]">
            <ProximityWord word="Anchit" play={play} delay={0.15} />
            <ProximityWord word="Boruah" play={play} delay={0.3} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={play ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            className="mt-4 flex items-center gap-3 text-balance font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/60 sm:text-[11px] lg:mt-5"
          >
            <span className="hidden h-px w-8 shrink-0 bg-ink/40 lg:block" aria-hidden="true" />
            Senior Product Manager &amp; Analyst · WPP Media
          </motion.p>

          <div className="mt-7 hidden max-w-[34rem] lg:block">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
              className="text-balance text-[1.6rem] leading-[1.15] tracking-[-0.02em] xl:text-[1.85rem]"
            >
              AI &amp; automation products people <span className="font-serif text-[1.15em] italic tracking-normal">actually use.</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.82 }}
              className="mt-4 text-[15px] leading-relaxed text-ink/65"
            >
              At WPP Media I lead the whole flow: discovery, execution, tracking and delivery.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20, rotateX: 20 }}
              animate={play ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 1.1, ease: EASE, delay: 0.95 }}
              className="mt-7 [perspective:900px]"
            >
              <motion.div style={reduce ? undefined : { rotateX: teaserRotX, rotateY: teaserRotY }} className="[transform-style:preserve-3d]">
                <StartupTeaser />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.95 }}
              className="mt-7 flex items-center gap-3"
            >
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
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Resume (opens in new tab)"
                  className="group inline-flex items-center gap-2 rounded-full border border-ink/25 px-5 py-3.5 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-mist"
                >
                  Resume
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
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
            On desktop the photo sits left (facing the copy); the scaled layer spans the viewport so the frame's clipped edge stays under the fade. */}
        <motion.div
          style={reduce ? undefined : { scale: panelScale }}
          className="absolute bottom-0 right-0 z-10 h-[calc(100svh-17.5rem)] w-full origin-[78%_88%] sm:h-[calc(100svh-22rem)] lg:h-full lg:origin-[11%_88%]"
        >
          <div className="absolute inset-y-0 right-0 w-full overflow-hidden [container-type:size] lg:left-0 lg:right-auto lg:w-[min(80svh,50vw)]">
            <div className="absolute left-1/2 top-0 aspect-[1122/1402] w-[max(100cqw,80cqh)] -translate-x-1/2 [perspective:1200px]">
              <motion.div
                className="absolute -inset-[3%]"
                style={reduce ? undefined : { x: plateX, y: plateY }}
              >
                <motion.div
                  className="h-full w-full"
                  initial={reduce ? false : { scale: 1.2, filter: "blur(18px)" }}
                  animate={play ? { scale: 1, filter: "blur(0px)" } : {}}
                  transition={{ duration: 2, ease: EASE }}
                >
                  <motion.div
                    className="h-full w-full"
                    animate={reduce ? undefined : { x: ["0%", "-1.2%", "0.6%", "0%"], y: ["0%", "0.8%", "-0.4%", "0%"] }}
                    transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/hero/plate.webp" alt="" className="h-full w-full object-cover" fetchPriority="high" />
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                aria-hidden="true"
                className="absolute inset-x-0 top-[26%] overflow-hidden"
                style={reduce ? undefined : { x: bandX }}
                initial={{ opacity: 0 }}
                animate={play ? { opacity: 1 } : {}}
                transition={{ duration: 1.4, delay: 0.6 }}
              >
                <div className="marquee-track flex w-max whitespace-nowrap font-serif text-[11cqw] italic leading-none text-ink/85">
                  <span className="pr-[0.3em]">{MARQUEE}</span>
                  <span className="pr-[0.3em]">{MARQUEE}</span>
                </div>
              </motion.div>

              {/* Melt the photo's window side into the page */}
              <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-daylight to-transparent lg:hidden" aria-hidden="true" />

              <motion.div
                className="absolute inset-0"
                style={reduce ? undefined : { x: subjectX, y: subjectY, rotateY: subjectRotY, rotateX: subjectRotX, transformOrigin: "50% 100%" }}
              >
                <motion.div
                  className="h-full w-full origin-bottom"
                  initial={reduce ? false : { y: "6%", opacity: 0 }}
                  animate={play ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 1.5, ease: EASE, delay: 0.25 }}
                >
                  <motion.div
                    className="h-full w-full origin-bottom"
                    animate={reduce ? undefined : { scale: [1, 1.008, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/hero/subject.webp"
                      alt="Anchit Boruah in a charcoal blazer, seated in a sunlit office"
                      className="h-full w-full scale-[1.06] object-cover"
                      fetchPriority="high"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>

              <div className="light-sweep pointer-events-none absolute inset-0 mix-blend-soft-light" aria-hidden="true" />
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 left-[calc(min(80svh,50vw)*0.77)] hidden w-[calc(min(80svh,50vw)*0.23+12px)] bg-gradient-to-l from-daylight from-[12px] via-daylight/40 to-transparent lg:block"
            aria-hidden="true"
          />

          {/* Small screens: the tagline sits on the dark blazer */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center bg-gradient-to-t from-ink/85 via-ink/45 to-transparent px-5 pb-24 pt-24 text-center text-mist sm:px-8 sm:pb-10 lg:hidden">
            <p className="text-2xl leading-tight tracking-[-0.02em] sm:text-3xl">
              AI &amp; automation products people <span className="font-serif text-[1.15em] italic tracking-normal">actually use.</span>
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist/75">{SUMMARY}</p>
            <div className="mt-5 flex justify-center gap-2.5">
              <a href="#work" className="rounded-full bg-mist px-5 py-3 text-sm font-medium text-ink">
                See shipped work
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Resume (opens in new tab)"
                className="inline-flex items-center gap-1.5 rounded-full border border-mist/40 px-5 py-3 text-sm font-medium"
              >
                Resume <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-40 bg-graphite"
          style={{ opacity: reduce ? 0 : shade }}
        />
      </div>
    </section>
  );
}
