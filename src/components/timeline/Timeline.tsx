import React from "react";
import TimelineLine from "./TimelineLine";
import TimelineItem from "./TimelineItem";
import { experience } from "../../data/resume";

/**
 * Timeline container — single-column scrollable timeline that sits under the hero.
 * We use a centered line and staggered cards (modern minimalist).
 */

const Timeline: React.FC = () => {
  return (
    <section
      id="timeline"
      aria-label="Work experience"
      className="relative py-12"
    >
      <div id="portfolio-timeline" className="relative">
        {/* Centered line behind */}
        <TimelineLine containerId="portfolio-timeline" />

        <div className="relative z-10 space-y-6">
          {experience.map((item, idx) => (
            <div key={item.company + item.period} className="md:pl-12">
              <TimelineItem item={item} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;