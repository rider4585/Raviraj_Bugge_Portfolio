import React from "react";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

type Props = {
  id?: string;
  label: string;
  level?: string;
  tags?: string[];
};

const levelColor = (level?: string) => {
  switch (level) {
    case "beginner":
      return "bg-gray-200 text-gray-700";
    case "intermediate":
      return "bg-amber-100 text-amber-800";
    case "advanced":
      return "bg-cyan-100 text-cyan-800";
    case "expert":
      return "bg-violet-100 text-violet-800";
    default:
      return "bg-white/30 text-gray-800";
  }
};

const SkillChip: React.FC<Props> = ({ id, label, level, tags }) => {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.button
      type="button"
      aria-describedby={id ? `${id}-desc` : undefined}
      whileHover={reduce ? undefined : { scale: 1.06 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      className={`relative px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-violet-200 ${levelColor(
        level
      )}`}
    >
      {/* small level dot */}
      <span
        aria-hidden
        className={`inline-block w-2 h-2 rounded-full ${
          level === "expert"
            ? "bg-violet-600"
            : level === "advanced"
            ? "bg-cyan-600"
            : level === "intermediate"
            ? "bg-amber-600"
            : "bg-gray-400"
        }`}
      />
      <span className="text-sm font-medium">{label}</span>

      {/* accessible description for screen readers */}
      {tags && tags.length > 0 && (
        <span id={id ? `${id}-desc` : undefined} className="sr-only">
          {label} — related: {tags.join(", ")}.
        </span>
      )}

      {/* Floating micro-panel on focus/hover (visible only for non-reduced motion visually) */}
      {!reduce && tags && tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-20 w-max min-w-[160px] p-2 rounded-md glass border border-gray-100 shadow"
          role="tooltip"
        >
          <div className="text-xs text-gray-600">Related</div>
          <div className="mt-1 flex flex-wrap gap-1">
            {tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded bg-white/30 text-gray-800"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.button>
  );
};

export default SkillChip;