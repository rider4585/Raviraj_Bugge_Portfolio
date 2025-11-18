import React, { useEffect, useState } from "react";

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const pct = height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0;
      setProgress(pct);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <div className="fixed left-1/2 top-4 transform -translate-x-1/2 z-50">
      <div
        className="w-48 h-1 bg-white/30 rounded-full overflow-hidden shadow-sm glass"
        aria-hidden
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
            transition: "width 180ms linear",
          }}
        />
      </div>
    </div>
  );
};

export default ScrollProgress;
