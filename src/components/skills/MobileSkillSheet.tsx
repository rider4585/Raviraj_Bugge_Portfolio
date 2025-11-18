// src/components/skills/MobileSkillSheet.tsx
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import type { Skill } from "../../data/skills";
import SkillDetail from "./SkillDetail";

type Props = {
  open: boolean;
  onClose: () => void;
  skill: Skill | null;
};

/**
 * MobileSkillSheet (hard-coded visual styles)
 * - All colors and shadows are inline / hard-coded (no CSS variables)
 * - Constrained bottom sheet with safe-area inset
 * - Separate backdrop layer
 * - Robust close / focus behavior
 */
export default function MobileSkillSheet({ open, onClose, skill }: Props) {
  const reduce = usePrefersReducedMotion();
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const close = () => {
    try {
      onClose?.();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("MobileSkillSheet: onClose threw", err);
    } finally {
      document.body.style.overflow = "";
      // restore focus on desktop only (avoid reopening sheet on mobile)
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        setTimeout(() => lastActiveRef.current?.focus?.(), 10);
      }
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    if (open) {
      lastActiveRef.current = document.activeElement as HTMLElement;
      document.addEventListener("keydown", onKey);
      // lock body scroll while sheet is open
      document.body.style.overflow = "hidden";
      // focus sheet for a11y (desktop only)
      if (!reduce && typeof window !== "undefined" && window.innerWidth >= 768) {
        setTimeout(() => sheetRef.current?.focus(), 10);
      }
    } else {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reduce]);

  // Hard-coded style values (dark-mode friendly)
  const BACKDROP_STYLE = { background: "rgba(3, 7, 18, 0.6)" }; // dark semi-opaque
  const SHEET_STYLE: React.CSSProperties = {
    width: "min(960px, calc(100% - 32px))",
    maxHeight: "calc(100vh - 96px)",
    borderRadius: 16,
    // slightly warm-blue glass background
    background: "rgba(22, 26, 34, 0.86)",
    // faint cool border to separate from backdrop
    border: "1px solid rgba(120, 150, 200, 0.07)",
    // deeper shadow so sheet reads above page
    boxShadow: "0 18px 48px rgba(2, 6, 20, 0.65)",
    // a decent blur but not too strong (avoid double-blur effect)
    backdropFilter: "blur(10px) saturate(120%)",
    WebkitBackdropFilter: "blur(10px) saturate(120%)",
    overflow: "auto",
    padding: 18,
    margin: "0 16px 16px",
    paddingBottom: "calc(env(safe-area-inset-bottom, 16px) + 18px)",
    color: "#e8eef8", // ensure readable text color inside sheet
  };

  const HEADER_TITLE_STYLE: React.CSSProperties = {
    color: "#e8eef8",
    fontSize: 14,
    fontWeight: 600,
  };

  const CLOSE_BUTTON_STYLE: React.CSSProperties = {
    color: "#b6c3d6",
    background: "transparent",
    border: "none",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop - separate layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40"
            style={BACKDROP_STYLE}
            onClick={close}
            aria-hidden
          />

          {/* Bottom sheet */}
          <motion.div
            key="mobile-sheet"
            initial={reduce ? { opacity: 1 } : { y: "100%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "100%" }}
            transition={{ duration: 0.32 }}
            className="fixed left-0 right-0 bottom-0 z-50 flex justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={skill ? `${skill.label} details` : "Skill details"}
          >
            {/* Constrain width so sheet doesn't span full viewport width on larger phones */}
            <div
              ref={sheetRef}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
              style={SHEET_STYLE}
            >
              {/* Header: title and close */}
              <div className="flex items-center justify-between mb-3">
                <div style={HEADER_TITLE_STYLE}>{skill?.label ?? "Details"}</div>

                <button
                  type="button"
                  aria-label="Close"
                  onClick={(e) => {
                    e.stopPropagation();
                    close();
                  }}
                  style={CLOSE_BUTTON_STYLE}
                >
                  Close
                </button>
              </div>

              {/* Body */}
              <div>
                <SkillDetail skill={skill ?? null} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
