import React, { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { FiPlus } from "react-icons/fi";

const FAQS = [
  {
    q: "What does a Senior Data Analyst do at South Australia Police?",
    a: "As an ASO7 Senior Data Analyst in SAPOL's Professional and Ethical Standards Branch (PESB), I develop analytical models and statistical frameworks that translate complex policing data into decision-ready intelligence. This includes strategic planning, parliamentary reporting, and governance of end-to-end analytics solutions across IAPro and connected systems — always anchored in first-principles thinking and evidence-based recommendations to senior leadership.",
  },
  {
    q: "What is strategic intelligence analytics and how does it differ from standard data analysis?",
    a: "Standard data analysis answers 'what happened'. Strategic intelligence analytics answers 'what should we do about it' — it frames data within operational context, risk tolerance, and organisational objectives. In government settings this means designing risk-based frameworks, identifying compliance patterns, and producing intelligence products that directly inform executive and ministerial decision-making, not just reporting numbers.",
  },
  {
    q: "What programming languages and tools do you use professionally?",
    a: "Python is my primary language for data engineering, statistical modelling, and automation. I use R for advanced statistical analysis, SQL for structured queries across relational databases, and Power BI and Tableau for executive dashboards. For geospatial work I use ArcGIS and Mapbox. On the software side I build with Next.js, React, React Native, Node.js, AWS, and Expo for web and mobile applications.",
  },
  {
    q: "What industries have you worked in?",
    a: "My experience spans Australian state government (South Australia Police and Attorney-General's Department), biomedical research (WEHI and CSIRO), financial services (CSL), food service (McDonald's), and the startup sector as a co-founder. This breadth means I can translate analytical frameworks across very different operational contexts — from parliamentary compliance reporting to clinical mobile applications.",
  },
  {
    q: "What is your educational background?",
    a: "I hold two degrees from the University of Melbourne: a Bachelor of Science with a major in Computing and Software Systems, and a Master of Data Science. I also hold 23 certifications across cloud platforms (AWS, Azure), analytics (Power BI, Tableau), and project management (Agile, Scrum), as well as professional assessments in English (IELTS) and translation (NAATI).",
  },
  {
    q: "Are you available for consulting, contract, or advisory work?",
    a: "Yes — I am open to strategic data consulting, government analytics advisory, and research data engineering engagements alongside my current role. If you have a data challenge, a research collaboration, or a project that needs strategic framing, the best starting point is a conversation. You can reach me at huang@rin.contact or through the contact form on this page.",
  },
  {
    q: "What does 'first-principles thinking' mean in a data context?",
    a: "First-principles thinking means refusing to inherit assumptions from how a problem has been framed before. In data work, it means starting from the raw question — what decision needs to be made? what is the minimum data needed to make it? — rather than defaulting to familiar tools or prior solutions. I applied this at SAPOL to redesign reporting infrastructure from the ground up rather than iterating on broken legacy systems.",
  },
  {
    q: "Do you work on open-source projects?",
    a: "Yes. I maintain several open-source repositories on GitHub under the handle rNLKJA, including a South Australian address generator based on SEIFA socio-economic indices and a US presidential debate and campaign document scraper covering over 25,000 documents. Open-source work is how I give back to the data community and keep my skills sharp outside of government environments where code is not publicly shareable.",
  },
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b border-[#E0E0E0] transition-colors duration-200 ${
        open ? "bg-white" : ""
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span
          className={`text-sm md:text-base font-medium leading-snug transition-colors duration-200 pr-4
                      ${open ? "text-[#000]" : "text-[#1A1A1A] group-hover:text-[#000]"}`}
        >
          {q}
        </span>
        <span
          className={`flex-shrink-0 mt-0.5 transition-transform duration-200 ${
            open ? "rotate-45 text-[#FF3C3C]" : "text-[#7A7A7A]"
          }`}
        >
          <FiPlus size={18} />
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "400px" : "0px" }}
      >
        <p className="text-sm text-[#3D3D3D] leading-relaxed pb-5 pr-8">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [ref, inView] = useInView();

  return (
    <section id="faq" aria-label="Frequently asked questions" className="py-24">
      <div
        ref={ref}
        className={`transition-all duration-600 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">
            06 — FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Common Questions
          </h2>
          <p className="text-sm text-[#7A7A7A] max-w-xl leading-relaxed">
            Things people often ask about my work, background, and approach.
          </p>
        </div>

        {/* Accordion */}
        <div className="border-t border-[#E0E0E0]">
          {FAQS.map((item, i) => (
            <FAQItem key={i} index={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
