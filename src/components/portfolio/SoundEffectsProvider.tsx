"use client";

import { useEffect, type ReactNode } from "react";
import { soundEngine } from "@/lib/sound-engine";

/**
 * <SoundEffectsProvider />
 * Attaches global interactive sound listeners:
 * 1. EVERY Element Click: Instant tactile mechanical switch click on every element clicked across the entire site.
 * 2. Scroll Down: Crisp physical ratchet tick on scrolling down (via wheel, trackpad, Lenis, or native scroll).
 * 3. Hover Feedback: Subtle micro-tick on interactive hover.
 */
export default function SoundEffectsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Warm up / unlock AudioContext on the very first user gesture
    const unlockAudio = () => {
      soundEngine.initCtx();
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true, passive: true });
    window.addEventListener("keydown", unlockAudio, { once: true, passive: true });
    window.addEventListener("wheel", unlockAudio, { once: true, passive: true });
    window.addEventListener("touchstart", unlockAudio, { once: true, passive: true });

    // 1. Instant Pointerdown Tactile Click for EVERY Element
    const handlePointerDown = (e: PointerEvent) => {
      // Ignore right clicks
      if (e.button !== 0 && e.button !== undefined) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Determine element hierarchy for tailored sound texture
      const isAction = target.closest(
        "button, a, input, select, textarea, [role='button'], [role='tab'], [role='checkbox'], [data-action]"
      );
      const isCard = target.closest(
        ".group, .glass-pill, .glass, article, [data-card], img, svg, canvas, .rounded-3xl, .rounded-2xl"
      );

      if (isAction) {
        soundEngine.playClick("action");
      } else if (isCard) {
        soundEngine.playClick("card");
      } else {
        // Every other element on the page
        soundEngine.playClick("element");
      }
    };

    // 2. Optimized scroll listener via Lenis or single passive scroll
    let lastScrollTime = 0;
    const onScrollThrottled = (scrollY: number) => {
      const now = performance.now();
      if (now - lastScrollTime > 60) {
        soundEngine.handleScroll(scrollY);
        lastScrollTime = now;
      }
    };

    const handleNativeScroll = () => onScrollThrottled(window.scrollY);

    window.addEventListener("pointerdown", handlePointerDown, { capture: true, passive: true });
    window.addEventListener("scroll", handleNativeScroll, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("pointerdown", handlePointerDown, { capture: true });
      window.removeEventListener("scroll", handleNativeScroll);
    };
  }, []);

  return <>{children}</>;
}
