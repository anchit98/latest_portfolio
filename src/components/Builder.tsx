"use client";

import { ArrowUpRight, FileText, FileUser, Inbox, PenLine, Send, Timer, UserSearch } from "lucide-react";
import Chapter from "./story/Chapter";
import { Panel, Pipeline3D } from "./story/graphics";
import { PROJECTS, useOpenCaseStudy } from "./Projects";

// JobAppOS facts come from content/anchit-boruah-portfolio-profile.md (section 6.4). No live link was provided.
const JOBAPPOS_FLOW = [
  { icon: <FileText />, label: "Job description" },
  { icon: <FileUser />, label: "Tailored resume" },
  { icon: <PenLine />, label: "Cover letter" },
  { icon: <UserSearch />, label: "Find a contact" },
  { icon: <Send />, label: "Referral email" },
  { icon: <Inbox />, label: "Email ready" },
];
const JOBAPPOS_STACK = [
  { name: "Vercel", icon: "/tech/vercel.svg" },
  { name: "Supabase", icon: "/tech/supabase.svg" },
  { name: "Razorpay", icon: "/tech/razorpay.svg" },
  { name: "OpenAI APIs", icon: "/tech/openai.svg" },
  // Generic email icon: the drafted email can be copied into any mail client.
  { name: "Email", icon: "/tech/email.svg" },
];

export default function Builder() {
  const open = useOpenCaseStudy();

  return (
    <Chapter
      id="builder"
      index={5}
      title="The Builder"
      meta="Now · alongside the day job"
      sticker="Sequel in progress"
      hook="As execution becomes cheaper, product judgment becomes more valuable."
      layout="stacked"
    >
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Featured: JobAppOS */}
        <Panel className="border-oak/40 bg-[radial-gradient(120%_90%_at_0%_0%,rgba(227,178,131,0.14),transparent_55%)] lg:col-span-8">
          <div className="flex flex-wrap items-center gap-3 max-sm:justify-center">
            <span className="rounded-full bg-oak px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink">Featured build</span>
            <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-mist/55">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6fcf97] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6fcf97]" />
              </span>
              Working app
            </span>
          </div>
          <h3 className="mt-6 text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.05em]">JobAppOS</h3>
          <p className="mt-3 max-w-md text-lg text-mist/65">The job application workflow, automated end to end.</p>

          <div className="mt-8">
            <Pipeline3D steps={JOBAPPOS_FLOW} />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 max-sm:justify-center border-t border-mist/10 pt-6">
            <span className="flex items-center gap-3">
              <Timer className="h-5 w-5 text-oak" aria-hidden="true" />
              <span className="text-[15px]">
                <span className="font-medium">~1 min</span> <span className="text-mist/55">end to end, often under 40 s</span>
              </span>
            </span>
            <ul className="flex flex-wrap items-center gap-2 max-sm:justify-center" aria-label="Built with">
              {JOBAPPOS_STACK.map((t) => (
                <li key={t.name} title={t.name} className="grid h-9 w-9 place-items-center rounded-lg bg-daylight">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.icon} alt={t.name} className="h-5 w-5 object-contain" />
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <Panel className="lg:col-span-4">
          <div className="flex flex-1 flex-col justify-between gap-10">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-oak">Live today</p>
              <ul className="mt-4 max-sm:mx-auto max-sm:w-fit max-sm:text-left list-disc space-y-2.5 pl-5 text-[14.5px] text-mist/80 marker:text-oak">
                <li>Sign-up, login and payments</li>
                <li>Emails ready to send from any mail client</li>
                <li>Concurrent pipeline processing</li>
                <li>CV builder with live preview</li>
              </ul>
            </div>
            <div className="border-t border-mist/10 pt-8">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-mist/40">Planned, not live yet</p>
              <ul className="mt-4 max-sm:mx-auto max-sm:w-fit max-sm:text-left list-disc space-y-2.5 pl-5 text-[14.5px] text-mist/50 marker:text-mist/30">
                <li>Autonomous application submission</li>
                <li>End-to-end AI job-search agent</li>
                <li>Application tracking &amp; analytics</li>
              </ul>
            </div>
          </div>
        </Panel>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 max-sm:flex-col max-sm:justify-center">
        <button
          data-cursor="Open"
          onClick={(e) => open(PROJECTS.findIndex((p) => p.id === "AB010"), e.currentTarget)}
          className="group inline-flex items-center gap-3 rounded-full bg-mist py-3 pl-6 pr-3 text-sm font-medium text-ink transition-colors hover:bg-oak"
        >
          Read the JobAppOS case study
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink/10 transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
        <a href="#work" className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist/50 hover:text-mist max-sm:text-center">
          Three more live builds in Proof of work ↓
        </a>
      </div>
    </Chapter>
  );
}
