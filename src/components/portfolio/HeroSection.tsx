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
            className="inline-flex w-fit items-center gap-2 rounded-full glass-pill px-3 py-1.5 text-xs font-medium text-pearl/75"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            {profile.title}
          </motion.div>

          <h1 className="fluid-type-hero font-display font-bold leading-[0.95] tracking-tight text-pearl">
            <KineticText text={profile.name.split(" ")[0]} as="span" className="block text-pearl" />
            <KineticText
              text={profile.name.split(" ").slice(1).join(" ")}
              as="span"
              delay={0.15}
              className="block text-gradient-liquid"
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
              className="group relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-pearl"
            >
              {/* liquid CTA with bubbling internal glow */}
              <span
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(6,182,212,0.5), rgba(124,58,237,0.5))",
                  boxShadow:
                    "0 10px 30px -8px rgba(124,58,237,0.5), inset 0 1px 1px 0 rgba(255,255,255,0.4)",
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
              onClick={() => scrollTo("#work")}
              className="rounded-full glass-pill px-6 py-3 text-sm font-semibold text-pearl/85 hover:text-pearl"
            >
              View Experience
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
            className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4"
          >
            {profile.stats.map((s) => (
              <div key={s.label} className="rounded-2xl glass p-3">
                <div className="font-display text-2xl font-bold text-gradient-aurora">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wider text-pearl/75 text-shadow-soft">
                  {s.label}
                </div>
              </div>
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

        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 mx-auto w-full max-w-[min(86vw,460px)] lg:order-2"
        >
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
