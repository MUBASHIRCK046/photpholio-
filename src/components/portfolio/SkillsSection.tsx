"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Terminal,
  Database,
  Cpu,
  ShieldCheck,
  Brain,
  GitBranch,
  Github,
  Laptop,
  FileCode,
  Palette,
  FileSpreadsheet,
  Sparkles,
  Globe,
  Boxes,
  CheckCircle2,
  TrendingUp,
  Activity,
  Zap,
  Flame,
  Cloud,
  Server,
} from "lucide-react";
import { projects } from "@/lib/cv-data";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import { accentMap } from "./accents";

type CategoryKey = "all" | "languages" | "security_ai" | "tools" | "productivity";

interface SkillData {
  id: string;
  name: string;
  category: CategoryKey;
  categoryName: string;
  badge: string;
  level: number; // percentage
  icon: typeof Code2;
  accent: "cyan" | "violet" | "emerald" | "amber" | "blue";
  desc: string;
  synergy: string;
}

const ALL_SKILLS: SkillData[] = [
  // Languages & Core Architecture
  {
    id: "python",
    name: "Python",
    category: "languages",
    categoryName: "Core Architecture",
    badge: "Advanced",
    level: 95,
    icon: Code2,
    accent: "cyan",
    desc: "AI model development, automated data pipelines, computer vision & scripting.",
    synergy: "OpenCV · MediaPipe · FastAPI · PyTorch",
  },
  {
    id: "java",
    name: "Java",
    category: "languages",
    categoryName: "Core Architecture",
    badge: "Core Stack",
    level: 88,
    icon: Cpu,
    accent: "blue",
    desc: "Object-oriented backend services, enterprise application logic & robust architecture.",
    synergy: "OOP · Data Structures · Design Patterns",
  },
  {
    id: "c",
    name: "C",
    category: "languages",
    categoryName: "Core Architecture",
    badge: "Systems",
    level: 82,
    icon: Terminal,
    accent: "violet",
    desc: "Low-level memory management, pointers, and foundational computer science algorithms.",
    synergy: "Memory Optimization · Systems Programming",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    categoryName: "Web & Systems",
    badge: "Fullstack",
    level: 90,
    icon: Globe,
    accent: "amber",
    desc: "Client-side reactivity, modern asynchronous APIs, node runtimes & dynamic user experiences.",
    synergy: "ES6+ · Async/Await · DOM · REST APIs",
  },
  {
    id: "htmlcss",
    name: "HTML/CSS",
    category: "languages",
    categoryName: "Web & Systems",
    badge: "Modern UI",
    level: 94,
    icon: Palette,
    accent: "cyan",
    desc: "High-index glassmorphism, responsive fluid viewports, custom CSS shaders & keyframes.",
    synergy: "Tailwind CSS · Fluid Typography · Animations",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "languages",
    categoryName: "Databases",
    badge: "Relational",
    level: 86,
    icon: Database,
    accent: "emerald",
    desc: "Relational database schema design, complex JOIN queries, indexing & data integrity.",
    synergy: "Relational Schemas · SQL · Query Optimization",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "languages",
    categoryName: "Backend & Runtime",
    badge: "Runtime",
    level: 90,
    icon: Server,
    accent: "emerald",
    desc: "Asynchronous event-driven JavaScript runtime, server-side microservices, and high-throughput backend APIs.",
    synergy: "Express.js · REST APIs · npm · Full-Stack Web",
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    category: "languages",
    categoryName: "API Architecture",
    badge: "Integration",
    level: 94,
    icon: Globe,
    accent: "cyan",
    desc: "Stateless HTTP services, JSON payloads, endpoint security, rate limiting & robust full-stack data communication.",
    synergy: "FastAPI · Express · Postman · HTTP Protocols",
  },

  // AI & Cybersecurity
  {
    id: "ai-tools",
    name: "AI Tools & Models",
    category: "security_ai",
    categoryName: "Artificial Intelligence",
    badge: "Specialized",
    level: 92,
    icon: Brain,
    accent: "cyan",
    desc: "Applied deep learning, computer vision behavioral models, and intelligent automated detection.",
    synergy: "VisionAttend AI · Medshield AI · Neural Prompting",
  },
  {
    id: "security",
    name: "Network Security",
    category: "security_ai",
    categoryName: "Cybersecurity",
    badge: "Defensive",
    level: 85,
    icon: ShieldCheck,
    accent: "violet",
    desc: "Network threat monitoring, protocol vulnerability assessment, hardening & policy enforcement.",
    synergy: "Firewall Rules · Audit Trails · Packet Analysis",
  },
  {
    id: "blockchain",
    name: "Blockchain & QR Security",
    category: "security_ai",
    categoryName: "Trust Architecture",
    badge: "Cryptographic",
    level: 88,
    icon: Boxes,
    accent: "blue",
    desc: "Decentralized verification pipelines, tamper-evident audits & cryptographic QR authentication.",
    synergy: "Smart Contracts · Cryptography · Authenticity",
  },

  // Developer Workflow & Tools
  {
    id: "git",
    name: "Git",
    category: "tools",
    categoryName: "Dev Tools",
    badge: "Version Control",
    level: 92,
    icon: GitBranch,
    accent: "amber",
    desc: "Distributed version control, branch isolation, merge workflows & atomic commits.",
    synergy: "Branching Strategy · Conflict Resolution",
  },
  {
    id: "github",
    name: "GitHub",
    category: "tools",
    categoryName: "Dev Tools",
    badge: "CI/CD & Remote",
    level: 90,
    icon: Github,
    accent: "violet",
    desc: "Remote collaboration, pull request reviews, repository management & team syncing.",
    synergy: "GitHub Actions · Issue Tracking · Open Source",
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "tools",
    categoryName: "Dev Tools",
    badge: "Environment",
    level: 95,
    icon: Laptop,
    accent: "blue",
    desc: "Advanced workspace configuration, integrated debugging, multi-target toolchains & linting.",
    synergy: "Extensions · Debugger · Terminal Workflows",
  },
  {
    id: "firebase-firestore",
    name: "Firebase Firestore",
    category: "tools",
    categoryName: "Cloud Database",
    badge: "NoSQL Cloud",
    level: 91,
    icon: Flame,
    accent: "amber",
    desc: "Real-time document-oriented NoSQL database with offline persistence, real-time listeners, and granular security rules.",
    synergy: "SafeCity · Google Cloud · Realtime Sync · Auth",
  },
  {
    id: "cloud-storage",
    name: "Cloud Storage",
    category: "tools",
    categoryName: "Cloud Infrastructure",
    badge: "Blob Storage",
    level: 89,
    icon: Cloud,
    accent: "blue",
    desc: "Scalable object and file storage, media CDN delivery, bucket access policies & encrypted cloud assets.",
    synergy: "Firebase Storage · S3 · CDN Delivery · SafeCity",
  },

  // Creative, Analytics & Productivity
  {
    id: "canva",
    name: "Canva",
    category: "productivity",
    categoryName: "Design & Media",
    badge: "Visual Assets",
    level: 88,
    icon: Sparkles,
    accent: "cyan",
    desc: "High-impact visual brand assets, campaign posters, vector graphics & digital marketing collaterals.",
    synergy: "Brand Identity · Marketing Collateral · Social Assets",
  },
  {
    id: "excel",
    name: "MS Excel",
    category: "productivity",
    categoryName: "Analytics & Finance",
    badge: "Advanced",
    level: 94,
    icon: FileSpreadsheet,
    accent: "emerald",
    desc: "Complex data modeling, automated financial formulas, ledger balancing & fiscal yield reports.",
    synergy: "EstateLedger · Financial Analytics · VLOOKUP/Pivots",
  },
  {
    id: "word",
    name: "MS Word",
    category: "productivity",
    categoryName: "Documentation",
    badge: "Technical",
    level: 90,
    icon: FileCode,
    accent: "blue",
    desc: "Formal software requirement specifications, project briefs, and technical whitepapers.",
    synergy: "Technical Writing · Specifications · Formatted Reports",
  },
  {
    id: "rapid-apps",
    name: "Rapid App Development",
    category: "languages",
    categoryName: "Fullstack Systems",
    badge: "App in a Day",
    level: 92,
    icon: Zap,
    accent: "amber",
    desc: "Fast-turnaround web & mobile prototyping, cloud-connected databases, and rapid zero-to-one product deployment.",
    synergy: "ICTAK · Build an App in a Day · React · APIs",
  },
  {
    id: "video-editing",
    name: "Video Editing & Content",
    category: "productivity",
    categoryName: "Media & Marketing",
    badge: "Creative",
    level: 90,
    icon: Palette,
    accent: "violet",
    desc: "Dynamic motion storytelling, pacing, color grading, and creative video production for high-engagement digital marketing.",
    synergy: "Digital Marketing · Short-form Video · Campaign Assets",
  },
  {
    id: "powerpoint",
    name: "MS PowerPoint",
    category: "productivity",
    categoryName: "Presentations",
    badge: "Executive",
    level: 92,
    icon: TrendingUp,
    accent: "amber",
    desc: "Executive slide decks, architecture walkthroughs, stakeholder demos & visual pitch storytelling.",
    synergy: "Pitch Decks · Architecture Diagrams · Keynotes",
  },
];

