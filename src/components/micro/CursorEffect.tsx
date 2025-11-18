import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Minimal custom cursor that follows pointer and scales when hovering interactive elements.
 * - Mount at top level (App.tsx)
 * - It sets an attribute on body so native cursor can be hidden via CSS if desired.
 *
 * Note: If you prefer to keep native cursor, remove the data attribute setting below.
 */

const CursorEffect: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 20, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-use-custom-cursor", "true");
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const down = () => setIsActive(true);
    const up = () => setIsActive(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    // enlarge cursor when hovering interactive elements
    const enterHandler = () => setIsActive(true);
    const leaveHandler = () => setIsActive(false);
    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", enterHandler);
      el.addEventListener("mouseleave", leaveHandler);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.removeEventListener("mouseenter", enterHandler);
        el.removeEventListener("mouseleave", leaveHandler);
      });
      document.documentElement.removeAttribute("data-use-custom-cursor");
    };
  }, []);

  return (
    <motion.div
      style={{ translateX: x, translateY: y, pointerEvents: "none" as const }}
      className="fixed top-0 left-0 z-50"
      aria-hidden
    >
      <motion.div
        animate={{ scale: isActive ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-600 to-cyan-400 shadow-lg"
      />
    </motion.div>
  );
};

export default CursorEffect;
