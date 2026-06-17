import { profile } from "../../data/profile";

export default function Contact() {
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio conversation")}`;

  return (
    <section id="contact" aria-label="Contact" className="bg-[#0c1017] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 rounded-lg border border-white/10 bg-[#111827] p-6 sm:p-8 lg:grid-cols-[0.58fr_0.42fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f4c95d]">Contact</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Let’s talk about the next product challenge.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
              Best fit: senior full-stack engineering roles where React interfaces, PHP systems, PostgreSQL data models, and applied AI workflows meet real product delivery.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={mailto} className="inline-flex items-center justify-center rounded-md bg-[#f4c95d] px-5 py-3 text-sm font-semibold text-[#15130d] transition hover:bg-[#ffe08a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c95d]">
                Email Me
              </a>
              <a href={profile.resume} download className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c95d]">
                Download Resume
              </a>
            </div>
          </div>

          <div className="grid content-start gap-3">
            <a href={mailto} className="rounded-md border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#f4c95d]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c95d]">
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Email</span>
              <span className="mt-2 block break-all text-sm font-medium text-white">{profile.email}</span>
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-md border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#f4c95d]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c95d]">
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">LinkedIn</span>
              <span className="mt-2 block text-sm font-medium text-white">raviraj-bugge-68017a21a</span>
            </a>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="rounded-md border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#f4c95d]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c95d]">
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">GitHub</span>
              <span className="mt-2 block text-sm font-medium text-white">github.com/rider4585</span>
            </a>
          </div>
        </div>

        <footer className="mt-8 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>{profile.name} · {profile.role}</span>
          <span>{profile.location}</span>
        </footer>
      </div>
    </section>
  );
}
