"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Smooth scrolling physics engine (Lenis) — underwater inertia.
 * lerp 0.07, wheelMultiplier 0.9, smoothWheel true.
 *
 * Exposes the Lenis instance on window.__lenis so other components
 * (marquees, ripple shader) can read scroll velocity.
 */
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.095,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      smoothWheel: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    window.__lenis = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
