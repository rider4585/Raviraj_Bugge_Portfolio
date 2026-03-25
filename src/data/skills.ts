// src/data/skills.ts
export type Skill = {
  id: string;
  label: string;
  group?: "Frontend" | "Backend" | "AI" | "DB" | "DevOps" | "Other";
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  tags?: string[];
  description?: string;
  years?: number;
  exampleProjects?: {
    id: string;
    title: string;
    role?: string;
    impact?: string;
  }[];
  sampleCode?: {
    lang: string;
    code: string;
    runnable?: boolean;
    caption?: string;
  };
  iconId?: string; // <-- NEW (single icon id)
};

export const skills: Skill[] = [
  // FRONTEND -------------------------
  {
    id: "react",
    label: "React.js",
    group: "Frontend",
    level: "expert",
    tags: ["Hooks", "Vite", "Framer Motion"],
    description: "Build interactive UIs & SPAs.",
    years: 2,
    iconId: "react",
  },
  {
    id: "html",
    label: "HTML5",
    group: "Frontend",
    level: "expert",
    tags: ["semantic", "accessibility"],
    description: "Semantic markup for structured UIs.",
    years: 3,
    iconId: "html",
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    group: "Frontend",
    level: "expert",
    tags: ["utility-first", "JIT"],
    description: "Fast utility-first styling.",
    years: 2.5,
    iconId: "tailwind",
  },
  {
    id: "typescript",
    label: "TypeScript",
    group: "Frontend",
    level: "advanced",
    tags: ["typing", "tooling"],
    description: "Type-safe JavaScript for large apps.",
    years: 1,
    iconId: "typescript",
  },

  // BACKEND -------------------------
  {
    id: "php",
    label: "PHP (Yii)",
    group: "Backend",
    level: "expert",
    tags: ["Yii1.1", "Yii2"],
    description: "Server-side logic with Yii.",
    years: 3,
    iconId: "php",
  },
  {
    id: "node",
    label: "Node.js",
    group: "Backend",
    level: "advanced",
    tags: ["Express", "API"],
    description: "Backend JS runtime & APIs.",
    years: 3,
    iconId: "node",
  },
  {
    id: "sequelize",
    label: "Sequelize",
    group: "Backend",
    level: "intermediate",
    tags: ["ORM", "migrations"],
    description: "ORM for Node.js projects.",
    years: 2,
    iconId: "sequelize",
  },

  // DATABASES -----------------------
  {
    id: "postgres",
    label: "PostgreSQL",
    group: "DB",
    level: "advanced",
    tags: ["SQL", "indexes"],
    description: "Relational DB for high accuracy systems.",
    years: 1,
    iconId: "postgresql",
  },
  {
    id: "mysql",
    label: "MySQL",
    group: "DB",
    level: "advanced",
    tags: ["RDBMS"],
    description: "Popular relational DB.",
    years: 3,
    iconId: "mysql",
  },

  // AI / RAG -------------------------
  {
    id: "rag",
    label: "RAG Pipelines",
    group: "AI",
    level: "advanced",
    tags: ["vector search", "retrieval"],
    description: "Retrieval Augmented Generation pipelines.",
    years: 1.5,
    iconId: "chroma",
  },
  {
    id: "chroma",
    label: "ChromaDB",
    group: "AI",
    level: "advanced",
    tags: ["vector db"],
    description: "Lightweight vector DB.",
    years: 1.5,
    iconId: "chroma",
  },
  {
    id: "ollama",
    label: "Ollama (Local LLMs)",
    group: "AI",
    level: "intermediate",
    tags: ["local models"],
    description: "Private on-device LLMs.",
    years: 1.5,
    iconId: "nodedotjs",
  },

  // DEVOPS ---------------------------
  {
    id: "github-actions",
    label: "GitHub Actions",
    group: "DevOps",
    level: "advanced",
    tags: ["CI/CD", "automation"],
    description: "Automation pipelines for deployment.",
    years: 1.5,
    iconId: "github-actions",
  },
  {
    id: "aws",
    label: "AWS (S3, CloudFront, SecretManager)",
    group: "DevOps",
    level: "advanced",
    tags: ["S3", "CDN"],
    description: "Cloud deployments & asset hosting.",
    years: 3,
    iconId: "amazonaws",
  },
  {
    id: "pm2",
    label: "PM2",
    group: "DevOps",
    level: "intermediate",
    tags: ["process manager"],
    description: "Runtime process manager for Node.",
    years: 1.5,
    iconId: "node",
  },

  // OTHER ----------------------------
  {
    id: "git",
    label: "Git",
    group: "Other",
    level: "expert",
    tags: ["version control"],
    description: "Branching, PRs, code management.",
    years: 3,
    iconId: "git",
  },
  {
    id: "figma",
    label: "Figma",
    group: "Other",
    level: "intermediate",
    tags: ["prototyping"],
    description: "UI/UX prototyping.",
    years: 3,
    iconId: "figma",
  },
  {
    id: "jest",
    label: "Jest",
    group: "Other",
    level: "intermediate",
    tags: ["testing"],
    description: "Unit testing for JS/TS apps.",
    years: 2,
    iconId: "jest",
  },
  {
    id: "linux",
    label: "Linux",
    group: "Other",
    level: "advanced",
    tags: ["shell", "admin"],
    description: "Server ops & CLI.",
    years: 3,
    iconId: "linux",
  },
];
