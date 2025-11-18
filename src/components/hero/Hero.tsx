import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../libs/animations";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import Avatar from "../micro/Avatar";

const Hero: React.FC = () => {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="flex flex-col items-start gap-6"
    >
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-4 w-full"
        aria-hidden={reduce}
      >
        <div className="w-20 h-20 rounded-xl overflow-hidden glass flex items-center justify-center">
          <Avatar className="w-16 h-16" />
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Raviraj Mahendra Bugge
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Lead Software Engineer — Full Stack
          </p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
          I build scalable, high-performance web apps with a focus on
          interactive UI and clean engineering. Specialized in RAG pipelines,
          local LLMs, React, and PHP (Yii).
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="flex gap-3 mt-2">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm font-medium shadow-sm hover:scale-102 transform transition"
        >
          View Projects
        </a>

        <a
          href="/Raviraj_Bugge_Resume.pdf"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm"
          download
        >
          Let’s build something together
        </a>
      </motion.div>
    </motion.header>
  );
};

export default Hero;
