// src/data/projects.ts
export type Project = {
  id: string;
  title: string;
  role?: string;
  short: string;
  problem: string;
  contribution: string;
  impact: string;
  tech: string[];
  confidential?: boolean;
  thumbnail?: string | null;
  live?: string | null; // live demo URL
  repo?: string | null; // repo URL
};

export const projects: Project[] = [
  {
    id: "meddb",
    title: "Medication DB",
    role: "Technical Project Lead",
    short: "RAG-backed medication knowledge surface for clinical content teams.",
    problem:
      "Clinical teams needed a faster way to search medication content without exposing private source material or relying on brittle keyword lookup.",
    contribution:
      "Led the product architecture, retrieval flow, React interface, and integration path for ChromaDB with local LLM tooling.",
    impact:
      "Improved answer discovery, reduced manual lookup friction, and created a reusable pattern for private clinical retrieval workflows.",
    tech: ["react", "typescript", "tailwind", "php", "postgres", "chroma", "ollama"],
    confidential: true,
    thumbnail: null,
    live: null,
    repo: null,
  },
  {
    id: "esc-web",
    title: "ESC Web App",
    role: "Lead Frontend Developer",
    short: "Modernized a high-traffic clinical guideline web experience.",
    problem:
      "Image-heavy pages and legacy UI patterns made the product slower to load, harder to maintain, and less comfortable on mobile.",
    contribution:
      "Rebuilt key interfaces as responsive templates, tightened component structure, and improved interaction details for editors and readers.",
    impact:
      "Reduced page weight significantly, improved responsiveness, and made future guideline updates easier to ship.",
    tech: ["react", "tailwind", "vite", "php"],
    confidential: false,
    thumbnail: "/projects/esc-web.png",
    live: "https://guidelines.escardio.org/home/",
    repo: null,
  },
  {
    id: "cdst-editor",
    title: "CDST Editor",
    role: "Lead Developer",
    short: "Authoring environment for clinical decision support content.",
    problem:
      "Editors needed safer workflows for creating, validating, previewing, and publishing structured clinical decision rules.",
    contribution:
      "Designed the editor UX, validation states, preview flows, and backend API contracts across React, PHP, and PostgreSQL.",
    impact:
      "Shortened edit-to-review cycles and reduced preventable content errors through inline feedback and structured publishing flows.",
    tech: ["react", "typescript", "tailwind", "php", "postgres"],
    confidential: true,
    thumbnail: null,
    live: null,
    repo: null,
  },
  {
    id: "acoms",
    title: "ACOMS",
    role: "Fullstack / Lead UI Engineer",
    short: "Clinical content management platform for editorial operations.",
    problem:
      "A growing content workflow needed clearer interfaces, better validation, and more maintainable modules for repeated editorial tasks.",
    contribution:
      "Modernized UI modules, integrated backend APIs, improved data loading patterns, and introduced reusable layout conventions.",
    impact:
      "Improved editorial throughput and created a cleaner foundation for future content management modules.",
    tech: ["react", "php", "mysql", "aws"],
    confidential: true,
    thumbnail: null,
    live: null,
    repo: null,
  },
];
