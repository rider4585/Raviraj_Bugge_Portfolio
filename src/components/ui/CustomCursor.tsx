// src/components/ui/CustomCursor.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(true);
  const [color, setColor] = useState("rgba(255,255,255,0.6)");
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseenter", handleEnter);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", handleEnter);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Hide cursor & sample color on hover
  useEffect(() => {
    const selectors = [
      "button",
      "a",
      "input",
      "textarea",
      "select",
      "[role='button']",
      "[data-clickable='true']",
    ];

    const updateInteractiveState = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;

      const isInteractive = selectors.some((sel) => el.closest(sel));
      setHoveringInteractive(isInteractive);

      if (isInteractive) {
        const bg =
          getComputedStyle(el).backgroundColor ||
          getComputedStyle(el.parentElement!).backgroundColor;

        setColor(bg || "rgba(255,255,255,0.6)");
      } else {
        setColor("rgba(255,255,255,0.6)");
      }
    };

    window.addEventListener("mousemove", updateInteractiveState);
    return () =>
      window.removeEventListener("mousemove", updateInteractiveState);
  }, []);

  return (
    <motion.div
      animate={{
        x: position.x - 8,
        y: position.y - 8,
        opacity: !visible ? 0 : hoveringInteractive ? 0 : 1,
        backgroundColor: color,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        pointerEvents: "none",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        mixBlendMode: "difference",
      }}
    />
  );
}
