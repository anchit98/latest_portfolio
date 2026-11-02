"use client";

import { GraduationCap } from "lucide-react";
import Chapter from "./story/Chapter";
import { Panel, BigStat, Bars, Ring, DotField, Flow, Loop, Converge, Realloc } from "./story/graphics";

// Facts and figures come from content/anchit-boruah-portfolio-profile.md. Keep them in sync.
export const CAREER_DATA = [
  {
    year: "Jan'20 - Apr'22",
    role: "Sales Analyst",
    company: "Servetel Communications",
    location: "Gurugram",
    logo: "/logos/Servetel.webp",
    logoColor: "bg-[#ffffff]",
    description: "Analyzed user behavior, campaign performance, marketing channels, competitor activity and budget allocation. Recommended reallocating ~INR 2 Cr+ of marketing spend toward higher-performing segments, and market research whose recommendations contributed to a 230% increase in sales within 6 months.",
  },
  {
    year: "Apr'22 - Mar'24",
    role: "Product Manager & Analyst",
    company: "Annalect India",
    location: "Bengaluru",
    logo: "/logos/annalect.webp",
    logoColor: "bg-[#ffffff]",
    description: "Managed product strategy and execution of multiple AI automations that saved ~INR 50 Cr+ and 176,000+ hours. Directed the move from manual tracking to Jira (~40% efficiency gain), introduced RTM and quality-first frameworks (~70% fewer defects, bug-free releases for products worth ~INR 7 Cr+), and suggested UI/UX changes across 3 major products worth ~INR 4 Cr+.",
  },
  {
    year: "Mar'24 - Present",
    role: "Senior Product Manager & Analyst",
    company: "WPP Media",
    location: "Bengaluru",
    logo: "/logos/wpp.webp",
    logoColor: "bg-[#ffffff]",
    description: "Supervises product discovery for 250+ internal automation initiatives (~33,000+ hours and ~INR 10 Cr+ saved, 30% FTE savings), revamped the automation intake pipeline with LLM-generated BRDs and SOWs (~70% faster intake-to-handoff, 100% org-wide acceptance), led the Meta Campaign Activation automation, and owns sprint planning and capacity for a team of 18.",
  },
];

const [servetel, annalect, wpp] = CAREER_DATA;
const roleOf = (c: (typeof CAREER_DATA)[number]) => ({ title: c.role, company: c.company, logo: c.logo });

