// src/components/code/BackgroundCode.tsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const LINES = [
  "<h1>Hi — I'm Raviraj 👋</h1>",
  "const greet = () => console.log('Hi, I\\'m Raviraj');",
  "SELECT name FROM medications WHERE active = TRUE;",
  "npm run dev",
];

function BackgroundLayer() {
  const reduce = usePrefersReducedMotion();

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: -1,              // behind everything else
        overflow: "hidden",
      }}
    >
      {LINES.map((text, i) => {
        const left = [6, 18, 36, 54][i % 4];
        const top = [8, 28, 52, 72][i % 4];
        const duration = 22 + i * 6;
        const baseOpacity = 0.06 + i * 0.02;
        const color = `rgba(124,58,237,${(baseOpacity * 1.1).toFixed(2)})`;

        return (
          <motion.pre
            key={i}
            initial={reduce ? { opacity: baseOpacity } : { opacity: 0, y: 40 + i * 10 }}
            animate={reduce ? { opacity: baseOpacity } : { opacity: baseOpacity, y: -24 - i * 6 }}
            transition={reduce ? undefined : { duration, repeat: Infinity, repeatType: "reverse", ease: "linear", delay: i * 1 }}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              margin: 0,
              padding: 0,
              color,
              whiteSpace: "nowrap",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace",
              fontSize: 13,
              lineHeight: 1,
              opacity: baseOpacity,
              textShadow: "0 6px 18px rgba(12,15,23,0.04)",
              pointerEvents: "none",
            }}
          >
            {text}
          </motion.pre>
        );
      })}
    </div>
  );
}

export default function BackgroundCode() {
  // ensure we have a body to portal into (SSR-safe)
  const mount = typeof document !== "undefined" ? document.body : null;

  useEffect(() => {
    // nothing special — component animates itself
  }, []);

  if (!mount) return null;
  return createPortal(<BackgroundLayer />, mount);
}
