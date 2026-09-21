"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "standard" | "strong";
  glow?: boolean; // specular pointer follow-light
  causticHeader?: ReactNode; // content wrapped in caustic SVG filter on hover
  style?: CSSProperties;
  as?: "div" | "article" | "section";
  id?: string;
};

/**
 * <GlassCard />
 * Liquid glass panel with:
 *  - optical glass tokens (standard / high-index)
 *  - 1px multi-stop gradient rim stroke (via ::before)
 *  - multi-layered specular shadows
 *  - specular pointer follow-light (radial-gradient at clientX/Y)
 *  - optional caustic ripple header driven by mouse velocity
 */
export default function GlassCard({
  children,
  className,
  variant = "standard",
  glow = true,
  causticHeader,
  style,
  as = "div",
  id,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(0);
  const lastPos = useRef<{ x: number; y: number; t: number } | null>(null);
  const rafRef = useRef<number>(0);

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    // velocity for caustic displacement scale
    const now = performance.now();
    if (lastPos.current) {
      const dt = Math.max(8, now - lastPos.current.t);
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const v = Math.min(40, Math.hypot(dx, dy) / dt * 16);
      velocityRef.current = Math.max(velocityRef.current, v);
    }
    lastPos.current = { x: e.clientX, y: e.clientY, t: now };

    if (!rafRef.current) {
      const tick = () => {
        velocityRef.current *= 0.9;
        const scale = Math.min(18, velocityRef.current);
        el.style.setProperty("--caustic", `${scale}`);
        if (velocityRef.current > 0.4) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          el.style.setProperty("--caustic", "0");
          rafRef.current = 0;
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    velocityRef.current = 0;
    el.style.setProperty("--caustic", "0");
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  };

  const Comp = as as any;

  return (
    <Comp
      ref={ref}
      id={id}
      onPointerMove={glow ? handleMove : undefined}
      onPointerLeave={glow ? handleLeave : undefined}
      className={cn(
        "relative overflow-hidden",
        variant === "strong" ? "glass-strong" : "glass",
        glow && "glass-glow",
        className
      )}
      style={style}
    >
      {causticHeader ? (
        <div
          className="relative z-10"
          style={{ filter: "url(#liquid-caustic)" }}
        >
          {causticHeader}
        </div>
      ) : null}
      <div className="relative z-[3]">{children}</div>
    </Comp>
  );
}