export default function Career() {
  return (
    <>
      <Chapter
        id="story"
        index={0}
        title="Roots"
        meta="2016 → 2020 · Dehradun"
        sticker="Prologue"
        hook="Science first, engineering next. Product came later."
      >
        <Panel className="sm:col-span-2" caption="University of Petroleum & Energy Studies, Dehradun · 2016 to 2020">
          <div className="flex flex-wrap items-end justify-between gap-6 max-sm:flex-col max-sm:items-center">
            <div>
              <GraduationCap className="h-8 w-8 text-oak max-sm:mx-auto" aria-hidden="true" />
              <p className="mt-5 text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-[1.02] tracking-[-0.035em]">B.Tech, Petroleum Engineering</p>
              <p className="mt-3 inline-flex w-fit rounded-full border border-mist/15 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-mist/50">
                Not computer science
              </p>
            </div>
            <p className="text-[13px] text-mist/45">Before that: HSSLC Science, NPS Guwahati · 94%, top 5%</p>
          </div>
        </Panel>
        <Panel className="sm:col-span-2" caption="The route from there">
          <Flow steps={["Petroleum Engineering", "Sales analytics", "Business analysis", "Product Management", "Enterprise automation", "AI Product Management", "Hands-on AI building"]} />
        </Panel>
      </Chapter>

      <Chapter id="analyst" index={1} title="The Analyst" meta="2020 → 2022 · Gurugram" sticker="Origin story" role={roleOf(servetel)} hook="Where I learned to follow the evidence.">
        <Panel className="sm:col-span-2" caption="What I analysed → what it fed">
          <Converge
            inputs={["User behavior", "Campaign performance", "Marketing channels", "Competitor activity", "Industry trends"]}
            output="Spend & growth recommendations"
            detail="Incl. FY22-23 market forecast"
          />
        </Panel>
        <Panel className="sm:col-span-2" caption="Decision 1 · marketing spend reallocated">
          <Realloc amount="₹2 Cr+" from="Lower-performing segments" to="Higher-performing segments" />
        </Panel>
        <Panel className="sm:col-span-2" caption="Decision 2 · sales in the 6 months after · my research and recommendations contributed">
          <div className="grid items-end gap-8 sm:grid-cols-[auto_1fr] sm:gap-12">
            <BigStat value={230} prefix="+" suffix="%" label="Sales increase" />
            <Bars
              rows={[
                { label: "Before", value: 1, display: "1×" },
                { label: "6 months later", value: 3.3, display: "3.3×", accent: true },
              ]}
            />
          </div>
        </Panel>
      </Chapter>

      <Chapter
        id="pm"
        index={2}
        title="The Product Manager"
        meta="2022 → 2024 · Bengaluru"
        sticker="Plot twist"
        role={roleOf(annalect)}
        hook="From analysing products to owning them."
      >
        <Panel caption="Saved through AI automations">
          <BigStat value={50} prefix="₹" suffix=" Cr+" label="Collective savings" />
        </Panel>
        <Panel caption="≈ 20 years of round-the-clock work (calculated)">
          <BigStat value={176000} suffix="+" label="Hours saved" />
        </Panel>
        <Panel caption="RTM + quality-first frameworks">
          <Bars
            rows={[
              { label: "Defects before", value: 100, display: "100" },
              { label: "Defects after", value: 30, display: "~30", accent: true },
            ]}
          />
        </Panel>
        <Panel caption="Manual tracking → Jira">
          <Bars
            rows={[
              { label: "Efficiency before", value: 100, display: "1.0×" },
              { label: "After the Jira move", value: 140, display: "~1.4×", accent: true },
            ]}
          />
        </Panel>
        <Panel className="sm:col-span-2" caption="Quality and usability">
          <div className="grid grid-cols-2 gap-6">
            <BigStat size="sm" value={7} prefix="₹" suffix=" Cr+" label="Worth of products shipped bug-free" />
            <BigStat size="sm" value={3} label="Products redesigned (UI/UX, ~₹4 Cr+)" />
          </div>
        </Panel>
      </Chapter>

      <Chapter
        id="aipm"
        index={3}
        title="The AI Product Manager"
        meta="2024 → now · Bengaluru"
        sticker="Level up"
        role={roleOf(wpp)}
        hook="Discovery at enterprise scale, with LLMs inside the workflow."
      >
        <Panel className="sm:col-span-2" caption="Automation initiatives taken through product discovery · one dot each">
          <DotField count={250} />
          <div className="mt-2 grid grid-cols-2 gap-6 border-t border-mist/10 pt-6 md:grid-cols-4">
            <BigStat size="sm" value={250} suffix="+" label="Initiatives" />
            <BigStat size="sm" value={33000} suffix="+" label="Hours saved" />
            <BigStat size="sm" value={10} prefix="₹" suffix=" Cr+" label="Estimated savings" />
            <BigStat size="sm" value={88} suffix="%+" label="Stakeholder alignment" />
          </div>
        </Panel>
        <Panel caption="Intake pipeline revamp · 100% org-wide acceptance">
          <Bars
            rows={[
              { label: "Intake → handoff, before", value: 100, display: "1.0×" },
              { label: "With LLM-generated BRDs & SOWs", value: 30, display: "~0.3×", accent: true },
            ]}
          />
          <ul className="mt-6 max-sm:list-inside max-sm:pl-0 list-disc space-y-1 pl-5 text-[13px] text-mist/65 marker:text-oak">
            <li>LLM-written BRDs and SOWs</li>
            <li>Auto-scheduled discovery calls</li>
            <li>Automated status updates</li>
          </ul>
        </Panel>
        <Panel caption="Post-launch health across delivered products · churn 8 to 10%">
          <div className="grid flex-1 grid-cols-3 items-center gap-2">
            <Ring value={80} label="Adoption" size={84} />
            <Ring value={90} label="Retention" size={84} />
            <Ring value={88} label="CSAT" size={84} />
          </div>
        </Panel>
        <Panel caption="Meta Campaign Activation · zero-touch setup for the India team">
          <div className="grid grid-cols-3 gap-4">
            <BigStat size="sm" value={35} suffix="%" label="FTE savings" />
            <BigStat size="sm" value={86} suffix="%" label="CSAT" />
            <BigStat size="sm" value={1.5} prefix="₹" suffix=" Cr+" label="A year" />
          </div>
        </Panel>
        <Panel caption="Sprint planning & capacity · Wrike">
          <div className="grid grid-cols-2 gap-4">
            <BigStat size="sm" value={18} label="Team members" />
            <BigStat size="sm" value={30} prefix="+" suffix="%" label="Utilization" />
          </div>
        </Panel>
        <Panel className="sm:col-span-2" caption="How I run product now">
          <Loop steps={["Problem", "Discovery", "Prioritization", "Definition", "Build", "Adoption", "Measurement", "Iteration"]} />
        </Panel>
      </Chapter>
    </>
  );
}
