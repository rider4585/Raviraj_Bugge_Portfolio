// src/components/skills/SkillDetail.tsx
import React from "react";
import CodeSnippet from "../code/CodeSnippet";
import type { Skill } from "../../data/skills";
import TechIcon from "./TechIcon";

type Props = {
  skill: Skill | null;
};

const SkillDetail: React.FC<Props> = ({ skill }) => {
  if (!skill) {
    return (
      <div
        className="p-6 rounded-xl min-h-[160px] text-[var(--text-secondary)]"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--card-shadow)",
          color: "var(--text-primary)",
          backdropFilter: "blur(12px) saturate(140%)",
          WebkitBackdropFilter: "blur(12px) saturate(140%)",
        }}
        aria-live="polite"
      >
        Select a skill to view details
      </div>
    );
  }

  return (
    <div
      className="p-6 rounded-xl min-h-[180px]"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--card-shadow)",
        color: "var(--text-primary)",
        backdropFilter: "blur(12px) saturate(140%)",
        WebkitBackdropFilter: "blur(12px) saturate(140%)",
      }}
      role="region"
      aria-label={`${skill.label} details`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3
            className="text-lg font-semibold truncate"
            style={{ color: "var(--text-primary)" }}
          >
            {skill.label}
          </h3>
          <div
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {skill.group ?? "Other"}{" "}
            {skill.years ? `— ${skill.years}+ yrs` : ""}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2" aria-hidden>
          {skill.iconId && (
            <TechIcon id={skill.iconId} size={36} className="opacity-95" />
          )}
        </div>
      </div>

      <div className="mt-4 text-sm" style={{ color: "var(--text-primary)" }}>
        {skill.description ?? "No description available."}
      </div>

      {skill.exampleProjects && skill.exampleProjects.length > 0 && (
        <div className="mt-4">
          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Example projects
          </div>
          <ul className="mt-2 space-y-2">
            {skill.exampleProjects.map((p) => (
              <li
                key={p.id}
                className="text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                <strong>{p.title}</strong>
                {p.role ? (
                  <span style={{ color: "var(--text-secondary)" }}>
                    {" "}
                    — {p.role}
                  </span>
                ) : null}
                {p.impact ? (
                  <div
                    className="text-sm mt-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {p.impact}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      )}

      {skill.sampleCode && (
        <div className="mt-4">
          <CodeSnippet
            code={skill.sampleCode.code}
            lang={skill.sampleCode.lang}
            runnable={!!skill.sampleCode.runnable}
            caption={skill.sampleCode.caption}
          />
        </div>
      )}

      <div className="sr-only" aria-hidden={false}>
        {skill.tags && skill.tags.length
          ? `Related tools: ${skill.tags.join(", ")}`
          : ""}
      </div>
    </div>
  );
};

export default SkillDetail;
