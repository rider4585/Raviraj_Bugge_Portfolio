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
    <div className="fixed left-0 right-0 top-0 z-50">
      <div
        className="h-1 w-full overflow-hidden bg-white/5"
        aria-hidden
      >
        <div
          className="h-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg,#f4c95d,#6ee7b7)",
            transition: "width 180ms linear",
          }}
        />
      </div>
    </div>
  );
};

export default ScrollProgress;
