"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Cpu, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * [PHOTO_3] Warm Luxury Editorial Portrait Showcase
 *
 * - Hand-crafted palette: Champagne Gold, Sunset Rose, Warm Amber.
 * - Vibrant natural studio portrait.
 * - Concentric warm gold & rose orbit rings.
 * - Interactive 3D gyroscope tilt.
 * - Floating glass status tags with warm golden rim reflections.
 */

export default function DeepFocusLens({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18, mass: 0.5 });

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, { stiffness: 140, damping: 20 });
  const smy = useSpring(my, { stiffness: 140, damping: 20 });

  const rimGlow = useTransform(
    [smx, smy],
    ([x, y]: number[]) =>
      `radial-gradient(400px circle at ${x}% ${y}%, rgba(245,208,137,0.4), rgba(244,63,94,0.18) 40%, transparent 70%)`
  );

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    ry.set((px - 0.5) * 26);
    rx.set(-(py - 0.5) * 26);
    mx.set(px * 100);
    my.set(py * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  };

  return (
    <div
      className={cn("relative mx-auto flex items-center justify-center p-6 sm:p-8", className)}
      style={{ perspective: "1200px" }}
    >
      {/* 1. Ambient Background Warm Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 animate-pulse rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(245,208,137,0.28), rgba(244,63,94,0.2) 50%, transparent 70%)",
          animationDuration: "7s",
        }}
      />

      {/* 2. Concentric Outer Gold Orbit Ring (Clockwise) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[118%] w-[118%] rounded-full border border-dashed border-amber-300/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 34, ease: "linear", repeat: Infinity }}
      >
        <div className="absolute -top-1.5 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(245,208,137,0.9)]" />
        <div className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
      </motion.div>

      {/* 3. Concentric Inner Rose Orbit Ring (Counter-Clockwise) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[108%] w-[108%] rounded-full border border-rose-400/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      >
        <div className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
      </motion.div>

      {/* 4. Main 3D Card Container */}
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="group relative aspect-[4/5] w-full max-w-[360px] cursor-pointer will-change-transform"
        style={{
          rotateX: srx,
          rotateY: sry,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* The Frame */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[2.2rem] border border-amber-300/25 bg-gradient-to-b from-white/10 to-white/[0.02] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          style={{ transform: "translateZ(10px)" }}
        >
          {/* Base Full-Color Photo */}
          <motion.img
            src={src}
            alt={alt}
            draggable={false}
            loading="lazy"
            decoding="async"
            className="h-full w-full select-none object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Warm Tint */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{
              background:
                "linear-gradient(135deg, rgba(245,208,137,0.12) 0%, transparent 50%, rgba(244,63,94,0.14) 100%)",
            }}
          />

          {/* Rim Light */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-screen"
            style={{ background: rimGlow }}
          />

          {/* Holographic Shimmer */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-full animate-[shimmer-sweep_6s_ease-in-out_infinite] opacity-30"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(254,243,199,0.4) 50%, transparent 60%)",
            }}
          />
        </div>

        {/* Floating Badge — Top Left: AI & Systems */}
        <motion.div
          className="pointer-events-none absolute -left-3 -top-3 z-30"
          style={{ transform: "translateZ(55px)" }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="glass-pill flex items-center gap-2 rounded-full border border-amber-300/30 bg-slate-950/80 px-3.5 py-1.5 text-[11px] font-semibold text-amber-200 shadow-xl shadow-black/50 backdrop-blur-md">
            <Cpu className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
            <span>AI &amp; Systems</span>
          </div>
        </motion.div>

        {/* Floating Badge — Top Right: Verified Badge */}
        <motion.div
          className="pointer-events-none absolute -right-3 -top-3 z-30"
          style={{ transform: "translateZ(65px)" }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="glass-pill flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-slate-950/80 px-3 py-1.5 text-[10px] font-semibold text-emerald-300 shadow-xl shadow-black/50 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-ping" />
            <span>Verified Builder</span>
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}
