import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page 03 · Career Experience & Engineered Systems | Mubashir CK",
  description:
    "Explore Mubashir CK's professional software engineering experience at ICT Academy of Kerala, applied AI verification platforms, computer vision analytics, and production systems.",
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
