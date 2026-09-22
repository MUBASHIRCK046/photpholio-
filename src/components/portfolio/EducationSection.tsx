"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  GraduationCap,
  Medal,
  ShieldCheck,
  BadgeCheck,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Calendar,
  Building,
  Trophy,
  Star,
  Layers,
} from "lucide-react";
import {
  education,
  honors,
  certifications,
  softSkills,
  profile,
} from "@/lib/cv-data";
import SectionHeading from "./SectionHeading";

type TabKey = "all" | "degrees" | "certifications" | "honors";

export default function EducationSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  return (
    <section
      id="education"
      className="relative px-4 py-28 md:py-36 scroll-mt-20 overflow-hidden"
    >
      {/* Ambient background glow orbs — GPU optimized */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-[50px] will-change-transform"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-10 h-80 w-80 rounded-full bg-rose-500/10 blur-[50px] will-change-transform"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Page 05 Indicator Pill */}
        <div className="mb-4 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 rounded-full border border-amber-400/30 bg-amber-950/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300 backdrop-blur-xl shadow-xl shadow-amber-950/30"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            Page 05 · Academic Pedigree &amp; Accreditations
          </motion.div>
        </div>

        <SectionHeading
          eyebrow="Foundations &amp; Recognition"
          title={
            <span className="tracking-tight font-bold text-white">
              Academic Excellence &amp;{" "}
              <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal tracking-wide text-white drop-shadow-[0_2px_16px_rgba(255,255,255,0.25)]">
                Verified Credentials
              </span>
            </span>
          }
          description="Formal computer applications degrees, verified technical specializations, leadership honors, and certified proficiencies."
        />

        {/* Dynamic Category Tab Switcher */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {[
            { key: "all", label: "Complete Credentials", icon: Layers },
            { key: "degrees", label: "Academic Degrees", icon: GraduationCap },
            { key: "certifications", label: "Certifications", icon: ShieldCheck },
            { key: "honors", label: "Honors &amp; Milestones", icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as TabKey)}
                className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 ${
                  isSelected
                    ? "text-stone-900 shadow-lg shadow-amber-400/20"
                    : "glass-pill text-pearl/70 hover:text-pearl hover:border-amber-400/30"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="active-education-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-rose-300"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5" />
                  <span dangerouslySetInnerHTML={{ __html: tab.label }} />
                </span>
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Balanced Luxury Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left Column: Academic Degrees + Soft Skills */}
          <div className="flex flex-col gap-8">
            {/* 1. Academic Degrees */}
            {(activeTab === "all" || activeTab === "degrees") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/85">
                  <BookOpen className="h-4 w-4 text-amber-300" />
                  Formal Academic Degrees
                </div>

                <div className="grid gap-5">
                  {education.map((edu, i) => (
                    <motion.div
                      key={edu.degree}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="group relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-6 md:p-7 backdrop-blur-2xl shadow-xl transition-all duration-300 hover:border-amber-400/50 hover:shadow-amber-950/30"
                    >
                      {/* Ambient background hover shimmer */}
                      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                        {/* Illuminated Crest Plaque */}
                        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-rose-400 p-0.5 shadow-lg shadow-amber-500/20">
                          <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0d0f17]">
                            <GraduationCap className="h-8 w-8 text-amber-300 transition-transform duration-300 group-hover:scale-110" />
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            {edu.status === "ongoing" ? (
                              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-950/60 px-3 py-1 text-[11px] font-bold text-amber-300 shadow-sm shadow-amber-900/30">
                                <span className="relative flex h-2 w-2">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                                </span>
                                Ongoing · Currently Pursuing
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-950/40 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                Conferred Degree
                              </span>
                            )}
                            <span className="flex items-center gap-1.5 font-mono text-xs text-pearl/50">
                              <Calendar className="h-3 w-3 text-amber-400/70" />
                              {edu.period}
                            </span>
                          </div>

                          <h3 className="mt-2.5 font-display text-lg font-bold text-pearl group-hover:text-amber-200 transition">
                            {edu.degree}
                          </h3>

                          <p className="mt-1 flex items-center gap-2 text-sm font-medium text-amber-300/90">
                            <Building className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                            {edu.institution}
                          </p>

                          <p className="mt-3 text-sm leading-relaxed text-pearl/70">
                            {edu.detail}
                          </p>

                          {"skills" in edu && Array.isArray(edu.skills) && (
                            <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                              {edu.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-amber-200/90"
                                >
                                  <Sparkles className="h-2.5 w-2.5 text-amber-300" />
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 2. Core Soft Strengths & Leadership Constellation */}
            {(activeTab === "all" || activeTab === "honors") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/85 mb-3.5">
                  <Star className="h-3.5 w-3.5 text-amber-300" />
                  Leadership &amp; Professional Attributes
                </div>

                <div className="flex flex-wrap gap-2">
                  {softSkills.map((s) => (
                    <motion.span
                      key={s}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/5 px-3.5 py-1.5 text-xs font-medium text-pearl/90 hover:border-amber-400/50 hover:bg-amber-400/15 transition cursor-pointer"
                    >
                      <Sparkles className="h-3 w-3 text-amber-300" />
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Verified Certifications + Honors Ribbon */}
          <div className="flex flex-col gap-8">
            {/* 1. Professional Certifications */}
            {(activeTab === "all" || activeTab === "certifications") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/85">
                    <ShieldCheck className="h-4 w-4 text-amber-300" />
                    Verified Accreditations &amp; Certifications
                  </div>
                  <span className="text-[11px] text-pearl/40">
                    Click verify to view on LinkedIn
                  </span>
                </div>

                <div className="grid gap-3.5">
                  {certifications.map((c, idx) => (
                    <motion.div
                      key={c.title}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ x: 6, transition: { duration: 0.15 } }}
                      className="group relative flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/40 hover:bg-white/[0.04]"
                    >
                      <div className="flex items-center gap-3.5 min-w-0 flex-1">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 transition-all duration-300 group-hover:bg-amber-400 group-hover:text-stone-900 shadow-sm">
                          <BadgeCheck className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-sm font-semibold text-pearl group-hover:text-amber-200 transition">
                            {c.title}
                          </h4>
                          <p className="truncate text-xs text-pearl/50 mt-0.5">
                            {c.issuer} ·{" "}
                            <span className="text-amber-300/70">{c.scope}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-400 hover:text-stone-900 shadow-sm"
                          aria-label={`Verify ${c.title} on LinkedIn`}
                        >
                          <span>Verify</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 2. Honors & Leadership Ribbon */}
            {(activeTab === "all" || activeTab === "honors") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-7 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/85 mb-4">
                  <Trophy className="h-4 w-4 text-amber-300" />
                  Honors, Athletics &amp; Leadership
                </div>

                <div className="flex flex-col gap-3">
                  {honors.map((h) => (
                    <motion.div
                      key={h}
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-white/[0.04]"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-400/15 text-amber-300">
                        <Award className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs leading-relaxed text-pearl/85">{h}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Upscaled Visual Proof Card */}
                <div className="mt-5 overflow-hidden rounded-2xl border border-amber-400/25 bg-black/40 p-3">
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl">
                    <img
                      src="/photos/milestone-award-upscaled.jpg"
                      alt="Official Felicitation & Award Presentation — College Club Head & Champion"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-white drop-shadow">
                        Official Felicitation &amp; Leadership Award Presentation
                      </span>
                      <span className="rounded-full bg-amber-400/20 border border-amber-300/40 px-2 py-0.5 text-[9px] font-mono text-amber-200 uppercase">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
