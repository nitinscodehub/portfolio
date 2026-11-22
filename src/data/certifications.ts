export type CredentialKind = "certification" | "course" | "training" | "degree";

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  kind: CredentialKind;
  image: string;
  score?: string;
  verifyUrl?: string;
  detail: string;
  verification: "document on file" | "issuer-verifiable" | "title not yet confirmed";
};

export const certifications: Certification[] = [
  {
    id: "e-yantra",
    title: "eLSI: Basics of Embedded Systems and Robotics — Certificate of Merit",
    issuer: "IIT Bombay — ERTS Lab",
    year: "2024",
    kind: "certification",
    image: "/images/certificates/e-yantra-robotics.png",
    score: "97 / 100",
    detail:
      "MOOC conducted as part of the e-Yantra Lab Setup Initiative. Covered ATmega2560, register manipulation, IO interfacing, ADC, PWM, interrupts and Embedded C.",
    verification: "document on file",
  },
  {
    id: "coursera-chatbot",
    title: "Create a Lead Generation Messenger Chatbot using Chatfuel",
    issuer: "Coursera (project authorized by Coursera)",
    year: "2024",
    kind: "course",
    image: "/images/certificates/coursera-chatbot.png",
    verifyUrl: "https://coursera.org/verify/8T2ZTLW7ENXP",
    detail: "Project certificate completed 18 April 2024, with an issuer verification URL.",
    verification: "issuer-verifiable",
  },
  {
    id: "cdac-ethical-hacking",
    title: "Ethical Hacking and Penetration Testing — Virtual Internship",
    issuer: "C-DAC Noida",
    year: "2025",
    kind: "training",
    image: "/images/certificates/cdac-internship.png",
    detail: "Online training and virtual internship from 28 April 2025 to 12 June 2025 under Cyber Gyaan.",
    verification: "document on file",
  },
  {
    id: "synent-data-science",
    title: "SYN-SIP AICTE Internship — Data Science",
    issuer: "Synent Technologies",
    year: "2026",
    kind: "training",
    image: "/images/certificates/synent-internship.png",
    detail: "One-month internship recorded from 5 April 2026 to 15 May 2026.",
    verification: "document on file",
  },
  {
    id: "army-internship",
    title: "Cybersecurity Internship Certificate",
    issuer: "Indian Army",
    year: "2026",
    kind: "training",
    image: "/images/certificates/indian-army-internship.png",
    detail: "Certificate on file. Specific programme dates and scope remain pending official confirmation.",
    verification: "document on file",
  },
  {
    id: "swayam-values",
    title: "BEDS-001: Overview and Perspectives of Values",
    issuer: "IGNOU / SWAYAM",
    year: "2025",
    kind: "course",
    image: "/images/certificates/swayam-values.png",
    score: "85%",
    detail: "Four-credit proctored course completed in May 2025.",
    verification: "document on file",
  },
  {
    id: "uipath-process",
    title: "Build Your First Process (v2021.10)",
    issuer: "UiPath",
    year: "2026",
    kind: "certification",
    image: "/images/certificates/uipath-badge.png",
    detail: "Diploma of completion issued 14 April 2026.",
    verification: "document on file",
  },
  {
    id: "cseh-ceh",
    title: "Certified SOC Analyst / CEH training",
    issuer: "Issuer shown on certificate",
    year: "Unconfirmed",
    kind: "training",
    image: "/images/certificates/cseh-ceh.png",
    detail: "Certificate image is on file; the title above follows the source filename and has not been transcription-verified.",
    verification: "title not yet confirmed",
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking Training",
    issuer: "Issuer shown on certificate",
    year: "Unconfirmed",
    kind: "training",
    image: "/images/certificates/ethical-hacking.png",
    detail: "Certificate image on file. Year and issuer details pending review.",
    verification: "title not yet confirmed",
  },
  {
    id: "linux-privilege-escalation",
    title: "Linux Privilege Escalation",
    issuer: "Issuer shown on certificate",
    year: "Unconfirmed",
    kind: "training",
    image: "/images/certificates/linux-privilege-escalation.png",
    detail: "Security training certificate on file.",
    verification: "title not yet confirmed",
  },
  {
    id: "linux-security-checkup",
    title: "Linux Security Checkup",
    issuer: "Issuer shown on certificate",
    year: "Unconfirmed",
    kind: "training",
    image: "/images/certificates/linux-security-checkup.png",
    detail: "Security training certificate on file.",
    verification: "title not yet confirmed",
  },
  {
    id: "python-django",
    title: "Python and Django",
    issuer: "Issuer shown on certificate",
    year: "Unconfirmed",
    kind: "course",
    image: "/images/certificates/python-django.png",
    detail: "Backend web development training certificate on file.",
    verification: "title not yet confirmed",
  },
  {
    id: "wifi-hacking",
    title: "Wi-Fi Security Training",
    issuer: "Issuer shown on certificate",
    year: "Unconfirmed",
    kind: "training",
    image: "/images/certificates/wifi-hacking.png",
    detail: "Wireless security training certificate on file; presented as defensive education.",
    verification: "title not yet confirmed",
  },
  {
    id: "full-stack-web",
    title: "Full Stack Web Development",
    issuer: "Issuer shown on certificate",
    year: "Unconfirmed",
    kind: "course",
    image: "/images/certificates/full-stack-web-development.png",
    detail: "Course completion certificate on file.",
    verification: "title not yet confirmed",
  },
  {
    id: "egretlogs",
    title: "EgretLogs — Participation Certificate",
    issuer: "EgretLogs",
    year: "Unconfirmed",
    kind: "training",
    image: "/images/certificates/egretlogs.png",
    detail: "Certificate image on file; programme details pending confirmation.",
    verification: "title not yet confirmed",
  },
];

export const credentialKindLabels: Record<CredentialKind, string> = {
  degree: "Degree",
  certification: "Certification",
  course: "Course",
  training: "Training",
};
