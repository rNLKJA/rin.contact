import { useCallback } from "react";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { CAREER_RAW, EDUCATION } from "@/components/sections/TimelineSection";
import { CERTS } from "@/components/sections/CertificationsSection";

// Build the CV from the same verified data that powers /career and /about, at build
// time, so it can never drift from the rest of the site and adds no client weight.
export function getStaticProps() {
  const experience = CAREER_RAW.map((r) => ({
    role: r.role,
    org: r.org,
    period: r.period,
    location: r.location || "",
    summary: r.summary || "",
    bullets: (r.bullets || []).slice(0, 3),
  }));

  const education = EDUCATION.filter((e) => e.tag !== "Secondary").map((e) => ({
    role: e.role,
    org: e.org,
    period: e.period,
    location: e.location || "",
  }));

  // Group certifications by issuer, ordered by how many Rin holds.
  const byIssuer = {};
  for (const c of CERTS) (byIssuer[c.issuer] ||= []).push(c.name);
  const certGroups = Object.entries(byIssuer)
    .map(([issuer, names]) => ({ issuer, names, count: names.length }))
    .sort((a, b) => b.count - a.count || a.issuer.localeCompare(b.issuer));

  return { props: { experience, education, certGroups, certTotal: CERTS.length } };
}

const SKILLS = [
  { group: "Data & analytics", items: "Python, R, SQL, statistical modelling, machine learning, time series, GIS" },
  { group: "Intelligence & reporting", items: "Strategic intelligence, risk-based frameworks, Power BI, Tableau, parliamentary and executive reporting" },
  { group: "Engineering", items: "Next.js, React, React Native, Node.js, AWS, CI/CD, data pipelines" },
];

const CONTACT = [
  { label: "Email", value: "huang@rin.contact", href: "mailto:huang@rin.contact" },
  { label: "Site", value: "rin.contact", href: "https://rin.contact" },
  { label: "LinkedIn", value: "in/sunchuangyuhuang", href: "https://www.linkedin.com/in/sunchuangyuhuang/" },
  { label: "GitHub", value: "rNLKJA", href: "https://github.com/rNLKJA" },
  { label: "Location", value: "Adelaide & Melbourne, Australia", href: null },
];

