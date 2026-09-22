"use client";

import { useEffect, useRef } from "react";

/**
 * Global cursor follow-light. A soft radial glow that trails the pointer
 * across the whole viewport, adding continuous life to the void background.
 */
export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      const dx = tx - cx;
      const dy = ty - cy;
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        cx += dx * 0.14;
        cy += dy * 0.14;
        el.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[600px] w-[600px] rounded-full opacity-50 mix-blend-screen transition-opacity duration-300 will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(245,208,137,0.14) 0%, rgba(244,63,94,0.07) 35%, transparent 70%)",
        transform: "translate3d(-1000px, -1000px, 0)",
      }}
    />
  );
}
