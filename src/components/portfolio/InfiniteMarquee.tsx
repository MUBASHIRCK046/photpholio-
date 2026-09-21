"use client";

import { type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

/**
 * <InfiniteMarquee />
 * Bi-directional infinite horizontal ticker rail using Framer Motion wrap().
 *
 * Props:
 *  - direction: 1 = leftward (Rail A, ~30s), -1 = rightward (Rail B, ~40s)
 *  - baseVelocity: relative speed
 *  - On hover, decelerates smoothly to 20%.
 *  - While scrolling rapidly, items display subtle chromatic aberration
 *    (RGB displacement) via text-shadow.
 */
export default function InfiniteMarquee({
  children,
  direction = 1,
  baseVelocity = 4,
  className,
}: {
  children: ReactNode;
  direction?: 1 | -1;
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothScrollVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const hoverSpring = useSpring(1, { damping: 30, stiffness: 200 });
  const setHover = (h: boolean) => hoverSpring.set(h ? 0.2 : 1);

  // chromatic aberration from scroll speed
  const aberration = useTransform(
    smoothScrollVelocity,
    [-3000, 0, 3000],
    [3.2, 0, 3.2]
  );
  const textShadow = useTransform(
    aberration,
    (a) =>
      `${a}px 0 0 rgba(6,182,212,0.45), ${-a}px 0 0 rgba(124,58,237,0.45)`
  );

  // wrapped percentage transform for seamless loop
  const x = useTransform(baseX, (v) => `${wrap(-50, 50, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = direction * baseVelocity * (delta / 16.67);
    if (smoothScrollVelocity.get() !== 0) {
      moveBy += direction * smoothScrollVelocity.get() * 0.02;
    }
    moveBy *= hoverSpring.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={`relative flex overflow-hidden mask-fade-x ${className ?? ""}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <motion.div
        className="flex shrink-0 items-center"
        style={{ x, willChange: "transform" }}
      >
        <motion.div
          className="flex shrink-0 items-center"
          style={{ textShadow }}
        >
          {children}
        </motion.div>
        <motion.div
          className="flex shrink-0 items-center"
          style={{ textShadow }}
          aria-hidden
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
