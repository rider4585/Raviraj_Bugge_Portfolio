import { ICON_MAP } from "../../data/icon-map";
export default function TechIcon({
  id,
  size = 26,
  className = "",
}: {
  id: string;
  size?: number;
  className?: string;
}) {
  const icon = ICON_MAP[id];

  if (!icon) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      <path d={icon.path} fill={`url(#grad-${id})`} />
    </svg>
  );
}
