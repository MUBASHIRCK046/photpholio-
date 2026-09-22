"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  type PanInfo,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Building2,
  Users,
  Sparkles,
  Camera,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 3 distinct photos cut from the 1 official University of Calicut Graduation Ceremony image:
 * 1. Stage Degree Conferral (Mubashir receiving certificate on stage with dignitaries)
 * 2. Grand Convocation Hall Assembly (Auditorium of graduating peers)
 * 3. Stage Dais & Arena Perspective (Dignitaries table & stage view)
 * + Option to toggle official Graduate Portrait
 */
export interface CeremonySlide {
  id: string;
  src: string;
  badge: string;
  icon: typeof GraduationCap;
  accent: string;
  title: string;
  subtitle: string;
  tags: string[];
}

const CEREMONY_SLIDES: CeremonySlide[] = [
  {
    id: "stage-conferral",
    src: "/photos/ceremony-stage-conferral.jpg",
    badge: "01 · Degree Conferral Stage",
    icon: GraduationCap,
    accent: "#38bdf8",
    title: "University of Calicut Stage Conferral",
    subtitle: "Formal Bachelor of Computer Applications degree awarding on stage",
    tags: ["Degree Conferral", "Vice Chancellor", "University of Calicut", "ELIMS"],
  },
  {
    id: "hall-assembly",
    src: "/photos/ceremony-hall-assembly.jpg",
    badge: "02 · Grand Convocation Assembly",
    icon: Users,
    accent: "#f5d089",
    title: "Grand Convocation Hall Assembly",
    subtitle: "Auditorium arena filled with the graduating batch in ceremonial robes",
    tags: ["Grand Auditorium", "Academic Cohort", "Convocation 2026", "Scholars"],
  },
  {
    id: "dais-view",
    src: "/photos/ceremony-dais-view.jpg",
    badge: "03 · Dais & Arena Perspective",
    icon: Building2,
    accent: "#a855f7",
    title: "Stage Dais & Dignitaries Overview",
    subtitle: "Academic procession & high table overlooking the convocation arena",
    tags: ["Academic Dais", "Dignitaries Arena", "Procession", "Convocation"],
  },
];

const PORTRAIT_SLIDE: CeremonySlide = {
  id: "grad-portrait",
  src: "/photos/photo-2.jpg",
  badge: "BCA Graduate · Official Portrait",
  icon: User,
  accent: "#f5d089",
  title: "Mubashir CK — Conferred Graduate",
  subtitle: "BCA Graduate in academic cap & stole · University of Calicut / ELIMS",
  tags: ["BCA Graduate", "Python", "AI Solutions", "Cybersecurity"],
};

