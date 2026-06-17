import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../libs/animations";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { profile } from "../../data/profile";

const Hero: React.FC = () => {
  const reduce = usePrefersReducedMotion();

  return (
    <section id="hero" className="relative isolate overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(244,201,93,0.14),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(59,130,246,0.12),transparent_30%),linear-gradient(135deg,#0c1017_0%,#111827_54%,#101820_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#0c1017] to-transparent" />

      <motion.div
        initial={reduce ? "visible" : "hidden"}
        animate="visible"
        variants={staggerContainer}
        className="mx-auto grid min-h-[calc(100svh-66px)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-20"
      >
        <div className="max-w-3xl">
          <motion.p variants={fadeUp} className="max-w-full text-xs font-semibold uppercase tracking-[0.18em] text-[#f4c95d] sm:text-sm sm:tracking-[0.28em]">
            {profile.availability}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-5 max-w-full text-5xl font-semibold leading-[0.96] tracking-normal text-white sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            {profile.positioning}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
            {profile.summary}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="inline-flex items-center justify-center rounded-md bg-[#f4c95d] px-5 py-3 text-sm font-semibold text-[#15130d] transition hover:bg-[#ffe08a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c95d]" href="#contact">
              Contact Me
            </a>
            <a className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c95d]" href={profile.resume} download>
              Download Resume
            </a>
            <a className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold text-slate-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c95d]" href="#projects">
              View Projects
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-5 rounded-[2rem] border border-white/10 bg-white/[0.03]" />
          <figure className="relative overflow-hidden rounded-xl border border-white/12 bg-[#151a22] shadow-2xl shadow-black/40">
            <img
              src={profile.photo}
              alt={`${profile.name} portrait`}
              className="aspect-[4/5] w-full object-cover object-top"
              loading="eager"
              decoding="async"
            />
            <figcaption className="border-t border-white/10 bg-[#111827]/92 p-5">
              <p className="text-sm font-semibold text-white">{profile.role}</p>
              <p className="mt-1 text-sm text-slate-400">{profile.location}</p>
            </figcaption>
          </figure>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
