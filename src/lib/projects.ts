export type Project = {
  id: string;
  name: string;
  category: "Analytics" | "AI" | "Commerce" | "Automation";
  tagline: string;
  summary: string;
  cover: string;
  repo: string;
  accent: string;
  stack: string[];
  highlights: string[];
  problem: string;
  approach: string;
  outcome: string;
  stats: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    id: "pulse",
    name: "Pulse",
    category: "Analytics",
    tagline: "An analytics dashboard that explains itself.",
    summary:
      "Revenue, traffic and transaction metrics in one polished dashboard, with AI-generated insights that adapt to the selected time range.",
    cover: "/pulse-cover.png",
    repo: "https://github.com/nitinscodehub/pulse-analytics",
    accent: "from-cyan-400 to-blue-500",
    stack: ["Next.js 15", "TypeScript", "Tailwind", "Recharts", "Neon AI Gateway"],
    highlights: [
      "KPI cards, revenue-vs-target chart, traffic donut and transactions table",
      "7D / 30D / 90D ranges that recalculate every metric",
      "AI insight engine with a local fallback — never breaks without keys",
      "Typed metrics and health endpoints",
    ],
    problem:
      "Most dashboards dump numbers on a screen and leave the user to interpret them. I wanted a dashboard that tells you what changed and what to do next.",
    approach:
      "I built a clean data layer that derives all metrics from a single dataset, then layered a chart system on top. The insight endpoint tries Neon AI Gateway first and falls back to a rules-based summary, so the demo works with zero configuration.",
    outcome:
      "A client-ready analytics product with real interactions, a health check, and an upgrade path to live Postgres and hosted AI — all documented and deployable.",
    stats: [
      { label: "KPI cards", value: "4" },
      { label: "Ranges", value: "3" },
      { label: "Keys needed", value: "0" },
    ],
  },
  {
    id: "askly",
    name: "Askly",
    category: "AI",
    tagline: "Ask questions. Get cited answers.",
    summary:
      "A retrieval-augmented assistant that ingests documents, embeds and chunks them, then streams grounded answers with clickable source chips.",
    cover: "/askly-cover.png",
    repo: "https://github.com/nitinscodehub/askly",
    accent: "from-violet-400 to-fuchsia-500",
    stack: ["Next.js 15", "TypeScript", "RAG", "SSE", "Neon AI Gateway"],
    highlights: [
      "Document ingest, chunking, embeddings and cosine-similarity retrieval",
      "Server-sent events stream tokens as they are generated",
      "Cited source chips link each claim back to its document",
      "Optional Neon embeddings with a deterministic local fallback",
    ],
    problem:
      "Chatbots that hallucinate are useless in a business setting. The assistant needed to answer only from a supplied knowledge base and show its sources.",
    approach:
      "I implemented the full RAG pipeline by hand: ingest, normalize, chunk, embed, retrieve by cosine similarity, then stream a grounded answer over SSE. Query-token sentence scoring improves relevance for local answers, and Neon AI Gateway upgrades the same code path when configured.",
    outcome:
      "A working support-assistant demo with a sample knowledge base, real streaming, and citations users can verify — impressive in a live demo and honest about its grounding.",
    stats: [
      { label: "Pipeline", value: "5 steps" },
      { label: "Streaming", value: "SSE" },
      { label: "Citations", value: "Live" },
    ],
  },
  {
    id: "cartly",
    name: "Cartly",
    category: "Commerce",
    tagline: "A storefront that closes the sale.",
    summary:
      "Headless commerce experience with search, filters, a smart cart, discount codes, free-shipping rules and a complete demo checkout.",
    cover: "/cartly-cover.png",
    repo: "https://github.com/nitinscodehub/cartly",
    accent: "from-emerald-400 to-teal-500",
    stack: ["Next.js 15", "TypeScript", "Tailwind", "REST APIs", "next/image"],
    highlights: [
      "12-product catalog across 5 categories with generated artwork",
      "Live search, category pills and four sort modes",
      "WELCOME10 discount and free shipping over $100",
      "Server-side price recalculation and order history",
    ],
    problem:
      "A commerce demo is only convincing if the whole flow works — browsing, cart math, discounts, checkout and confirmation — without a payment provider account.",
    approach:
      "I built a typed catalog and order API, generated product artwork locally, and made the client send only product slugs and quantities. The server recomputes every price, which keeps discounts and totals trustworthy.",
    outcome:
      "A complete browse-to-order flow that runs immediately after install, with verified order math and a clean, modern storefront UI.",
    stats: [
      { label: "Products", value: "12" },
      { label: "Categories", value: "5" },
      { label: "Discount", value: "10%" },
    ],
  },
  {
    id: "flowbit",
    name: "Flowbit",
    category: "Automation",
    tagline: "Automation you can actually see.",
    summary:
      "A visual workflow builder with draggable nodes, branching connections, configuration inspectors and animated step-by-step run logs.",
    cover: "/flowbit-cover.png",
    repo: "https://github.com/nitinscodehub/flowbit",
    accent: "from-amber-400 to-orange-500",
    stack: ["Next.js 15", "TypeScript", "Pointer Events", "SVG", "Neon AI Gateway"],
    highlights: [
      "Custom drag-and-drop canvas — no graph library used",
      "Trigger, AI, Condition, Action and Output node types",
      "Click-to-connect ports with labelled branches",
      "Topological execution order and live run console",
    ],
    problem:
      "Automation tools are powerful but opaque. I wanted to show the workflow graph and let someone watch execution move through it in real time.",
    approach:
      "I implemented the canvas from scratch with pointer events and SVG bezier edges, added a dynamic settings inspector, then wrote a Kahn topological sort on the server so runs execute in dependency order with deterministic step logs.",
    outcome:
      "A visually striking, interactive product that demonstrates frontend interaction craft and backend orchestration in one self-contained demo.",
    stats: [
      { label: "Node types", value: "5" },
      { label: "Templates", value: "3" },
      { label: "Graph library", value: "None" },
    ],
  },
];
