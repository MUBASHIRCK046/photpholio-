"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  Cpu,
  FolderKanban,
  GraduationCap,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { nav } from "@/lib/cv-data";
import LiveClock from "./LiveClock";
import AudioToggle from "./AudioToggle";
import MagneticButton from "./MagneticButton";

const iconMap: Record<string, typeof Home> = {
  home: Home,
  user: User,
  briefcase: Briefcase,
  cpu: Cpu,
  folder: FolderKanban,
  graduation: GraduationCap,
  mail: Mail,
};

export default function HUDNavigation() {
  const [active, setActive] = useState<string>("#home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const ids = nav.map((n) => n.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Top floating dock */}
      <div className="fixed inset-x-0 top-3 z-50 flex justify-center px-3">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "flex items-center gap-1.5 rounded-full p-1.5 transition-all duration-500",
            "glass-pill"
          )}
          style={scrolled ? { paddingTop: 6, paddingBottom: 6 } : undefined}
        >
          {/* Beacon */}
          <div className="hidden items-center gap-2 pl-2 pr-1 md:flex">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[11px] font-medium tracking-wide text-pearl/80">
              Available for Hire
            </span>
          </div>

          <span className="mx-1 hidden h-5 w-px bg-pearl/10 md:block" />

          {/* Nav items */}
          <nav className="hidden items-center md:flex">
            {nav.map((item) => {
              const Icon = iconMap[item.icon];
              const isActive = active === item.href;
              return (
                <MagneticButton
                  key={item.href}
                  as="button"
                  strength={0.5}
                  onClick={() => go(item.href)}
                  className={cn(
                    "group relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                    isActive
                      ? "text-pearl"
                      : "text-pearl/55 hover:text-pearl/90"
                  )}
                  aria-label={item.label}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(6,182,212,0.22), rgba(124,58,237,0.22))",
                        boxShadow:
                          "inset 0 1px 1px 0 rgba(255,255,255,0.3), 0 6px 18px -6px rgba(6,182,212,0.4)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{item.label}</span>
                </MagneticButton>
              );
            })}
          </nav>

          <span className="mx-1 hidden h-5 w-px bg-pearl/10 md:block" />

          {/* Live clock */}
          <div className="hidden items-center px-2 lg:flex">
            <LiveClock className="text-[11px] font-mono text-pearl/65" />
          </div>

          {/* Audio toggle */}
          <AudioToggle className="ml-1" />

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-pearl/80 transition hover:text-pearl md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 top-20 z-50 md:hidden"
          >
            <div className="glass-strong rounded-3xl p-2">
              {nav.map((item) => {
                const Icon = iconMap[item.icon];
                const isActive = active === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => go(item.href)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition",
                      isActive
                        ? "bg-pearl/10 text-pearl"
                        : "text-pearl/70 hover:bg-pearl/5"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
              <div className="flex items-center justify-between border-t border-pearl/10 px-4 py-3">
                <LiveClock className="font-mono text-xs text-pearl/60" />
                <span className="flex items-center gap-2 text-xs text-pearl/60">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Available
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
