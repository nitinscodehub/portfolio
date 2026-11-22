export type Social = {
  label: string;
  handle: string;
  href: string;
  kind: "github" | "linkedin" | "leetcode" | "hackerrank" | "hackerone" | "contra" | "globe";
};

export const socials: Social[] = [
  { label: "GitHub", handle: "nitinscodehub", href: "https://github.com/nitinscodehub", kind: "github" },
  {
    label: "LinkedIn",
    handle: "nitin-dhurve-b1493b288",
    href: "https://www.linkedin.com/in/nitin-dhurve-b1493b288/",
    kind: "linkedin",
  },
  { label: "LeetCode", handle: "nitinsleetcodehub", href: "https://leetcode.com/u/nitinsleetcodehub/", kind: "leetcode" },
  {
    label: "HackerRank",
    handle: "dhurvenitin05",
    href: "https://www.hackerrank.com/profile/dhurvenitin05",
    kind: "hackerrank",
  },
  { label: "HackerOne", handle: "mrzerotrace", href: "https://hackerone.com/mrzerotrace", kind: "hackerone" },
  {
    label: "Contra",
    handle: "mahi_nitin_egrxm97q",
    href: "https://contra.com/mahi_nitin_egrxm97q/work?r=mahi_nitin_egrxm97q",
    kind: "contra",
  },
  {
    label: "Old Portfolio",
    handle: "nitinssportfolio.netlify.app",
    href: "https://nitinssportfolio.netlify.app/",
    kind: "globe",
  },
  { label: "Duo Studio", handle: "mntechfolio.vercel.app", href: "https://mntechfolio.vercel.app/", kind: "globe" },
];

export const socialByKind = (kind: Social["kind"]) => socials.find((item) => item.kind === kind);
