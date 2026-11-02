"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Counter from "../Counter";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Frame for a single infographic. Captions stay short: the graphic carries the message. */
export function Panel({ children, caption, className }: { children: React.ReactNode; caption?: React.ReactNode; className?: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`relative flex flex-col overflow-hidden rounded-[20px] border max-sm:text-center border-mist/10 bg-graphite-2/55 p-6 sm:p-7 ${className ?? ""}`}
    >
      <div className="flex flex-1 flex-col">{children}</div>
      {caption && <figcaption className="mt-6 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.18em] text-mist/45">{caption}</figcaption>}
    </motion.figure>
  );
}

export function BigStat({ value, prefix, suffix, label, size = "lg" }: { value: number; prefix?: string; suffix?: string; label: string; size?: "lg" | "sm" }) {
  return (
    <div>
      <div className={`font-medium leading-none tracking-[-0.05em] tabular-nums ${size === "lg" ? "text-[clamp(2.75rem,4.4vw,4.4rem)]" : "text-[clamp(1.6rem,2.2vw,2.1rem)]"}`}>
        <Counter value={value} prefix={prefix} suffix={suffix} />
      </div>
      <p className={`text-mist/55 ${size === "lg" ? "mt-3 text-sm" : "mt-1.5 text-[12.5px]"}`}>{label}</p>
    </div>
  );
}

