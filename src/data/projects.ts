// src/data/projects.ts
export type Project = {
  id: string;
  title: string;
  role?: string;
  short: string; // one-line summary
  impact?: string; // small metric or result
  details?: string; // longer description (optional)
  tech?: string[]; // small list of tech ids that map to ICON_MAP / TechIcon
  thumbnail?: string | null; // path or URL to preview image (optional)
  live?: string | null; // live demo URL
  repo?: string | null; // repo URL
};

export const projects: Project[] = [
  {
    id: "meddb",
    title: "Medication DB",
    role: "Technical Project Lead",
    short:
      "RAG-based clinical knowledge platform with searchable medication DB.",
    impact:
      "Improved retrieval accuracy for clinicians; RAG pipeline integrated.",
    details:
      "Led architecture and front-end for a Retrieval-Augmented Generation system that indexes clinical documents and exposes an interactive search UI. Designed data flows, schema, and the RAG UI components.",
    tech: ["react", "rag", "chroma", "typescript", "tailwind", "php"],
    thumbnail: "/projects/meddb.png",
    live: null,
    repo: null,
  },
  {
    id: "esc-web",
    title: "ESC Web App",
    role: "Lead Frontend Developer",
    short:
      "UI modernization and templating for a large image-heavy application.",
    impact: "Reduced average load time by ~60% after refactor.",
    details:
      "Rewrote heavy image pages into efficient templates, added prefetching, and implemented micro-interactions for editorial workflows.",
    tech: ["react", "tailwind", "vite"],
    thumbnail: "/projects/esc-web.png",
    live: "https://guidelines.escardio.org/home/",
    repo: null,
  },
  {
    id: "cdst-editor",
    title: "CDST Editor",
    role: "Lead Developer",
    short:
      "Clinical Decision Support Tool (CDST) editor — editor UI for building and managing clinical decision rules and templates.",
    impact:
      "Enabled editors to create and update clinical decision templates faster with inline validation and preview; reduced edit-to-publish time by ~50%.",
    details:
      "Designed and implemented the interactive editor for CDST: a single-page editor with live preview, schema-driven validation, versioning/audit trail, and bulk import/export. Worked across the stack — backend APIs (Yii/PHP), PostgreSQL schemas, and a responsive React + Tailwind frontend with micro-interactions for a smooth authoring experience.",
    tech: ["php", "mysql", "aws"],
    thumbnail: null,
    live: null,
    repo: null,
  },
  {
    id: "acoms",
    title: "ACOMS",
    role: "Fullstack / Lead UI Engineer",
    short:
      "Cross-platform clinical content management system powering editorial workflows.",
    impact:
      "Improved editorial efficiency by ~40% with streamlined UI flows, optimized page rendering, and better content validation tools.",
    details:
      "Worked on modernizing ACOMS — a clinical content management platform — by rebuilding key UI modules in React with modular components, real-time validation, optimized data loading patterns, and reusable layout primitives. Integrated backend APIs, improved accessibility, and introduced scalable design patterns for future modules.",
    tech: ["php", "mysql", "aws"],
    thumbnail: null,
    live: null,
    repo: null,
  },
];
