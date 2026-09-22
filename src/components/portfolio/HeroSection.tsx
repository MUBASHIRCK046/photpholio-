"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/lib/cv-data";
import LiquidPortal from "./LiquidPortal";
import KineticText from "./KineticText";
import CountUp from "./CountUp";
import MagneticButton from "./MagneticButton";

const PHOTO_1 = "/photos/photo-1.jpg";

export default function HeroSection() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pb-20 pt-28 md:pt-24"
    >
      {/* readability scrim behind text column */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 scrim-radial"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Text column */}
        <div className="order-2 flex flex-col gap-7 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full glass-pill px-3.5 py-1.5 text-xs font-semibold text-pearl/85 border border-amber-400/25 bg-amber-950/20"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            {profile.title}
          </motion.div>

          <h1 className="fluid-type-hero font-display font-bold leading-[1.05] tracking-tight text-pearl whitespace-nowrap">
            <KineticText text={profile.name.split(" ")[0]} as="span" className="inline-block text-pearl" />{" "}
            <KineticText
              text={profile.name.split(" ").slice(1).join(" ")}
              as="span"
              delay={0.15}
              className="inline-block text-gradient-liquid"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="fluid-type-body max-w-xl text-pearl/85 text-shadow-soft"
          >
            {profile.summary}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              as="button"
              strength={0.3}
              onClick={() => scrollTo("#contact")}
              className="group relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-pearl shadow-lg"
            >
              {/* Warm luxury CTA with golden champagne and rose glow */}
              <span
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(245,208,137,0.55), rgba(244,63,94,0.5))",
                  boxShadow:
                    "0 10px 30px -8px rgba(244,63,94,0.4), inset 0 1px 1px 0 rgba(255,255,255,0.45)",
                }}
              />
              <span
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-full"
                aria-hidden
              >
                <span className="absolute left-1/4 h-3 w-3 rounded-full bg-white/40 blur-[2px]" style={{ animation: "bubble-rise 4s ease-in infinite" }} />
                <span className="absolute left-2/3 h-2 w-2 rounded-full bg-white/30 blur-[1px]" style={{ animation: "bubble-rise 5s ease-in infinite 0.8s" }} />
                <span className="absolute left-1/2 h-2.5 w-2.5 rounded-full bg-white/30 blur-[1px]" style={{ animation: "bubble-rise 4.5s ease-in infinite 1.6s" }} />
              </span>
              Start a Conversation
            </MagneticButton>

            <MagneticButton
              as="button"
              strength={0.3}
              onClick={() => scrollTo("#about")}
              className="rounded-full glass-pill px-5 py-3 text-xs sm:text-sm font-semibold text-amber-300 hover:text-amber-200 border border-amber-400/30"
            >
              Narrative · Page 02
            </MagneticButton>

            <MagneticButton
              as="button"
              strength={0.3}
              onClick={() => scrollTo("#work")}
              className="rounded-full glass-pill px-5 py-3 text-xs sm:text-sm font-semibold text-cyan-300 hover:text-cyan-200 border border-cyan-400/30"
            >
              Milestones · Page 03
            </MagneticButton>

            <MagneticButton
              as="a"
              strength={0.4}
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="h-11 w-11 rounded-full glass-pill text-pearl/80 hover:text-pearl"
            >
              <Github className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              as="a"
              strength={0.4}
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="h-11 w-11 rounded-full glass-pill text-pearl/80 hover:text-pearl"
            >
              <Linkedin className="h-4 w-4" />
            </MagneticButton>
          </motion.div>

          {/* quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="grid grid-cols-3 gap-2.5 pt-4 sm:gap-3"
          >
            {profile.stats.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -4, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="hover-card-lift group relative overflow-hidden rounded-2xl glass p-3.5 border border-white/10 hover:border-amber-300/40 hover:shadow-[0_0_20px_rgba(245,208,137,0.2)] transition-all cursor-default"
              >
                <div className="font-display text-2xl font-bold text-gradient-aurora group-hover:scale-105 transition-transform origin-left">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wider text-pearl/75 text-shadow-soft">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-2 text-xs text-pearl/70 text-shadow-soft"
          >
            <MapPin className="h-3.5 w-3.5" />
            {profile.location} · {profile.drivingLicense}
          </motion.div>
        </div>

        {/* Photo column with interactive floating badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 relative mx-auto w-full max-w-[min(86vw,460px)] lg:order-2"
        >
          {/* Floating badge top-left */}
          <div className="pointer-events-none absolute -left-3 -top-2 z-20 hidden sm:block animate-float-slow">
            <div className="glass-pill flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-amber-200 border border-amber-300/40 bg-black/60 shadow-xl shadow-black/50">
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f5d089]" />
              AI &amp; Systems Architecture
            </div>
          </div>

          {/* Floating badge top-right */}
          <div className="pointer-events-none absolute -right-3 -top-2 z-20 hidden sm:block animate-float-reverse">
            <div className="glass-pill flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-rose-300 border border-rose-400/40 bg-black/60 shadow-xl shadow-black/50">
              <span className="h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e]" />
              Cybersecurity &amp; Blockchain
            </div>
          </div>

          <LiquidPortal src={PHOTO_1} alt="Portrait of Mubashir CK" />
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-pearl/40 hover:text-pearl/80"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
