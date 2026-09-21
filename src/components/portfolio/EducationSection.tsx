"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Medal, ShieldCheck, BadgeCheck } from "lucide-react";
import {
  education,
  honors,
  certifications,
  softSkills,
} from "@/lib/cv-data";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import { accentMap, type Accent } from "./accents";

export default function EducationSection() {
  return (
    <section id="education" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Education, Honors &amp; Accreditations"
          title="Foundations &amp; recognition"
          description="Academic credentials, professional certifications, and the honors that shaped the journey."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Education plaques */}
          <div className="flex flex-col gap-6">
            {education.map((edu, i) => {
              const a = accentMap[edu.accent as Accent];
              return (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                >
                  <GlassCard variant="strong" className="p-6 md:p-7">
                    <div className="flex items-start gap-4">
                      {/* metallic-gradient micro-badge */}
                      <div
                        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${a.solid}, rgba(255,255,255,0.85))`,
                          boxShadow:
                            "inset 0 1px 1px 0 rgba(255,255,255,0.6), inset 0 -1px 2px 0 rgba(0,0,0,0.4), 0 8px 20px -6px rgba(0,0,0,0.6)",
                        }}
                      >
                        <GraduationCap className="h-6 w-6 text-white drop-shadow" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-lg font-semibold text-pearl">
                          {edu.degree}
                        </h3>
                        <p className="mt-0.5 text-sm" style={{ color: a.solid }}>
                          {edu.institution}
                        </p>
                        <p className="text-xs text-pearl/50">{edu.board}</p>
                        <p className="mt-3 text-sm text-pearl/65">{edu.detail}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard className="p-6 md:p-7">
                <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-pearl/60">
                  <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />
                  Certifications
                </div>
                <ul className="flex flex-col gap-3">
                  {certifications.map((c) => {
                    const a = accentMap[c.accent as Accent];
                    return (
                      <li
                        key={c.title}
                        className="flex items-center gap-3 rounded-2xl glass-pill p-3"
                      >
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                          style={{
                            background: `linear-gradient(135deg, ${a.solid}, rgba(255,255,255,0.7))`,
                            boxShadow:
                              "inset 0 1px 1px 0 rgba(255,255,255,0.55), inset 0 -1px 2px 0 rgba(0,0,0,0.35)",
                          }}
                        >
                          <BadgeCheck className="h-4 w-4 text-white" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-pearl">
                            {c.title}
                          </p>
                          <p className="text-[11px] text-pearl/50">
                            {c.issuer} · {c.scope}
                          </p>
                        </div>
                        <a
                          href="#contact"
                          className="rounded-full glass-pill px-2.5 py-1 text-[10px] text-pearl/60 transition hover:text-pearl"
                          aria-label={`Verify ${c.title}`}
                        >
                          Verify
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </GlassCard>
            </motion.div>
          </div>

          {/* Honors + soft skills */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard variant="strong" className="p-6 md:p-7">
                <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-pearl/60">
                  <Medal className="h-3.5 w-3.5 text-amber-300" />
                  Honors &amp; Achievements
                </div>
                <ul className="flex flex-col gap-3">
                  {honors.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 text-sm text-pearl/80"
                    >
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                      {h}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard className="p-6 md:p-7">
                <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-pearl/60">
                  <BadgeCheck className="h-3.5 w-3.5 text-violet-300" />
                  Soft Skills
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {softSkills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full glass-pill px-3.5 py-2 text-xs font-medium text-pearl/85"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
