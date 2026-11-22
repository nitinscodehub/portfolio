export type JourneyMilestone = {
  year: string;
  title: string;
  body: string;
  tags: string[];
};

export const journey: JourneyMilestone[] = [
  {
    year: "2023",
    title: "Foundations at Central University of Jammu",
    body: "Began B.Tech in Computer Science and Engineering with a Cyber Security specialisation. Started exploring CTFs, competitive programming and small scripts.",
    tags: ["CSE", "Cyber Security", "C++"],
  },
  {
    year: "2024",
    title: "First competitions and security internships",
    body: "Competed in university and IIT Jammu security competitions, completed the YBI Foundation machine-learning internship and built the first public repositories.",
    tags: ["CTF", "ML", "Internships"],
  },
  {
    year: "2025",
    title: "Applied security and product work",
    body: "Completed C-DAC Noida's ethical hacking and penetration testing programme, worked on ADASTRA, and began shipping full-stack Next.js products.",
    tags: ["OWASP", "ADASTRA", "Next.js"],
  },
  {
    year: "2026",
    title: "Research, mobile and studio work",
    body: "Worked with the Army Cyber Group on authorized Active Directory research, continued with Qualitas Global on dataset quality, and built products through Nitin–Mahi Studio.",
    tags: ["Active Directory", "Flutter", "Studio"],
  },
  {
    year: "Next",
    title: "Systems that are useful and defensible",
    body: "Continuing to build at the intersection of security engineering, intelligent systems and product-focused full-stack development.",
    tags: ["Security", "AI/ML", "Full-Stack"],
  },
];
