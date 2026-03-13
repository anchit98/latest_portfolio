"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative inset-x-0 z-50 px-6 py-8 md:px-12 flex items-center justify-between text-foreground bg-black"
    >
      {/* Initials */}
      <div
        className="text-3xl font-bold tracking-tighter cursor-pointer pm-glass-hover z-50"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setIsMenuOpen(false);
        }}
      >
        AB
      </div>

      {/* Center Email (Hidden on Mobile) */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 text-sm text-neutral-400 hover:text-white transition-colors">
        <a href="mailto:jobsforanchit.boruah@gmail.com">jobsforanchit.boruah@gmail.com</a>
      </div>

      {/* Desktop Navigation & Actions */}
      <div className="flex items-center gap-6 md:gap-10">
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          <a href="#career" onClick={(e) => handleScrollTo('career', e)} className="hover:text-foreground hover:glow-text transition-all">Career</a>
          <a href="#work" onClick={(e) => handleScrollTo('work', e)} className="hover:text-foreground hover:glow-text transition-all">Work</a>
          <a href="#contact" onClick={(e) => handleScrollTo('contact', e)} className="hover:text-foreground hover:glow-text transition-all">Contact</a>
        </nav>

        <a
          href="https://drive.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex group relative items-center gap-2 px-5 py-2.5 border border-white/30 rounded-full text-sm font-medium hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 backdrop-blur-md"
        >
          Resume
          <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
        </a>

        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-full border border-white/30 hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 backdrop-blur-md"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        )}

        {/* Hamburger Menu Button */}
        <button 
          className="md:hidden p-2.5 rounded-full border border-white/30 z-50 transition-all active:scale-95"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-20 right-6 w-48 bg-black/90 backdrop-blur-md z-40 flex flex-col rounded-2xl border border-white/10 shadow-2xl overflow-hidden py-2"
          >
            <nav className="flex flex-col text-sm font-semibold uppercase tracking-[0.1em]">
              <a href="#career" onClick={(e) => handleScrollTo('career', e)} className="py-3 px-6 hover:bg-white/10 transition-colors text-neutral-400 hover:text-white">Career</a>
              <a href="#work" onClick={(e) => handleScrollTo('work', e)} className="py-3 px-6 hover:bg-white/10 transition-colors text-neutral-400 hover:text-white">Work</a>
              <a href="#contact" onClick={(e) => handleScrollTo('contact', e)} className="py-3 px-6 hover:bg-white/10 transition-colors text-neutral-400 hover:text-white">Contact</a>
            </nav>
            
            <div className="px-4 py-3 border-t border-white/5 mt-1">
              <a
                href="https://drive.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-medium hover:bg-white hover:text-black transition-all duration-300"
              >
                Resume
                <ArrowUpRight className="w-3 h-3 group-hover:rotate-45 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
