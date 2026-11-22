export type AchievementCategory = "competitive" | "hackathon" | "technical";
export type Verification = "documented" | "self-reported" | "pending-confirmation" | "verified";

export type Achievement = {
  id: string;
  title: string;
  organization: string;
  year: string;
  rank: string;
  category: AchievementCategory;
  description: string;
  certificateImage?: string;
  evidenceUrl?: string;
  verification: Verification;
  note?: string;
};

export const achievements: Achievement[] = [
  {
    id: "terrier-cyber-quest-2025",
    title: "Indian Army Terrier Cyber Quest 2025",
    organization: "Indian Army",
    year: "2025",
    rank: "Top 10 Finalist",
    category: "competitive",
    description:
      "Selected among the top ten finalists in a national-level cybersecurity challenge focused on practical defensive and investigative skills.",
    verification: "self-reported",
    note: "Official result page not supplied — result shown as stated by the owner.",
  },
  {
    id: "cybercuj-ctf-2024",
    title: "CyberCUJ CTF 2024",
    organization: "Central University of Jammu",
    year: "2024",
    rank: "1st Rank",
    category: "competitive",
    description:
      "Finished first in the university CTF, solving challenges across web, cryptography, forensics and reverse engineering disciplines.",
    verification: "self-reported",
    note: "Official scoreboard not supplied.",
  },
  {
    id: "iit-jammu-cyber-2024",
    title: "IIT Jammu Cybersecurity Competition 2024",
    organization: "Indian Institute of Technology Jammu",
    year: "2024",
    rank: "2nd Rank",
    category: "competitive",
    description:
      "Secured second place in a cybersecurity competition covering security fundamentals and applied problem-solving.",
    verification: "self-reported",
    note: "Official result page not supplied.",
  },
  {
    id: "anhad-ctf-2024",
    title: "ANHAD CTF — IIT Jammu 2024",
    organization: "Indian Institute of Technology Jammu",
    year: "2024",
    rank: "5th Rank",
    category: "competitive",
    description:
      "Placed fifth in the ANHAD CTF, an annual security competition organised around the IIT Jammu tech festival.",
    verification: "self-reported",
    note: "Official scoreboard not supplied.",
  },
  {
    id: "tryhackme-leagues-2023",
    title: "TryHackMe Competitive Leagues",
    organization: "TryHackMe",
    year: "2023",
    rank: "Bronze · Silver · Gold",
    category: "competitive",
    description:
      "Earned placement across competitive league tiers during 2023. Exact tier rankings are being confirmed before publication.",
    verification: "pending-confirmation",
    note: "Exact rankings and badge URLs require confirmation — no ranks are inferred.",
  },
  {
    id: "ros-navigation-challenge",
    title: "ROS Navigation Challenge",
    organization: "Central University of Jammu",
    year: "2025",
    rank: "Participation",
    category: "competitive",
    description:
      "Worked on autonomous navigation for a ROS-based mobile robot. A repository documenting the challenge work is public; the final rank is unconfirmed.",
    evidenceUrl: "https://github.com/nitinscodehub/ROS-Navigation-Challenge-CUJammu-2025",
    verification: "pending-confirmation",
    note: "Repository confirms participation. Rank and exact year require official confirmation.",
  },
  {
    id: "ieee-hackathon-finalist",
    title: "IEEE College Hackathon — 3× Finalist",
    organization: "IEEE Student Branch",
    year: "2023–2026",
    rank: "Finalist × 3",
    category: "hackathon",
    description:
      "Reached the final round of three college-level IEEE hackathons, building working prototypes under time-boxed constraints.",
    verification: "self-reported",
    note: "Individual event names and result links not supplied.",
  },
  {
    id: "sish-shortlisted",
    title: "Smart India Hackathon — 2× Shortlisted",
    organization: "Smart India Hackathon",
    year: "2024–2026",
    rank: "Shortlisted × 2",
    category: "hackathon",
    description:
      "Advanced past initial screening twice in India's national hackathon, working on problem statements with student teams.",
    verification: "self-reported",
    note: "Shortlisting emails or official IDs not supplied.",
  },
  {
    id: "hackathon-team-lead",
    title: "Hackathon Team Lead",
    organization: "Various student hackathons",
    year: "2023–2026",
    rank: "Lead",
    category: "hackathon",
    description:
      "Coordinated small teams during hackathons — dividing work across research, implementation, integration and presentation.",
    verification: "self-reported",
  },
  {
    id: "leetcode-200",
    title: "200+ Problems Solved",
    organization: "LeetCode",
    year: "Ongoing",
    rank: "200+",
    category: "technical",
    description:
      "Consistent competitive-programming practice across data structures and algorithms. Profile link is available on the contact page.",
    evidenceUrl: "https://leetcode.com/u/nitinsleetcodehub/",
    verification: "self-reported",
    note: "Count is self-reported; profile is linked for independent verification.",
  },
  {
    id: "github-repositories",
    title: "93 Public GitHub Repositories",
    organization: "GitHub",
    year: "2026",
    rank: "93 counted",
    category: "technical",
    description:
      "Original projects, forks, experiments and coursework. Public repository count was read directly from the GitHub API on 22 November 2026.",
    evidenceUrl: "https://github.com/nitinscodehub",
    verification: "verified",
  },
  {
    id: "eyantra-merit",
    title: "e-Yantra Certificate of Merit",
    organization: "IIT Bombay — ERTS Lab",
    year: "2024",
    rank: "97 / 100",
    category: "technical",
    description:
      "Awarded for outstanding performance in eLSI: Basics of Embedded Systems and Robotics, a MOOC conducted by IIT Bombay's ERTS Lab.",
    certificateImage: "/images/certificates/e-yantra-robotics.png",
    verification: "documented",
    note: "Score and title verified from the certificate document on file.",
  },
];

export const achievementCategories: { id: AchievementCategory | "all"; label: string }[] = [
  { id: "all", label: "All achievements" },
  { id: "competitive", label: "Competitive" },
  { id: "hackathon", label: "Hackathons" },
  { id: "technical", label: "Technical" },
];

export const verificationLabels: Record<Verification, string> = {
  documented: "Document on file",
  verified: "Verified",
  "self-reported": "Self-reported",
  "pending-confirmation": "Pending confirmation",
};