export default function FloatingPrism({
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  const [[currentIdx, direction], setPage] = useState<[number, number]>([0, 0]);
  const [showPortrait, setShowPortrait] = useState(false);

  const activeSlide = showPortrait ? PORTRAIT_SLIDE : CEREMONY_SLIDES[currentIdx];

  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 18, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 140, damping: 18, mass: 0.5 });

  const paginate = (newDirection: number) => {
    if (showPortrait) {
      setShowPortrait(false);
      return;
    }
    const nextIdx =
      (currentIdx + newDirection + CEREMONY_SLIDES.length) %
      CEREMONY_SLIDES.length;
    setPage([nextIdx, newDirection]);
  };

  const goToSlide = (idx: number) => {
    setShowPortrait(false);
    setPage([idx, idx > currentIdx ? 1 : -1]);
  };

  // Drag swipe handling
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -350) {
      paginate(1);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 350) {
      paginate(-1);
    }
  };

  // 3D tilt tracking
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 12);
    rx.set(-(py - 0.5) * 12);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 140 : -140,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 28 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 140 : -140,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 28 },
        opacity: { duration: 0.22 },
      },
    }),
  };

  return (
    <div
      className={cn("relative w-full select-none", className)}
      style={{ perspective: "1200px" }}
    >
      {/* Mode Selector Toggle: 3 Ceremony Shots vs Studio Portrait */}
      <div className="mb-2.5 flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md">
          <button
            onClick={() => setShowPortrait(false)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all",
              !showPortrait
                ? "bg-gradient-to-r from-cyan-500/30 to-amber-500/30 text-white border border-cyan-400/50 shadow-md shadow-cyan-950/40"
                : "text-pearl/60 hover:text-pearl"
            )}
          >
            <Camera className="h-3 w-3 text-cyan-300" />
            Ceremony (3 Shots)
          </button>

          <button
            onClick={() => setShowPortrait(true)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all",
              showPortrait
                ? "bg-gradient-to-r from-amber-500/30 to-rose-500/30 text-white border border-amber-400/50 shadow-md shadow-amber-950/40"
                : "text-pearl/60 hover:text-pearl"
            )}
          >
            <User className="h-3 w-3 text-amber-300" />
            Portrait
          </button>
        </div>

        {/* Slide counter */}
        {!showPortrait && (
          <div className="glass-pill flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest text-pearl/80 border border-white/15 bg-black/50 backdrop-blur-md">
            <span>0{currentIdx + 1}</span>
            <span className="text-pearl/30">/</span>
            <span className="text-pearl/50">0{CEREMONY_SLIDES.length}</span>
          </div>
        )}
      </div>

      {/* 3D Tilting Card Container — 16:11 Aspect Ratio for Full Image Visibility */}
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative aspect-[16/11] w-full overflow-hidden rounded-[1.6rem] border border-cyan-400/30 bg-[#0a0b12] shadow-2xl shadow-black/80 transition-shadow duration-500 hover:border-cyan-400/60 hover:shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(6,182,212,0.2)]"
        style={{
          rotateX: srx,
          rotateY: sry,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Swipeable Image Canvas */}
        <div className="relative h-full w-full overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag={!showPortrait ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
            >
              <img
                src={activeSlide.src}
                alt={activeSlide.title}
                draggable={false}
                className="h-full w-full object-cover select-none"
                style={{
                  filter: "brightness(1.06) contrast(1.06)",
                }}
              />

              {/* Gentle top shadow gradient for text readability */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#090a10]/95 via-[#090a10]/50 to-transparent"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Top Content, Badge & Meta info */}
        <div
          className="pointer-events-auto absolute inset-x-3 top-3 z-30 flex flex-col gap-1.5"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="flex items-center justify-between gap-2">
            {/* Category Badge */}
            <div className="glass-pill flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-200 border border-cyan-300/40 bg-black/65 backdrop-blur-md shadow-lg">
              <span
                className="h-1.5 w-1.5 rounded-full animate-ping"
                style={{ backgroundColor: activeSlide.accent }}
              />
              {activeSlide.badge}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-1">
              {activeSlide.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="glass-pill rounded-full px-2 py-0.5 text-[9.5px] font-medium tracking-wide text-pearl/90 border border-white/15 bg-black/60 backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="px-0.5 pt-0.5">
            <h4 className="font-display text-xs sm:text-sm font-bold text-white drop-shadow-md">
              {activeSlide.title}
            </h4>
            <p className="text-[10.5px] text-pearl/85 line-clamp-1 drop-shadow">
              {activeSlide.subtitle}
            </p>
          </div>
        </div>

        {/* Left / Right Swipe Chevron Buttons (hidden if single portrait is active) */}
        {!showPortrait && (
          <div
            className="pointer-events-auto absolute inset-y-0 inset-x-2 z-30 flex items-center justify-between"
            style={{ transform: "translateZ(35px)" }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              aria-label="Previous photo"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/55 text-pearl/80 backdrop-blur-md transition-all hover:scale-110 hover:border-cyan-300 hover:bg-black/85 hover:text-white shadow-lg"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              aria-label="Next photo"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/55 text-pearl/80 backdrop-blur-md transition-all hover:scale-110 hover:border-cyan-300 hover:bg-black/85 hover:text-white shadow-lg"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Bottom Swipe Dots / Progress Bar */}
        {!showPortrait && (
          <div
            className="pointer-events-auto absolute inset-x-0 bottom-2.5 z-30 flex items-center justify-center gap-2"
            style={{ transform: "translateZ(35px)" }}
          >
            {CEREMONY_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to photo ${idx + 1}`}
                className="group relative flex h-3 items-center justify-center p-0.5"
              >
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    idx === currentIdx
                      ? "w-7 bg-gradient-to-r from-cyan-300 to-amber-300 shadow-[0_0_8px_rgba(6,182,212,0.9)]"
                      : "w-2 bg-white/30 group-hover:bg-white/60"
                  )}
                />
              </button>
            ))}
          </div>
        )}

        {/* Optical Glass Rim Stroke */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.6rem] border border-white/15"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 40%, rgba(6,182,212,0.12) 100%)",
          }}
        />
      </motion.div>

      {/* Swipe instruction hint */}
      <div className="mt-2.5 flex items-center justify-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.2em] text-pearl/45">
        <Sparkles className="h-3 w-3 text-cyan-300 animate-pulse" />
        <span>Swipe or tap 1 · 2 · 3 to explore</span>
      </div>
    </div>
  );
}
