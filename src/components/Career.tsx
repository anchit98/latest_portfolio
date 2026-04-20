"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const CAREER_DATA = [
  {
    year: "Jan'20 - Apr'22",
    role: "Sales Analyst",
    company: "Servetel Communications",
    logo: "/logos/Servetel.webp",
    logoColor: "bg-[#ffffff]",
    description: "Engineered 20+ automated reporting systems that reduced process time by 85% and reallocated $0.295M in marketing spend. Partnered with cross-functional teams to drive a 30% campaign quality uplift and forecast 230% sales growth within 6 months.",
  },
  {
    year: "Apr'22 - Feb'24",
    role: "Business Analyst",
    company: "Annalect India",
    logo: "/logos/annalect.webp",
    logoColor: "bg-[#ffffff]",
    description: "Drove $5.8M in automation savings and 176K+ work hours reclaimed while elevating product quality through robust QA processes and traceability frameworks. Led Jira migration, PowerBI dashboard development, and UI/UX strategy across projects worth over $1.3M.",
  },
  {
    year: "Feb'24 - Apr'24",
    role: "Business Analyst",
    company: "Manek Consultancy",
    logo: "/logos/manek.webp",
    logoColor: "bg-[#ffffff]",
    description: "Designed and maintained the team's core operating framework, reducing handoff delays while driving an 80% improvement in intake acceptance rates. Partnered with internal and external stakeholders to ensure 100% compliance across all approval signoffs.",
  },
  {
    year: "Apr'24 - Present",
    role: "Sr. Business Analyst",
    company: "WPP Media",
    logo: "/logos/wpp.webp",
    logoColor: "bg-[#ffffff]",
    description: "Scaled automation intake operations across 200+ requests with a 90%+ alignment rate and 50% faster handoffs. Led sprint planning and capacity forecasting for a 15-member team, driving 30% utilization gains through structured Wrike-based workflows.",
  },
];

export default function Career() {
  const [mounted, setMounted] = useState(false);
  const [randomDelays, setRandomDelays] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
    setRandomDelays(CAREER_DATA.map(() => Math.random() * 2));
  }, []);

  return (
    <section
      id="career"
      className="relative w-full bg-background text-foreground py-32 overflow-hidden border-t border-foreground/5 z-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Title area */}
        <div className="mb-24 md:mb-32 text-center md:text-left px-4 md:px-0">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter drop-shadow-md text-foreground">
            My Epic Saga of Doing Things for Money
          </h2>
          <h4 className="mt-4 text-lg font-light text-foreground/60 max-w-lg mx-auto md:mx-0">
            Strategy, discovery, and execution mapped over the years.
          </h4>
        </div>

        {/* Horizontal Static Roadmap */}
        <div className="relative w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-6 mt-16 md:mt-0 pm-zone">

          {/* Continuous background horizontal line (hidden on mobile, visible on desktop) */}
          <div className="hidden md:block absolute left-0 right-0 top-[22px] h-[2px] bg-foreground/10 z-0" />

          {CAREER_DATA.map((item, idx) => {
            const floatDelay = randomDelays[idx] || 0;

            return (
              <article
                key={idx}
                className="relative w-full md:w-1/4 flex-shrink-0 z-10 flex flex-col items-center md:items-start pt-20 md:pt-0 text-center md:text-left"
                aria-label={`Career milestone: ${item.role} at ${item.company}`}
              >

                {/* Floating Logo Bubble (Desktop Top / Mobile Top-Center) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={mounted ? { y: [0, -8, 0] } : {}}
                  whileHover={{ scale: 1.2, rotate: 0 }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
                    scale: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                  className={`absolute top-4 md:-top-16 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-xl backdrop-blur-md flex items-center justify-center border border-foreground/10 ${item.logoColor} z-20 cursor-pointer overflow-hidden p-2`}
                  role="img"
                  aria-label={`${item.company} logo`}
                >
                  <img src={item.logo} alt={`${item.company} branding`} className="w-full h-full object-contain" />
                </motion.div>

                {/* Marker Node on the line */}
                <div className="absolute hidden md:block top-[22px] left-8 w-4 h-4 -ml-2 -mt-2 rounded-full border-[3px] border-background bg-foreground shadow-[0_0_10px_rgba(255,255,255,0.2)] z-10" aria-hidden="true" />

                {/* Content Card */}
                <div className="pt-4 md:pt-16 px-4 md:px-0">
                  <div className="text-xs font-bold text-foreground/40 mb-1 tracking-widest uppercase">
                    <time dateTime={item.year.replace("'", " ")}>{item.year}</time>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 leading-tight">{item.role}</h3>
                  <div className="text-sm font-medium text-foreground/80 mb-3">{item.company}</div>
                  <p className="text-sm text-foreground/60 font-light leading-relaxed md:pr-4 min-h-[100px]">
                    {item.description}
                  </p>
                </div>

              </article>
            );
          })}

        </div>

      </div>
    </section>
  );
}
