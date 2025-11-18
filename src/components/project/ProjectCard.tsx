// src/components/projects/ProjectCard.tsx
import { motion } from "framer-motion";
import type { Project } from "../../data/projects";
import TechIcon from "../skills/TechIcon";

type Props = { project: Project };

const cardVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.02 },
};

export default function ProjectCard({ project }: Props) {
  const { id, title, short, impact, tech, repo } = project;

  return (
    <motion.article
      layout
      initial="idle"
      whileHover="hover"
      whileFocus="hover"
      variants={cardVariants}
      className="group relative rounded-xl overflow-hidden"
      aria-labelledby={`${id}-title`}
    >
      <div
        className="p-5"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3
              id={`${id}-title`}
              style={{ color: "var(--text-primary)" }}
              className="text-base font-semibold"
            >
              {title}
            </h3>
            <p
              style={{ color: "var(--text-secondary)" }}
              className="text-sm mt-1"
            >
              {short}
            </p>
            {impact && (
              <p
                className="mt-2 text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                {impact}
              </p>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2">
            {tech?.slice(0, 4).map((t) => (
              <TechIcon key={t} id={t} size={22} />
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          {repo ? (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline"
              style={{ color: "var(--text-primary)" }}
            >
              Repository →
            </a>
          ) : (
            <span
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Private code
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
