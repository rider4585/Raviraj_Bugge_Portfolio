import { useEffect, useRef, useState } from "react";

export default function useInView<T extends Element>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            // once true, we can unobserve to keep it one-time reveal
            if (observer && el) observer.unobserve(el);
          }
        });
      },
      { threshold: 0.18, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref.current]);

  return { ref, inView };
}
