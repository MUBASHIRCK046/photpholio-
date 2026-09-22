"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { profile, languages, interests } from "@/lib/cv-data";
import GlassCard from "./GlassCard";
import KineticText from "./KineticText";
import SectionHeading from "./SectionHeading";
import DeepFocusLens from "./DeepFocusLens";
import ParallaxContainer from "./ParallaxContainer";

const PHOTO_3 = "/photos/photo-3.jpg";

export default function NarrativeSection() {
  return (
    <section
      id="about"
      className="relative px-4 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Page 02 Indicator Badge */}
        <div className="mb-8 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 rounded-full border border-amber-400/30 bg-amber-950/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300 backdrop-blur-xl shadow-xl shadow-amber-950/30"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            Page 02 · Identity, Systems &amp; Vision
          </motion.div>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Photo: Deep Focus Lens */}
          <div className="order-1 mx-auto w-full max-w-[min(86vw,440px)]">
            <ParallaxContainer speed={0.18}>
              <div className="relative">
                <DeepFocusLens src={PHOTO_3} alt="Mubashir CK — studio portrait" />
                {/* Floating quote badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="pointer-events-none absolute -bottom-3 -right-2 hidden sm:block z-20 animate-float-slow"
                >
                  <div className="glass-pill flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-pearl/90 border border-amber-300/40 bg-black/60 shadow-xl">
                    <span className="text-amber-300 font-serif text-base">“</span>
                    <span>Engineering with purpose &amp; clarity</span>
                  </div>
                </motion.div>
              </div>
            </ParallaxContainer>
          </div>

          {/* Narrative */}
          <div className="order-2 flex flex-col gap-7">
            <SectionHeading
              eyebrow="Narrative"
              title={
                <span className="tracking-tight font-bold text-white">
                  Designing systems with{" "}
                  <br className="hidden sm:block" />
                  <KineticText
                    text="clarity & curiosity"
                    as="span"
                    className="font-serif italic font-normal tracking-wide text-white drop-shadow-[0_2px_16px_rgba(255,255,255,0.25)]"
                  />
                </span>
              }
            />

            <GlassCard variant="strong" className="hover-card-lift p-6 md:p-8">
              <div className="flex flex-col gap-4">
                {profile.bio.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="fluid-type-body text-pearl/80"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </GlassCard>

            {/* Languages + Interests */}
            <div className="grid gap-4 sm:grid-cols-2">
              <GlassCard className="hover-card-lift p-5 border border-amber-300/20">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                    Languages
                  </h3>
                  <span className="text-[10px] font-mono text-pearl/40">PROFICIENCY</span>
                </div>
                <ul className="flex flex-col gap-3.5">
                  {languages.map((l) => {
                    const percent = l.level === "Native" ? 100 : l.level === "Professional" ? 92 : 75;
                    return (
                      <li key={l.name} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-sm text-pearl/85">
                          <span className="font-medium text-white">{l.name}</span>
                          <span className="text-xs font-mono text-amber-200/80">{l.level}</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-400 shadow-[0_0_8px_rgba(245,208,137,0.5)]"
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </GlassCard>

              <GlassCard className="hover-card-lift p-5 border border-rose-400/20">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-rose-300">
                  Interests &amp; Pursuits
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {interests.map((it, idx) => (
                    <motion.li
                      key={it}
                      whileHover={{ scale: 1.06, y: -2 }}
                      transition={{ type: "spring", stiffness: 350, damping: 15 }}
                      className="flex items-center gap-1.5 rounded-full glass-pill px-3 py-1.5 text-xs text-pearl/85 border border-white/10 hover:border-rose-400/50 hover:bg-rose-950/30 hover:text-white transition-all cursor-default shadow-sm"
                    >
                      <CheckCircle2 className="h-3 w-3 text-rose-400" />
                      {it}
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