export default function CvPage({ experience, education, certGroups, certTotal }) {
  const print = useCallback(() => {
    if (typeof window !== "undefined") window.print();
  }, []);

  return (
    <>
      <SeoHead
        title="Curriculum Vitae — Rin Huang · rin.contact"
        description="The full curriculum vitae of Sunchuangyu (Rin) Huang — Senior Data Analyst at South Australia Police. Experience, education, certifications and skills, ready to read or save as PDF."
        path="/cv"
        ogImage={{ title: "Curriculum Vitae", subtitle: "Sunchuangyu (Rin) Huang — Senior Data Analyst", section: "cv" }}
      />

      <div className="bg-white dark:bg-[#0A0A0A] min-h-screen">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 py-14 md:py-20">

          {/* Action bar — hidden when printing */}
          <div className="cv-noprint flex items-center justify-between gap-4 mb-12">
            <Link
              href="/resume"
              className="text-[10px] tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white transition-colors"
            >
              ← Interactive resume
            </Link>
            <button
              onClick={print}
              className="inline-flex items-center gap-2 border border-[#FF3C3C] px-5 py-2 text-[11px] tracking-widest uppercase
                         text-[#FF3C3C] hover:bg-[#FF3C3C] hover:text-white transition-colors duration-200"
            >
              Save as PDF
            </button>
          </div>

          {/* Header */}
          <header className="mb-10 pb-8 border-b border-[#E5E5E5] dark:border-[#262626]">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#FF3C3C] mb-3 font-mono">Curriculum Vitae</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black dark:text-white mb-1">
              Sunchuangyu (Rin) Huang
            </h1>
            <p className="text-base text-[#3D3D3D] dark:text-[#AAAAAA] mb-5">
              Senior Data Analyst <span className="text-[#BBBBBB] dark:text-[#555]">·</span> Strategic Intelligence <span className="text-[#BBBBBB] dark:text-[#555]">·</span> Research Software Engineer
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-[#5C5C5C] dark:text-[#9A9A9A]">
              {CONTACT.map((c) => (
                <li key={c.label}>
                  <span className="text-[#9A9A9A] dark:text-[#666] mr-1.5">{c.label}</span>
                  {c.href ? (
                    <a href={c.href} className="hover:text-[#FF3C3C] transition-colors">{c.value}</a>
                  ) : (
                    <span>{c.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </header>

          {/* Summary */}
          <Section title="Profile">
            <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
              Senior Data Analyst working where data, strategy, and engineering meet. I translate complex data into
              decision-ready intelligence across government, research, and engineering, from climate-risk modelling at
              CSIRO and genomics pipelines at WEHI to ministerial reporting in the South Australian government.
              Problem-first, not model-first: I start from the decision that needs making and the minimum data to make
              it well. Generalist by nature, specialist by discipline.
            </p>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            <div className="space-y-7">
              {experience.map((x, i) => (
                <article key={i} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <h3 className="text-sm font-semibold text-black dark:text-white">{x.role}</h3>
                    <span className="text-[11px] tabular-nums text-[#7A7A7A] dark:text-[#9A9A9A]">{x.period}</span>
                  </div>
                  <p className="text-xs text-[#5C5C5C] dark:text-[#9A9A9A] mb-1.5">
                    {x.org}{x.location ? <span className="text-[#BBBBBB] dark:text-[#555]"> · {x.location}</span> : null}
                  </p>
                  {x.summary && (
                    <p className="text-[13px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed mb-1.5">{x.summary}</p>
                  )}
                  {x.bullets.length > 0 && (
                    <ul className="space-y-1">
                      {x.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2 text-[13px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
                          <span className="text-[#FF3C3C] flex-shrink-0 mt-0.5" aria-hidden="true">·</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </Section>

          {/* Education */}
          <Section title="Education">
            <div className="space-y-3">
              {education.map((e, i) => (
                <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 break-inside-avoid">
                  <div>
                    <h3 className="text-sm font-semibold text-black dark:text-white inline">{e.role}</h3>
                    <span className="text-xs text-[#5C5C5C] dark:text-[#9A9A9A]"> — {e.org}</span>
                  </div>
                  <span className="text-[11px] tabular-nums text-[#7A7A7A] dark:text-[#9A9A9A]">{e.period}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <dl className="space-y-2">
              {SKILLS.map((s) => (
                <div key={s.group} className="flex flex-col sm:flex-row sm:gap-4 break-inside-avoid">
                  <dt className="text-xs font-semibold text-black dark:text-white sm:w-48 flex-shrink-0">{s.group}</dt>
                  <dd className="text-[13px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">{s.items}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* Certifications */}
          <Section title={`Certifications (${certTotal})`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {certGroups.map((g) => (
                <div key={g.issuer} className="break-inside-avoid">
                  <p className="text-xs font-semibold text-black dark:text-white">
                    {g.issuer} <span className="text-[#FF3C3C] font-normal">({g.count})</span>
                  </p>
                  <p className="text-[12px] text-[#5C5C5C] dark:text-[#9A9A9A] leading-relaxed">{g.names.join(", ")}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Foot */}
          <p className="cv-noprint mt-12 pt-6 border-t border-[#E5E5E5] dark:border-[#262626] text-[11px] text-[#9A9A9A]">
            Generated from rin.contact. For the interactive version, references, and project case studies, visit{" "}
            <Link href="/" className="text-[#FF3C3C] hover:underline">rin.contact</Link>.
          </p>
        </div>
      </div>

      <style>{`
        @media print {
          .cv-noprint { display: none !important; }
        }
      `}</style>
    </>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-9">
      <h2 className="text-[11px] tracking-[0.25em] uppercase text-[#FF3C3C] mb-4 pb-2 border-b border-[#F0F0F0] dark:border-[#1E1E1E]">
        {title}
      </h2>
      {children}
    </section>
  );
}
