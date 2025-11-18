import React from "react";
import { motion } from "framer-motion";
import SkillChip from "./SkillChip";
import { skills } from "../../data/skills";
import useInView from "../../hooks/useInView";
import { revealItem, staggerContainer } from "../../libs/animations";
// import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

/**
 * SkillMap: a single-column-ish layout with floating clusters.
 * - On desktop: two-column visual arrangement with chips "floating" in groups
 * - On mobile: stacked single column
 */

const SkillMap: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.08 });
  // const reduce = usePrefersReducedMotion();

  // group skills by group property to create visual clusters
  const groups = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    const key = s.group ?? "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});

  return (
    <section ref={ref} aria-label="Skills" className="relative py-10">
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
          <p className="text-sm text-gray-500">
            Hover / focus a skill to see related tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* left column: Frontend + AI */}
          <motion.div variants={revealItem} className="space-y-4">
            <div className="glass p-4 rounded-xl">
              <h3 className="text-sm font-semibold mb-3">Frontend</h3>
              <div className="flex flex-wrap gap-3">
                {Object.values(groups)
                  .flat()
                  .filter((s) => s.group === "Frontend")
                  .map((s) => (
                    <SkillChip
                      key={s.id}
                      id={s.id}
                      label={s.label}
                      level={s.level}
                      tags={s.tags}
                    />
                  ))}
              </div>
            </div>

            <div className="glass p-4 rounded-xl">
              <h3 className="text-sm font-semibold mb-3">AI & Data</h3>
              <div className="flex flex-wrap gap-3">
                {Object.values(groups)
                  .flat()
                  .filter((s) => s.group === "AI")
                  .map((s) => (
                    <SkillChip
                      key={s.id}
                      id={s.id}
                      label={s.label}
                      level={s.level}
                      tags={s.tags}
                    />
                  ))}
              </div>
            </div>
          </motion.div>

          {/* right column: Backend + DevOps + DB */}
          <motion.div variants={revealItem} className="space-y-4">
            <div className="glass p-4 rounded-xl">
              <h3 className="text-sm font-semibold mb-3">Backend</h3>
              <div className="flex flex-wrap gap-3">
                {Object.values(groups)
                  .flat()
                  .filter((s) => s.group === "Backend")
                  .map((s) => (
                    <SkillChip
                      key={s.id}
                      id={s.id}
                      label={s.label}
                      level={s.level}
                      tags={s.tags}
                    />
                  ))}
              </div>
            </div>

            <div className="glass p-4 rounded-xl">
              <h3 className="text-sm font-semibold mb-3">DevOps & DB</h3>
              <div className="flex flex-wrap gap-3">
                {Object.values(groups)
                  .flat()
                  .filter((s) => s.group === "DevOps" || s.group === "DB")
                  .map((s) => (
                    <SkillChip
                      key={s.id}
                      id={s.id}
                      label={s.label}
                      level={s.level}
                      tags={s.tags}
                    />
                  ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* optional small legend */}
        <motion.div variants={revealItem} className="text-sm text-gray-500">
          <span className="mr-3">Level guide:</span>
          <span className="inline-block px-2">Expert</span>
          <span className="inline-block px-2">Advanced</span>
          <span className="inline-block px-2">Intermediate</span>
          <span className="inline-block px-2">Beginner</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SkillMap;