const ACCENT_STYLES = {
  cyan: {
    border: "border-amber-300/40 hover:border-amber-300",
    glow: "shadow-[0_0_20px_rgba(245,208,137,0.35)]",
    solid: "#f5d089",
    text: "text-amber-200",
    bg: "rgba(245,208,137,0.12)",
    pill: "bg-amber-500/20 text-amber-200 border-amber-400/40",
  },
  violet: {
    border: "border-rose-400/40 hover:border-rose-400",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.35)]",
    solid: "#f43f5e",
    text: "text-rose-300",
    bg: "rgba(244,63,94,0.12)",
    pill: "bg-rose-500/20 text-rose-200 border-rose-400/40",
  },
  blue: {
    border: "border-blue-400/40 hover:border-blue-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.35)]",
    solid: "#3b82f6",
    text: "text-blue-300",
    bg: "rgba(59,130,246,0.12)",
    pill: "bg-blue-500/20 text-blue-200 border-blue-400/40",
  },
  emerald: {
    border: "border-emerald-400/40 hover:border-emerald-400",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.35)]",
    solid: "#10b981",
    text: "text-emerald-300",
    bg: "rgba(16,185,129,0.12)",
    pill: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40",
  },
  amber: {
    border: "border-amber-400/40 hover:border-amber-400",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.35)]",
    solid: "#f59e0b",
    text: "text-amber-300",
    bg: "rgba(245,158,11,0.12)",
    pill: "bg-amber-500/20 text-amber-200 border-amber-400/40",
  },
};

