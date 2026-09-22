import ExperiencePage from "../experience/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page 03 · Career Experience & Engineered Systems | Mubashir CK",
  description:
    "Explore Mubashir CK's industry experience at ICT Academy of Kerala, professional certifications, and applied production systems spanning AI, blockchain, and full-stack software.",
};

export default function WorkPage() {
  return <ExperiencePage />;
}
