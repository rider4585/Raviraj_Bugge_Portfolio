import React from "react";
import Home from "./pages/Home";
import CursorEffect from "./components/micro/CursorEffect";
import ScrollProgress from "./components/layout/ScrollProgress";
import BackgroundCode from "./components/code/BackgroundCode";
// import ThemeToggle from "./components/ui/ThemeToggle";

const App: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--page-bg)" }}>
      {/* <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div> */}
      {/* decorative background */}
      <BackgroundCode />

      {/* Global micro interactions */}
      <CursorEffect />
      <ScrollProgress />

      {/* Single-column centered container */}
      <main className="mx-auto max-w-3xl px-6 lg:px-0">
        <Home />
      </main>
    </div>
  );
};

export default App;
