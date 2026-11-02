"use client";

import { motion } from "framer-motion";
import { Compass, FlaskConical, Flag, Gauge, Globe, Handshake, Megaphone, Music, Waypoints } from "lucide-react";
import Chapter from "./story/Chapter";

// Co-curricular work, college projects and side projects. Facts are only those Anchit supplied;
// the "skill" and "in product terms" lines are framing, not claims of results.
type Forged = {
  skill: string;
  role: string;
  org: string;
  when: string;
  /** Start and end as fractional years, for the timeline. Undated side projects leave it out. */
  span?: [number, number];
  fact: string;
  product: string;
  Icon: typeof Compass;
  group: "Community & leadership" | "Engineering & systems" | "Built for myself";
};

const FORGED: Forged[] = [
  {
    skill: "Leading without authority",
    role: "President",
    org: "Assamese Association, UPES",
    when: "2017 to 2019",
    span: [2017.17, 2019.17],
    fact: "Led the student association in Dehradun for two years.",
    product: "Volunteers owe you nothing. Alignment has to be earned.",
    Icon: Flag,
    group: "Community & leadership",
  },
  {
    skill: "Speaking to users unlike me",
    role: "AIESEC voluntary intern",
    org: "University of Nottingham Malaysia",
    when: "2018",
    span: [2018.42, 2018.58],
    fact: "Ran seminars and interactive sessions on career options for high-school students in Semenyih, Malaysia.",
    product: "Design for the people in the room, not for yourself.",
    Icon: Globe,
    group: "Community & leadership",
  },
  {
    skill: "Partnering with a lead",
    role: "Vice President",
    org: "Assamese Youth Association",
    when: "2019 to 2020",
    span: [2019.25, 2020.0],
    fact: "A second leadership role in Dehradun, working alongside the president.",
    product: "Back someone else's call, then help make it succeed.",
    Icon: Handshake,
    group: "Community & leadership",
  },
  {
    skill: "Audience growth",
    role: "Social media planner & manager (volunteer)",
    org: "Assam Association Bangalore",
    when: "Since Aug 2026",
    span: [2026.6, 2026.84],
    fact: "Content I created reached 70k+ views in 2 months across Instagram and Facebook.",
    product: "Growth is a loop: publish, measure reach, learn.",
    Icon: Megaphone,
    group: "Community & leadership",
  },
  {
    skill: "Capacity planning",
    role: "Project intern",
    org: "Oil India Limited, Guwahati",
    when: "Jun to Jul 2019",
    span: [2019.42, 2019.58],
    fact: "Worked out the maximum flow of the 653.4 km Numaligarh to Siliguri product pipeline after adding pump stations, and trained across five departments.",
    product: "Find the bottleneck and size the gain before anyone spends.",
    Icon: Gauge,
    group: "Engineering & systems",
  },
  {
    skill: "Systems modelling",
    role: "College project",
    org: "UPES",
    when: "2018 to 2019",
    span: [2018.67, 2019.4],
    fact: "Redesigned India's Kakinada to Bharuch East-West gas pipeline in SIMSCI PIPEPHASE, with a teammate.",
    product: "Model the system before you change it.",
    Icon: Waypoints,
    group: "Engineering & systems",
  },
  {
    skill: "Research rigour",
    role: "College project",
    org: "UPES",
    when: "2019 to 2020",
    span: [2019.58, 2020.66],
    fact: "Researched hydrothermal liquefaction to turn wastewater into bio-oil, in a team of three.",
    product: "Test the idea before believing it.",
    Icon: FlaskConical,
    group: "Engineering & systems",
  },
  {
    skill: "Being my own first user",
    role: "Side project",
    org: "northstar.AI",
    when: "Personal tool",
    fact: "A personal assistant site that gathers tech, AI and PM news, summarises it, and helps with interview prep, outreach and LinkedIn ideas.",
    product: "The fastest feedback loop is the one you live in.",
    Icon: Compass,
    group: "Built for myself",
  },
  {
    skill: "Recommendations",
    role: "Side project",
    org: "Spotify discovery & review intelligence",
    when: "Personal project",
    fact: "Predicts what a listener will like, plus a dashboard that analyses reviews.",
    product: "Personalisation starts with understanding taste.",
    Icon: Music,
    group: "Built for myself",
  },
];

const ALSO = [
  { name: "JobAppOS", skill: "0-to-1 building" },
  { name: "Groww Review Analyzer", skill: "AI agents" },
  { name: "Mutual Fund RAG Chatbot", skill: "Grounding & retrieval" },
  { name: "AI Restaurant Recommender", skill: "Scoping an MVP" },
];

const GROUPS = ["Community & leadership", "Engineering & systems", "Built for myself"] as const;
const EASE = [0.16, 1, 0.3, 1] as const;