/** Horizontal bars that grow on view; widths are relative to the largest value. */
export function Bars({ rows }: { rows: { label: string; value: number; display: string; accent?: boolean }[] }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div className="space-y-4">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-4 text-[12.5px]">
            <span className="text-mist/55">{r.label}</span>
            <span className={`font-mono tabular-nums ${r.accent ? "text-oak" : "text-mist/60"}`}>{r.display}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-mist/[0.06]">
            <motion.div
              className={`h-full rounded-full ${r.accent ? "bg-oak" : "bg-mist/30"}`}
              initial={{ width: "0%" }}
              whileInView={{ width: `${(r.value / max) * 100}%` }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 + i * 0.25 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Progress ring with the figure counting up in the middle. */
export function Ring({ value, label, size = 112 }: { value: number; label: string; size?: number }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill="none" strokeWidth="6" className="stroke-mist/10" />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            className="stroke-oak"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: value / 100 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-[1.6rem] font-medium tracking-[-0.04em] tabular-nums" style={{ fontSize: size * 0.22 }}>
          <Counter value={value} suffix="%" />
        </span>
      </div>
      <p className="mt-3 text-[12.5px] leading-snug text-mist/60">{label}</p>
    </div>
  );
}

/** One dot per item on a tilted plane; a slow wave rolls across it in depth. */
export function DotField({ count, cols = 25 }: { count: number; cols?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <div ref={ref} className="relative mx-auto grid h-[260px] w-full place-items-center [perspective:1100px] sm:h-[320px]" aria-hidden="true">
      <div
        className="grid gap-[clamp(6px,1.1vw,11px)] [transform-style:preserve-3d]"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, transform: "rotateX(58deg) rotateZ(-32deg)" }}
      >
        {Array.from({ length: count }, (_, i) => {
          const d = (i % cols) + Math.floor(i / cols);
          return (
            <span
              key={i}
              className="dot-wave block h-[clamp(5px,0.7vw,8px)] w-[clamp(5px,0.7vw,8px)] rounded-full bg-oak transition-[opacity,transform] duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "scale(1)" : "scale(0)",
                transitionDelay: `${d * 22}ms`,
                animationDelay: `${d * 90}ms`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/** A chain of steps; chips light up one after another. `struck` renders a crossed-out anti-pattern. */
export function Flow({ steps, struck = false, size = "md" }: { steps: string[]; struck?: boolean; size?: "md" | "sm" }) {
  return (
    <ol className={`flex flex-wrap items-center gap-x-2 gap-y-2.5 max-sm:justify-center ${size === "sm" ? "text-[12px]" : "text-[13.5px]"}`}>
      {steps.map((s, i) => (
        <motion.li
          key={s}
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.12 }}
        >
          <span
            className={`rounded-full border px-3 py-1.5 ${
              struck ? "border-mist/10 text-mist/35 line-through decoration-mist/40" : i === steps.length - 1 ? "border-oak bg-oak text-ink" : "border-mist/20 text-mist/80"
            }`}
          >
            {s}
          </span>
          {i < steps.length - 1 && <ArrowRight className={`h-3.5 w-3.5 ${struck ? "text-mist/20" : "text-oak/70"}`} aria-hidden="true" />}
        </motion.li>
      ))}
    </ol>
  );
}

/** Steps arranged on a ring with a highlight that keeps travelling round it. */
export function Loop({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 1100);
    return () => clearInterval(t);
  }, [inView, reduce, steps.length]);

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="50" cy="50" r="38" fill="none" strokeWidth="0.4" strokeDasharray="1 1.6" className="stroke-mist/25" />
        <motion.circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          strokeWidth="0.8"
          strokeLinecap="round"
          className="stroke-oak"
          style={{ rotate: -90, transformOrigin: "50% 50%" }}
          animate={{ pathLength: (active + 1) / steps.length }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] italic leading-none text-mist">{steps[active]}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist/40">
            {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </p>
        </div>
      </div>
      <ol aria-label="Product loop">
        {steps.map((s, i) => {
          const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <li
              key={s}
              className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10.5px] transition-colors duration-500 sm:text-[11.5px] ${
                i === active ? "border-oak bg-oak text-ink" : i < active ? "border-oak/40 bg-graphite text-mist/80" : "border-mist/15 bg-graphite text-mist/55"
              }`}
              style={{ left: `${50 + Math.cos(angle) * 38}%`, top: `${50 + Math.sin(angle) * 38}%` }}
            >
              {s}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Several inputs converging on one output: lines draw in, then a dash keeps flowing toward the result. */
export function Converge({ inputs, output, detail }: { inputs: string[]; output: string; detail?: string }) {
  const n = inputs.length;
  const result = (
    <div className="rounded-2xl border border-oak/60 bg-oak/10 px-4 py-4 sm:px-5">
      <p className="text-[14px] font-medium leading-snug text-mist sm:text-[15px]">{output}</p>
      {detail && <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-oak">{detail}</p>}
    </div>
  );
  return (
    <>
      {/* Narrow screens: inputs wrap, then one flowing connector down into the result */}
      <div className="sm:hidden">
        <ul className="flex flex-wrap justify-center gap-2">
          {inputs.map((label) => (
            <li key={label} className="rounded-full border border-mist/15 px-3 py-1 text-[12px] text-mist/70">
              {label}
            </li>
          ))}
        </ul>
        <svg viewBox="0 0 20 48" className="mx-auto my-1 h-12 w-5" aria-hidden="true">
          <path d="M10 0 V48" strokeWidth="1.5" strokeDasharray="3 6" className="flow-dash stroke-oak/80" />
        </svg>
        {result}
      </div>
      <div className="hidden h-[248px] grid-cols-[minmax(0,auto)_minmax(48px,1fr)_minmax(0,auto)] items-stretch sm:grid">
        <ul className="flex flex-col justify-around">
          {inputs.map((label, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="w-fit whitespace-nowrap rounded-full border border-mist/15 px-3 py-1 text-[12px] text-mist/70 sm:text-[12.5px]"
            >
              {label}
            </motion.li>
          ))}
        </ul>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
          {inputs.map((label, i) => {
            const y = ((i + 0.5) / n) * 100;
            const d = `M0 ${y} C 55 ${y}, 45 50, 100 50`;
            return (
              <g key={label}>
                <motion.path
                  d={d}
                  fill="none"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  className="stroke-mist/20"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.08 }}
                />
                <path d={d} fill="none" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeDasharray="3 9" className="flow-dash stroke-oak/80" />
              </g>
            );
          })}
        </svg>
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
        >
          {result}
        </motion.div>
      </div>
    </>
  );
}

/** Money moving from one bucket to another, with the amount riding the arc. */
export function Realloc({ amount, from, to }: { amount: string; from: string; to: string }) {
  return (
    <div className="relative grid grid-cols-[1fr_1.4fr_1fr] items-center gap-2">
      <div className="rounded-2xl border border-mist/15 px-4 py-5 text-center text-[13px] leading-snug text-mist/55">{from}</div>
      <div className="relative h-24">
        <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M0 60 C 60 0, 140 0, 200 60" fill="none" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="stroke-mist/15" />
          <path d="M0 60 C 60 0, 140 0, 200 60" fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="4 8" className="flow-dash stroke-oak" />
        </svg>
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 whitespace-nowrap rounded-full bg-oak px-3 py-1 text-sm font-medium text-ink">{amount}</span>
      </div>
      <div className="rounded-2xl border border-oak/50 bg-oak/10 px-4 py-5 text-center text-[13px] leading-snug text-mist">{to}</div>
    </div>
  );
}

/** Cards stacked in depth that fan out into a pipeline when they scroll into view. */
export function Pipeline3D({ steps }: { steps: { icon: React.ReactNode; label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Narrow screens fan the deck into a 3-wide grid instead of one long row.
  const n = steps.length;
  const narrow = width < 560;
  const perRow = narrow ? 3 : n;
  const rows = Math.ceil(n / perRow);
  const cardW = narrow ? Math.min(104, (width - 16) / 3) : 138;
  const cardH = cardW * 1.3;
  const gap = perRow > 1 ? Math.max(0, (width - cardW) / (perRow - 1)) : 0;
  const rowGap = cardH + 14;

  return (
    <div ref={ref} className="relative [perspective:1400px]" style={{ height: narrow ? rows * rowGap + 10 : 250 }}>
      {steps.map((s, i) => {
        const col = i % perRow;
        const row = Math.floor(i / perRow);
        const fanX = col * gap;
        const stackX = (width - cardW) / 2;
        const top = narrow ? row * rowGap + cardH / 2 + 5 : 125;
        return (
          <motion.div
            key={s.label}
            className="absolute flex flex-col justify-between rounded-2xl border border-mist/15 bg-graphite p-3 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] sm:p-4"
            style={{ width: cardW, height: cardH, left: 0, top, marginTop: -cardH / 2, zIndex: i }}
            initial={false}
            animate={
              inView
                ? { x: fanX, z: 0, rotateY: narrow ? -14 : -22, y: narrow ? 0 : Math.sin((i / (n - 1)) * Math.PI) * -14 }
                : { x: stackX + i * 3, z: -i * 40, rotateY: 0, y: (narrow ? -row * rowGap : 0) + i * -4 }
            }
            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.15 + i * 0.09 }}
            whileHover={{ y: -18, rotateY: 0, transition: { duration: 0.35 } }}
          >
            <span className="font-mono text-[10px] text-oak">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-mist/80 [&_svg]:h-5 [&_svg]:w-5 sm:[&_svg]:h-6 sm:[&_svg]:w-6">{s.icon}</span>
            <span className="text-[11px] font-medium leading-tight sm:text-[13px]">{s.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
