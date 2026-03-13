"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

export default function ScrollyCanvas() {
  const frameCount = 82;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null));
  const [loadedCount, setLoadedCount] = useState(0);
  const initialBatchSize = 10;

  useEffect(() => {
    let mounted = true;

    const loadImage = (index: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        const frameNum = index.toString().padStart(3, "0");
        img.src = `/sequence/frame_${frameNum}_delay-0.066s.png`;

        img.onload = () => {
          if (!mounted) return;
          setImages((prev) => {
            const next = [...prev];
            next[index] = img;
            return next;
          });
          setLoadedCount((count) => count + 1);
          resolve();
        };

        img.onerror = () => {
          console.error(`Failed to load frame ${index}`);
          resolve();
        };
      });
    };

    const loadSequence = async () => {
      // Load initial batch sequentially for fast first paint
      for (let i = 0; i < initialBatchSize; i++) {
        if (!mounted) return;
        await loadImage(i);
      }

      // Load remaining frames in small batches to avoid network congestion
      const remainingIndices = Array.from({ length: frameCount - initialBatchSize }, (_, i) => i + initialBatchSize);
      const batchSize = 5;

      for (let i = 0; i < remainingIndices.length; i += batchSize) {
        if (!mounted) return;
        const batch = remainingIndices.slice(i, i + batchSize);
        await Promise.all(batch.map(loadImage));
      }
    };

    loadSequence();

    return () => {
      mounted = false;
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const drawImage = (img: HTMLImageElement | null, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    const isMobile = window.innerWidth < 768;
    let drawWidth = canvas.width, drawHeight = canvas.height, offsetX = 0, offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = isMobile ? (canvas.height - drawHeight) * 0.25 : (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw the first available image
    const firstAvailable = images.find(img => img !== null);
    if (ctx && firstAvailable) drawImage(firstAvailable, ctx, canvas);

    const handleResize = () => {
      if (!canvasRef.current) return;
      const c = canvasRef.current;
      const cx = c.getContext("2d");
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      
      const progress = scrollYProgress.get();
      const frameIndex = Math.min(frameCount - 1, Math.floor(progress * frameCount));
      
      // Fallback to closest loaded frame if current isn't loaded
      let frameToDraw = images[frameIndex];
      if (!frameToDraw) {
        // Find nearest loaded frame
        for (let i = 1; i < frameCount; i++) {
          if (images[frameIndex - i]) { frameToDraw = images[frameIndex - i]; break; }
          if (images[frameIndex + i]) { frameToDraw = images[frameIndex + i]; break; }
        }
      }

      if (cx && frameToDraw) drawImage(frameToDraw, cx, c);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [images, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!canvasRef.current) return;
    const frameIndex = Math.min(frameCount - 1, Math.floor(progress * frameCount));
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Find nearest loaded frame if the target one isn't ready
    let frameToDraw = images[frameIndex];
    if (!frameToDraw) {
      for (let i = 1; i < frameCount; i++) {
        if (frameIndex - i >= 0 && images[frameIndex - i]) { frameToDraw = images[frameIndex - i]; break; }
        if (frameIndex + i < frameCount && images[frameIndex + i]) { frameToDraw = images[frameIndex + i]; break; }
      }
    }

    if (ctx && frameToDraw) drawImage(frameToDraw, ctx, canvas);
  });

  // Overlay transforms — same values as before, now using the correct containerRef progress
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.25], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [50, -100]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.65], [100, -100]);
  const opacity3 = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.65, 1], [100, -100]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#0a1628]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Background gradient */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[#0a1628] via-[#0d2035] to-[#0a1628] blur-[120px] opacity-60" />
        </div>

        {/* Canvas */}
        <canvas ref={canvasRef} className="relative h-full w-full block z-10" />

        {/* Top/bottom gradients */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none z-20" />

        {/* Overlay text — lives here now, shares containerRef scroll progress */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-center px-6 md:px-24">

          <motion.div
            style={{ opacity: opacity1, y: y1 }}
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 text-center px-6"
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-foreground drop-shadow-2xl">
              Anchit Boruah
            </h1>
            <p className="mt-4 text-xl md:text-3xl text-foreground/70 font-light tracking-wide drop-shadow-lg">
              Aspiring Product Manager
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: opacity2, y: y2 }}
            className="absolute left-0 right-0 md:left-24 md:right-auto top-1/2 -translate-y-1/2 max-w-2xl px-6 md:px-0 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-foreground drop-shadow-2xl leading-tight">
              I build Products <br className="hidden md:block" /> actually needed.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-foreground/60 font-light drop-shadow-lg max-w-md mx-auto md:mx-0">
              Bridging strategy, design, and execution to deliver solutions that scale and create real business value.
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: opacity3, y: y3 }}
            className="absolute left-0 right-0 md:right-24 md:left-auto top-1/2 -translate-y-1/2 max-w-2xl px-6 md:px-0 text-center md:text-right"
          >
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-foreground drop-shadow-2xl leading-tight">
              Bridging Discovery <br className="hidden md:block" /> and Delivery.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-foreground/60 font-light drop-shadow-lg max-w-md mx-auto md:ml-auto md:mr-0">
              Every roadmap purposeful. Every feature earned. Turning complex problems into scalable products that deliver measurable business value.
            </p>
          </motion.div>

        </div>

        {/* Progressive Loading Progress (Subtle) */}
        {loadedCount < frameCount && (
          <div className="absolute bottom-4 right-4 z-50 flex flex-col items-end gap-1 opacity-50 hover:opacity-100 transition-opacity">
            <div className="text-[10px] font-mono text-foreground/70 uppercase tracking-widest">
              Optimizing Experience {Math.round((loadedCount / frameCount) * 100)}%
            </div>
            <div className="w-32 h-[2px] bg-foreground/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${(loadedCount / frameCount) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}