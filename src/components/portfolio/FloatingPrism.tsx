"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * [PHOTO_2] The Floating Prism — Work & Impact Anchor.
 *
 *  - Suspended within an isometric, high-index floating glass prism.
 *  - On hover: image splits into RGB separation (chromatic aberration).
 *  - 4 glass pill badges detailing top tech competencies orbit the frame
 *    in a slow 3D elliptical path.
 */
const ORBIT_BADGES = ["Python", "AI", "Blockchain", "Cybersecurity"];

export default function FloatingPrism({
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
  const srx = useSpring(rx, { stiffness: 120, damping: 16 });
  const sry = useSpring(ry, { stiffness: 120, damping: 16 });

  // RGB split magnitude (px), 0 -> 7 on hover
  const split = useMotionValue(0);
  const ssplit = useSpring(split, { stiffness: 140, damping: 18 });
  const splitNeg = useTransform(ssplit, (v) => -v);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 18);
    rx.set(-(py - 0.5) * 18);
  };

  const onEnter = () => split.set(7);
  const onLeave = () => {
    split.set(0);
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      className={cn("relative", className)}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        className="relative aspect-[4/5] w-full will-change-transform"
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      >
        {/* chromatic aberration image stack */}
        <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
          {/* red channel offset right */}
          <motion.div aria-hidden className="absolute inset-0" style={{ x: ssplit }}>
            { }
            <img
              src={src}
              alt=""
              draggable={false}
              className="h-full w-full select-none object-cover"
              style={{
                filter:
                  "brightness(0) sepia(1) hue-rotate(-50deg) saturate(8)",
                opacity: 0.6,
                mixBlendMode: "screen",
              }}
            />
          </motion.div>
          {/* blue/cyan channel offset left */}
          <motion.div aria-hidden className="absolute inset-0" style={{ x: splitNeg }}>
            { }
            <img
              src={src}
              alt=""
              draggable={false}
              className="h-full w-full select-none object-cover"
              style={{
                filter:
                  "brightness(0) sepia(1) hue-rotate(170deg) saturate(8)",
                opacity: 0.6,
                mixBlendMode: "screen",
              }}
            />
          </motion.div>
          {/* base full-color image */}
          { }
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="relative h-full w-full object-cover"
          />
          {/* tint */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(6,182,212,0.10), transparent 40%, rgba(124,58,237,0.20))",
            }}
          />
        </div>

        {/* glass prism overlay frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.6rem] glass-strong"
        />
        {/* isometric top facet highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-2 mx-auto h-6 w-[78%] rounded-t-[1.6rem]"
          style={{
            transform: "translateZ(30px)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.02))",
          }}
        />

        {/* floating orbit ring of competency badges */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ transform: "translateZ(70px)" }}
        >
          <Orbit />
        </div>
      </motion.div>
    </div>
  );
}

function Orbit() {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 h-[114%] w-[114%] -translate-x-1/2 -translate-y-1/2"
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 28, ease: "linear", repeat: Infinity }}
    >
      {ORBIT_BADGES.map((label, i) => {
        const angle = (i / ORBIT_BADGES.length) * Math.PI * 2;
        const rx = 50;
        const ry = 30;
        const x = Math.cos(angle) * rx;
        const y = Math.sin(angle) * ry;
        const depth = Math.sin(angle);
        return (
          <motion.div
            key={label}
            className="absolute left-1/2 top-1/2"
            style={{
              x: `${x}%`,
              y: `${y}%`,
              z: depth * 60,
              scale: 0.7 + (depth + 1) * 0.18,
              opacity: 0.55 + (depth + 1) * 0.22,
            }}
          >
            <div className="glass-pill -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-[11px] font-medium text-pearl/90 whitespace-nowrap">
              {label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
