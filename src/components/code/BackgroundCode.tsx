// src/components/code/BackgroundCode.tsx
// import React from "react";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const LINES = [
  "<h1>Hi — I'm Raviraj 👋</h1>",
  "const greet = () => console.log('Hi, I\\'m Raviraj');",
  "SELECT name FROM medications WHERE active = TRUE;",
  "npm run dev",
];

export default function BackgroundCode() {
  const reduce = usePrefersReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {LINES.map((text, i) => {
        const left = [6, 18, 36, 54][i % 4];
        const top = [8, 28, 52, 72][i % 4];
        const duration = 22 + i * 6;
        const baseOpacity = 0.06 + i * 0.02;
        const fallbackColor = `rgba(124,58,237,${(baseOpacity * 1.2).toFixed(
          2
        )})`;

        return (
          <motion.pre
            key={i}
            initial={
              reduce
                ? { opacity: baseOpacity }
                : { opacity: 0, translateY: 40 + i * 10 }
            }
            animate={
              reduce
                ? { opacity: baseOpacity }
                : { opacity: baseOpacity, translateY: -24 - i * 6 }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                    delay: i * 1,
                  }
            }
            className="absolute text-[13px] leading-tight font-mono select-none"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              color: fallbackColor,
              whiteSpace: "nowrap",
              textShadow: "0 6px 18px rgba(12,15,23,0.04)",
              opacity: baseOpacity,
              pointerEvents: "none",
              transformOrigin: "center",
            }}
          >
            {text}
          </motion.pre>
        );
      })}
    </div>
  );
}
