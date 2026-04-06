"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Project Alpha",
    role: "Lead Product Manager",
    description: "Spearheaded the 0-1 launch of an AI-driven analytics platform. Conducted extensive user interviews, defined the MVP roadmap, and coordinated with a cross-functional team.",
    metric: "+45% User Retention",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Beta Redesign",
    role: "Senior PM",
    description: "Led the complete overhaul of the core user dashboard. Focused on reducing friction in the onboarding flow through iterative A/B testing and quantitative data analysis.",
    metric: "-20% Churn Rate",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Gamma Integration",
    role: "Product Manager",
    description: "Successfully integrated a complex third-party payment gateway into the legacy system. Managed technical tradeoffs and ensured zero downtime during the migration phase.",
    metric: "$2M ARR Unlocked",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Delta Mobile App",
    role: "Mobile PM",
    description: "Launched the flagship iOS and Android applications. Prioritized features based on user feedback loops and established a bi-weekly release cadence that improved app store ratings.",
    metric: "4.8★ App Rating",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
              className="group relative w-[85vw] md:w-[450px] flex-shrink-0 bg-foreground/5 border border-foreground/10 rounded-3xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 shadow-xl snap-center"
              aria-label={`Project: ${project.title}`}
            >
              {/* Image Section (Reduced Size) */}
              <div className="relative h-56 w-full overflow-hidden bg-foreground/10" role="img" aria-label={`Screenshot of ${project.title}`}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
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
  );
}
