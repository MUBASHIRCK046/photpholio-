"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * [PHOTO_3] The Deep Focus Lens — Philosophy / Vision Anchor.
 *
 *  - Styled with high-contrast monochrome and mix-blend-mode: luminosity
 *    inside an organic glass frame.
 *  - Interactive Lens: moving the cursor over the photo acts as a liquid
 *    magnifying lens — distorting edges, restoring full-color vibrance, and
 *    slightly warping the underlying image in real time.
 *
 * Layered approach (all inside one organic-frame container):
 *   1. Base full-color image.
 *   2. Monochrome overlay (backdrop grayscale + luminosity blend) covering
 *      the frame, with a circular moving "hole" (radial-gradient mask)
 *      following the cursor — revealing full color inside the lens.
 *   3. Magnified color image clipped to the lens circle (scale ~1.3) for
 *      true magnification.
 *   4. Liquid lens rim (radial gradient + SVG displacement) following cursor.
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
  const [active, setActive] = useState(false);

  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 200, damping: 24 });
  const sy = useSpring(y, { stiffness: 200, damping: 24 });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };
  const onEnter = () => setActive(true);
  const onLeave = () => {
    setActive(false);
    x.set(-400);
    y.set(-400);
  };

  // moving circular mask: transparent inside lens radius, opaque outside
  const LENS = 130; // px radius
  const monoMask = useMotionTemplate`radial-gradient(circle ${LENS}px at ${sx}px ${sy}px, transparent 0, transparent ${LENS - 1}px, #000 ${LENS}px)`;

  // magnified image position (offset so the scaled image stays centered on cursor)
  const magX = useMotionTemplate`calc(${sx}px - ${LENS}px)`;
  const magY = useMotionTemplate`calc(${sy}px - ${LENS}px)`;

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="lens-warp" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.02"
              numOctaves="2"
              seed="5"
              result="t"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="t"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        className="relative aspect-[4/5] w-full overflow-hidden will-change-transform"
        style={{
          borderRadius: "48% 52% 44% 56% / 56% 44% 56% 44%",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow:
            "0 30px 70px -20px rgba(0,0,0,0.8), inset 0 1px 1px 0 rgba(255,255,255,0.4), inset 0 -2px 3px 0 rgba(0,0,0,0.4)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        {/* 1. base full-color image */}
        { }
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover"
        />

        {/* 2. monochrome overlay with moving circular hole (reveals color) */}
        <motion.div
          className="absolute inset-0"
          style={{
            backdropFilter: "grayscale(1) contrast(1.12) brightness(0.92)",
            WebkitBackdropFilter: "grayscale(1) contrast(1.12) brightness(0.92)",
            WebkitMaskImage: monoMask,
            maskImage: monoMask,
          }}
        />
        {/* luminosity blend for high-contrast monochrome mood */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(2,4,10,0.35))",
            mixBlendMode: "luminosity",
            WebkitMaskImage: monoMask,
            maskImage: monoMask,
          }}
        />

        {/* 3. magnified color image clipped to the lens circle */}
        <motion.div
          className="pointer-events-none absolute overflow-hidden rounded-full"
          style={{
            width: LENS * 2,
            height: LENS * 2,
            left: magX,
            top: magY,
            opacity: active ? 1 : 0,
            transition: "opacity 0.25s ease",
            WebkitMaskImage:
              "radial-gradient(circle, #000 0, #000 96%, transparent 100%)",
            maskImage:
              "radial-gradient(circle, #000 0, #000 96%, transparent 100%)",
          }}
        >
          { }
          <img
            src={src}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-cover"
            style={{
              transform: "scale(1.32)",
              transformOrigin: "center",
            }}
          />
        </motion.div>

        {/* 4. liquid lens rim following cursor */}
        <motion.div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: LENS * 2,
            height: LENS * 2,
            left: magX,
            top: magY,
            opacity: active ? 1 : 0,
            transition: "opacity 0.25s ease",
            boxShadow:
              "inset 0 0 22px 2px rgba(255,255,255,0.5), inset 0 0 5px 1px rgba(6,182,212,0.7), 0 0 35px 3px rgba(124,58,237,0.35)",
            border: "1.5px solid rgba(255,255,255,0.5)",
            background:
              "radial-gradient(circle, transparent 0 60%, rgba(6,182,212,0.16) 78%, rgba(124,58,237,0.30) 94%, rgba(255,255,255,0.45) 100%)",
            mixBlendMode: "screen",
            filter: "url(#lens-warp)",
          }}
        />

        {/* hint label */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-pearl/40">
            hover to focus
          </p>
        </div>
      </div>
    </div>
  );
}
