import type { Variants } from "framer-motion";
import { cubicBezier } from "@popmotion/easing";

/**
 * Centralized animation variants and durations.
 * Tweak durations/easings here to change the global feel.
 */

export const easings = {
  standard: cubicBezier(0.16, 1, 0.3, 1),
  gentle: cubicBezier(0.2, 0.8, 0.2, 1),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.standard },
  },
};

export const subtleScale: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: easings.gentle },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/* Timeline-specific variants */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.995 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easings.standard },
  },
};

export const revealBullets: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.42, ease: easings.gentle, delay: i * 0.06 },
  }),
};

export const glowExpand: Variants = {
  hidden: { scale: 0.6, opacity: 0.25 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.28, ease: easings.standard },
  },
};