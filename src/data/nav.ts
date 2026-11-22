export type NavItem = { label: string; href: string };

// Admin routes are intentionally absent from every public navigation surface.
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Achievements", href: "/achievements" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Certifications", href: "/certifications" },
  { label: "Journey", href: "/journey" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export const footerItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Achievements", href: "/achievements" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Certifications", href: "/certifications" },
  { label: "Journey", href: "/journey" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];
