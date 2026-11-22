export const profile = {
  name: "Nitin Dhurve",
  brand: "NITIN DHURVE — BEYOND THE CODE",
  headline:
    "Cybersecurity Engineer | Full-Stack Developer | .NET Developer | Flutter App Developer | AI/ML Engineer | C++ Developer & Programmer | Technical Project Lead",
  heroTagline: "Engineering Software. Securing Systems. Building What's Next.",
  secondaryTagline:
    "From Cybersecurity Research to Full-Stack Platforms, Intelligent Systems and Mobile Applications.",
  location: "India",
  availability: "Open to engineering, security and research collaborations",
  education: {
    degree: "B.Tech — Computer Science and Engineering (Cyber Security)",
    school: "Central University of Jammu",
    period: "2023–2027",
  },
  roles: [
    "Cybersecurity Engineer",
    "Full-Stack Developer",
    ".NET Developer",
    "Flutter App Developer",
    "AI/ML Engineer",
    "C++ Developer & Programmer",
    "Technical Project Lead",
  ],
  intro: [
    "I build software at the intersection of security, intelligence and product craft. My work spans defensive cybersecurity research, full-stack platforms, .NET systems, Flutter applications and AI/ML experiments.",
    "What drives me is the full loop — understanding a problem, designing the system, shipping it, and then hardening it. I care about readable code, honest documentation and interfaces that feel considered.",
  ],
  principles: [
    {
      label: "Secure by default",
      body: "Authorized, defensive research first. Threat modelling and access control are part of the build, not an afterthought.",
    },
    {
      label: "Ship the whole thing",
      body: "From data model and API to interface and deployment notes — demos should work end to end, not just in a screenshot.",
    },
    {
      label: "Keep learning in public",
      body: "CTFs, hackathons and open repositories are how I sharpen judgement and leave a trail of what I actually built.",
    },
  ],
  verifiedStats: [
    { value: "93", label: "Public GitHub repositories", detail: "Counted via GitHub API, 22 Nov 2026" },
    { value: "50+", label: "Original projects indexed", detail: "Catalogued in this portfolio" },
    { value: "8", label: "Experience entries", detail: "Roles, internships and leadership" },
    { value: "15", label: "Certificates on file", detail: "Gallery with source documents" },
  ],
} as const;

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nitinstechfolio.vercel.app",
  name: profile.brand,
  description: profile.secondaryTagline,
  locale: "en_IN",
} as const;
