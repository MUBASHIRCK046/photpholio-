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
  };

  const Comp = as as any;

  return (
    <Comp
      ref={ref}
      id={id}
      onPointerMove={glow ? handleMove : undefined}
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        variant === "strong" ? "glass-strong" : "glass",
        glow && "glass-glow",
        className
      )}
      style={style}
    >
      {/* Subtle iridescent sweep light on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(115deg, transparent 40%, rgba(245, 208, 137, 0.08) 50%, rgba(244, 63, 94, 0.08) 55%, transparent 65%)",
          transform: "translateZ(0)",
        }}
      />
      {causticHeader ? (
        <div className="relative z-10">{causticHeader}</div>
      ) : null}
      <div className="relative z-[3]">{children}</div>
    </Comp>
  );
}