/** Gantt view: one row per dated experience, the bar spanning its real duration; the gap is the day job. */
function Timeline() {
  const dated = FORGED.filter((f) => f.span).sort((a, b) => a.span![0] - b.span![0]);
  const from = 2017;
  const to = 2027;
  const pos = (y: number) => ((y - from) / (to - from)) * 100;
  const ROW = 30;
  return (
    <div className="relative hidden md:block" style={{ height: dated.length * ROW + 64 }} aria-hidden="true">
      {/* The day job gets its own row under the bars, so labels can never run into it. */}
      <div
        className="absolute flex h-7 items-center justify-center rounded-md border border-dashed border-mist/15 bg-mist/[0.03]"
        style={{ left: `${pos(2020)}%`, width: `${pos(2026.84) - pos(2020)}%`, top: dated.length * ROW + 4 }}
      >
        <span className="truncate px-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-mist/40">Day job: Servetel → Annalect → WPP Media</span>
      </div>
      {Array.from({ length: to - from + 1 }, (_, i) => from + i).map((y) => (
        <span key={y} className="absolute bottom-0 -translate-x-1/2 font-mono text-[10.5px] text-mist/40" style={{ left: `${pos(y)}%` }}>
          {y}
        </span>
      ))}
      <div className="absolute inset-x-0 bottom-6 h-px bg-mist/15" />
      {dated.map((f, i) => {
        const [a, b] = f.span!;
        const right = pos(a) > 60;
        return (
          <div key={f.skill} className="absolute flex items-center" style={{ top: i * ROW, left: 0, right: 0, height: ROW - 8 }}>
            <motion.span
              className="absolute h-2 origin-left rounded-full bg-oak"
              style={{ left: `${pos(a)}%`, width: `max(10px, ${pos(b) - pos(a)}%)` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.1 }}
            />
            <motion.span
              className="absolute flex items-center gap-1.5 whitespace-nowrap text-[12px] text-mist/70"
              style={right ? { right: `${100 - pos(a)}%`, paddingRight: 10 } : { left: `calc(${pos(b)}% + 10px)` }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
            >
              <f.Icon className="h-3.5 w-3.5 text-oak" />
              {f.skill}
              <span className="hidden text-mist/35 xl:inline">· {f.org}</span>
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}

export default function BeyondWork() {
  return (
    <Chapter
      id="beyond"
      index={6}
      title="Skills forged"
      meta="Beyond the job title · 2017 to now"
      hook="Every role outside work left me with one skill I still use in product."
      layout="stacked"
    >
      <Timeline />

      <div className="mt-12 space-y-12">
        {GROUPS.map((group) => (
          <section key={group} aria-label={group}>
            <h3 className="border-b border-mist/10 pb-4 text-xl font-medium tracking-[-0.02em] max-sm:text-center">{group}</h3>
            <ul className={`mt-5 grid gap-4 md:grid-cols-2 ${({ 4: "lg:grid-cols-4", 3: "lg:grid-cols-3", 2: "lg:grid-cols-2" } as Record<number, string>)[FORGED.filter((f) => f.group === group).length] ?? "lg:grid-cols-4"}`}>
              {FORGED.filter((f) => f.group === group).map((f, i) => (
                <motion.li
                  key={f.skill}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.07 }}
                  className="group relative flex flex-col overflow-hidden rounded-[20px] border border-mist/10 bg-graphite-2/55 p-6 transition-colors duration-500 hover:border-oak/40 max-sm:text-center"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-oak/15 text-oak transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 max-sm:mx-auto">
                    <f.Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-oak">Skill forged</p>
                  <p className="mt-1.5 font-serif text-[1.65rem] italic leading-[1.05]">{f.skill}</p>
                  <p className="mt-4 text-[14px] font-medium leading-snug">{f.role}</p>
                  <p className="text-[13px] text-mist/50">
                    {f.org} · {f.when}
                  </p>
                  <p className="mb-5 mt-3 text-[13.5px] leading-relaxed text-mist/70">{f.fact}</p>
                  <p className="mt-auto border-t border-mist/10 pt-4 text-[13px] italic text-mist/55">{f.product}</p>
                </motion.li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-[20px] border border-mist/10 p-6 max-sm:text-center">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-mist/45">Also on this page, and what each one taught me</p>
        <ul className="mt-4 flex flex-wrap gap-2 max-sm:justify-center">
          {ALSO.map((a) => (
            <li key={a.name} className="rounded-full border border-mist/15 px-3.5 py-1.5 text-[13px] text-mist/75">
              {a.name} <span className="text-mist/35">→</span> <span className="text-oak">{a.skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </Chapter>
  );
}
