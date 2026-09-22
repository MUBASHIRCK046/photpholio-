"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Github,
  Linkedin,
  Send,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Globe,
} from "lucide-react";
import { profile } from "@/lib/cv-data";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import { toast } from "sonner";

export default function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <section id="contact" className="relative px-4 py-24 md:py-32 scroll-mt-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Direct Contact Channels"
          title="Let's build something intelligent"
          description="Reach out directly via phone, WhatsApp, email, or verified professional networks. Open to innovative roles, consultations, and technical engineering."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Direct Communication Channels */}
          <GlassCard variant="strong" className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-pearl/10 pb-4 mb-5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/90 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  Direct Channels &amp; Phone
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Available Now
                </span>
              </div>

              <div className="flex flex-col gap-3.5">
                {/* Email */}
                <DirectRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Direct Email"
                  value={profile.email}
                  onCopy={() => copy(profile.email, "email")}
                  copied={copied === "email"}
                  href={`mailto:${profile.email}`}
                  sub="Direct email correspondence"
                />

                {/* Phone UAE */}
                <DirectRow
                  icon={<Smartphone className="h-4 w-4" />}
                  label="Phone & WhatsApp (UAE)"
                  value={profile.phoneUAE || profile.phone}
                  onCopy={() => copy(profile.phoneUAE || profile.phone, "phoneUAE")}
                  copied={copied === "phoneUAE"}
                  href={`tel:${(profile.phoneUAE || profile.phone).replace(/\s/g, "")}`}
                  sub="Calls & WhatsApp available"
                />

                {/* Phone India */}
                <DirectRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone & WhatsApp (India)"
                  value={profile.phoneIndia || "+91 8089454197"}
                  onCopy={() => copy(profile.phoneIndia || "+91 8089454197", "phoneIndia")}
                  copied={copied === "phoneIndia"}
                  href={`tel:${(profile.phoneIndia || "+918089454197").replace(/\s/g, "")}`}
                  sub="Direct calls & messaging"
                />

                {/* Location */}
                <DirectRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Location & Mobility"
                  value={profile.location}
                  sub={profile.drivingLicense}
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-pearl/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-pearl/50">Fastest response via Phone & WhatsApp</span>
              <a
                href={`https://wa.me/${(profile.phoneUAE || profile.phone).replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition shadow-sm"
              >
                <Smartphone className="h-3.5 w-3.5" />
                Chat on WhatsApp
              </a>
            </div>
          </GlassCard>

          {/* Social Profiles & Quick Reach */}
          <div className="flex flex-col gap-6">
            <GlassCard variant="strong" className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="border-b border-pearl/10 pb-4 mb-5">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/90 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-amber-300" />
                    Verified Profiles &amp; Networks
                  </h3>
                  <p className="mt-1 text-xs text-pearl/55">
                    Connect directly through professional profiles and code repositories.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {/* LinkedIn */}
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl glass-pill p-3.5 transition hover:border-amber-400/40 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300 group-hover:scale-105 transition">
                        <Linkedin className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-pearl">LinkedIn</p>
                        <p className="text-xs text-pearl/50">{profile.linkedinHandle}</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-pearl/40 transition group-hover:translate-x-0.5 group-hover:text-amber-300" />
                  </a>

                  {/* GitHub */}
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl glass-pill p-3.5 transition hover:border-amber-400/40 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300 group-hover:scale-105 transition">
                        <Github className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-pearl">GitHub</p>
                        <p className="text-xs text-pearl/50">{profile.githubHandle}</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-pearl/40 transition group-hover:translate-x-0.5 group-hover:text-amber-300" />
                  </a>

                  {/* Direct Email Link */}
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center justify-between rounded-2xl glass-pill p-3.5 transition hover:border-amber-400/40 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-300 group-hover:scale-105 transition">
                        <Mail className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-pearl">Email Inbox</p>
                        <p className="text-xs text-pearl/50 truncate max-w-[220px]">{profile.email}</p>
                      </div>
                    </div>
                    <Send className="h-4 w-4 text-pearl/40 transition group-hover:translate-x-0.5 group-hover:text-amber-300" />
                  </a>
                </div>
              </div>

              {/* Direct action badge */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs text-pearl/70 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-300 shrink-0" />
                <p>
                  Open to full-time engineering roles, AI solutions architecture, and digital media in UAE &amp; globally.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function DirectRow({
  icon,
  label,
  value,
  sub,
  onCopy,
  copied,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  onCopy?: () => void;
  copied?: boolean;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl glass-pill p-3.5 transition hover:border-amber-400/30">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-pearl/45">
          {label}
        </p>
        <p className="truncate text-sm font-medium text-pearl">{value}</p>
        {sub ? <p className="truncate text-[11px] text-pearl/40">{sub}</p> : null}
      </div>
      <div className="flex items-center gap-1">
        {onCopy ? (
          <button
            type="button"
            onClick={onCopy}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-pearl/60 transition hover:bg-pearl/10 hover:text-pearl"
            aria-label={`Copy ${label}`}
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
        ) : null}
        {href ? (
          <a
            href={href}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-pearl/60 transition hover:bg-pearl/10 hover:text-pearl"
            aria-label={`Open ${label}`}
          >
            <Send className="h-3.5 w-3.5 text-amber-300" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
