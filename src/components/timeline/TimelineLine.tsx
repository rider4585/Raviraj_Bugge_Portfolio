import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { glowExpand } from "../../libs/animations";

type Props = {
  containerId?: string;
};

const TimelineLine: React.FC<Props> = ({
  containerId = "portfolio-timeline",
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [heightPct, setHeightPct] = useState(0);
  const controls = useAnimation();

  // compute how much of the container has been scrolled into view (0..100)
  useEffect(() => {
    const el = document.getElementById(containerId);
    if (!el) return;

    const calc = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      // amount of the element that has been scrolled into view from top of viewport
      const visible = Math.max(0, window.innerHeight - rect.top);
      const pct = Math.max(0, Math.min(1, visible / total));
      setHeightPct(pct * 100);
      controls.start("visible");
    };

    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc);

    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
    };
  }, [containerId, controls]);

  // line appearance
  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 pointer-events-none flex justify-center"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="relative w-full max-w-3xl flex justify-center">
        {/* Center line container */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 h-full">
          <div className="relative h-full w-[4px] rounded-full bg-transparent overflow-hidden">
            {/* static faint track */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent opacity-30" />
            {/* active growing bar */}
            <motion.div
              initial={{ height: "2%" }}
              animate={{ height: `${20 + heightPct * 0.8}%` }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 right-0 top-0 mx-auto w-1 rounded-full"
              style={{
                background: "linear-gradient(180deg,#7c3aed,#06b6d4)",
                boxShadow: "0 10px 30px rgba(124,58,237,0.15)",
              }}
            />
            {/* glow at the top that subtly pulses */}
            <motion.span
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
              variants={glowExpand}
              initial="hidden"
              animate="visible"
              style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }}
            />
          </div>
        </div>

        {/* mobile-friendly centered thin line */}
        <div className="md:hidden absolute left-1/2 -translate-x-1/2 h-full w-[2px]">
          <motion.div
            style={{
              background: "linear-gradient(180deg,#7c3aed,#06b6d4)",
              borderRadius: 8,
              boxShadow: "0 8px 18px rgba(6,182,212,0.08)",
            }}
            initial={{ height: "6%" }}
            animate={{ height: `${20 + heightPct * 0.8}%` }}
            transition={{ duration: 0.3 }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineLine;