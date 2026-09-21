import LiquidBackground from "@/components/portfolio/LiquidBackground";
import SmoothScrollProvider from "@/components/portfolio/SmoothScrollProvider";
import MouseGlow from "@/components/portfolio/MouseGlow";
import CausticFilters from "@/components/portfolio/CausticFilters";
import HUDNavigation from "@/components/portfolio/HUDNavigation";
import HeroSection from "@/components/portfolio/HeroSection";
import NarrativeSection from "@/components/portfolio/NarrativeSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import EducationSection from "@/components/portfolio/EducationSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* fixed full-viewport fluid background engine */}
      <LiquidBackground />
      {/* global SVG caustic filters + cursor follow-light */}
      <CausticFilters />
      <MouseGlow />

      {/* HUD navigation dock */}
      <HUDNavigation />

      {/* Main content — sticky-footer layout (min-h-screen flex flex-col) */}
      <main className="relative z-10 flex min-h-screen flex-col">
        <HeroSection />
        <NarrativeSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
