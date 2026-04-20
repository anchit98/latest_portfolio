"use client";

import { Linkedin, Instagram, Github } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SocialBar() {
  const { scrollYProgress } = useScroll();

  // Fade out the social bar when we reach 90% of the page (the Contact section)
  const opacity = useTransform(scrollYProgress, [0, 0.85, 0.9], [1, 1, 0]);
  const pointerEvents = useTransform(scrollYProgress, (v) => v > 0.88 ? "none" : "auto");

  return (
    <motion.div
      style={{ opacity, pointerEvents }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed left-6 bottom-0 z-50 hidden lg:flex flex-col items-center gap-6 mix-blend-difference text-foreground"
    >
      <a
        href="https://linkedin.com/in/anchitboruah"
        target="_blank"
        rel="noopener noreferrer"
        className="pm-glass-hover hover:-translate-y-1 transition-transform hover:text-blue-400"
      >
        <Linkedin className="w-5 h-5" />
      </a>

      <a
        href="https://www.instagram.com/anchitboruah/"
        target="_blank"
        rel="noopener noreferrer"
        className="pm-glass-hover hover:-translate-y-1 transition-transform hover:text-pink-400"
      >
        <Instagram className="w-5 h-5" />
      </a>

      <a
        href="https://github.com/anchit98/"
        target="_blank"
        rel="noopener noreferrer"
        className="pm-glass-hover hover:-translate-y-1 transition-transform hover:text-gray-400"
      >
        <Github className="w-5 h-5" />
      </a>

      {/* Decorative Line */}
      <div className="w-[1px] h-24 bg-white/30 mt-4" />
    </motion.div>
  );
}
