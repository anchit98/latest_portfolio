"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import * as React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  // Phones: scroll reveals play as fades (GPU-composited) instead of slides, which are driven frame by frame on
  // the main thread and stack up when several sections come into view at once.
  const phone = useMediaQuery("(max-width: 1023px)");
  return (
    <NextThemesProvider {...props}>
      <MotionConfig reducedMotion={phone ? "always" : "user"}>{children}</MotionConfig>
    </NextThemesProvider>
  );
}
