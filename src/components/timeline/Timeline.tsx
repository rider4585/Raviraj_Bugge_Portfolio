import React from "react";
import { motion } from "framer-motion";
import { experience } from "../../data/resume";
import { fadeUp } from "../../libs/animations";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const Timeline: React.FC = () => {
  const reduce = usePrefersReducedMotion();

  return (
    <section id="experience" aria-label="Work experience" className="border-b border-white/10 bg-[#0c1017] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f4c95d]">Experience</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Senior ownership across product delivery.</h2>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-400">
              A recruiter-friendly view of recent roles, impact, and technologies from the latest resume.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-3 hidden h-[calc(100%-1.5rem)] w-px bg-white/12 sm:block" aria-hidden />
            <div className="space-y-5">
              {experience.map((item, index) => (
                <motion.article
                  key={`${item.company}-${item.role}-${item.period}`}
                  initial={reduce ? "visible" : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.22 }}
                  variants={fadeUp}
                  className="relative rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:ml-10 sm:p-6"
                >
                  <span className="absolute -left-[2.72rem] top-7 hidden h-6 w-6 rounded-full border border-[#f4c95d]/50 bg-[#0c1017] sm:grid sm:place-items-center" aria-hidden>
                    <span className="h-2 w-2 rounded-full bg-[#f4c95d]" />
                  </span>

                  <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#f4c95d]">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-1 text-xl font-semibold text-white">{item.role}</h3>
                      <p className="mt-1 text-sm text-slate-300">{item.company}</p>
                    </div>
                    <div className="text-sm text-slate-400 xl:text-right">
                      <p>{item.period}</p>
                      {item.location && <p>{item.location}</p>}
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {item.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-3 text-sm leading-6 text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#6ee7b7]" aria-hidden />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {item.tech && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tech.map((tech) => (
                        <span key={tech} className="rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
