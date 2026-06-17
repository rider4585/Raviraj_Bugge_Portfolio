import { useMemo, useState } from "react";
import { projects as allProjects } from "../../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    allProjects.forEach((project) => project.tech.forEach((tech) => set.add(tech)));
    return Array.from(set).sort();
  }, []);

  const filtered = filter
    ? allProjects.filter((project) => project.tech.includes(filter))
    : allProjects;

  return (
    <section id="projects" aria-label="Projects" className="border-b border-white/10 bg-[#0c1017] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f4c95d]">Projects</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Public-safe case studies with real engineering depth.</h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              These summaries focus on role, problem, contribution, and impact without exposing confidential implementation details.
            </p>
          </div>
          <p className="text-sm text-slate-500">{filtered.length} of {allProjects.length} shown</p>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={`whitespace-nowrap rounded-md border px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c95d] ${
              filter === null ? "border-[#f4c95d]/70 bg-[#f4c95d]/12 text-[#f4c95d]" : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setFilter((current) => (current === tag ? null : tag))}
              className={`whitespace-nowrap rounded-md border px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c95d] ${
                filter === tag ? "border-[#f4c95d]/70 bg-[#f4c95d]/12 text-[#f4c95d]" : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
