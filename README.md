# Nitin — Selected Work

> A premium, agency-style portfolio site that presents four complete products in one place: analytics, AI, commerce and automation.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square)
![Portfolio](https://img.shields.io/badge/Portfolio-4%20projects-7c3aed?style=flat-square)

---

## ✨ What it does

This is the front door for the whole portfolio. Instead of sending a client four separate GitHub links, one polished site tells the story:

- **Hero** — positioning, availability, stats and direct calls to action
- **Work grid** — four project cards with real cover art, category filters and case-study modals
- **Case studies** — problem, build approach, highlights, stack, results and repo link
- **Approach** — three principles that explain how the work is delivered
- **Contact** — clear freelance CTA with GitHub and Contra links

Each card links to the full repository, and each modal is a ready-to-paste portfolio narrative.

## 🛠️ Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Images | `next/image` with locally copied cover art |
| State | React hooks (filters, modal, copy feedback) |
| Icons | lucide-react |

## 🚀 Run locally

```bash
git clone https://github.com/nitinscodehub/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Before sharing

Edit [`src/lib/site.ts`](src/lib/site.ts) to replace the placeholder Contra URL with your real profile link. Everything else is ready.

## 📁 Projects featured

| Project | Description | Repo |
|---|---|---|
| Pulse | AI-powered SaaS analytics dashboard | [pulse-analytics](https://github.com/nitinscodehub/pulse-analytics) |
| Askly | RAG knowledge assistant with streaming cited answers | [askly](https://github.com/nitinscodehub/askly) |
| Cartly | Headless e-commerce storefront with demo checkout | [cartly](https://github.com/nitinscodehub/cartly) |
| Flowbit | Visual AI workflow automation builder | [flowbit](https://github.com/nitinscodehub/flowbit) |

Project content lives in [`src/lib/projects.ts`](src/lib/projects.ts) — add a fifth project by appending one object.

## 🎯 Portfolio blurb

> Built a personal portfolio site in Next.js 15 and TypeScript to showcase four production-style products in one place. Implemented a responsive agency-style landing page with category filters, case-study modals, cover art via next/image, direct GitHub and Contra CTAs, and a content-driven data layer that makes adding new projects a one-file change.

## ✅ Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## License

MIT — free to use for personal and commercial projects.
