export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  skills: string[];
};

// Deliberately no proficiency percentages — they are not measurable claims.
export const skillGroups: SkillGroup[] = [
  {
    id: "programming",
    title: "Programming",
    blurb: "Languages I write and read regularly across systems, apps and data work.",
    skills: ["Python", "C#", "C", "C++", "Java", "JavaScript", "TypeScript", "Dart", "SQL", "Bash"],
  },
  {
    id: "fullstack",
    title: "Full-Stack",
    blurb: "Product interfaces backed by typed APIs and real data.",
    skills: ["React", "Next.js", "Node.js", "FastAPI", "REST APIs", "Tailwind CSS"],
  },
  {
    id: "dotnet",
    title: ".NET",
    blurb: "Managed application development with the modern .NET platform.",
    skills: [".NET", "ASP.NET Core", "C#"],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    blurb: "Cross-platform applications with Flutter and local persistence.",
    skills: ["Flutter", "Dart", "Firebase", "SQLite"],
  },
  {
    id: "databases",
    title: "Databases",
    blurb: "Relational and document stores used across projects.",
    skills: ["SQL Server", "PostgreSQL", "Neon", "MongoDB", "MySQL", "Firebase"],
  },
  {
    id: "aiml",
    title: "AI / ML",
    blurb: "Classical machine learning, retrieval systems and API integration.",
    skills: ["Python", "Pandas", "NumPy", "scikit-learn", "RAG", "AI API Integration"],
  },
  {
    id: "security",
    title: "Cybersecurity",
    blurb: "Authorized, defensive security practice and research.",
    skills: [
      "Kali Linux",
      "Burp Suite",
      "Nmap",
      "Active Directory Security",
      "OWASP Top 10",
      "Vulnerability Assessment",
    ],
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    blurb: "The everyday toolkit for building, testing and documenting.",
    skills: ["Git", "GitHub", "Docker", "Postman", "Linux", "VS Code", "LaTeX"],
  },
];
