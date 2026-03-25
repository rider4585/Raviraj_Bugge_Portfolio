export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  achievements: string[];
  tech?: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Tagrem India Pvt. Ltd.",
    role: "Senior Software Engineer",
    period: "Jul 2025 - Present",
    location: "Pune, Maharashtra",
    achievements: [
      "Building and maintaining full-stack features using Yii (PHP), React.js, and PostgreSQL.",
      "Modernizing legacy modules to improve maintainability and long-term scalability.",
      "Supporting junior developers, and improving codebase quality.",
      "Collaborating with cross-functional teams to deliver reliable business-critical features.",
    ],
    tech: ["Yii", "React", "PostgreSQL", "Tailwind"],
  },

  {
    company: "Borm Bruckmeier Infotech India Pvt. Ltd.",
    role: "Senior Software Engineer",
    period: "Jun 2024 - Jul 2025",
    location: "Pune, Maharashtra",
    achievements: [
      "Led UI modernization across core platforms, improving responsiveness and mobile accessibility.",
      "Architected and deployed RAG pipelines using ChromaDB with local LLM integrations (Ollama).",
      "Migrated image-based templates to dynamic components, reducing load size up to 90%.",
      "Designed and implemented a cost-efficient CI/CD pipeline using GitHub Actions on self-hosted EC2 runners.",
      "Automated deployments to on-prem Linux servers and improved runtime reliability with PM2.",
    ],
    tech: ["React", "Node.js", "ChromaDB", "GitHub Actions", "PM2"],
  },

  {
    company: "Borm Bruckmeier Infotech India Pvt. Ltd.",
    role: "Software Engineer",
    period: "Jun 2023 - Jun 2024",
    location: "Pune, Maharashtra",
    achievements: [
      "Developed dashboard modules using React, Tailwind CSS, Node.js, and Express.",
      "Integrated Sequelize ORM with models, migrations and seeders for backend consistency.",
      "Introduced unit testing (Jest) and improved API performance through query optimizations.",
      "Established commit-lint rules, pre-commit hooks, and enforced PR workflows.",
    ],
    tech: ["React", "Tailwind", "Sequelize", "Jest", "Express" ],
  },

  {
    company: "Borm Bruckmeier Infotech India Pvt. Ltd.",
    role: "Junior Software Developer",
    period: "Jun 2022 - Jun 2023",
    location: "Pune, Maharashtra",
    achievements: [
      "Built responsive UI components and fixed critical issues across frontend and backend.",
      "Contributed to REST API integrations and AWS S3/CloudFront integrations.",
      "Reduced user-reported issues by 20% through proactive bug resolution.",
      "Assisted in documentation and improved developer onboarding materials.",
    ],
    tech: ["HTML5", "CSS3", "PHP", "AWS"],
  },
];