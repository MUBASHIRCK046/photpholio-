"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * [PHOTO_1] The Liquid Portal — Hero Identity Anchor.
 *
 *  - Encased inside a continuously morphing liquid blob mask
 *    (border-radius cycling 60% 40% 30% 70% / 60% 30% 70% 40% over 10s).
 *  - WebGL-style hover: viscous liquid wave displacement via an inline
 *    SVG feTurbulence + feDisplacementMap filter whose scale grows on hover.
 *  - 3D Gyroscope Card: tilts up to 20° relative to mouse with a realistic
 *    light reflection on the outer rim.
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

  // tilt motion values (deg)
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18, mass: 0.4 });

  // rim light position
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, { stiffness: 120, damping: 20 });
  const smy = useSpring(my, { stiffness: 120, damping: 20 });

  const rimBg = useTransform(
    [smx, smy],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(6,182,212,0.55), rgba(124,58,237,0.25) 40%, transparent 65%)`
  );

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 40); // -20..20
    rx.set(-(py - 0.5) * 40);
    mx.set(px * 100);
    my.set(py * 100);
    // scale up wave displacement on hover via CSS var
    el.style.setProperty("--wave", "14");
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
    el.style.setProperty("--wave", "0");
  };

  return (
    <div
      className={cn("relative", className)}
      style={{ perspective: "1200px" }}
    >
      {/* outer morphing blob with rim glow */}
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative aspect-square w-full animate-blob-morph will-change-transform"
        style={{
          rotateX: srx,
          rotateY: sry,
          transformStyle: "preserve-3d",
        }}
      >
        {/* liquid wave displacement filter applied to the image */}
        <svg className="absolute h-0 w-0" aria-hidden>
          <defs>
            <filter
              id="liquid-portal-wave"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.014 0.018"
                numOctaves="2"
                seed="3"
                result="turb"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="14s"
                  values="0.014 0.018;0.02 0.012;0.014 0.018"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="turb"
                scale="var(--wave, 0)"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        {/* portrait */}
        <div
          className="absolute inset-0 overflow-hidden animate-blob-morph"
          style={{ filter: "url(#liquid-portal-wave)" }}
        >
          { }
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            draggable={false}
          />
          {/* subtle inner vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 120% at 30% 20%, transparent 45%, rgba(2,4,10,0.30) 100%)",
            }}
          />
        </div>

        {/* rim light reflection (follows cursor) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-blob-morph mix-blend-screen"
          style={{ background: rimBg }}
        />

        {/* top-edge specular bevel */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-blob-morph"
          style={{
            boxShadow:
              "inset 0 2px 2px 0 rgba(255,255,255,0.5), inset 0 -2px 3px 0 rgba(0,0,0,0.5), 0 30px 60px -15px rgba(0,0,0,0.8)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        />

        {/* floating glass ring badge */}
        <div
          className="pointer-events-none absolute -right-3 top-6 z-10"
          style={{ transform: "translateZ(60px)" }}
        >
          <div className="glass-pill rounded-full px-3 py-1.5 text-[11px] font-medium tracking-wide text-pearl/90">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-beacon" />
            Available
          </div>
        </div>
      </motion.div>
    </div>
  );
}
