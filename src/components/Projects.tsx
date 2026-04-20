"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ProjectType = {
  id: string;
  title: string;
  role: string;
  description: string;
  metric: string;
  image: string;
  fullDescription: string;
  features: string[];
  tools: string[];
  downloadUrl?: string;
  downloadText?: string;
  downloads?: { url: string; text: string }[];
};

export const PROJECTS: ProjectType[] = [
  {
    id: "AB001",
    title: "Reducing Customer Support Load",
    role: "Swiggy-Case Study",
    description: "Reduced customer support ticket dependency at Swiggy by identifying issue drivers and defining product levers for lower agent needs and cost savings.",
    metric: "Efficiency-Driven Cost Savings",
    image: "/projects/Swiggy Case Study_KPI Tree.webp",
    fullDescription: "Swiggy's Customer Support Optimization initiative was conceived to address the rising volume of support tickets impacting customer experience and operational costs. By leveraging data-driven guesstimate and root cause analysis, I modeled support demand at scale and identified key drivers of customer complaints. This enabled me to map core business outcomes; reducing support tickets, minimizing agent dependency, and driving cost savings to targeted product outcomes such as lowering issue rates and improving average resolution time.",
    features: [
      "Identified that even a small % of order issues at scale drives massive support ticket volume.",
      "Discovered that reducing issue rate has a significantly higher impact than optimizing support capacity.",
      "Established average handling time as a critical lever influencing agent headcount requirements.",
      "Quantified that targeted product interventions can reduce support dependency and unlock substantial cost savings."
    ],
    tools: ["Whimsical", "Guesstimate", "Product Sense", "Product Thinking"],
    // To add a downloadable file (PDF, PPTX, etc.):
    // 1. Drop your file in the 'public/files/' folder.
    // 2. Add the path here (e.g. "/files/Case Study_Swiggy.pdf"). Leave empty "" to hide the button and preview.
    downloadUrl: "/files/Case Study_Swiggy.pdf",
    downloadText: "Download Full Case Study"
  },
  {
    id: "AB002",
    title: "Scaling Platform Users",
    role: "Peppo-Case Study",
    description: "Led a growth-focused product strategy for Peppo by identifying high-value user segments through behavioral and demographic analysis.",
    metric: "Growth Promoting Segmentation",
    image: "/projects/Peppo User Segmentation.webp",
    fullDescription: "Peppo's growth strategy was redefined to address declining retention and rising customer acquisition costs despite strong top-of-funnel performance. By leveraging behavioral, demographic, and acquisition data, I developed a structured segmentation model to identify high-value user cohorts and uncover key drivers of retention and churn. This enabled mapping critical business goals—improving retention, reducing CAC inefficiencies, and increasing LTV—to actionable product and growth levers such as personalization, pricing experimentation, and content expansion. My role involved defining segmentation axes, designing a mixed-method user research plan (quantitative and qualitative), and translating insights into a focused growth strategy. The approach emphasized prioritizing high-intent user segments, refining acquisition channels, and aligning product experience with user motivations to drive sustainable growth.",
    features: [
      "Identified high-intent user segments through behavioral and demographic analysis.",
      "Designed a mixed-method research framework combining quantitative and qualitative methods.",
      "Defined actionable product and growth levers to improve retention and reduce CAC.",
      "Prioritized high-intent segments and refined acquisition channels to drive sustainable growth."
    ],
    tools: ["Data Cleaning", "User Segmentation", "Analytics", "Strategic Thinking"],
    // Use the downloads array for multiple files
    downloads: [
      { url: "/files/Peppo_Problem Statement.docx", text: "Download Problem Statement" },
      { url: "/files/Cracking Growth at Peppo_Working Document.xlsx", text: "Download Solution Document" }
    ]
  },
  {
    id: "AB003",
    title: "Increasing Voice Usage_PRD",
    role: "ChatGPT-Case Study",
    description: "Led a product initiative to improve adoption of ChatGPT's conversational feature by addressing discoverability and onboarding gaps documented into a detailed PRD.",
    metric: "Product Impact Unlocked",
    image: "/projects/GPT Wireframes.webp",
    fullDescription: "ChatGPT's conversational feature, despite strong technical capabilities, remained significantly underutilized due to poor discoverability and lack of guided onboarding. This project focused on identifying adoption funnel drop-offs and solving for awareness-to-usage gaps among high-value user segments such as working professionals. By analyzing user behavior, competitive benchmarks, and adoption metrics, I mapped business goals—improving feature adoption, engagement, and retention—to targeted product interventions.",
    features: [
      "Identified awareness-to-usage gaps in the voice feature adoption funnel.",
      "Analyzed user behavior, competitive benchmarks, and adoption metrics to identify root causes.",
      "Mapped business goals—improving feature adoption, engagement, and retention—to targeted product interventions.",
      "Authored a comprehensive PRD with actionable recommendations for product and growth teams."
    ],
    tools: ["Whimsical", "ChatGPT", "Prioritization", "RICE Framework"],
    downloadUrl: "/files/Increasing ChatGPT's Voice Tech Usage_PRD.pdf",
    downloadText: "Download Full PRD"
  },
];

