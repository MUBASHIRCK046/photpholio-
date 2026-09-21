"use client";

import { motion } from "framer-motion";
import { Building2, CalendarClock, MapPin } from "lucide-react";
import { experiences } from "@/lib/cv-data";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import FloatingPrism from "./FloatingPrism";
import ParallaxContainer from "./ParallaxContainer";
import { accentMap, type Accent } from "./accents";

const PHOTO_2 = "/photos/photo-2.jpg";

export default function ExperienceSection() {
  return (
    <section
      id="work"
      className="relative px-4 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Perpetual Experience Flow"
          title={
            <>
              Career milestones, <br className="hidden sm:block" />
              in liquid motion
            </>
          }
          description="A continuous stream of roles, achievements, and the stacks that powered them."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Floating prism photo */}
          <div className="lg:sticky lg:top-24 mx-auto w-full max-w-[min(86vw,380px)]">
            <ParallaxContainer speed={0.12}>
              <FloatingPrism src={PHOTO_2} alt="Mubashir CK — graduation portrait" />
              <p className="mt-4 text-center text-xs uppercase tracking-[0.3em] text-pearl/40">
                Work · Impact · Growth
              </p>
            </ParallaxContainer>
          </div>

          {/* Timeline */}
          <div className="relative flex flex-col gap-6">
            {/* center rail */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-6 top-0 w-px"
              style={{
                background:
                  "linear-gradient(180deg, rgba(6,182,212,0.4), rgba(124,58,237,0.2), transparent)",
              }}
            />
            {experiences.map((exp, i) => (
              <ExperienceSlab key={exp.role + i} exp={exp} index={i} />
            ))}

            {/* loop hint: seamless virtual loop messaging */}
            <div className="mt-2 flex items-center gap-3 pl-12 text-xs text-pearl/40">
              <span className="h-px w-8 bg-pearl/20" />
              Loop complete — scroll up to revisit
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSlab({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  const a = accentMap[exp.accent as Accent];
  const flip = index % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-12"
    >
      {/* node */}
      <span
        className="absolute left-[18px] top-7 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full"
        style={{
          background: a.solid,
          boxShadow: `0 0 0 4px rgba(2,4,10,1), 0 0 16px 2px ${a.glow}`,
        }}
      />
      <GlassCard
        variant="standard"
        className={`p-6 md:p-7 ${flip ? "lg:ml-2" : ""}`}
        causticHeader={
          <div className="px-6 pt-5 md:px-7 md:pt-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.25em]" style={{ color: a.solid }}>
                {exp.period}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-pearl/45">
                <Building2 className="h-3 w-3" /> {exp.company}
              </span>
            </div>
            <h3 className="mt-1 font-display text-xl font-semibold text-pearl">
              {exp.role}
            </h3>
            <div className="mt-1 flex items-center gap-3 text-xs text-pearl/50">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" /> {exp.location}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarClock className="h-3 w-3" /> {exp.period}
              </span>
            </div>
          </div>
        }
      >
        <p className="mt-4 fluid-type-body text-pearl/70">{exp.description}</p>
        <ul className="mt-4 flex flex-col gap-2">
          {exp.achievements.map((ach) => (
            <li
              key={ach}
              className="flex items-start gap-2 text-sm text-pearl/75"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: a.solid }}
              />
              {ach}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          {exp.stack.map((s) => (
            <span
              key={s}
              className="rounded-full px-2.5 py-1 text-[11px] font-medium text-pearl/85"
              style={{
                background: a.chip,
                border: `1px solid ${a.border}`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
