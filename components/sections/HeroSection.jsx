import React, { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const ROLES = [
  "Senior Data Analyst",
  "Research Software Engineer",
  "Data Science Consultant",
  "Co-Founder & Dev Lead",
  "Intelligence & Coordination Officer",
  "Full-Stack Engineer",
];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

export default function HeroSection() {
  const role = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      className="pt-16 pb-20 md:pt-20 md:pb-28"
      aria-label="Introduction"
    >
      {/* Dot-matrix decorative strip */}
      <div
        className="dot-matrix absolute top-0 right-0 w-48 h-48 opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-3xl">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 border border-[#E0E0E0] px-4 py-1.5 mb-8 text-xs tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-blink" aria-hidden="true" />
          Strategic Thinking & Continuous Improvement · ASO7 Senior Data Analyst · Adelaide, SA
        </div>

        <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-6">01 — Profile</p>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-semibold leading-none tracking-tight mb-4 animate-fade-up">
          Rin Huang
        </h1>
        <p className="text-sm tracking-widest uppercase text-[#7A7A7A] mb-8 animate-fade-up delay-100">
          Sunchuangyu Huang · Adelaide & Melbourne, Australia
        </p>

        {/* Typewriter role */}
        <div
          className="text-xl md:text-2xl font-light text-[#3D3D3D] mb-8 h-8 animate-fade-up delay-200"
          aria-live="polite"
          aria-label={`Current role: ${role}`}
        >
          {role}
          <span className="animate-blink ml-0.5" aria-hidden="true">_</span>
        </div>

        {/* Bio */}
        <p className="text-base font-light text-[#3D3D3D] leading-relaxed max-w-2xl mb-12 animate-fade-up delay-300">
          From climate risk modelling at CSIRO to ministerial dashboards for the
          SA Government, from genomics pipelines at WEHI to a mental health mobile
          app at UniMelb — I work at the edges of disciplines where data, strategy,
          and engineering intersect. My approach is grounded in first-principles
          thinking and a genuine commitment to continuous improvement.
          Generalist by nature, specialist by discipline.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-4 animate-fade-up delay-400">
          {/* Row 1 — action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#timeline"
              className="bg-[#FF3C3C] border border-[#FF3C3C] text-white px-6 py-2.5 text-sm tracking-widest uppercase
                         hover:bg-transparent hover:text-[#FF3C3C] transition-colors duration-200
                         focus-visible:outline-2 focus-visible:outline-[#FF3C3C]"
            >
              Career Path
            </a>
            <a
              href="#contact"
              className="border border-[#E0E0E0] px-6 py-2.5 text-sm tracking-widest uppercase
                         text-[#3D3D3D] hover:border-[#FF3C3C] hover:text-[#FF3C3C] transition-colors duration-200"
            >
              Get in Touch
            </a>
          </div>

          {/* Row 2 — social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/sunchuangyuhuang/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="text-[#7A7A7A] hover:text-black transition-colors duration-200"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://github.com/rNLKJA"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="text-[#7A7A7A] hover:text-black transition-colors duration-200"
            >
              <FiGithub size={18} />
            </a>
          </div>
        </div>

        {/* Domain tags */}
        <div className="flex flex-wrap gap-2 mt-12 animate-fade-up delay-500">
          {[
            "Strategic Thinking",
            "Continuous Improvement",
            "Data Science",
            "Statistical Intelligence",
            "Government Analytics",
            "Web Development",
            "Mobile Development",
            "Research Engineering",
            "Cloud & Infrastructure",
            "UI/UX Design",
            "Project Management",
          ].map((tag) => (
            <span
              key={tag}
              className="border border-[#E0E0E0] px-3 py-1 text-xs tracking-wider uppercase text-[#7A7A7A]
                         hover:border-[#FF3C3C] hover:text-[#FF3C3C] transition-colors duration-200 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