export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 600 : 320;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section
        id="work"
        className="relative w-full bg-background py-32 overflow-hidden border-t border-foreground/5 z-20"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 text-center md:text-left px-4 md:px-0">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter drop-shadow-md text-foreground">
                Projects & Case Studies
              </h2>
              <p className="text-lg mt-4 font-light text-foreground/60 max-w-lg mx-auto md:mx-0">
                Real problems. Real impact. Browse through a few pivotal projects & case studies that I have worked on.
              </p>
            </div>

            {/* Nav Buttons */}
            <div className="flex gap-4 pm-zone">
              <button
                onClick={() => scroll("left")}
                className="p-3 rounded-full border border-foreground/20 hover:bg-foreground/5 text-foreground transition-all"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-3 rounded-full border border-foreground/20 hover:bg-foreground/5 text-foreground transition-all"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Gallery */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto no-scrollbar pb-12 pm-zone pt-8 scroll-smooth snap-x snap-mandatory"
            role="region"
            aria-label="Projects Gallery"
          >
            {PROJECTS.map((project, idx) => (
              <article
                key={idx}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer pm-glass-hover w-[85vw] md:w-[450px] flex-shrink-0 bg-foreground/5 border border-foreground/10 rounded-3xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 shadow-xl snap-center"
                aria-label={`Project: ${project.title}`}
              >
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden bg-foreground/10" role="img" aria-label={`Screenshot of ${project.title}`}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                  {/* View Details Hint */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium tracking-widest uppercase text-xs border border-white/30 rounded-full px-4 py-2 backdrop-blur-sm">View Case Study</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col justify-between h-[300px]">
                  <div>
                    <div className="mb-4 inline-block w-fit rounded-full bg-foreground/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground/70">
                      {project.role}
                    </div>

                    <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                      {project.title}
                    </h3>

                    <p className="text-sm font-light leading-relaxed text-foreground/70 line-clamp-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-sm font-bold text-green-500 mt-6 pt-6 border-t border-foreground/10" aria-label={`Impact metric: ${project.metric}`}>
                    <span className="h-[2px] w-6 bg-green-500 rounded-full" aria-hidden="true" />
                    {project.metric}
                  </div>
                </div>
              </article>
            ))}
            {/* Empty spacer for the end of the scroll */}
            <div className="w-[10vw] flex-shrink-0" aria-hidden="true" />
          </div>

        </div>
      </section>

      {/* Modern Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-12 md:px-12 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl max-h-[90vh] md:max-h-[85vh] bg-background border border-foreground/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] rounded-[2rem] overflow-hidden flex flex-col cursor-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-3 bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors active:scale-95 pm-glass-hover shadow-lg"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar pm-zone">
                {/* Hero Header contained inside the scroll view */}
                <div className="relative w-full h-64 md:h-[40vh] shrink-0 bg-foreground/5">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${selectedProject.image}')` }}
                  />
                  {/* Vignette to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                  <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-10 pr-6">
                    <div className="mb-3 md:mb-4 inline-block rounded-full bg-foreground/10 backdrop-blur-md border border-foreground/10 px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground">
                      {selectedProject.role}
                    </div>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground drop-shadow-sm leading-tight">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Modal Body Content */}
                <div className="p-6 md:p-12">
                  <div className="flex items-center gap-4 text-sm md:text-base font-bold text-green-500 mb-8 border border-green-500/20 bg-green-500/5 px-6 py-4 rounded-2xl w-fit">
                    <span className="h-[2px] w-6 bg-green-500 rounded-full" />
                    Impact: {selectedProject.metric}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 md:gap-20">

                    {/* Left Column: Descriptions */}
                    <div className="space-y-12">
                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4">The Challenge & The Work</h4>
                        <p className="text-base md:text-lg text-foreground/80 font-light leading-relaxed">
                          {selectedProject.fullDescription}
                        </p>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-6">Key Discoveries & Outcomes</h4>
                        <ul className="space-y-4">
                          {selectedProject.features.map((feature, i) => (
                            <li key={i} className="flex flex-start gap-4 text-base text-foreground/80 font-light bg-foreground/5 p-4 rounded-2xl">
                              <span className="w-1.5 h-1.5 mt-2 shrink-0 rounded-full bg-emerald-500" />
                              <span className="leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>

                    {/* Right Column: Metadata */}
                    <div>
                      <div className="sticky top-6">
                        <section className="mb-10 p-6 rounded-2xl border border-foreground/10 bg-foreground/5">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4">Tech & Tools</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.tools.map((tool, i) => (
                              <span key={i} className="px-3 py-1.5 bg-background border border-foreground/10 rounded-lg text-xs font-medium text-foreground/80 shadow-sm">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </section>

                        {/* Download Block(s) */}
                        <div className="mt-6 flex flex-col gap-3">
                          {selectedProject.downloadUrl && (
                            <a
                              href={selectedProject.downloadUrl}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between w-full p-4 bg-foreground text-background rounded-2xl text-sm font-bold hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-md pm-glass-hover"
                            >
                              {selectedProject.downloadText || "Download File"}
                              <div className="bg-background/20 rounded-full p-2 group-hover:bg-white/20 transition-colors">
                                <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                              </div>
                            </a>
                          )}
                          {selectedProject.downloads?.map((dl, i) => (
                            <a
                              key={i}
                              href={dl.url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between w-full p-4 bg-foreground text-background rounded-2xl text-sm font-bold hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-md pm-glass-hover"
                            >
                              {dl.text}
                              <div className="bg-background/20 rounded-full p-2 group-hover:bg-white/20 transition-colors">
                                <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
