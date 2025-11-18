// src/components/ThemeToggle.tsx
import { useTheme } from "../../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-pressed={theme === "dark"}
      className="px-3 py-1.5 rounded-lg border text-sm"
      style={{
        background: "var(--card-bg-soft)",
        color: "var(--text-primary)",
        borderColor: "var(--glass-border)",
      }}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
