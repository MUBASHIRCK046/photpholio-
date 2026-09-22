import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import LiquidBackground from "@/components/portfolio/LiquidBackground";
import SmoothScrollProvider from "@/components/portfolio/SmoothScrollProvider";
import SoundEffectsProvider from "@/components/portfolio/SoundEffectsProvider";
import MouseGlow from "@/components/portfolio/MouseGlow";
import CausticFilters from "@/components/portfolio/CausticFilters";
import EducationSection from "@/components/portfolio/EducationSection";
import Footer from "@/components/portfolio/Footer";

export const metadata: Metadata = {
  title: "Page 02 · Education & Accreditations | Mubashir CK",
  description:
    "Academic credentials from KMCT College of Engineering / University of Calicut, certifications in Rapid App Development, Video Editing, AI, and Cybersecurity.",
};

export default function EducationPage() {
  return (
    <SmoothScrollProvider>
      <SoundEffectsProvider>
        <LiquidBackground />
        <CausticFilters />
        <MouseGlow />

        {/* Dedicated Back to Portfolio Floating Bar */}
        <header className="sticky top-6 z-40 mx-auto flex max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full glass-pill border border-amber-400/30 bg-black/40 px-4 py-2 text-xs font-semibold text-pearl shadow-lg hover:border-amber-400/60 transition"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-amber-300" />
              <span>Back to Portfolio</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/experience"
              className="inline-flex items-center gap-1.5 rounded-full glass-pill border border-cyan-400/40 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 shadow-lg hover:border-cyan-400/80 transition"
            >
              <span>Next: Page 03 · Experience</span>
              <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-cyan-300" />
            </Link>

            <Link
              href="/#home"
              className="flex h-9 w-9 items-center justify-center rounded-full glass-pill text-pearl/80 hover:text-pearl transition"
              aria-label="Home"
            >
              <Home className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <main className="relative z-10 flex min-h-screen flex-col pt-10">
          <EducationSection />

          {/* Forward Pagination Ribbon to Page 03 */}
          <section className="relative px-4 pb-20 pt-4">
            <div className="mx-auto max-w-4xl">
              <Link
                href="/experience"
                className="group relative flex items-center justify-between rounded-3xl border border-cyan-400/30 bg-cyan-950/20 p-6 backdrop-blur-xl transition hover:border-cyan-400/60 hover:bg-cyan-950/30 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300 group-hover:bg-cyan-400 group-hover:text-stone-900 transition">
                    <ArrowLeft className="h-6 w-6 rotate-180" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300/80">
                      Up Next · Dedicated Section
                    </span>
                    <h4 className="font-display text-base font-bold text-pearl group-hover:text-cyan-200 transition">
                      Page 03 · Career Experience &amp; Engineered Systems
                    </h4>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-cyan-300">
                  <span>Explore Systems</span>
                  <ArrowLeft className="h-4 w-4 rotate-180 transition group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </section>

          <Footer />
        </main>
      </SoundEffectsProvider>
    </SmoothScrollProvider>
  );
}
