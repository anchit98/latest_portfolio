"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import Magnetic from "./Magnetic";
import Logo from "./Logo";

const RESUME_URL = "https://drive.google.com/file/d/1CRgF6QFg4W6D0oIYvzHJWP7zsTGhvJ0a/view?usp=sharing";
const NAV = [
  { id: "story", label: "Story" },
  { id: "work", label: "Work" },
  { id: "toolkit", label: "Toolkit" },
  { id: "contact", label: "Contact" },
];
const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/anchitboruah/", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/anchit98/", Icon: Github },
  { label: "Instagram", href: "https://instagram.com/anchitboruah/", Icon: Instagram },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const { scrollY } = useScroll();

  // Tuck away while scrolling down, come back when scrolling up or near the top.
  // Direction is measured against the last position that moved past a small dead zone, so smooth-scroll jitter can't flip it.
  const lastY = useRef(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    setAtTop(y < 60);
    if (y < 120) {
      setHidden(false);
      lastY.current = y;
      return;
    }
    const delta = y - lastY.current;
    if (Math.abs(delta) < 6) return;
    setHidden(delta > 0);
    lastY.current = y;
  });

  // Active section indicator.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
          else if (e.target.id === active) setActive(null);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const { id } of NAV) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    if (!isMenuOpen) return;
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        // Over the cover it is transparent with ink text (the photo is light behind it). Once the reader
        // scrolls it becomes a solid bar on every screen, so the name never sits on top of page content.
        className={`fixed inset-x-0 top-0 z-[90] flex items-center justify-between px-5 transition-[background-color,color,padding] duration-300 sm:px-8 lg:px-12 xl:px-16 ${
          isMenuOpen
            ? "py-3.5 text-mist"
            : atTop
              ? "py-3.5 text-ink lg:py-7"
              : "bg-graphite/95 py-3.5 text-mist shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)] lg:py-4"
        }`}
        animate={{ y: hidden && !isMenuOpen ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#top" aria-label="Back to top" className="group flex items-center gap-3">
          <Logo className="h-9 w-9 shrink-0 transition-transform duration-500 group-hover:-rotate-6" />
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-[-0.02em]">Anchit Boruah</span>
            <span className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.2em] opacity-60">Portfolio © 2026</span>
          </span>
        </a>

        <div className="flex items-center gap-3 md:gap-10">
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="group relative py-1 font-mono text-[11px] uppercase tracking-[0.22em]">
                <span className="relative block overflow-hidden">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">{item.label}</span>
                  <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">{item.label}</span>
                </span>
                {active === item.id && (
                  <motion.span layoutId="nav-dot" className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-current" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
              </a>
            ))}
          </nav>

          <Magnetic>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-current/40 px-4 py-2 text-sm font-medium transition-colors duration-300 sm:px-5 sm:py-2.5 hover:bg-current/10"
              aria-label="View Resume (opens in new tab)"
            >
              Resume
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
            </a>
          </Magnetic>

          <button
            className="relative grid h-10 w-10 place-items-center rounded-full border border-current/40 md:hidden"
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className={`absolute h-px w-4 bg-current transition-transform duration-500 ${isMenuOpen ? "rotate-45" : "-translate-y-[3px]"}`} />
            <span className={`absolute h-px w-4 bg-current transition-transform duration-500 ${isMenuOpen ? "-rotate-45" : "translate-y-[3px]"}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[85] flex flex-col justify-between bg-graphite px-5 pb-10 pt-28 text-mist sm:px-8"
            initial={{ clipPath: "circle(0% at calc(100% - 42px) 42px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 42px) 42px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 42px) 42px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV.map((item, i) => (
                <div key={item.id} className="overflow-hidden border-b border-mist/10">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-baseline justify-between py-4 text-5xl font-medium tracking-[-0.045em] max-sm:justify-center max-sm:gap-3"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.06 }}
                  >
                    {item.label}
                    <span className="font-mono text-xs tracking-normal text-mist/40">0{i + 1}</span>
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6 max-sm:text-center">
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-full bg-mist px-6 py-4 text-sm font-medium text-ink">
                View Resume <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <div className="space-y-1 text-sm text-mist/70">
                <a href="mailto:jobsforanchit.boruah@gmail.com" className="block">
                  jobsforanchit.boruah@gmail.com
                </a>
                <a href="tel:+919910980793" className="block">
                  +91 99109 80793
                </a>
              </div>
              <div className="flex gap-3 text-mist/70 max-sm:justify-center">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-mist/20 transition-colors hover:bg-mist hover:text-ink"
                  >
                    <s.Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
