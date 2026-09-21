"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Github,
  Linkedin,
  Send,
  Loader2,
} from "lucide-react";
import { profile } from "@/lib/cv-data";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";
import { toast } from "sonner";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters.";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company: "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Request failed");
      setStatus("ok");
      toast.success("Message sent — thank you!", {
        description: "I'll get back to you shortly.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      toast.error("Could not send message", {
        description: "Please try again or email me directly.",
      });
    }
  };

  const copy = async (kind: "email" | "phone") => {
    const value = kind === "email" ? profile.email : profile.phone;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      toast.success(`${kind === "email" ? "Email" : "Phone"} copied to clipboard`);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <section id="contact" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Fluid Contact Terminal"
          title="Let's build something intelligent"
          description="Send a message through the liquid terminal, or reach me directly — every field is validated in real time."
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Form */}
          <GlassCard variant="strong" className="p-6 md:p-8">
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FloatingInput
                  id="name"
                  label="Your name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  error={errors.name}
                />
                <FloatingInput
                  id="email"
                  label="Email address"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  error={errors.email}
                />
              </div>
              <FloatingInput
                id="subject"
                label="Subject (optional)"
                value={form.subject}
                onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
              />
              <FloatingInput
                id="message"
                label="Your message"
                textarea
                value={form.message}
                onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                error={errors.message}
              />

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-pearl/40">
                  By sending, you agree to be contacted about your inquiry.
                </p>
                <MagneticButton
                  as="button"
                  type="submit"
                  strength={0.25}
                  disabled={status === "loading"}
                  className="group relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-pearl disabled:opacity-70"
                >
                  <span
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{
                      background:
                        "linear-gradient(120deg, rgba(6,182,212,0.55), rgba(124,58,237,0.55))",
                      boxShadow:
                        "0 10px 30px -8px rgba(124,58,237,0.5), inset 0 1px 1px 0 rgba(255,255,255,0.4)",
                    }}
                  />
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </MagneticButton>
              </div>
            </form>
          </GlassCard>

          {/* Direct contact + socials */}
          <div className="flex flex-col gap-6">
            <GlassCard className="p-6">
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-cyan-300/80">
                Direct Channels
              </h3>
              <div className="flex flex-col gap-3">
                <DirectRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={profile.email}
                  onCopy={() => copy("email")}
                  copied={copied === "email"}
                  href={`mailto:${profile.email}`}
                />
                <DirectRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                  value={profile.phone}
                  onCopy={() => copy("phone")}
                  copied={copied === "phone"}
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                />
                <DirectRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Location"
                  value={profile.location}
                  sub={profile.drivingLicense}
                />
              </div>
            </GlassCard>

            {/* Socials as glass orbs */}
            <GlassCard className="p-6">
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-violet-300/80">
                Social Orbs
              </h3>
              <div className="flex gap-4">
                <SocialOrb href={profile.github} label="GitHub">
                  <Github className="h-5 w-5" />
                </SocialOrb>
                <SocialOrb href={profile.linkedin} label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </SocialOrb>
                <SocialOrb href={`mailto:${profile.email}`} label="Email">
                  <Mail className="h-5 w-5" />
                </SocialOrb>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingInput({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  textarea = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
}) {
  const hasValue = value.length > 0;
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          hasValue
            ? "top-2 text-[10px] uppercase tracking-wider text-cyan-300/80"
            : "top-3.5 text-sm text-pearl/45"
        }`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full resize-none rounded-2xl glass-pill px-4 pb-3 pt-6 text-sm text-pearl outline-none transition focus:ring-1 focus:ring-cyan-400/50"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-14 w-full rounded-2xl glass-pill px-4 pt-4 text-sm text-pearl outline-none transition focus:ring-1 focus:ring-cyan-400/50"
        />
      )}
      {error ? (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 pl-1 text-xs text-rose-300"
        >
          {error}
        </motion.p>
      ) : null}
    </div>
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
    <div className="flex items-center gap-3 rounded-2xl glass-pill p-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pearl/5 text-cyan-300">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wider text-pearl/45">
          {label}
        </p>
        <p className="truncate text-sm text-pearl/85">{value}</p>
        {sub ? <p className="truncate text-[11px] text-pearl/40">{sub}</p> : null}
      </div>
      {onCopy ? (
        <button
          type="button"
          onClick={onCopy}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-pearl/60 transition hover:bg-pearl/10 hover:text-pearl"
          aria-label={`Copy ${label}`}
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        </button>
      ) : href ? (
        <a
          href={href}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-pearl/60 transition hover:bg-pearl/10 hover:text-pearl"
          aria-label={`Open ${label}`}
        >
          <Send className="h-3.5 w-3.5" />
        </a>
      ) : null}
    </div>
  );
}

function SocialOrb({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <MagneticButton
      as="a"
      strength={0.5}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group relative h-16 w-16 rounded-full"
    >
      <span
        className="absolute inset-0 rounded-full glass-strong"
        style={{
          boxShadow:
            "inset 0 2px 4px 0 rgba(255,255,255,0.4), inset 0 -2px 4px 0 rgba(0,0,0,0.4), 0 10px 30px -8px rgba(124,58,237,0.4)",
        }}
      />
      <span
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(6,182,212,0.4), rgba(124,58,237,0.2) 60%, transparent 80%)",
        }}
      />
      <span className="relative z-10 text-pearl/90 transition-transform group-hover:scale-110">
        {children}
      </span>
    </MagneticButton>
  );
}
