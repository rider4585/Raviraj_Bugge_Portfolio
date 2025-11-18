// src/components/code/CodeSnippet.tsx
import { useEffect, useState } from "react";
// import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import type { ReactNode } from "react";

type Props = {
  code: string;
  lang?: string;
  runnable?: boolean;
  caption?: string;
  className?: string;
  children?: ReactNode;
};

const allowedRunnableLangs = new Set(["html", "markup"]);

export default function CodeSnippet({
  code,
  lang = "html",
  runnable = false,
  caption,
  className,
}: Props) {
  // const reduce = usePrefersReducedMotion();
  const [Highlighter, setHighlighter] = useState<any>(null);
  const [hlStyle, setHlStyle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const mod: any = await import(
          "react-syntax-highlighter/dist/esm/prism-light"
        );
        const jsxLang = await import(
          "react-syntax-highlighter/dist/esm/languages/prism/jsx"
        );
        const htmlLang = await import(
          "react-syntax-highlighter/dist/esm/languages/prism/markup"
        );
        const sqlLang = await import(
          "react-syntax-highlighter/dist/esm/languages/prism/sql"
        );
        const bashLang = await import(
          "react-syntax-highlighter/dist/esm/languages/prism/bash"
        );
        const phpLang = await import(
          "react-syntax-highlighter/dist/esm/languages/prism/php"
        );
        const styleMod: any = await import(
          "react-syntax-highlighter/dist/esm/styles/prism"
        );

        if (
          mod &&
          mod.default &&
          typeof mod.default.registerLanguage === "function"
        ) {
          mod.default.registerLanguage("jsx", jsxLang.default || jsxLang);
          mod.default.registerLanguage("tsx", jsxLang.default || jsxLang);
          mod.default.registerLanguage("html", htmlLang.default || htmlLang);
          mod.default.registerLanguage("markup", htmlLang.default || htmlLang);
          mod.default.registerLanguage("sql", sqlLang.default || sqlLang);
          mod.default.registerLanguage("bash", bashLang.default || bashLang);
          mod.default.registerLanguage("php", phpLang.default || phpLang);
        }

        const style =
          (styleMod && (styleMod.okaidia || styleMod.default || styleMod)) ||
          {};
        if (mounted) {
          setHighlighter(() => mod.default || mod);
          setHlStyle(style);
        }
      } catch {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const canRun = runnable && allowedRunnableLangs.has(lang);

  const makeSrcDoc = (raw: string) => {
    const hasDoc = /<\s*html|<\s*body/i.test(raw);
    if (hasDoc) return raw;
    return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head><body>${raw}</body></html>`;
  };

  return (
    <div className={`code-block mt-4 ${className ?? ""}`}>
      {caption && (
        <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {caption}
        </div>
      )}

      <div
        className="rounded-lg overflow-hidden"
        style={{
          background: "transparent", // let parent glass show through
          border: "1px solid var(--glass-border)",
        }}
      >
        {loading || !Highlighter ? (
          <pre
            className="p-3 text-xs"
            style={{
              color: "var(--text-secondary)",
              background: "transparent",
            }}
          >
            Loading snippet…
          </pre>
        ) : (
          <Highlighter
            language={lang}
            style={hlStyle}
            customStyle={{
              margin: 0,
              padding: 12,
              fontSize: 13,
              background: "var(--code-bg)",
              color: "var(--code-text)",
              borderRadius: 8,
            }}
          >
            {code}
          </Highlighter>
        )}
      </div>

      {canRun && (
        <div className="mt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreview((s) => !s)}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm"
            style={{
              background:
                "linear-gradient(90deg, var(--accent-1), var(--accent-2))",
              color: "#fff",
            }}
            aria-pressed={showPreview}
          >
            {showPreview ? "Hide preview" : "Run preview"}
          </button>

          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Sandboxed preview — safe
          </span>
        </div>
      )}

      {canRun && showPreview && (
        <div
          className="mt-3 border rounded overflow-hidden"
          style={{ height: 220, borderColor: "var(--glass-border)" }}
        >
          <iframe
            title="snippet-preview"
            sandbox="allow-scripts"
            srcDoc={makeSrcDoc(code)}
            style={{ width: "100%", height: "100%", border: 0 }}
            aria-label="Live preview of code snippet (sandboxed)"
          />
        </div>
      )}
    </div>
  );
}
