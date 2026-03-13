"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  const { scrollY } = useScroll();
  
  // Fade out the indicator as the user scrolls
  // Opacity 1 at top (0px), Opacity 0 by 300px scroll
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-50"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-foreground/60 text-xs font-medium tracking-[0.2em] uppercase"
      >
        Scroll to Explore
      </motion.p>
      
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-foreground/40"
      >
        <ChevronDown size={20} strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
}
