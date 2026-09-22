/**
 * CV & PROFESSIONAL PROFILE DATA — Mubashir CK
 * Extracted & synchronized directly from LinkedIn (in/mubashir-ck-690526350)
 * & verified portfolio documents.
 */

export const profile = {
  name: "Mubashir CK",
  initials: "MC",
  title: "IT Professional · Full-Stack & AI Solutions · Cybersecurity · Digital Marketing",
  tagline: "Bridging intelligent software engineering, cybersecurity, and high-impact digital storytelling.",
  location: "Fujairah, UAE & Kerala, India",
  drivingLicense: "UAE Driving License Holder",
  email: "Mubashirckpara046@gmail.com",
  phone: "+971 544989847",
  phoneUAE: "+971 544989847",
  phoneIndia: "+91 8089454197",
  linkedin: "https://linkedin.com/in/mubashir-ck-690526350",
  linkedinHandle: "in/mubashir-ck-690526350",
  github: "https://github.com/MUBASHIRCK046",
  githubHandle: "MUBASHIRCK046",
  available: true,
  summary:
    "IT professional with a strong academic background in Computer Applications from KMCT College of Engineering, University of Calicut, and industry-oriented full-stack engineering training from ICT Academy of Kerala (ICTAK). Proficient in designing and developing secure AI and blockchain solutions, full-stack applications, cybersecurity initiatives, and data-driven digital strategies. Combines technical expertise with creative capabilities in digital marketing and video content development to deliver scalable, secure, and innovative technology solutions.",
  bio: [
    "I am an IT professional with a Bachelor of Computer Applications from KMCT College of Engineering / ELIMS (University of Calicut), driven by a deep passion for the intersection of artificial intelligence, full-stack software development, cybersecurity, and digital marketing.",
    "Through hands-on engineering immersion at the ICT Academy of Kerala (ICTAK) and participating in intensive industry initiatives like 'Build an App in a Day', I have built real-world solutions ranging from computer vision attendance systems to blockchain-backed supply chain authenticators like Medshield AI.",
    "Beyond code, I actively upskill in video editing and multimedia content creation for digital marketing, combining technical engineering discipline with compelling visual storytelling. I hold a UAE Driving License, have led college clubs and sports teams, and bring agile problem-solving, rapid adaptability, and clear communication to every challenge.",
  ],
  stats: [
    { label: "Years Learning Tech", value: 4, suffix: "+" },
    { label: "Projects & Systems", value: 4, suffix: "+" },
    { label: "Certifications & Programs", value: 5, suffix: "+" },
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
    company: "ICT Academy of Kerala (ICTAK)",
    role: "Full-Stack Software Trainee & Engineer",
    period: "Industry Immersion",
    location: "Kerala, India",
    description:
      "Advanced technical engineering program under the Government of Kerala & ICTAK industry consortium, developing full-stack applications, rapid prototypes, and modern cloud-integrated architectures.",
    achievements: [
      "Spearheaded practical full-stack web and application development using modern JavaScript ecosystems.",
      "Participated in the 'Build an App in a Day' rapid software engineering initiative, designing and deploying functional solutions.",
      "Applied industry best practices in version control, RESTful API architecture, and agile software development workflows.",
    ],
    stack: ["Full-Stack Web", "React", "JavaScript", "REST APIs", "Git & GitHub", "Agile Engineering"],
    accent: "cyan",
  },
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
];

export const skillsCore = [
  "Python",
  "Java",
  "C",
  "HTML/CSS",
  "JavaScript",
  "Node.js",
  "REST APIs",
  "MySQL",
  "React",
  "FastAPI",
];

export const skillsTools = [
  "Git",
  "GitHub",
  "Firebase Firestore",
  "Cloud Storage",
  "Video Editing",
  "Canva",
  "VS Code",
  "AI Tools & Models",
  "Network Security",
  "MS Excel",
  "MS PowerPoint",
  "MS Word",
];

export const softSkills = [
  "Leadership & Teamwork",
  "Communication & Presentation",
  "Creative Problem-Solving",
  "Adaptability & Time Management",
  "Content Strategy & Storytelling",
];

export const certifications = [
  {
    title: "Build an App in a Day (Rapid App Development)",
    issuer: "Industry Workshop & Certification",
    scope: "Rapid Prototyping · Mobile & Web App Architecture · Deployment",
    accent: "cyan" as const,
  },
  {
    title: "Video Editing & Content Creation for Digital Marketing",
    issuer: "Professional Specialization",
    scope: "Video Production · Motion Design · Social Media Marketing",
    accent: "violet" as const,
  },
  {
    title: "Digital Marketing Certification",
    issuer: "Professional Certification",
    scope: "SEO · SEM · Content Strategy · Analytics & Conversion",
    accent: "indigo" as const,
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "Professional Certification",
    scope: "Machine Learning · Computer Vision · Intelligent Automation",
    accent: "cyan" as const,
  },
  {
    title: "Cybersecurity Essentials",
    issuer: "Professional Certification",
    scope: "Network Defense · Threat Vectors · Cryptographic Security",
    accent: "violet" as const,
  },
];

export interface ProjectItem {
  name: string;
  type: string;
  description: string;
  highlights: string[];
  stack: string[];
  accent: "cyan" | "violet" | "indigo" | "emerald" | "amber";
}

