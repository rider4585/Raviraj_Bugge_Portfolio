import React, { useMemo, useState } from "react";
import { skills, skillGroups, type Skill, type SkillGroup } from "../../data/skills";

const groupOrder: SkillGroup[] = ["Frontend", "Backend", "DB", "AI", "DevOps", "Other"];

const levelLabel: Record<NonNullable<Skill["level"]>, string> = {
  beginner: "Working",
  intermediate: "Practical",
  advanced: "Advanced",
  expert: "Expert",
};

const SkillExplorer: React.FC = () => {
  const grouped = useMemo(() => {
    return groupOrder.map((group) => ({
      group,
      skills: skills.filter((skill) => skill.group === group),
      meta: skillGroups[group],
    }));
  }, []);

  const [activeGroup, setActiveGroup] = useState<SkillGroup>("Frontend");
  const active = grouped.find((item) => item.group === activeGroup) ?? grouped[0];

  return (
    <section id="skills" aria-label="Skills" className="border-b border-white/10 bg-[#10151d] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f4c95d]">Skills</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Capability map for product teams.</h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            Grouped by how the work shows up in production: interface quality, backend reliability, data correctness, private AI, and delivery.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.36fr_0.64fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {grouped.map(({ group, meta, skills: groupSkills }) => (
              <button
                key={group}
                type="button"
                onClick={() => setActiveGroup(group)}
                className={`rounded-lg border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c95d] ${
                  activeGroup === group
                    ? "border-[#f4c95d]/60 bg-[#f4c95d]/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25"
                }`}
              >
                <span className="block text-sm font-semibold text-white">{meta.title}</span>
                <span className="mt-1 block text-xs text-slate-500">{groupSkills.length} capabilities</span>
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-white/10 bg-[#0c1017] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">{active.meta.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{active.meta.focus}</p>
              </div>
              <span className="rounded border border-white/10 px-2.5 py-1 text-xs font-medium text-slate-400">
                {active.group}
              </span>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {active.skills.map((skill) => (
                <article key={skill.id} className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-base font-semibold text-white">{skill.label}</h4>
                    {skill.level && (
                      <span className="rounded bg-[#6ee7b7]/10 px-2 py-1 text-xs font-semibold text-[#6ee7b7]">
                        {levelLabel[skill.level]}
                      </span>
                    )}
                  </div>
                  {skill.description && <p className="mt-2 text-sm leading-6 text-slate-400">{skill.description}</p>}
                  {skill.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {skill.tags.map((tag) => (
                        <span key={tag} className="rounded bg-white/[0.06] px-2 py-1 text-xs text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillExplorer;
