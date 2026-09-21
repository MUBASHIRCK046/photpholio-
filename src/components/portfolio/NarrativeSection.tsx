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
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Photo: Deep Focus Lens */}
        <div className="order-1 mx-auto w-full max-w-[min(86vw,440px)]">
          <ParallaxContainer speed={0.18}>
            <DeepFocusLens src={PHOTO_3} alt="Mubashir CK — studio portrait" />
          </ParallaxContainer>
        </div>

        {/* Narrative */}
        <div className="order-2 flex flex-col gap-7">
          <SectionHeading
            eyebrow="Narrative"
            title={
              <>
                Designing systems with <br className="hidden sm:block" />
                <KineticText text="clarity & curiosity" as="span" className="text-gradient-liquid" />
              </>
            }
          />

          <GlassCard variant="strong" className="p-6 md:p-8">
            <div className="flex flex-col gap-4">
              {profile.bio.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="fluid-type-body text-pearl/75"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </GlassCard>

          {/* Languages + Interests */}
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassCard className="p-5">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-cyan-300/80">
                Languages
              </h3>
              <ul className="flex flex-col gap-2.5">
                {languages.map((l) => (
                  <li
                    key={l.name}
                    className="flex items-center justify-between text-sm text-pearl/80"
                  >
                    <span className="font-medium">{l.name}</span>
                    <span className="text-xs text-pearl/45">{l.level}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="p-5">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-violet-300/80">
                Interests
              </h3>
              <ul className="flex flex-wrap gap-2">
                {interests.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-1.5 rounded-full glass-pill px-3 py-1.5 text-xs text-pearl/80"
                  >
                    <CheckCircle2 className="h-3 w-3 text-cyan-300" />
                    {it}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
