"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Shield, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * [PHOTO_1] The Warm Luxury Hero Portal
 *
 * - Hand-crafted editorial palette: Champagne Gold, Sunset Rose & Warm Amber.
 * - Crystal-clear portrait presentation.
 * - Dynamic concentric gold & rose orbit rings.
 * - Subtle 3D spring gyroscope tilt.
 * - Floating glass status tags with warm golden rim reflections.
 */

export default function LiquidPortal({
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
  const srx = useSpring(rx, { stiffness: 150, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18, mass: 0.4 });

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, { stiffness: 130, damping: 20 });
  const smy = useSpring(my, { stiffness: 130, damping: 20 });

  const rimBg = useTransform(
    [smx, smy],
    ([x, y]: number[]) =>
      `radial-gradient(450px circle at ${x}% ${y}%, rgba(245,208,137,0.4), rgba(244,63,94,0.18) 40%, transparent 70%)`
  );

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    ry.set((px - 0.5) * 22);
    rx.set(-(py - 0.5) * 22);
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
      className={cn("relative mx-auto flex items-center justify-center p-6 sm:p-10", className)}
      style={{ perspective: "1200px" }}
    >
      {/* 1. Warm Ambient Back-Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 animate-pulse rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(245,208,137,0.3) 0%, rgba(244,63,94,0.22) 45%, transparent 70%)",
          animationDuration: "7s",
        }}
      />

      {/* 2. Outer Champagne Gold Orbit Ring (Clockwise) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[116%] w-[116%] rounded-full border border-dashed border-amber-300/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        <div className="absolute -top-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(245,208,137,1)]" />
        <div className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.9)]" />
      </motion.div>

      {/* 3. Inner Rose Gold Orbit Ring (Counter-Clockwise) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[106%] w-[106%] rounded-full border border-rose-400/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      >
        <div className="absolute top-1/2 -left-1.5 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
      </motion.div>

      {/* 4. Main 3D Glass Portal Card */}
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="group relative aspect-square w-full max-w-[420px] cursor-pointer will-change-transform"
        style={{
          rotateX: srx,
          rotateY: sry,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Crystal Glass Container with Warm Gold Specular Trim */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[2.8rem] border border-amber-300/25 bg-gradient-to-b from-white/10 to-white/[0.02] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          style={{ transform: "translateZ(10px)" }}
        >
          {/* Portrait */}
          <motion.img
            src={src}
            alt={alt}
            draggable={false}
            decoding="async"
            className="h-full w-full select-none object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Warm Golden Tint */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{
              background:
                "linear-gradient(135deg, rgba(245,208,137,0.15) 0%, transparent 60%, rgba(244,63,94,0.15) 100%)",
            }}
          />

          {/* Follower Rim Light */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-screen"
            style={{ background: rimBg }}
          />

          {/* Shimmer Light Beam */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-full animate-[hero-shimmer_6s_ease-in-out_infinite] opacity-30"
            style={{
              background:
                "linear-gradient(115deg, transparent 40%, rgba(254,243,199,0.45) 50%, transparent 60%)",
            }}
          />
        </div>

        {/* Floating Badge — Available for Hire positioned at Top Center */}
        <motion.div
          className="pointer-events-none absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 z-50"
          style={{ transformStyle: "preserve-3d", zIndex: 50 }}
          animate={{ y: [0, -5, 0], z: 75 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="glass-pill flex items-center gap-2 rounded-full border border-emerald-400/50 bg-[#080b12]/95 px-4 py-1.5 text-xs font-semibold text-emerald-200 shadow-2xl shadow-black/90 backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]" />
            </span>
            <span className="whitespace-nowrap font-medium tracking-wide text-emerald-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              Available for Hire
            </span>
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}
