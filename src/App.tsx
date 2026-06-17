import React from "react";
import Home from "./pages/Home";
import ScrollProgress from "./components/layout/ScrollProgress";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0c1017] text-slate-100">
      <ScrollProgress />
      <Home />
    </div>
  );
};

export default App;
