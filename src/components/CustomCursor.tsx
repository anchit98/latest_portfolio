"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth out the movement with framer-motion springs
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(hover: none)').matches);
    };
    checkTouch();

    // Disable cursor on mobile/touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    window.addEventListener("mousemove", mouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") || 
        target.closest("button") || 
        target.closest(".pm-glass-hover")
      ) {
        setCursorVariant("hover");
      }
    };
    
    const handleMouseOut = () => {
      setCursorVariant("default");
    };

    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 0)",
      border: "1px solid var(--foreground)",
      opacity: 0.6,
    },
    hover: {
      scale: 3.5,
      backgroundColor: "rgba(255, 255, 255, 0)", 
      border: "1px solid var(--foreground)",
      opacity: 0.3,
      backdropFilter: "blur(4px)",
    },
  };

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[100] flex items-center justify-center border-foreground"
        style={{ x: cursorX, y: cursorY }}
        variants={variants}
        animate={cursorVariant}
      />
    </>
  );
}
