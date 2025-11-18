// src/components/ui/Avatar.tsx
import { useState } from "react";

type AvatarProps = {
  src?: string | null;
  name?: string;
  width?: number; // px
  height?: number; // px
  className?: string;
  alt?: string;
};

/**
 * Rectangular avatar (not circular)
 * - Uses theme variables
 * - Glass surface + accent border
 * - Fallback initials if image fails
 * - Replace DEFAULT_SRC with your actual photo path
 */

const DEFAULT_SRC = "/PASSPORT_PHOTO-min.jpg"; // <-- update this path when you add your photo

export default function Avatar({
  src = DEFAULT_SRC,
  name = "Raviraj Bugge",
  width = 90,
  height = 90,
  className = "",
  alt,
}: AvatarProps) {
  const [error, setError] = useState(false);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width,
        height,
        borderRadius: 16, // rounded rectangle
        background: "var(--card-bg)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--card-shadow)",
        backdropFilter: "blur(12px) saturate(140%)",
        WebkitBackdropFilter: "blur(12px) saturate(140%)",
      }}
    >
      {/* Border accent (Very subtle gradient line) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          padding: 2,
          background:
            "linear-gradient(135deg, var(--accent-1), var(--accent-2))",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* Image or fallback initials */}
      {!error && src ? (
        <img
          src={src}
          alt={alt ?? `${name} avatar`}
          loading="lazy"
          decoding="async"
          onError={() => setError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            borderRadius: 14, // inner radius
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 14,
            background:
              "linear-gradient(135deg, var(--accent-1), var(--accent-2))",
            color: "#fff",
            fontWeight: 600,
            fontSize: Math.round(height / 3),
            letterSpacing: 1,
          }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}
