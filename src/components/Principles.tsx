"use client";

import { motion } from "framer-motion";
import Chapter from "./story/Chapter";
import { Panel, Flow } from "./story/graphics";

const EASE = [0.16, 1, 0.3, 1] as const;

// The five principles from the profile (section 9), each told with a small diagram.
const PROOF = ["Savings", "Adoption", "Retention", "Quality / CSAT", "Business outcome"];
const AUTONOMY = [
  { name: "Automation", when: "Predictable workflow" },
  { name: "LLM workflow", when: "Needs language" },
  { name: "Agent", when: "Dynamic, multi-step" },
];

export default function Principles() {
  return (
    <Chapter id="principles" index={9} title="How I work" meta="Five principles" hook="What the work has taught me.">
      <Panel className="sm:col-span-2" caption="01 · Problem before technology">
        <div className="space-y-4">
          <Flow steps={["Problem", "Evidence", "Experiment", "Product"]} />
          <Flow steps={["AI", "Feature", "Product"]} struck size="sm" />
        </div>
      </Panel>

      <Panel caption="02 · Data over hierarchy">
        <div className="flex flex-1 flex-col justify-center gap-3">
          <p className="w-fit rounded-2xl rounded-bl-sm max-sm:mx-auto border border-mist/10 px-4 py-2.5 text-[14px] text-mist/35 line-through decoration-mist/40">
            “I don&apos;t think we should do this.”
          </p>
          <p className="ml-auto w-fit rounded-2xl rounded-br-sm max-sm:mr-auto bg-oak px-4 py-2.5 text-[14px] font-medium text-ink">“Here is what the data suggests.”</p>
        </div>
      </Panel>

      <Panel caption="03 · Hours saved isn't proof. Adoption is.">
        <div className="flex h-36 items-end gap-2" aria-label={`Proof hierarchy: ${PROOF.join(", ")}`}>
          {PROOF.map((step, i) => (
            <div key={step} className="flex flex-1 flex-col items-center gap-2">
              <motion.div
                className={`w-full rounded-t-md ${i === PROOF.length - 1 ? "bg-oak" : "bg-mist/20"}`}
                initial={{ height: 0 }}
                whileInView={{ height: `${28 + i * 22}px` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.12 }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          {PROOF.map((step) => (
            <span key={step} className="flex-1 text-center text-[10px] leading-tight text-mist/50">
              {step}
            </span>
          ))}
        </div>
      </Panel>

      <Panel caption="04 · AI speeds it up. I still decide.">
        <div className="grid grid-cols-2 gap-5 text-[13.5px]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist/40">AI speeds up</p>
            <ul className="mt-3 max-sm:mx-auto max-sm:w-fit max-sm:text-left list-disc space-y-1.5 pl-4 text-mist/60 marker:text-mist/30">
              <li>Research</li>
              <li>Documentation</li>
              <li>Prototyping</li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-oak">I decide</p>
            <ul className="mt-3 max-sm:mx-auto max-sm:w-fit max-sm:text-left list-disc space-y-1.5 pl-4 text-mist/90 marker:text-oak">
              <li>What&apos;s worth solving</li>
              <li>What not to build</li>
              <li>Where autonomy stops</li>
            </ul>
          </div>
        </div>
      </Panel>

      <Panel caption="05 · Use the least autonomous system that reliably works">
        <div className="relative pt-2">
          <div className="absolute left-0 right-0 top-[19px] h-px bg-gradient-to-r from-oak via-mist/25 to-mist/10" />
          <ol className="relative grid grid-cols-3">
            {AUTONOMY.map((a, i) => (
              <li key={a.name} className="flex flex-col items-start max-sm:items-center">
                <motion.span
                  className={`h-[22px] w-[22px] rounded-full border-2 ${i === 0 ? "border-oak bg-oak" : "border-mist/30 bg-graphite"}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                />
                <span className={`mt-3 text-[13.5px] font-medium ${i === 0 ? "text-mist" : "text-mist/70"}`}>{a.name}</span>
                <span className="mt-0.5 text-[11.5px] leading-snug text-mist/45">{a.when}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-mist/35">More autonomy →</p>
        </div>
      </Panel>
    </Chapter>
  );
}
