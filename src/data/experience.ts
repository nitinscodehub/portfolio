export type Experience = {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  kind: "role" | "internship" | "leadership" | "freelance" | "content";
  description: string;
  bullets: string[];
  links?: { label: string; href: string }[];
  certificateImage?: string;
  verificationNote?: string;
};

export const experiences: Experience[] = [
  {
    id: "qualitas-global",
    role: "Data Annotation Engineer",
    organization: "Qualitas Global",
    period: "September 2026 – Present",
    location: "Pune, India",
    kind: "role",
    description:
      "Preparing and validating annotated datasets that support supervised machine-learning workflows.",
    bullets: [
      "AI/ML dataset annotation across text, image and video modalities",
      "Dataset validation and quality assurance passes",
      "Structured dataset preparation for downstream training pipelines",
    ],
  },
  {
    id: "army-cyber-group",
    role: "Cybersecurity Intern / Researcher",
    organization: "Indian Army — Army Cyber Group",
    period: "May – July 2026 · dates pending official verification",
    location: "India",
    kind: "internship",
    description:
      "Authorized security research focused on directory-services hardening and defensive tooling. No confidential systems or infrastructure are described here.",
    bullets: [
      "Active Directory security assessment in an authorized lab context",
      "Vulnerability identification and remediation-oriented documentation",
      "ADASTRA framework development and technical presentations",
    ],
    certificateImage: "/images/certificates/indian-army-internship.png",
    verificationNote: "Certificate is on file; exact dates require official confirmation before publication.",
  },
  {
    id: "cdac-noida",
    role: "Cybersecurity / Penetration Testing Intern",
    organization: "C-DAC Noida",
    period: "April – June 2025",
    location: "Noida, India",
    kind: "internship",
    description:
      "Completed an Ethical Hacking and Penetration Testing virtual internship covering web application security fundamentals.",
    bullets: [
      "Authorized web application security assessment practice",
      "OWASP Top 10 vulnerability analysis",
      "Security documentation and finding write-ups",
    ],
    certificateImage: "/images/certificates/cdac-internship.png",
    verificationNote:
      "Certificate states online training and virtual internship from 28 April 2025 to 12 June 2025.",
  },
  {
    id: "synent",
    role: "Data Science Intern",
    organization: "Synent Technologies",
    period: "April – May 2026",
    location: "Remote",
    kind: "internship",
    description: "Applied data-science workflow in a short structured internship programme.",
    bullets: ["Data preparation and analysis", "Internship project delivery", "Technical reporting"],
    certificateImage: "/images/certificates/synent-internship.png",
    verificationNote: "Certificate records 5 April 2026 to 15 May 2026.",
  },
  {
    id: "ybi-foundation",
    role: "Machine Learning Intern",
    organization: "YBI Foundation",
    period: "May – June 2024",
    location: "Remote",
    kind: "internship",
    description: "Hands-on machine-learning practice and project work during a foundational internship.",
    bullets: ["Model training and evaluation", "Python-based data handling", "Project documentation"],
  },
  {
    id: "cu-jammu",
    role: "Technical Project Lead",
    organization: "Central University of Jammu",
    period: "January 2023 – September 2026",
    location: "Jammu, India",
    kind: "leadership",
    description:
      "Led student technical teams across academic, hackathon and research projects while completing the B.Tech programme.",
    bullets: [
      "Coordinated project scope, task allocation and delivery timelines",
      "Mentored teammates across web, security and embedded work",
      "Presented technical outcomes to peers and faculty",
    ],
  },
  {
    id: "nitin-mahi-studio",
    role: "Freelance Software Developer",
    organization: "Nitin–Mahi Studio",
    period: "2026 – Present",
    location: "India",
    kind: "freelance",
    description:
      "Two-person studio building web and mobile products with an emphasis on motion, clarity and working end-to-end demos.",
    bullets: ["Design and development of client-facing web experiences", "Flutter application work", "Case-study writing and portfolio storytelling"],
    links: [
      { label: "Studio portfolio", href: "https://mntechfolio.vercel.app/" },
      {
        label: "Contra profile",
        href: "https://contra.com/mahi_nitin_egrxm97q/work?r=mahi_nitin_egrxm97q",
      },
    ],
  },
  {
    id: "in11min",
    role: "Cybersecurity Content Creator",
    organization: "in11min",
    period: "2023 – Present",
    location: "Remote",
    kind: "content",
    description:
      "Explaining security concepts, tools and defensive thinking through short-form technical content.",
    bullets: ["Cybersecurity explainers", "Tooling walkthroughs", "Community-oriented learning material"],
  },
];

export const experienceKindLabels: Record<Experience["kind"], string> = {
  role: "Role",
  internship: "Internship",
  leadership: "Leadership",
  freelance: "Freelance",
  content: "Content",
};
