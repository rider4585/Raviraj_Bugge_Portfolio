import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { skills, type Skill } from "../../data/skills";
import SkillDetail from "./SkillDetail";
import MobileSkillSheet from "./MobileSkillSheet";
import { revealItem } from "../../libs/animations";

/**
 * SkillExplorer — updated to avoid reopening mobile sheet on focus restore.
 *
 * Chip behavior:
 * - click (pointer): select + open mobile sheet on small screens
 * - focus (keyboard navigation): select only (no auto-open on mobile)
 */

type SelectOpts = { fromKeyboard?: boolean; fromPointer?: boolean };

// replace only the SkillChipCompact component in SkillExplorer.tsx with this:

const SkillChipCompact: React.FC<{
  s: Skill;
  selected: boolean;
  onSelect: (
    id: string,
    opts?: { fromKeyboard?: boolean; fromPointer?: boolean }
  ) => void;
}> = ({ s, selected, onSelect }) => {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(s.id, { fromPointer: true })}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(s.id, { fromKeyboard: true });
        }
      }}
      onFocus={() => onSelect(s.id, { fromKeyboard: true })}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2`}
      style={{
        background: selected
          ? "linear-gradient(90deg,var(--accent-1),var(--accent-2))"
          : "var(--card-bg-soft)",
        color: selected ? "#fff" : "var(--text-primary)",
        border: "1px solid var(--glass-border)",
      }}
      aria-pressed={selected}
      aria-describedby={`${s.id}-desc`}
    >
      <span
        aria-hidden
        className="inline-block w-2 h-2 rounded-full"
        style={{
          background:
            s.level === "expert"
              ? "var(--accent-1)"
              : s.level === "advanced"
              ? "var(--accent-2)"
              : "var(--muted)",
        }}
      />
      <span>{s.label}</span>
    </motion.button>
  );
};

const SkillExplorer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  // const reduce = usePrefersReducedMotion();

  const groups = useMemo(() => {
    return skills.reduce<Record<string, Skill[]>>((acc, s) => {
      const key = s.group ?? "Other";
      if (!acc[key]) acc[key] = [];
      acc[key].push(s);
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    if (!selectedId) {
      const firstGroup = Object.keys(groups)[0];
      const firstSkill = groups[firstGroup]?.[0];
      if (firstSkill) setSelectedId(firstSkill.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Unified select handler that receives a second param describing input type.
  const handleSelect = (id: string, opts?: SelectOpts) => {
    setSelectedId(id);

    // Open mobile sheet only on pointer/click input (not on simple focus restore).
    const isSmall =
      typeof window !== "undefined" ? window.innerWidth < 768 : false;
    const requestedByPointer = !!opts?.fromPointer;
    const requestedByKeyboardActivation =
      !!opts?.fromKeyboard &&
      !!opts?.fromPointer === false &&
      opts?.fromKeyboard === true &&
      opts?.fromPointer === undefined;

    if (isSmall && (requestedByPointer || requestedByKeyboardActivation)) {
      setMobileOpen(true);
    }
  };

  const selectedSkill = skills.find((s) => s.id === selectedId) ?? null;

  return (
    <section aria-label="Skills Explorer" className="py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column: groups & chips */}
        <motion.div
          className="md:w-1/2 space-y-4"
          initial="hidden"
          animate="visible"
          variants={revealItem}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <p className="text-sm text-gray-500">
              Select a skill to see details
            </p>
          </div>

          <div className="space-y-3">
            {Object.entries(groups).map(([groupName, groupSkills]) => (
              <div key={groupName} className="glass p-4 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">{groupName}</h3>
                  <div className="text-xs text-gray-500">
                    {groupSkills.length} items
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {groupSkills.map((s) => (
                    <SkillChipCompact
                      key={s.id}
                      s={s}
                      selected={s.id === selectedId}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column: sticky detail panel on desktop */}
        <div className="md:w-1/2">
          <div className="hidden md:block sticky top-20">
            <SkillDetail skill={selectedSkill as Skill} />
          </div>

          {/* Mobile fallback: simple hint to tap a chip */}
          <div className="md:hidden">
            <div className="glass p-4 rounded-xl mb-3">
              <div className="text-sm text-gray-600">
                Tap a skill to view details.{" "}
                <button
                  className="text-violet-600 underline"
                  onClick={() => setMobileOpen(true)}
                >
                  Open last selected
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <MobileSkillSheet
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        skill={selectedSkill}
      />
    </section>
  );
};

export default SkillExplorer;
