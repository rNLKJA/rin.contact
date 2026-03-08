import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { FiX, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";

/* ── Reference data ─────────────────────────────────────────────────────── */

const GROUPS = [
  // ── Most recent first ────────────────────────────────────────────────────
  {
    label: "Attorney-General's Department SA — Consumer & Business Services",
    refs: [
      {
        name: "Elizabeth Ambler",
        title: "Principal Strategic Intelligence Analyst",
        org: "CBS · Prevention Team",
        relationship: "Line Manager",
        context: "Compliance & Enforcement",
        period: "Jan 2025 – Mar 2026",
        email: "Lizzy.ambler@sa.gov.au",
      },
      {
        name: "Lira Gonzaga",
        title: "Senior Strategic Intelligence Analyst",
        org: "CBS · Prevention Team",
        relationship: "Senior Colleague",
        context: "Compliance & Enforcement",
        period: "Jan 2025 – Mar 2026",
        email: "Lira.Gonzaga@sa.gov.au",
      },
      {
        name: "Natalie Bennets",
        title: "Intelligence Analyst",
        org: "CBS · Prevention Team",
        relationship: "Colleague",
        context: "Compliance & Enforcement",
        period: "Jan 2025 – Mar 2026",
        email: "Natalie.Bennets2@sa.gov.au",
      },
      {
        name: "Paula Benson",
        title: "Manager Advice and Conciliation",
        org: "CBS · A&C Team",
        relationship: "Colleague",
        context: "Advice & Conciliation",
        period: "Jan 2025 – Mar 2026",
        email: "Paula.Benson@sa.gov.au",
      },
      {
        name: "Rob-yn Loch",
        title: "Team Leader Complaints",
        org: "CBS · Compliance & Enforcement",
        relationship: "Colleague",
        context: "Compliance & Enforcement",
        period: "Jan 2025 – Mar 2026",
        email: "Rob-yn.Loch@sa.gov.au",
      },
      {
        name: "Claire Zollo",
        title: "Senior Regulatory Officer",
        org: "CBS · Regulatory Services",
        relationship: "Colleague",
        context: "Regulatory Services",
        period: "Jan 2025 – Mar 2026",
        email: "Claire.Zollo@sa.gov.au",
      },
      {
        name: "Aaron Tsambis",
        title: "Senior Compliance Inspector",
        org: "CBS · Tobacco & E-Cigarette Team",
        relationship: "Colleague",
        context: "Tobacco & E-Cigarette",
        period: "Jan 2025 – Mar 2026",
        email: "Aaron.Tsambis@sa.gov.au",
      },
      {
        name: "Tom Baltic",
        title: "Casino & Gambling Intel & Scheduling Officer",
        org: "CBS · Casino and Gambling Team",
        relationship: "Colleague",
        context: "Casino & Gambling",
        period: "Jan 2025 – Mar 2026",
        email: "tom.baltic@sa.gov.au",
      },
      {
        name: "Trung Le",
        title: "Casino and Gambling Intelligence and Scheduling Officer",
        org: "CBS · Casino and Gambling Team",
        relationship: "Colleague",
        context: "Casino & Gambling",
        period: "Jan 2025 – Mar 2026",
        email: "trung.le@sa.gov.au",
      },
      {
        name: "Anna Arnold",
        title: "Senior Investigator",
        org: "CBS · Compliance & Enforcement",
        relationship: "Colleague",
        context: "Compliance & Enforcement",
        period: "Jan 2025 – Mar 2026",
        email: "Anna.Arnold@sa.gov.au",
      },
      {
        name: "Billie Tuckerman",
        title: "Senior Investigator",
        org: "CBS · Compliance & Enforcement",
        relationship: "Colleague",
        context: "Compliance & Enforcement",
        period: "Jan 2025 – Mar 2026",
        email: "billie.tuckerman@sa.gov.au",
      },
      {
        name: "Matthew Osborne",
        title: "Senior Compliance Inspector",
        org: "CBS · Compliance & Enforcement",
        relationship: "Colleague",
        context: "Compliance & Enforcement",
        period: "Jan 2025 – Mar 2026",
        email: "Matthew.Osborne@sa.gov.au",
      },
      {
        name: "Natalie Hand",
        title: "Legal Administrative Officer",
        org: "CBS · Crown Solicitor Office",
        relationship: "Colleague",
        context: "Legal / Administrative",
        period: "Jan 2025 – Mar 2026",
        email: "Natalie.Hand@sa.gov.au",
      },
      {
        name: "Mladen Samohod",
        title: "Senior Analyst Programmer",
        org: "CBS · Business Transformation Branch",
        relationship: "Technical Colleague",
        context: "Business Transformation",
        period: "Jan 2025 – Mar 2026",
        email: "Mladen.Samohod@sa.gov.au",
      },
      {
        name: "Campbell Mackinnon",
        title: "Data and Reporting Analyst",
        org: "CBS · Business Transformation Branch",
        relationship: "Technical Colleague",
        context: "Data & Reporting",
        period: "Jan 2025 – Mar 2026",
        email: "Campbell.Mackinnon@sa.gov.au",
      },
      {
        name: "Scott Valentine",
        title: "Project Solution Analyst",
        org: "CBS · Business Transformation Branch",
        relationship: "Technical Colleague",
        context: "Business Transformation",
        period: "Jan 2025 – Mar 2026",
        email: "Scott.valentine@sa.gov.au",
      },
      {
        name: "Kurien George",
        title: "Power BI Developer",
        org: "CBS · Business Transformation Branch",
        relationship: "Technical Colleague",
        context: "Business Transformation / BI",
        period: "Jan 2025 – Mar 2026",
        email: "kurien.george3@sa.gov.au",
      },
    ],
  },
  {
    label: "WEHI — Genomics Metadata Multiplexing",
    refs: [
      {
        name: "Rowland Mosbergen",
        title: "Strategic Leadership & Digital Transformation",
        org: "WEHI",
        relationship: "Supervisor & Subject Matter Expert",
        context: "Genomics Metadata Multiplexing project",
        period: "Feb 2024 – Jun 2024",
        phone: "+61 423 030 628",
        email: "mosbergen.r@wehi.edu.au",
        linkedin: "https://www.linkedin.com/in/rowlandm-gaicd/",
      },
    ],
  },
  {
    label: "CSIRO — Master of Data Science Capstone",
    refs: [
      {
        name: "Dr Vassili Kitsios",
        title: "Senior Research Scientist",
        org: "CSIRO",
        relationship: "Supervisor & Subject Matter Expert",
        context: "Master of Data Science Capstone",
        period: "Feb 2023 – Nov 2023",
        phone: "+61 423 657 978",
        email: "Vassili.Kitsios@csiro.au",
        linkedin: "https://www.linkedin.com/in/vassilikitsios/",
      },
      {
        name: "Marika B. Hille",
        title: "Industry Consultant, Faculty of Science",
        org: "University of Melbourne",
        relationship: "Supervisor & Subject Matter Expert",
        context: "Master of Data Science Capstone",
        period: "Feb 2023 – Nov 2023",
        phone: "+61 406 219 704",
        email: "m.hille@unimelb.edu.au",
        linkedin: "https://www.linkedin.com/in/marika-benetti-hille/",
      },
    ],
  },
];

/* ── Modal component ────────────────────────────────────────────────────── */

export default function ReferencesPanel({ onClose }) {
  /* Close on Escape */
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  /* Block all copy / right-click on the panel content */
  const blockCopy = (e) => e.preventDefault();

  return createPortal(
    /* Backdrop */
    <div
      className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Professional References"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative z-10 bg-white w-full md:max-w-4xl md:rounded-none max-h-[90vh] flex flex-col"
        onCopy={blockCopy}
        onCut={blockCopy}
        onContextMenu={blockCopy}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 md:px-10 pt-7 pb-4 border-b border-[#E8E8E8] shrink-0">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-1">
              Confidential
            </p>
            <h2 className="text-xl font-semibold text-[#1A1A1A] leading-tight">
              Professional References
            </h2>
            <p className="text-[11px] text-[#AAAAAA] mt-1 leading-relaxed">
              Shared in confidence — please reach out before contacting any referee directly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-6 mt-0.5 p-2 rounded-full border border-[#E8E8E8] hover:border-[#1A1A1A]
                       hover:bg-[#F5F5F5] transition-all duration-200 shrink-0"
            aria-label="Close references"
          >
            <FiX size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable body — select-none prevents text selection */}
        <div
          className="overflow-y-auto px-6 md:px-10 py-6 select-none"
          style={{ userSelect: "none", WebkitUserSelect: "none" }}
        >
          {GROUPS.map((group) => (
            <div key={group.label} className="mb-10 last:mb-4">
              {/* Group label */}
              <p className="text-[10px] tracking-widest uppercase text-[#7A7A7A] mb-4 pb-2 border-b border-[#F0F0F0]">
                {group.label}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {group.refs.map((ref) => (
                  <div
                    key={ref.name}
                    className="border border-[#EEEEEE] p-4 hover:border-[#CCCCCC] transition-colors duration-200"
                  >
                    {/* Name + title */}
                    <p className="text-sm font-semibold text-[#1A1A1A] leading-tight mb-0.5">
                      {ref.name}
                    </p>
                    <p className="text-[11px] text-[#3D3D3D] leading-snug mb-0.5">
                      {ref.title}
                    </p>
                    <p className="text-[10px] text-[#FF3C3C] tracking-wide uppercase mb-2">
                      {ref.org}
                    </p>

                    {/* Relationship */}
                    <p className="text-[10px] text-[#9A9A9A] leading-relaxed italic mb-3">
                      {ref.relationship} · {ref.context} · {ref.period}
                    </p>

                    {/* Contact */}
                    <div className="flex flex-wrap gap-1.5">
                      <a
                        href={`mailto:${ref.email}`}
                        className="inline-flex items-center gap-1.5 border border-[#E8E8E8] px-2.5 py-1 rounded-full
                                   text-[10px] text-[#7A7A7A] hover:border-[#3D3D3D] hover:text-[#1A1A1A]
                                   transition-all duration-200"
                        aria-label={`Email ${ref.name}`}
                        onContextMenu={blockCopy}
                      >
                        <FiMail size={9} aria-hidden="true" />
                        {ref.email}
                      </a>
                      {ref.phone && (
                        <a
                          href={`tel:${ref.phone.replace(/\s/g, "")}`}
                          className="inline-flex items-center gap-1.5 border border-[#E8E8E8] px-2.5 py-1 rounded-full
                                     text-[10px] text-[#7A7A7A] hover:border-[#3D3D3D] hover:text-[#1A1A1A]
                                     transition-all duration-200"
                          aria-label={`Call ${ref.name}`}
                          onContextMenu={blockCopy}
                        >
                          <FiPhone size={9} aria-hidden="true" />
                          {ref.phone}
                        </a>
                      )}
                      {ref.linkedin && (
                        <a
                          href={ref.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 border border-[#E8E8E8] px-2.5 py-1 rounded-full
                                     text-[10px] text-[#7A7A7A] hover:border-[#3D3D3D] hover:text-[#1A1A1A]
                                     transition-all duration-200"
                          aria-label={`${ref.name} on LinkedIn`}
                          onContextMenu={blockCopy}
                        >
                          <FiLinkedin size={9} aria-hidden="true" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
