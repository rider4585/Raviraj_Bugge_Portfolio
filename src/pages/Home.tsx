import React from "react";
import Hero from "../components/hero/Hero";
import Timeline from "../components/timeline/Timeline";
// import SkillMap from "../components/skills/SkillMap";
import SkillExplorer from "../components/skills/SkillExplorer";
import ProjectsGrid from "../components/project/ProjectsGrid";
// import Contact from "../components/contact/Contact";

const Home: React.FC = () => {
  return (
    <div className="py-12 space-y-20">
      <section id="hero" className="pt-12">
        <Hero />
      </section>

      <Timeline />

      <SkillExplorer />

      <ProjectsGrid />
      {/* <section id="projects" aria-label="Projects">
        <div className="glass p-6">
          <h2 className="text-xl font-semibold mb-3">Projects (coming soon)</h2>
          <p className="text-sm text-gray-600">
            Project cards with previews will be here.
          </p>
        </div>
      </section> */}

      {/* <footer className="py-10 text-center text-sm text-gray-500">
        Built with ❤️ — designed for smooth micro-interactions.
      </footer> */}

        {/* <Contact/> */}

    </div>
  );
};

export default Home;