const FILTER_TABS: { key: CategoryKey; label: string; count: number }[] = [
  { key: "all", label: "All Technologies", count: ALL_SKILLS.length },
  {
    key: "languages",
    label: "Languages & Core",
    count: ALL_SKILLS.filter((s) => s.category === "languages").length,
  },
  {
    key: "security_ai",
    label: "AI & Cybersecurity",
    count: ALL_SKILLS.filter((s) => s.category === "security_ai").length,
  },
  {
    key: "tools",
    label: "Dev Tools",
    count: ALL_SKILLS.filter((s) => s.category === "tools").length,
  },
  {
    key: "productivity",
    label: "Design & Office",
    count: ALL_SKILLS.filter((s) => s.category === "productivity").length,
  },
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<CategoryKey>("all");
  const [selectedSkill, setSelectedSkill] = useState<SkillData>(ALL_SKILLS[0]);

  const filteredSkills =
    activeTab === "all"
      ? ALL_SKILLS
      : ALL_SKILLS.filter((s) => s.category === activeTab);

  const activeAccent = ACCENT_STYLES[selectedSkill.accent];

  return (
    <section id="skills" className="relative px-4 py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Page 04 Indicator Pill */}
        <div className="mb-6 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 rounded-full border border-rose-400/30 bg-rose-950/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-rose-300 backdrop-blur-xl shadow-xl shadow-rose-950/30"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
            </span>
            <Cpu className="h-3.5 w-3.5 text-rose-300" />
            Page 04 · Interactive Intelligence &amp; Tech Matrix
          </motion.div>
        </div>

        <SectionHeading
          eyebrow="Interactive Tech Constellation"
          title="Skills, Systems & Intelligence Matrix"
          description="Hover or tap any floating node to trigger holographic telemetry, power ratings, and architecture synergies."
        />

        {/* 1. Category Switcher */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500/25 to-rose-500/25 text-white border border-amber-300 shadow-[0_0_24px_rgba(245,208,137,0.35)] scale-105"
                    : "glass-pill text-pearl/70 hover:text-white hover:border-white/25 hover:scale-102"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isActive
                      ? "bg-amber-300 text-slate-950"
                      : "bg-white/10 text-pearl/60"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Main Interactive Holographic Hub: Live HUD Telemetry + Floating Constellation */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-center">
          
          {/* LEFT: Live Holographic HUD Inspector */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[2.2rem] border border-amber-300/30 bg-gradient-to-b from-slate-950/80 to-slate-950/50 p-6 md:p-8 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
              {/* Animated HUD corner accents */}
              <div className="absolute top-3 left-3 h-3 w-3 border-t-2 border-l-2 border-amber-300/60" />
              <div className="absolute top-3 right-3 h-3 w-3 border-t-2 border-r-2 border-amber-300/60" />
              <div className="absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-amber-300/60" />
              <div className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-amber-300/60" />

              {/* Sweeping scanline */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-amber-300/5 to-transparent h-20 w-full animate-[scanline_4s_linear_infinite]" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-amber-300 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-200/80">
                    Live Telemetry
                  </span>
                </div>
                <span className="text-[10px] font-mono text-pearl/40">
                  NODE #{selectedSkill.id.toUpperCase()}
                </span>
              </div>

              {/* Active Skill Presentation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-xl shadow-lg transition-transform"
                      style={{
                        background: activeAccent.bg,
                        borderColor: activeAccent.solid,
                        boxShadow: `0 0 24px ${activeAccent.solid}40`,
                      }}
                    >
                      <selectedSkill.icon
                        className="h-7 w-7"
                        style={{ color: activeAccent.solid }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-2xl font-bold text-white">
                          {selectedSkill.name}
                        </h3>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${activeAccent.pill}`}
                        >
                          {selectedSkill.badge}
                        </span>
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-pearl/50 mt-1">
                        {selectedSkill.categoryName}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-pearl/85">
                    {selectedSkill.desc}
                  </p>

                  {/* Power Rating Bar */}
                  <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-mono text-pearl/60 uppercase tracking-wider">
                        Proficiency Index
                      </span>
                      <span
                        className="font-mono font-bold"
                        style={{ color: activeAccent.solid }}
                      >
                        {selectedSkill.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.level}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, #f5d089, ${activeAccent.solid})`,
                          boxShadow: `0 0 12px ${activeAccent.solid}`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Architecture Synergy */}
                  <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-pearl/75">
                    <Zap className="h-4 w-4 shrink-0 text-amber-300 mt-0.5" />
                    <div>
                      <span className="font-semibold text-pearl/90">Integrated Tech Stack: </span>
                      <span className="text-pearl/65 font-mono text-[11px]">{selectedSkill.synergy}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-pearl/40 font-mono">
                <span>SECTOR: 04 // ACTIVE</span>
                <span className="animate-pulse text-amber-300">● REAL-TIME READY</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Floating Constellation of Animated Holographic Nodes (NO RECTANGULAR CARDS!) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[2.5rem] border border-amber-400/20 bg-slate-950/40 p-8 sm:p-10 backdrop-blur-xl min-h-[460px] flex items-center justify-center overflow-hidden">
              
              {/* Radar Scanner Sweep Animation Line */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[2.5rem] overflow-hidden"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[150%] w-[150%] animate-[radar-sweep_12s_linear_infinite]">
                  <div className="h-1/2 w-1/2 origin-bottom-right bg-gradient-to-tl from-amber-300/15 via-rose-500/5 to-transparent blur-md" />
                </div>
              </div>

              {/* Concentric subtle radar circles */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-48 w-48 rounded-full border border-cyan-500/10 animate-ping opacity-25" style={{ animationDuration: "5s" }} />
                <div className="absolute h-80 w-80 rounded-full border border-dashed border-violet-500/15 animate-[spin-slow_40s_linear_infinite]" />
                <div className="absolute h-[110%] w-[110%] rounded-full border border-cyan-500/10" />
              </div>

              {/* Floating Skill Capsules / Spheres Grid */}
              <motion.div
                layout
                className="relative z-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4.5 max-w-xl"
              >
                <AnimatePresence mode="popLayout">
                  {filteredSkills.map((skill, index) => {
                    const isSelected = selectedSkill.id === skill.id;
                    const style = ACCENT_STYLES[skill.accent];
                    const Icon = skill.icon;

                    // Staggered floating animation durations
                    const floatDur = 3.5 + (index % 4) * 0.7;

                    return (
                      <motion.button
                        key={skill.id}
                        layout
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.25 }}
                        whileHover={{ scale: 1.08, y: -4 }}
                        whileTap={{ scale: 0.96 }}
                        onPointerEnter={() => setSelectedSkill(skill)}
                        onClick={() => setSelectedSkill(skill)}
                        className={`group relative flex items-center gap-2.5 rounded-full px-4.5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 backdrop-blur-xl ${
                          isSelected
                            ? `border-2 ${style.border} ${style.glow} bg-white/15 text-white scale-110 shadow-2xl`
                            : "glass-pill border border-white/20 text-pearl/80 hover:text-white hover:border-cyan-400/50 hover:bg-white/10"
                        }`}
                        style={{
                          boxShadow: isSelected
                            ? `0 0 25px ${style.solid}55, inset 0 1px 1px rgba(255,255,255,0.4)`
                            : undefined,
                        }}
                      >
                        {/* Glowing Beacon Dot */}
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${isSelected ? "animate-ping" : ""}`}
                          style={{
                            background: style.solid,
                            boxShadow: `0 0 10px ${style.solid}`,
                          }}
                        />

                        {/* Icon */}
                        <Icon
                          className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                            isSelected ? "text-white" : style.text
                          }`}
                        />

                        {/* Label */}
                        <span className="font-display font-medium text-sm">
                          {skill.name}
                        </span>

                        {/* Mini level indicator */}
                        <span className="text-[10px] font-mono text-pearl/50 pl-0.5">
                          {skill.level}%
                        </span>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 3. Core Strategic Pillars */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="Core Domains"
            title="Strategic Engineering Pillars"
            description="Deep specialization across artificial intelligence, cybersecurity architecture, and data-driven digital growth."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <GlassCard className="p-6 transition-transform duration-300 hover:scale-[1.02] border border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-500/30">
                  <Brain className="h-6 w-6 text-cyan-300" />
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold text-pearl">
                    Artificial Intelligence
                  </h4>
                  <p className="text-[11px] text-cyan-300/80">
                    Applied ML &amp; Vision Systems
                  </p>
                </div>
              </div>
              <p className="mt-3.5 text-xs leading-relaxed text-pearl/70">
                Practical deployment of machine learning models, computer vision pipelines for behavioral analytics, and intelligent detection systems for real-world authenticity verification.
              </p>
            </GlassCard>

            <GlassCard className="p-6 transition-transform duration-300 hover:scale-[1.02] border border-violet-500/20">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/30">
                  <ShieldCheck className="h-6 w-6 text-violet-300" />
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold text-pearl">
                    Cybersecurity Engineering
                  </h4>
                  <p className="text-[11px] text-violet-300/80">
                    Threat Modeling &amp; Hardening
                  </p>
                </div>
              </div>
              <p className="mt-3.5 text-xs leading-relaxed text-pearl/70">
                Network security fundamentals, defensive protocols, secure cloud storage policies, role-based access control (RBAC), and digital audit trails.
              </p>
            </GlassCard>

            <GlassCard className="p-6 transition-transform duration-300 hover:scale-[1.02] border border-amber-500/20">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30">
                  <TrendingUp className="h-6 w-6 text-amber-300" />
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold text-pearl">
                    Digital Growth &amp; Analytics
                  </h4>
                  <p className="text-[11px] text-amber-300/80">
                    SEO &amp; High-Impact Visuals
                  </p>
                </div>
              </div>
              <p className="mt-3.5 text-xs leading-relaxed text-pearl/70">
                Data-driven digital marketing, search engine optimization (SEO), campaign performance metrics, and modern creative branding assets.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* 4. Featured Projects Showcase (4 Projects Grid) */}
        <div id="projects" className="mt-24">
          <SectionHeading
            eyebrow="Featured Builds"
            title="Applied Projects"
            description="Production-grade platforms spanning healthcare verification, classroom computer vision, cloud civic safety, and real estate revenue engines."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((p) => {
              const a = accentMap[p.accent];
              return (
                <GlassCard
                  key={p.name}
                  variant="strong"
                  className="p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/40"
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
                        Featured Build
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
                        Key Architecture Highlights
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

                  {/* Tech Stack Pills */}
                  <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full px-3 py-1 text-[11px] font-medium text-pearl/90 glass-pill border border-white/15"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
