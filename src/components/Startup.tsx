"use client";

import { ArrowDown, Store, Users } from "lucide-react";
import Chapter from "./story/Chapter";
import { Panel, Converge, Flow } from "./story/graphics";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

// Framed as product support that showcases PM craft, not as a venture Anchit is pursuing. The company is never named. Facts are the ones Anchit supplied (Nov 2025 start, 20 to 25 merchant
// interviews, the three needs, the scope of work). Nothing about launch, users or revenue until it is true.
const STARTUP = {
  pitch: "A merchant-first loyalty and discovery app for offline businesses in Bengaluru.",
  status: "Pre-launch",
};

const PATHS = ["M4 18 C 40 10, 70 40, 112 44", "M4 44 C 40 44, 70 44, 112 46", "M4 70 C 40 78, 70 50, 112 48"];

/**
 * Shoppers (dots) travelling from the neighbourhood into a store: the footfall merchants asked for.
 * An illustration of the idea, not a result. Static dots with reduced motion.
 */
export function FootfallGraphic({ className }: { className?: string }) {
  const reduce = usePrefersReducedMotion();
  return (
    <svg viewBox="0 0 150 88" className={className} aria-hidden="true">
      {PATHS.map((d) => (
        <path key={d} d={d} fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 4" />
      ))}
      {PATHS.flatMap((d, i) =>
        [0, 1].map((k) =>
          reduce ? (
            <circle key={`${i}-${k}`} r="2.6" cx={30 + k * 40} cy={18 + i * 26 + (k ? 6 : 0)} className="fill-oak" />
          ) : (
            <circle key={`${i}-${k}`} r="2.6" className="fill-oak">
              <animateMotion dur={`${2.6 + i * 0.4}s`} begin={`${k * 1.3 + i * 0.35}s`} repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur={`${2.6 + i * 0.4}s`} begin={`${k * 1.3 + i * 0.35}s`} repeatCount="indefinite" />
            </circle>
          )
        )
      )}
      {/* Storefront: awning and door */}
      <g transform="translate(112 22)">
        <path d="M2 12 H34 L30 2 H6 Z" className="fill-oak" />
        <path d="M2 12 q4 5 8 0 q4 5 8 0 q4 5 8 0 q4 5 8 0" fill="none" className="stroke-oak" strokeWidth="1.2" />
        <rect x="4" y="16" width="28" height="30" rx="2" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.4" />
        <rect x="14" y="28" width="8" height="18" fill="currentColor" fillOpacity="0.35" />
      </g>
    </svg>
  );
}

/** Hero teaser: a small card with depth that leans with the pointer and links to the startup chapter. */
export function StartupTeaser({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <a
      href="#startup"
      className={`group relative flex items-center gap-4 rounded-2xl border p-3 pr-5 text-left shadow-[0_24px_50px_-28px_rgba(25,24,27,0.55)] transition-colors [transform-style:preserve-3d] ${
        dark ? "border-oak/30 bg-[#141315] text-mist" : "border-ink/10 bg-daylight/80 text-ink backdrop-blur-sm hover:border-oak-deep/40"
      }`}
    >
      <span className={`grid h-[72px] w-[108px] shrink-0 place-items-center rounded-xl [transform:translateZ(24px)] ${dark ? "bg-graphite text-mist" : "bg-ink text-mist"}`}>
        <FootfallGraphic className="h-14 w-24" />
      </span>
      <span className="min-w-0 [transform:translateZ(12px)]">
        <span className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] ${dark ? "text-oak" : "text-oak-deep"}`}>
          Also in practice · 0 to 1
        </span>
        <span className="mt-1 block text-[15px] font-medium leading-snug">
          Product support for an early-stage loyalty app: 20 to 25 merchant interviews into its flows and UI
        </span>
      </span>
      <ArrowDown className={`h-4 w-4 shrink-0 transition-transform duration-500 group-hover:translate-y-0.5 ${dark ? "text-mist/50" : "text-ink/40"}`} aria-hidden="true" />
    </a>
  );
}

export default function Startup() {
  return (
    <Chapter
      id="startup"
      index={4}
      title="Zero to one"
      meta="Early-stage product · Bengaluru"
      sticker="Product support"
      hook="The same product craft, applied to a pre-launch app: from merchant interviews to flows and UI."
      spotlight
    >
      <Panel className="sm:col-span-2 border-oak/25" caption="The product · name withheld until launch">
        <div className="grid items-center gap-8 sm:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-3 max-sm:justify-center">
              <span className="redacted h-7 w-40 rounded-md" aria-label="Company name withheld" />
              <span className="rounded-full border border-oak/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-oak">{STARTUP.status}</span>
            </div>
            <p className="mt-5 text-[clamp(1.35rem,2vw,1.75rem)] leading-snug tracking-[-0.02em]">{STARTUP.pitch}</p>
            <p className="mt-3 text-[14px] text-mist/55">One product, two sides of the counter: merchants and buyers.</p>
          </div>
          <FootfallGraphic className="mx-auto h-36 w-56 text-mist" />
        </div>
      </Panel>

      <Panel caption="Discovery, before building">
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-[clamp(2.75rem,4.4vw,4.4rem)] font-medium leading-none tracking-[-0.05em]">20 to 25</p>
          <p className="mt-3 text-sm text-mist/55">Merchant interviews I ran</p>
        </div>
      </Panel>

      <Panel caption="Who it's for">
        <ul className="flex flex-1 flex-col justify-center gap-5">
          <li className="flex items-start gap-3 max-sm:flex-col max-sm:items-center">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-oak/15 text-oak">
              <Store className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-medium">Merchants</span>
              <span className="text-[13.5px] text-mist/60">Small offline businesses wanting more footfall</span>
            </span>
          </li>
          <li className="flex items-start gap-3 max-sm:flex-col max-sm:items-center">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-oak/15 text-oak">
              <Users className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-medium">Buyers</span>
              <span className="text-[13.5px] text-mist/60">Local customers rewarded for shopping nearby</span>
            </span>
          </li>
        </ul>
      </Panel>

      <Panel className="sm:col-span-2" caption="What merchants kept asking for, and what it shaped">
        <Converge inputs={["More footfall", "Better conversion", "More revenue"]} output="Value proposition & app flow" detail="Built around these three" />
      </Panel>

      <Panel className="sm:col-span-2" caption="Where I contribute">
        <Flow steps={["Merchant research", "Buyer + merchant flow", "Entire UI design", "End-to-end testing, every feature", "Go-to-market planning"]} />
      </Panel>
    </Chapter>
  );
}
