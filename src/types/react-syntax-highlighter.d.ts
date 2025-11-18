// quick ambient declarations for react-syntax-highlighter ESM entry points we use
declare module "react-syntax-highlighter/dist/esm/prism-light" {
  const PrismLight: any;
  export default PrismLight;

  export function registerLanguage(arg0: string, arg1: any) {
    throw new Error("Function not implemented.");
  }
}

declare module "react-syntax-highlighter/dist/esm/languages/prism/jsx" {
  const jsx: any;
  export default jsx;
}

declare module "react-syntax-highlighter/dist/esm/languages/prism/markup" {
  const markup: any;
  export default markup;
}

declare module "react-syntax-highlighter/dist/esm/languages/prism/sql" {
  const sql: any;
  export default sql;
}

declare module "react-syntax-highlighter/dist/esm/languages/prism/bash" {
  const bash: any;
  export default bash;
}

declare module "react-syntax-highlighter/dist/esm/languages/prism/php" {
  const php: any;
  export default php;
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  const style: any;
  export default style;
}
