"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/cv-data";
import MagneticButton from "./MagneticButton";

export default function Footer() {
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative z-10 mt-auto border-t border-pearl/10">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-semibold text-pearl">
              {profile.name}
            </p>
            <p className="text-xs text-pearl/50">
              {profile.title} · {profile.location}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <MagneticButton
              as="a"
              strength={0.4}
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="h-10 w-10 rounded-full glass-pill text-pearl/75 hover:text-pearl"
            >
              <Github className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              as="a"
              strength={0.4}
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="h-10 w-10 rounded-full glass-pill text-pearl/75 hover:text-pearl"
            >
              <Linkedin className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              as="a"
              strength={0.4}
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="h-10 w-10 rounded-full glass-pill text-pearl/75 hover:text-pearl"
            >
              <Mail className="h-4 w-4" />
            </MagneticButton>
          </div>

          <MagneticButton
            as="button"
            strength={0.4}
            onClick={scrollTop}
            className="group flex items-center gap-2 rounded-full glass-pill px-4 py-2.5 text-xs font-medium text-pearl/80 hover:text-pearl"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