export const projects: ProjectItem[] = [
  {
    name: "Medshield AI",
    type: "Blockchain & AI · Counterfeit Medicine Detection",
    description:
      "A secure verification platform that detects counterfeit medicines across global pharmaceutical supply chains by integrating decentralized blockchain validation, AI classification, and encrypted QR scanning for real-time authenticity verification.",
    highlights: [
      "Decentralized ledger architecture preventing counterfeit medication circulation.",
      "Computer vision & cryptographic QR pipeline for instant pharmaceutical authenticity checks.",
      "Real-time verification telemetry across manufacturers, distributors, and end-consumers.",
    ],
    stack: ["Blockchain", "AI", "QR Scanning", "Python", "Cryptographic Security"],
    accent: "indigo",
  },
  {
    name: "VisionAttend AI",
    type: "Computer Vision & Deep Learning · Classroom Analytics",
    description:
      "An intelligent, vision-based classroom analytics and attendance automation system. Leverages advanced computer vision models to detect student engagement states (attentive, inattentive, drowsiness/sleep) and logs automated biometric attendance in real time.",
    highlights: [
      "Real-time facial landmark & posture classification to detect attentiveness, focus, and fatigue states.",
      "Automated facial recognition attendance engine eliminating roll-calls and proxy marking.",
      "Educator analytics dashboard providing live engagement heatmaps and participation reports.",
      "Edge-optimized neural inference pipeline running smoothly on low-latency classroom feeds.",
    ],
    stack: ["Python", "OpenCV", "MediaPipe", "YOLO / Deep Learning", "FastAPI", "SQLite"],
    accent: "cyan",
  },
  {
    name: "EstateLedger",
    type: "FinTech & PropTech · Rent Collection & Revenue Analytics",
    description:
      "A comprehensive multi-tenant property management and financial tracking platform built for commercial and residential buildings. Streamlines daily, monthly, and yearly rent collection workflows with automated tenant reconciliation and financial forecasting.",
    highlights: [
      "Automated rental revenue tracking across daily collections, monthly cycles, and cumulative annual yields.",
      "Comprehensive tenant profile management with lease duration tracking, deposits, and payment history.",
      "Real-time financial analytics dashboard displaying occupancy rates, cash flows, and pending arrears.",
      "Client ledger update engine with instant digital receipt generation and automated billing alerts.",
    ],
    stack: ["Next.js", "Node.js", "MySQL", "Financial Ledger Engine", "REST APIs", "Tailwind CSS"],
    accent: "emerald",
  },
  {
    name: "SafeCity",
    type: "Cloud Civic Tech & Public Safety · Incident Response & FIR Management",
    description:
      "An intelligent, cross-platform cloud application built for modern law enforcement and citizens. Facilitates digital FIR/CSR filing, instantaneous emergency SOS dispatch, and centralized criminal record indexing with role-based access control.",
    highlights: [
      "Paperless digital FIR and CSR registration with encrypted verification and tamper-evident audit trails.",
      "Emergency SOS response module with real-time geofencing dispatching distress coordinates to enforcement units.",
      "Centralized criminal record indexing and case lifecycle tracking with granular access control (RBAC).",
      "Cloud-native real-time synchronisation utilizing Firebase Firestore, Auth, Storage, and Cloud Messaging.",
    ],
    stack: ["Firebase Firestore", "Cloud Messaging", "Authentication", "Cloud Storage", "Geo-Location API", "React"],
    accent: "violet",
  },
];

export const education = [
  {
    degree: "Master of Computer Applications (MCA) — Computer Science",
    institution: "KMCT College of Engineering",
    board: "APJ Abdul Kalam Technological University / KTU",
    period: "Jan 2026 – Present",
    status: "ongoing" as const,
    skills: ["Web Development", "Python", "Software Engineering", "Cloud Systems"],
    detail:
      "Advanced postgraduate study in Computer Science, focusing on modern web architectures, Python engineering, algorithmic design, and distributed software systems.",
    accent: "amber" as const,
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "ELIMS Arts & Science College",
    board: "University of Calicut",
    period: "Conferred",
    status: "completed" as const,
    skills: ["Data Structures", "Java", "C", "MySQL", "Web Technologies"],
    detail:
      "Comprehensive curriculum in computer science, software engineering, database systems, object-oriented programming, and applied tech solutions.",
    accent: "cyan" as const,
  },
  {
    degree: "Higher Secondary Education (Grade 10–12)",
    institution: "Indian School Fujairah",
    board: "CBSE Curriculum",
    period: "Completed",
    status: "completed" as const,
    detail:
      "Completed schooling with academic distinction; Individual Sports Champion in Grade 10 with multiple athletic medals.",
    accent: "violet" as const,
  },
];

export const honors = [
  "Individual Champion — Grade 10, multiple athletic medals",
  "Head of Club — ELIMS Arts and Science College",
  "Industry Trainee — ICT Academy of Kerala (ICTAK)",
  "Active in football, photography, video editing, and digital design",
  "Community volunteering & student mentorship",
];

export const interests = [
  "Video Editing",
  "Digital Marketing",
  "Artificial Intelligence",
  "Football & Athletics",
  "Photography",
  "Tech Innovation",
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
