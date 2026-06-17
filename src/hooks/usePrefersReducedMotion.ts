import { useEffect, useState } from "react";

export default function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setPrefersReducedMotion(query.matches);
    if (query.addEventListener) query.addEventListener("change", handler);
    else query.addListener(handler);
    return () => {
      if (query.removeEventListener)
        query.removeEventListener("change", handler);
      else query.removeListener(handler);
    };
  }, []);

  return prefersReducedMotion;
}
