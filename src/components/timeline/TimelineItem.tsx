import React from "react";
import { motion } from "framer-motion";
import useInView from "../../hooks/useInView";
import { revealItem, revealBullets } from "../../libs/animations";
import type { ExperienceItem } from "../../data/resume";

type Props = {
  item: ExperienceItem;
  index: number;
};

const TimelineItem: React.FC<Props> = ({ item }) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.16 });

  return (
    <div className="relative py-8" ref={ref}>
      {/* Marker for the timeline (left on desktop, centered on mobile) */}
      <div className="absolute -left-6 md:left-[calc(50%-2px)] md:-translate-x-1/2 top-8 md:top-10">
        <div
          className="w-4 h-4 rounded-full glass flex items-center justify-center"
          aria-hidden
          style={{ boxShadow: "0 6px 16px rgba(124,58,237,0.12)" }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#7c3aed" }}
          />
        </div>
      </div>

      <motion.article
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={revealItem}
        className="bg-white/60 glass p-5 md:pl-8 md:pr-6 rounded-xl border border-gray-100 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{item.role}</h3>
            <p className="text-sm text-gray-600">{item.company}</p>
          </div>

          <div className="text-sm text-gray-500 md:text-right">
            <div className="inline-block rounded-md px-3 py-1 bg-white/30 glass border border-gray-100 text-xs">
              {item.period}
            </div>
          </div>
        </div>

        <div className="mt-3">
          <ul className="list-none space-y-2 ml-0">
            {item.achievements.map((a, i) => (
              <motion.li
                key={i}
                variants={revealBullets}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={i}
                className="text-sm text-gray-700 flex items-start gap-3"
              >
                <span
                  className="mt-1 inline-block w-2 h-2 rounded-full"
                  style={{ background: "#06b6d4" }}
                />
                <span>{a}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {item.tech && item.tech.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-md border border-gray-200 bg-white/30 glass"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </motion.article>
    </div>
  );
};

export default TimelineItem;