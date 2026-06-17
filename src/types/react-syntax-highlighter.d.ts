// quick ambient declarations for react-syntax-highlighter ESM entry points we use
declare module "react-syntax-highlighter/dist/esm/prism-light" {
  import type { ComponentType, CSSProperties } from "react";

  type PrismLightProps = {
    language?: string;
    style?: Record<string, unknown>;
    customStyle?: CSSProperties;
    children?: string;
  };

  const PrismLight: ComponentType<PrismLightProps> & {
    registerLanguage?: (language: string, grammar: unknown) => void;
  };
  export default PrismLight;
}

declare module "react-syntax-highlighter/dist/esm/languages/prism/jsx" {
  const jsx: unknown;
  export default jsx;
}

declare module "react-syntax-highlighter/dist/esm/languages/prism/markup" {
  const markup: unknown;
  export default markup;
}

declare module "react-syntax-highlighter/dist/esm/languages/prism/sql" {
  const sql: unknown;
  export default sql;
}

declare module "react-syntax-highlighter/dist/esm/languages/prism/bash" {
  const bash: unknown;
  export default bash;
}

declare module "react-syntax-highlighter/dist/esm/languages/prism/php" {
  const php: unknown;
  export default php;
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  const style: Record<string, Record<string, unknown>>;
  export default style;
}
