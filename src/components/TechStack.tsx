"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Database } from "lucide-react";
import Chapter from "./story/Chapter";

type Tool = { name: string; icon: string | null };

// Grouped by where each tool sits in the build workflow (profile section 8). SQL has no brand mark, so it gets a glyph.
const STAGES: { stage: string; tools: Tool[] }[] = [
  {
    stage: "Research & discovery",
    tools: [
      { name: "Claude", icon: "/tech/claude.svg" },
      { name: "Gemini", icon: "/tech/gemini.svg" },
      { name: "ChatGPT", icon: "/tech/openai.svg" },
    ],
  },
  {
    stage: "Ideation & mapping",
    tools: [
      { name: "Miro", icon: "https://cdn.simpleicons.org/miro/050038" },
      { name: "Whimsical", icon: "/tech/whimsical.webp" },
      { name: "Microsoft Visio", icon: "/tech/visio.webp" },
    ],
  },
  {
    stage: "Design",
    tools: [
      { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
      { name: "Google Stitch", icon: "/tech/stitch.webp" },
      { name: "Google Whisk", icon: "/tech/whisk.webp" },
    ],
  },
  {
    stage: "Prototype & build",
    tools: [
      { name: "Cursor", icon: "/tech/Cursor_logo.webp" },
      { name: "Google Antigravity", icon: "/tech/Antigravity.webp" },
      { name: "Lovable", icon: "/tech/lovable.webp" },
    ],
  },
  {
    stage: "Model layer",
    tools: [
      { name: "OpenAI APIs", icon: "/tech/openai.svg" },
      { name: "Groq", icon: "/tech/groq.svg" },
      { name: "Google AI Studio", icon: "https://cdn.simpleicons.org/googlegemini/8E75E8" },
    ],
  },
  {
    stage: "Integrate",
    tools: [
      { name: "MCP", icon: "/tech/mcp.svg" },
      { name: "Gmail", icon: "/tech/gmail.svg" },
      { name: "Google Docs", icon: "/tech/googledocs.svg" },
    ],
  },
  {
    stage: "Ship & run",
    tools: [
      { name: "Vercel", icon: "/tech/vercel.svg" },
      { name: "Render", icon: "/tech/render.svg" },
      { name: "GitHub Actions", icon: "/tech/githubactions.svg" },
      { name: "Supabase", icon: "/tech/supabase.svg" },
      { name: "Razorpay", icon: "/tech/razorpay.svg" },
      { name: "Hostinger", icon: "/tech/hostinger.svg" },
      { name: "Google Cloud", icon: "https://cdn.simpleicons.org/googlecloud/4285F4" },
    ],
  },
  {
    stage: "Deliver & measure",
    tools: [
      { name: "Jira", icon: "https://cdn.simpleicons.org/jira/0052CC" },
      { name: "Wrike", icon: "/tech/Wrike.webp" },
      { name: "Power BI", icon: "/tech/powerBI.webp" },
      { name: "SQL", icon: null },
      { name: "Google Analytics", icon: "https://cdn.simpleicons.org/googleanalytics/E37400" },
      { name: "Microsoft Office", icon: "/tech/office.webp" },
    ],
  },
];

export default function TechStack() {
  const gridRef = useRef<HTMLOListElement>(null);

  // One spotlight for the whole grid: each stage reads the pointer position from CSS variables.
  const onMove = (e: React.PointerEvent) => {
    const grid = gridRef.current;
    if (!grid) return;
    for (const cell of grid.children as HTMLCollectionOf<HTMLElement>) {
      const r = cell.getBoundingClientRect();
      cell.style.setProperty("--x", `${e.clientX - r.left}px`);
      cell.style.setProperty("--y", `${e.clientY - r.top}px`);
    }
  };

  return (
    <Chapter id="toolkit" index={8} title="What I build with" meta="My kit, stage by stage" hook="What I open at each step of my own work. The tools change; the workflow stays disciplined." layout="stacked">
      <ol
        ref={gridRef}
        onPointerMove={onMove}
        className="grid gap-px overflow-hidden rounded-[22px] border border-mist/10 bg-mist/10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {STAGES.map((s, si) => (
          <motion.li
            key={s.stage}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 0.7, delay: (si % 4) * 0.08 }}
            className="group relative bg-graphite p-6"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(240px circle at var(--x) var(--y), rgba(227,178,131,0.13), transparent 70%)" }}
            />
            <p className="relative flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.18em] max-sm:justify-center">
              <span className="text-oak">{String(si + 1).padStart(2, "0")}</span>
              <span className="text-mist/55">{s.stage}</span>
            </p>
            <ul className="relative mt-5 space-y-2.5">
              {s.tools.map((t) => (
                <li key={t.name} className="flex items-center gap-3 text-[14px] text-mist/80 max-sm:justify-center">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-daylight">
                    {t.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.icon} alt="" loading="lazy" className="h-[18px] w-[18px] object-contain" />
                    ) : (
                      <Database className="h-[18px] w-[18px] text-ink" aria-hidden="true" />
                    )}
                  </span>
                  {t.name}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </Chapter>
  );
}
