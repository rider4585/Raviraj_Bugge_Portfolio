// src/components/projects/ProjectsGrid.tsx
import { useMemo, useState } from "react";
import { projects as allProjects, type Project } from "../../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<string | null>(null);

  // compute tag list
  const allTags = useMemo(() => {
    const set = new Set<string>();
    allProjects.forEach((p) => p.tech?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    if (!filter) return allProjects;
    return allProjects.filter((p) => p.tech?.includes(filter));
  }, [filter]);

  return (
    <section id="projects" aria-label="Projects" className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="text-sm text-gray-500">{filtered.length} items</div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter(null)}
          className={`text-sm px-3 py-1 rounded ${
            filter === null ? "bg-white/50" : "bg-white/20"
          }`}
        >
          All
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter((s) => (s === t ? null : t))}
            className={`text-sm px-3 py-1 rounded ${
              filter === t ? "bg-white/50" : "bg-white/20"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((p: Project) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
