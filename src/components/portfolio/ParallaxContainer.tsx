"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * <ParallaxContainer />
 * Translates its content at a z-depth ratio (data-speed).
 * speed 0.2 = slow background plane; 0.8 = near foreground plane.
 * Negative speed moves opposite to scroll (depth inversion).
 */
export default function ParallaxContainer({
  children,
  speed = 0.3,
  className,
  style,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-speed * 120}px`, `${speed * 120}px`]
  );

  return (
    <div ref={ref} className={cn("relative", className)} style={style}>
      <motion.div
        style={{ y, willChange: "transform" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
