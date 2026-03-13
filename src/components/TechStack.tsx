"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Using official SVGs from SimpleIcons CDN for high-quality, colorful icons
const TECH_STACK = [
  { name: "Jira", icon: "https://cdn.simpleicons.org/jira/0052CC" },
  { name: "Wrike", icon: "/tech/Wrike.webp" },
  { name: "Miro", icon: "https://cdn.simpleicons.org/miro/050038" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Whimsical", icon: "/tech/whimsical.webp" },
  { name: "Lovable", icon: "/tech/lovable.webp" },
  { name: "Google AI Studio", icon: "https://cdn.simpleicons.org/googlegemini/8E75E8" },
  { name: "Google Analytics", icon: "https://cdn.simpleicons.org/googleanalytics/E37400" },
  { name: "Google Cloud", icon: "https://cdn.simpleicons.org/googlecloud/4285F4" },
  { name: "Google Stitch", icon: "/tech/stitch.webp" },
  { name: "Google Whisk", icon: "/tech/whisk.webp" },
  { name: "Microsoft Visio", icon: "/tech/visio.webp" },
  { name: "Microsoft Office", icon: "/tech/office.webp" },
  { name: "Power BI", icon: "/tech/powerBI.webp" },
];

export default function TechStack() {
  const [mounted, setMounted] = useState(false);
  const [randomParams, setRandomParams] = useState<any[]>([]);
  const [starParams, setStarParams] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    // Pre-calculate random values for icons to avoid hydration mismatch
    const params = TECH_STACK.map(() => ({
      delay: Math.random() * 2,
      y: Math.random() * 15 + 10,
      duration: 3 + Math.random() * 2
    }));
    setRandomParams(params);

    // Pre-calculate stars
    const stars = [...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5
    }));
    setStarParams(stars);
  }, []);

  return (
    <section className="relative w-full bg-background py-32 overflow-hidden border-t py-12 border-foreground/5 z-20">
      
      {/* Background ambient noise/blur for transition fluidity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Sparkling Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mounted && starParams.map((star, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1 }}
            animate={{ 
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay
            }}
            className="absolute bg-white rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: star.width,
              height: star.height,
              filter: "blur(0.5px)",
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.6)"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-24 relative z-10">
        
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4 drop-shadow-sm">
            The Toolbox
          </h2>
          <p className="text-foreground/60 text-lg max-w-lg mx-auto">
            Empowering teams with the right tools for discovery and delivery.
          </p>
        </div>

        <div className="relative h-auto min-h-[200px] w-full mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-12 pm-zone">
          {TECH_STACK.map((tech, idx) => {
            const params = randomParams[idx] || { delay: 0, y: 0, duration: 3 };
            
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                animate={{
                  y: [0, -params.y, 0],
                }}
                transition={{
                  y: {
                    duration: params.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: params.delay,
                  },
                  opacity: { duration: 0.5, delay: idx * 0.1 },
                  scale: { duration: 0.5, delay: idx * 0.1, type: "spring" }
                }}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-md cursor-pointer hover:scale-110 transition-transform shadow-[0_4px_30px_rgba(0,0,0,0.1)] pm-glass-hover flex items-center justify-center`}
                title={tech.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tech.icon} alt={tech.name} className="w-10 h-10 md:w-12 md:h-12 object-contain filter drop-shadow-md" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
