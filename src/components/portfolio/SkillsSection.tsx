"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Wrench,
  Boxes,
  ShieldCheck,
  Brain,
  Megaphone,
} from "lucide-react";
import { skillsCore, skillsTools, projects } from "@/lib/cv-data";
import GlassCard from "./GlassCard";
import InfiniteMarquee from "./InfiniteMarquee";
import SectionHeading from "./SectionHeading";
import { accentMap } from "./accents";

function SkillChip({
  label,
  icon: Icon,
}: {
  label: string;
  icon?: typeof Cpu;
}) {
  return (
    <div className="group relative mx-2 flex items-center gap-2 rounded-full glass-pill px-4 py-2.5 text-sm font-medium text-pearl/85">
      {Icon ? <Icon className="h-4 w-4 text-cyan-300" /> : null}
      {label}
      {/* glow-on-hover tooltip */}
      <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full glass-pill px-3 py-1 text-[10px] text-pearl/70 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-bottom-10">
        {label}
      </span>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Interactive Skill Mesh"
          title="Tools, languages & systems I build with"
          description="Dual infinite ticker streams — hover to slow them down and reveal frosted glass tooltips."
        />

        <div className="mt-12 flex flex-col gap-5">
          {/* Rail A — leftward, core */}
          <div>
            <div className="mb-2 flex items-center gap-2 px-2 text-xs font-medium uppercase tracking-[0.3em] text-cyan-300/80">
              <Boxes className="h-3.5 w-3.5" />
              Core Architecture &amp; Languages
            </div>
            <InfiniteMarquee direction={1} baseVelocity={3}>
              {skillsCore.map((s) => (
                <SkillChip key={s} label={s} icon={Cpu} />
              ))}
            </InfiniteMarquee>
          </div>

          {/* Rail B — rightward, tools */}
          <div>
            <div className="mb-2 flex items-center gap-2 px-2 text-xs font-medium uppercase tracking-[0.3em] text-violet-300/80">
              <Wrench className="h-3.5 w-3.5" />
              Frameworks, Libraries &amp; Tools
            </div>
            <InfiniteMarquee direction={-1} baseVelocity={2.2}>
              {skillsTools.map((s) => (
                <SkillChip key={s} label={s} />
              ))}
            </InfiniteMarquee>
          </div>
        </div>

        {/* Featured project (infinite wrap candidate) */}
        <div className="mt-16">
          <SectionHeading eyebrow="Featured Build" title="Projects" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {projects.map((p) => {
              const a = accentMap[p.accent];
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.6 }}
                >
                  <GlassCard variant="strong" className="h-full p-6 md:p-8">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-2xl font-bold text-pearl">
                        {p.name}
                      </h3>
                      <span
                        className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                        style={{ background: a.chip, color: a.solid, border: `1px solid ${a.border}` }}
                      >
                        Featured
                      </span>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-wider text-pearl/45">
                      {p.type}
                    </p>
                    <p className="mt-4 fluid-type-body text-pearl/70">
                      {p.description}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {p.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm text-pearl/75"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: a.solid }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full px-2.5 py-1 text-[11px] font-medium text-pearl/85"
                          style={{ background: a.chip, border: `1px solid ${a.border}` }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}

            {/* Capability cards */}
            <div className="grid gap-6 sm:grid-cols-1">
              <GlassCard className="p-6">
                <Brain className="h-6 w-6 text-cyan-300" />
                <h4 className="mt-3 font-display text-lg font-semibold text-pearl">
                  Artificial Intelligence
                </h4>
                <p className="mt-1 text-sm text-pearl/65">
                  Fundamentals of ML, neural networks, and applied AI for
                  real-world authenticity &amp; detection systems.
                </p>
              </GlassCard>
              <GlassCard className="p-6">
                <ShieldCheck className="h-6 w-6 text-violet-300" />
                <h4 className="mt-3 font-display text-lg font-semibold text-pearl">
                  Cybersecurity
                </h4>
                <p className="mt-1 text-sm text-pearl/65">
                  Network security basics, threat modeling, and secure
                  verification pipelines for trust-critical products.
                </p>
              </GlassCard>
              <GlassCard className="p-6">
                <Megaphone className="h-6 w-6 text-indigo-300" />
                <h4 className="mt-3 font-display text-lg font-semibold text-pearl">
                  Digital Marketing
                </h4>
                <p className="mt-1 text-sm text-pearl/65">
                  SEO, content strategy, and analytics to grow and measure
                  digital product reach.
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
