"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Briefcase,
  GraduationCap,
  Layers,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Code2,
  Cpu,
  ShieldCheck,
  Building2,
  MapPin,
  CalendarClock,
  Compass,
} from "lucide-react";
import LiquidBackground from "@/components/portfolio/LiquidBackground";
import SmoothScrollProvider from "@/components/portfolio/SmoothScrollProvider";
import SoundEffectsProvider from "@/components/portfolio/SoundEffectsProvider";
import MouseGlow from "@/components/portfolio/MouseGlow";
import CausticFilters from "@/components/portfolio/CausticFilters";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import Footer from "@/components/portfolio/Footer";
import GlassCard from "@/components/portfolio/GlassCard";
import SectionHeading from "@/components/portfolio/SectionHeading";
import { projects, profile } from "@/lib/cv-data";
import { accentMap } from "@/components/portfolio/accents";

type ProjectCategory = "all" | "ai" | "blockchain" | "fintech" | "civic";

export default function ExperiencePage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "ai") return p.stack.some((s) => s.includes("AI") || s.includes("Vision") || s.includes("Deep Learning"));
    if (activeCategory === "blockchain") return p.stack.some((s) => s.includes("Blockchain") || s.includes("Security"));
    if (activeCategory === "fintech") return p.stack.some((s) => s.includes("Ledger") || s.includes("Next.js") || s.includes("MySQL"));
    if (activeCategory === "civic") return p.stack.some((s) => s.includes("Firebase") || s.includes("Geo"));
    return true;
  });

  return (
    <SmoothScrollProvider>
      <SoundEffectsProvider>
        <LiquidBackground />
        <CausticFilters />
        <MouseGlow />

        {/* Dedicated Floating Top Dock */}
        <header className="sticky top-6 z-40 mx-auto flex max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full glass-pill border border-cyan-400/30 bg-black/40 px-4 py-2 text-xs font-semibold text-pearl shadow-lg hover:border-cyan-400/60 transition"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-cyan-300" />
              <span>Back to Portfolio</span>
            </Link>

            <Link
              href="/education"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full glass-pill border border-amber-400/30 bg-black/30 px-3.5 py-2 text-xs font-medium text-amber-200 hover:border-amber-400/60 transition"
            >
              <GraduationCap className="h-3.5 w-3.5 text-amber-300" />
              <span>Page 02 · Education</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/60 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              <span>Page 03 · Active</span>
            </div>

            <Link
              href="/#home"
              className="flex h-9 w-9 items-center justify-center rounded-full glass-pill text-pearl/80 hover:text-pearl transition"
              aria-label="Home"
            >
              <Home className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <main className="relative z-10 flex min-h-screen flex-col pt-8">
          {/* Dedicated Page 03 Hero Banner */}
          <section className="relative px-4 pt-10 pb-8 md:pt-16 md:pb-12">
            <div className="mx-auto max-w-7xl text-center">
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-950/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300 backdrop-blur-xl shadow-xl shadow-cyan-950/30 mb-6"
              >
                <Briefcase className="h-3.5 w-3.5 text-cyan-300" />
                <span>Page 03 · Career Experience &amp; Applied Systems</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-pearl text-shadow-strong"
              >
                Engineering Resilient Architectures &amp;{" "}
                <br className="hidden md:inline" />
                <span className="text-gradient-liquid">Industry Software</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mx-auto mt-6 max-w-3xl text-sm sm:text-base md:text-lg text-pearl/75 text-shadow-soft leading-relaxed"
              >
                Practical software engineering immersion with the ICT Academy of Kerala, 
                applied blockchain verification systems, computer vision classroom analytics, 
                and scalable full-stack web solutions.
              </motion.p>

              {/* Key Metrics Quick Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-10 mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
              >
                <GlassCard className="p-4 text-center border border-cyan-400/20">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-cyan-300">4+</div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-pearl/70">
                    Production Builds
                  </div>
                </GlassCard>

                <GlassCard className="p-4 text-center border border-violet-400/20">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-violet-300">ICTAK</div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-pearl/70">
                    Industry Immersion
                  </div>
                </GlassCard>

                <GlassCard className="p-4 text-center border border-amber-400/20">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-amber-300">AI · Chain</div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-pearl/70">
                    Core Specialization
                  </div>
                </GlassCard>

                <GlassCard className="p-4 text-center border border-emerald-400/20">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-emerald-300">UAE</div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-pearl/70">
                    Driving License
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </section>

          {/* Section 1: Experience Flow with 3D Floating Prism */}
          <ExperienceSection />

          {/* Section 2: Deep-Dive Featured Engineered Systems */}
          <section className="relative px-4 py-20 md:py-28">
            <div className="mx-auto max-w-7xl">
              <SectionHeading
                eyebrow="Engineered Platforms"
                title={
                  <>
                    Flagship Systems &amp;{" "}
                    <span className="text-gradient-liquid">Applied Projects</span>
                  </>
                }
                description="High-fidelity breakdown of production systems built across healthcare verification, computer vision, property FinTech, and cloud public safety."
              />

              {/* Category Filter Tabs */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                {[
                  { key: "all", label: "All Systems (4)", icon: Layers },
                  { key: "ai", label: "Computer Vision & AI", icon: Cpu },
                  { key: "blockchain", label: "Blockchain & Security", icon: ShieldCheck },
                  { key: "fintech", label: "FinTech & Web", icon: Code2 },
                  { key: "civic", label: "Cloud Civic Tech", icon: Compass },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeCategory === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveCategory(tab.key as ProjectCategory)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                        isActive
                          ? "border border-cyan-400 bg-cyan-400/20 text-cyan-200 shadow-lg shadow-cyan-500/20 backdrop-blur-xl scale-105"
                          : "border border-white/10 bg-white/[0.02] text-pearl/70 hover:border-white/20 hover:text-pearl backdrop-blur-md"
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${isActive ? "text-cyan-300" : "text-pearl/60"}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Projects Grid */}
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {filteredProjects.map((p) => {
                  const a = accentMap[p.accent];
                  return (
                    <GlassCard
                      key={p.name}
                      variant="strong"
                      className="flex flex-col justify-between p-6 md:p-8 transition-all duration-300 hover:border-cyan-400/40"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="flex h-2.5 w-2.5 rounded-full animate-ping"
                              style={{ background: a.solid }}
                            />
                            <h3 className="font-display text-2xl font-bold text-pearl">
                              {p.name}
                            </h3>
                          </div>
                          <span
                            className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md shrink-0"
                            style={{
                              background: a.chip,
                              color: a.solid,
                              border: `1px solid ${a.border}`,
                            }}
                          >
                            Production Build
                          </span>
                        </div>

                        <p
                          className="mt-1.5 text-xs font-semibold uppercase tracking-wider"
                          style={{ color: a.solid }}
                        >
                          {p.type}
                        </p>

                        <p className="mt-4 text-sm leading-relaxed text-pearl/75">
                          {p.description}
                        </p>

                        {/* Architecture Highlights */}
                        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-pearl/50 mb-3">
                            Key Architectural Highlights
                          </h4>
                          <ul className="flex flex-col gap-2.5">
                            {p.highlights.map((h) => (
                              <li
                                key={h}
                                className="flex items-start gap-2.5 text-xs text-pearl/80"
                              >
                                <CheckCircle2
                                  className="h-4 w-4 shrink-0 mt-0.5"
                                  style={{ color: a.solid }}
                                />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Tech Stack Pills & Action */}
                      <div className="mt-6 flex flex-col gap-4 pt-4 border-t border-white/10">
                        <div className="flex flex-wrap gap-2">
                          {p.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-full px-3 py-1 text-[11px] font-medium text-pearl/90 glass-pill border border-white/15"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <a
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition"
                          >
                            <span>Explore Repository</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>

                          <a
                            href="/#contact"
                            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-stone-900"
                          >
                            <span>Discuss Architecture</span>
                            <ArrowRight className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Cross-Page Pagination Navigation Ribbon */}
          <section className="relative px-4 pb-20">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/education"
                  className="group relative flex items-center justify-between rounded-3xl border border-amber-400/30 bg-amber-950/20 p-6 backdrop-blur-xl transition hover:border-amber-400/60 hover:bg-amber-950/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300 group-hover:bg-amber-400 group-hover:text-stone-900 transition">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300/80">
                        Previous Section
                      </span>
                      <h4 className="font-display text-base font-bold text-pearl group-hover:text-amber-200 transition">
                        Page 02 · Education &amp; Accreditations
                      </h4>
                    </div>
                  </div>
                  <ArrowLeft className="h-5 w-5 text-amber-300 transition group-hover:-translate-x-1" />
                </Link>

                <Link
                  href="/#contact"
                  className="group relative flex items-center justify-between rounded-3xl border border-cyan-400/30 bg-cyan-950/20 p-6 backdrop-blur-xl transition hover:border-cyan-400/60 hover:bg-cyan-950/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 group-hover:bg-cyan-400 group-hover:text-stone-900 transition">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300/80">
                        Ready to Connect
                      </span>
                      <h4 className="font-display text-base font-bold text-pearl group-hover:text-cyan-200 transition">
                        Initiate Collaboration · Contact
                      </h4>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-cyan-300 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </SoundEffectsProvider>
    </SmoothScrollProvider>
  );
}
