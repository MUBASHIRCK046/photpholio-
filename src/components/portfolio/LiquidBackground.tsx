"use client";

import { useEffect, useRef } from "react";

/**
 * <LiquidBackground />
 *
 * Warm Luxury Editorial Atmosphere & Stardust Canvas:
 * - Rich, warm velvet charcoal canvas (#090a10) with subtle organic depth.
 * - Fluid, warm aurora lights: Champagne Gold, Sunset Rose, Warm Amber & Sage.
 * - Gentle drifting gold & rose stardust sparks that pulse naturally.
 * - High-end human-designed aesthetic inspired by luxury studio portfolios.
 */

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
}

export default function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse coordinates
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Warm luxury stardust palette
    const colors = ["#f5d089", "#f43f5e", "#fbbf24", "#fef3c7", "#34d399", "#818cf8"];
    const isMobile = width < 768;
    const sparkCount = isMobile ? 18 : Math.min(Math.floor((width * height) / 32000), 32);
    const sparks: Spark[] = [];

    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.1,
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.55 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    let time = 0;
    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const dx = s.x - mouseX;
        const dy = s.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 0.1) {
          const force = (1 - dist / 120) * 0.6;
          s.x += (dx / dist) * force;
          s.y += (dy / dist) * force;
        }

        const currentAlpha = s.alpha + Math.sin(time * 2 + i) * 0.2;
        const finalAlpha = Math.max(0.08, Math.min(0.85, currentAlpha));

        // Optimized GPU-friendly rendering (avoids CPU shadowBlur stalls)
        // 1. Soft outer halo
        ctx.globalAlpha = finalAlpha * 0.35;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // 2. Bright crisp core
        ctx.globalAlpha = finalAlpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animId);
      } else {
        if (!isRunning) {
          isRunning = true;
          animId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    render();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: "#090a10" }}
    >
      {/* Warm Ambient Flowing Lights (Champagne Gold, Sunset Rose, Sage & Amber) */}
      <div className="absolute inset-0 overflow-hidden [contain:paint]">
        {/* Warm Champagne Gold Aurora Bloom (Top Right) */}
        <div
          className="absolute -top-[10%] right-[5%] h-[55vw] w-[55vw] max-w-[750px] max-h-[750px] rounded-full blur-[60px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 208, 137, 0.20) 0%, rgba(245, 158, 11, 0.10) 45%, transparent 70%)",
            animation: "warm-drift-1 22s ease-in-out infinite alternate",
            transform: "translate3d(0, 0, 0)",
          }}
        />

        {/* Sunset Coral / Rose Velvet Bloom (Top Left) */}
        <div
          className="absolute -top-[12%] -left-[8%] h-[60vw] w-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[65px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(244, 63, 94, 0.16) 0%, rgba(225, 29, 72, 0.08) 45%, transparent 70%)",
            animation: "warm-drift-2 26s ease-in-out infinite alternate",
            transform: "translate3d(0, 0, 0)",
          }}
        />

        {/* Center Warm Amethyst & Amber Glow */}
        <div
          className="absolute top-[35%] left-[20%] h-[50vw] w-[50vw] max-w-[680px] max-h-[680px] rounded-full blur-[65px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(217, 119, 6, 0.12) 0%, rgba(147, 51, 234, 0.07) 50%, transparent 75%)",
            animation: "warm-drift-3 28s ease-in-out infinite alternate",
            transform: "translate3d(0, 0, 0)",
          }}
        />

        {/* Bottom Sage / Warm Amber Pool */}
        <div
          className="absolute -bottom-[15%] right-[15%] h-[60vw] w-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[60px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(245, 208, 137, 0.10) 50%, transparent 70%)",
            animation: "warm-drift-1 24s ease-in-out infinite alternate-reverse",
            transform: "translate3d(0, 0, 0)",
          }}
        />
      </div>

      {/* Drifting Golden Stardust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Soft Vignette Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(245, 208, 137, 0.08) 0%, transparent 65%), radial-gradient(ellipse at 50% 100%, rgba(9, 10, 16, 0.75) 0%, transparent 70%)",
        }}
      />

    </div>
  );
}
