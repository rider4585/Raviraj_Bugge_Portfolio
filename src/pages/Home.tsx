import React from "react";
import Hero from "../components/hero/Hero";
import Timeline from "../components/timeline/Timeline";
import SkillExplorer from "../components/skills/SkillExplorer";
import ProjectsGrid from "../components/project/ProjectsGrid";
import Contact from "../components/contact/Contact";
import { profile } from "../data/profile";

const navItems = [
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const Home: React.FC = () => {
  return (
    <>
      <header className="sticky top-0 z-40 overflow-hidden border-b border-white/10 bg-[#0c1017]/86 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#hero" className="group inline-flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c95d]">
            <span className="grid h-9 w-9 place-items-center rounded-md border border-white/12 bg-white/6 text-sm font-semibold text-[#f4c95d]">
              RB
            </span>
            <span className="hidden text-sm font-semibold tracking-wide text-white sm:inline">
              {profile.name}
            </span>
          </a>

          <div className="flex items-center gap-1 overflow-x-auto rounded-md border border-white/10 bg-white/[0.03] p-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/8 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c95d] sm:text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <Hero />
        <Timeline />
        <SkillExplorer />
        <ProjectsGrid />
        <Contact />
      </main>
    </>
  );
};

export default Home;
