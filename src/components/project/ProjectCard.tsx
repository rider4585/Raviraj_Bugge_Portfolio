import { motion } from "framer-motion";
import type { Project } from "../../data/projects";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      className="flex h-full flex-col rounded-lg border border-white/10 bg-[#111827] p-5 shadow-xl shadow-black/15 transition"
      aria-labelledby={`${project.id}-title`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded border border-[#f4c95d]/30 bg-[#f4c95d]/10 px-2.5 py-1 text-xs font-semibold text-[#f4c95d]">
          {project.role}
        </span>
        {project.confidential && (
          <span className="rounded border border-white/10 px-2.5 py-1 text-xs font-medium text-slate-400">
            Public-safe summary
          </span>
        )}
      </div>

      <h3 id={`${project.id}-title`} className="mt-5 text-2xl font-semibold text-white">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{project.short}</p>

      <div className="mt-6 space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Problem</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{project.problem}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Contribution</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{project.contribution}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Impact</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{project.impact}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span key={tech} className="rounded bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-slate-300">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        {project.live ? (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-white transition hover:border-[#f4c95d]/60 hover:text-[#f4c95d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c95d]">
            View Live
          </a>
        ) : (
          <span className="text-sm text-slate-500">Private client project</span>
        )}
      </div>
    </motion.article>
  );
}
