/**
 * CV DATA — Mubashir CK
 * All content extracted directly from the uploaded CV. No placeholders.
 */

export const profile = {
  name: "Mubashir CK",
  initials: "MC",
  title: "IT Professional · AI · Cybersecurity · Digital Marketing",
  tagline: "Entry-level IT professional crafting innovative tech solutions.",
  location: "Fujairah, UAE",
  drivingLicense: "UAE Driving License Holder",
  email: "Mubashirckpara046@gmail.com",
  phone: "+971 544989847",
  linkedin: "https://linkedin.com/in/mubashir-ck-690526350",
  linkedinHandle: "in/mubashir-ck-690526350",
  github: "https://github.com/MUBASHIRCKPARA",
  githubHandle: "MUBASHIRCKPARA",
  available: true,
  summary:
    "Motivated and skilled entry-level IT professional with a strong academic foundation in computer applications and a passion for AI, cybersecurity, and digital marketing. Experienced in developing innovative tech solutions and recognized for leadership, fast learning, and excellent communication skills.",
  bio: [
    "I am an entry-level IT professional with a Bachelor of Computer Applications and a deep fascination for the intersection of artificial intelligence, cybersecurity, and digital marketing.",
    "My approach is hands-on and curious — I build secure, intelligent systems like Medshield AI, a blockchain + AI counterfeit medicine detector, and I am constantly sharpening my toolkit across Python, Java, web technologies, and modern cloud-native tooling.",
    "Leadership, fast learning, and clear communication are the soft core of how I work. I have led student clubs, captained sports teams, and I treat every problem as an opportunity to design something better, faster, and more human.",
  ],
  stats: [
    { label: "Years Learning Tech", value: 4, suffix: "+" },
    { label: "Certifications", value: 3, suffix: "" },
    { label: "Languages Spoken", value: 3, suffix: "" },
    { label: "Core Tech Stacks", value: 5, suffix: "+" },
  ],
} as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  stack: string[];
  accent: "cyan" | "violet" | "indigo";
};

export const experiences: Experience[] = [
  {
    company: "Accounting Practice",
    role: "Part-Time Accountant",
    period: "7 months",
    location: "Fujairah, UAE",
    description:
      "Hands-on role managing real-world financial operations across bookkeeping, invoicing, and reporting workflows.",
    achievements: [
      "Handled end-to-end bookkeeping, invoicing, and financial reporting.",
      "Gained practical, applied experience in core accounting operations and fiscal discipline.",
      "Streamlined daily ledger reconciliation to improve reporting turnaround.",
    ],
    stack: ["Bookkeeping", "Invoicing", "Financial Reporting", "MS Excel"],
    accent: "cyan",
  },
  {
    company: "Delivery Operations",
    role: "Food Delivery Associate",
    period: "1 month",
    location: "Fujairah, UAE",
    description:
      "Customer-facing logistics role focused on timely delivery and route optimization under real-world constraints.",
    achievements: [
      "Delivered orders promptly while maintaining excellent customer service.",
      "Optimized delivery routes to improve turnaround and customer satisfaction.",
      "Communicated effectively with customers and merchants under time pressure.",
    ],
    stack: ["Customer Service", "Route Optimization", "Time Management"],
    accent: "violet",
  },
  {
    company: "Independent Projects",
    role: "Builder · Medshield AI",
    period: "Ongoing",
    location: "Remote",
    description:
      "Designed and built a blockchain + AI counterfeit medicine detection system integrating QR scanning for real-time authenticity.",
    achievements: [
      "Created a secure verification platform to detect counterfeit medicines.",
      "Integrated blockchain, AI, and QR code scanning for real-time authenticity checks.",
      "Engineered an end-to-end pipeline from QR capture to on-chain verification.",
    ],
    stack: ["Blockchain", "AI", "QR Scanning", "Python", "Security"],
    accent: "indigo",
  },
];

export const skillsCore = [
  "Python",
  "Java",
  "C",
  "HTML/CSS",
  "JavaScript",
  "MySQL",
];

export const skillsTools = [
  "Git",
  "GitHub",
  "Canva",
  "VS Code",
  "AI Tools",
  "Network Security",
  "MS Word",
  "MS Excel",
  "MS PowerPoint",
];

export const softSkills = [
  "Leadership & Teamwork",
  "Communication & Presentation",
  "Creative Problem-Solving",
  "Adaptability & Time Management",
];

export const certifications = [
  {
    title: "Digital Marketing Certification",
    issuer: "Professional Certification",
    scope: "SEO · SEM · Content · Analytics",
    accent: "cyan" as const,
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "Professional Certification",
    scope: "ML · Neural Nets · Applied AI",
    accent: "violet" as const,
  },
  {
    title: "Cybersecurity Essentials",
    issuer: "Professional Certification",
    scope: "Threats · Defense · Network Security",
    accent: "indigo" as const,
  },
];

export const projects = [
  {
    name: "Medshield AI",
    type: "Blockchain & AI · Counterfeit Medicine Detection",
    description:
      "A secure verification platform that detects counterfeit medicines by integrating blockchain, AI, and QR code scanning for real-time authenticity checks.",
    highlights: [
      "Secure verification platform to detect counterfeit medicines.",
      "Integrated blockchain, AI, and QR code scanning.",
      "Real-time authenticity checks across the supply chain.",
    ],
    stack: ["Blockchain", "AI", "QR Scanning", "Security"],
    accent: "cyan" as const,
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "ELIMS Arts and Science College",
    board: "University of Calicut",
    detail: "Strong academic foundation in computer applications, software, and systems.",
    accent: "cyan" as const,
  },
  {
    degree: "Higher Education (Grade 10–12)",
    institution: "Indian School Fujairah",
    board: "CBSE Curriculum",
    detail: "Completed schooling with distinction; individual sports champion in Grade 10.",
    accent: "violet" as const,
  },
];

export const honors = [
  "Individual Champion — Grade 10, multiple sports medals",
  "Head of Club — ELIMS Arts and Science College",
  "Active in football, photography, and digital design",
  "Volunteering & community leadership",
];

export const interests = [
  "Football",
  "Photography",
  "Digital Design",
  "AI & IT Trends",
  "Volunteering",
];

export const languages = [
  { name: "English", level: "Professional" },
  { name: "Malayalam", level: "Native" },
  { name: "Hindi", level: "Conversational" },
];

export const nav = [
  { label: "Home", href: "#home", icon: "home" },
  { label: "About", href: "#about", icon: "user" },
  { label: "Work", href: "#work", icon: "briefcase" },
  { label: "Skills", href: "#skills", icon: "cpu" },
  { label: "Education", href: "#education", icon: "graduation" },
  { label: "Contact", href: "#contact", icon: "mail" },
] as const;
