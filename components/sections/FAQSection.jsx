import React, { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { FiPlus, FiChevronDown } from "react-icons/fi";

/* ── Categorised FAQ data ────────────────────────────────────────────────── */

const CATEGORIES = [
  {
    id: "role",
    label: "The Role",
    description: "What I do and who I do it for",
    items: [
      {
        q: "What does a Senior Data Analyst do at South Australia Police?",
        a: "As an ASO7 Senior Data Analyst in SAPOL's Professional and Ethical Standards Branch (PESB), I develop analytical models and statistical frameworks that translate complex policing data into decision-ready intelligence. This includes strategic planning, parliamentary reporting, and governance of end-to-end analytics solutions across IAPro and connected systems — always anchored in first-principles thinking and evidence-based recommendations to senior leadership.",
      },
      {
        q: "What is strategic intelligence analytics and how does it differ from standard data analysis?",
        a: "Standard data analysis answers 'what happened'. Strategic intelligence analytics answers 'what should we do about it' — it frames data within operational context, risk tolerance, and organisational objectives. In government settings this means designing risk-based frameworks, identifying compliance patterns, and producing intelligence products that directly inform executive and ministerial decision-making, not just reporting numbers.",
      },
      {
        q: "Are you available for consulting, contract, or advisory work?",
        a: "Yes — I am open to strategic data consulting, government analytics advisory, and research data engineering engagements alongside my current role. If you have a data challenge, a research collaboration, or a project that needs strategic framing, the best starting point is a conversation. You can reach me at huang@rin.contact or through the contact form on this page.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical Approach",
    description: "How I think about data and build solutions",
    items: [
      {
        q: "What programming languages and tools do you use professionally?",
        a: "Python is my primary language for data engineering, statistical modelling, and automation. I use R for advanced statistical analysis, SQL for structured queries across relational databases, and Power BI and Tableau for executive dashboards. For geospatial work I use ArcGIS and Mapbox. On the software side I build with Next.js, React, React Native, Node.js, AWS, and Expo for web and mobile applications.",
      },
      {
        q: "What does 'first-principles thinking' mean in a data context?",
        a: "First-principles thinking means refusing to inherit assumptions from how a problem has been framed before. In data work, it means starting from the raw question — what decision needs to be made? what is the minimum data needed to make it? — rather than defaulting to familiar tools or prior solutions. I applied this at SAPOL to redesign reporting infrastructure from the ground up rather than iterating on broken legacy systems.",
      },
      {
        q: "What are your thoughts on AI and large language models in data science?",
        a: "AI and large language models are genuinely changing the pace of what is possible — tasks that used to take days of scripting can now be drafted in minutes. But I think the key insight is that the bottleneck was never the leg work; it was always the strategic framing. AI can generate code, summarise documents, and surface patterns, but it cannot decide which question is worth asking, what risk level is acceptable, or what a result actually means for the organisation. Human judgement — especially around context, ethics, and accountability — is becoming more valuable, not less. Data professionals who learn to orchestrate AI well will have a significant advantage over those who either ignore it or defer to it uncritically.",
      },
      {
        q: "Do you work on open-source projects?",
        a: "Yes. I maintain several open-source repositories on GitHub under the handle rNLKJA, including a South Australian address generator based on SEIFA socio-economic indices and a US presidential debate and campaign document scraper covering over 25,000 documents. Open-source work is how I give back to the data community and keep my skills sharp outside of government environments where code is not publicly shareable.",
      },
    ],
  },
  {
    id: "career",
    label: "Career Journey",
    description: "Where I've been and what shaped me",
    items: [
      {
        q: "What made you choose data science?",
        a: "What drew me to data science was the ability to make decisions grounded in evidence rather than intuition or politics — and to build forecasting models that let you see around corners rather than simply describe what already happened. There is something deeply satisfying about starting with raw, messy data and arriving at a clear recommendation that someone actually acts on. That moment — when analysis genuinely changes a decision — is what I keep working towards.",
      },
      {
        q: "What industries have you worked in?",
        a: "My experience spans Australian state government (South Australia Police and Attorney-General's Department), biomedical research (WEHI and CSIRO), financial services (CSL), food service (McDonald's), and the startup sector as a co-founder. This breadth means I can translate analytical frameworks across very different operational contexts — from parliamentary compliance reporting to clinical mobile applications.",
      },
      {
        q: "What's the biggest difference between working in government, research, and a startup?",
        a: "Each environment has a different relationship with impact and risk. In government, the outcomes are visible almost immediately — a dashboard I built went to the Minister's desk within weeks, and you see the decisions it shaped. Research takes a longer view; the work you do today might influence a generation of scientists or clinicians who build on it years later. Startups are a different kind of reality altogether — you get your hands dirty across every layer, from product decisions to infrastructure, and ambiguity is the default rather than the exception. Having worked in all three has given me a much richer model of what 'good work' actually looks like.",
      },
      {
        q: "What's the most challenging project you've worked on?",
        a: "The most challenging work I have done was building analytical capabilities from scratch — where there was no existing infrastructure, no clear brief, limited resources, and a complex stakeholder environment with competing priorities. The CBS Intelligence capability at the Attorney-General's Department was that kind of challenge. I had to design the framework, source and validate the data, build the governance, and manage stakeholder expectations simultaneously, without a playbook, because nothing like it had existed in that team before. What I learned is that in a truly ambiguous environment, the single most important thing is to generate something workable quickly — even if imperfect — so that people have something concrete to react to and refine. Momentum matters more than perfection when clarity is low.",
      },
    ],
  },
  {
    id: "education",
    label: "Education & Growth",
    description: "How I learn and how I think about learning",
    items: [
      {
        q: "What is your educational background?",
        a: "I hold two degrees from the University of Melbourne: a Bachelor of Science with a major in Computing and Software Systems, and a Master of Data Science. I also hold 23 certifications across cloud platforms (AWS, Azure), analytics (Power BI, Tableau), and project management (Agile, Scrum), as well as professional assessments in English (IELTS) and translation (NAATI).",
      },
      {
        q: "What would you tell someone just starting out in data science?",
        a: "Develop a genuine commitment to continuous improvement rather than chasing specific tools or frameworks. The data science landscape changes faster than any curriculum can keep up with — the libraries and models that are standard today may be superseded in two years. What compounds over a career is the habit of learning quickly, applying deliberately, and reflecting honestly on what worked and what did not. Pick up a new tool, build something real with it, then ask why it did or did not achieve what you wanted. That loop — learn, apply, reflect — is the actual skill.",
      },
    ],
  },
  {
    id: "person",
    label: "The Person",
    description: "Background, culture, and life outside the screen",
    items: [
      {
        q: "What is your Chinese name, and how do you spell it?",
        a: "My Chinese legal name is 黄孙创宇 (Huang Sunchuangyu). 黄 (Huang) is my family name and 孙创宇 (Sunchuangyu) is my given name. In Australian formal documents you may also see it written as HUANG SUNCHUANGYU, HUANGSUNCHUANGYU, HUANG SUN CHUANG YU, or informally as 黄孙 Rin. All of these forms refer to the same person. In everyday English I go by Rin Huang, and you can find me at rin.contact.",
      },
      {
        q: "Where are you from originally, and how has that shaped your work?",
        a: "I grew up in Anshun (安顺), a small city in Guizhou Province, southwestern China — a place better known for its karst landscapes and the Huangguoshu Waterfall than for technology. Growing up far from major economic centres meant that opportunities were not handed to me; they had to be pursued deliberately. That mindset — identifying where effort compounds — carried me through a foundation year at Trinity College, two degrees at the University of Melbourne, and into a career spanning government intelligence, biomedical research, and software engineering. Being a bilingual Chinese-Australian professional has also given me a different lens on cross-cultural communication, which shows up in how I work with diverse stakeholders and translate complex data into decisions people actually act on.",
      },
      {
        q: "What does a typical working day look like for you?",
        a: "My energy tends to come in focused bursts rather than steady output throughout the day, so I structure work around that. The first hours go to the highest-priority analytical or development work that requires deep concentration. Mid-morning and afternoon involve stakeholder discussions, follow-ups, and reviewing what I have produced with fresh eyes. Coffee is a non-negotiable thread through all of it — Melbourne left me with standards that Adelaide is only beginning to meet. Protecting a few hours of uninterrupted thinking time each day is the single most effective thing I can do for quality of output.",
      },
      {
        q: "What do you do outside of work?",
        a: "I play badminton regularly — it is fast and unforgiving if you are not paying attention, which I find keeps me honest. Hiking and finding a good coastal view resets the mind in a way that no screen can. I am also a committed coffee drinker (Melbourne shaped that particular habit permanently) and enjoy strategic gaming and the occasional FPS. The same pattern-recognition and tactical thinking that make data work engaging turn out to make those genuinely fun too.",
      },
    ],
  },
];

/* ── Sub-item accordion ──────────────────────────────────────────────────── */

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b border-[#EEEEEE] last:border-0 transition-colors duration-200 ${
        open ? "bg-white" : ""
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-4 py-4 text-left group"
        aria-expanded={open}
      >
        <span
          className="flex-shrink-0 tabular-nums text-[10px] tracking-widest text-[#D8D8D8] mt-0.5 w-5 select-none"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`flex-1 text-sm font-medium leading-snug transition-colors duration-200
                      ${open ? "text-[#000]" : "text-[#3D3D3D] group-hover:text-[#000]"}`}
        >
          {q}
        </span>
        <span
          className={`flex-shrink-0 mt-0.5 transition-transform duration-200 ${
            open ? "rotate-45 text-[#FF3C3C]" : "text-[#CCCCCC]"
          }`}
        >
          <FiPlus size={14} />
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "800px" : "0px" }}
      >
        <p className="text-sm text-[#5A5A5A] leading-relaxed pb-5 pl-9 pr-6 border-l border-[#FF3C3C] ml-5">
          {a}
        </p>
      </div>
    </div>
  );
}

/* ── Category accordion ──────────────────────────────────────────────────── */

function CategoryBlock({ cat, catIndex, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-[#E8E8E8] mb-3 last:mb-0">
      {/* Category header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-5 px-6 py-5 text-left group transition-colors duration-200
                    ${open ? "bg-[#FAFAFA]" : "bg-white hover:bg-[#FAFAFA]"}`}
        aria-expanded={open}
      >
        {/* Category number */}
        <span
          className="flex-shrink-0 text-[11px] tracking-widest tabular-nums text-[#FF3C3C] font-medium select-none w-5"
          aria-hidden="true"
        >
          {String(catIndex + 1).padStart(2, "0")}
        </span>

        {/* Label + description */}
        <div className="flex-1 min-w-0">
          <span className="font-editorial text-base md:text-lg font-semibold text-[#1A1A1A] leading-tight block">
            {cat.label}
          </span>
          <span className="text-[11px] text-[#9A9A9A] leading-none mt-0.5 block">
            {cat.description}
          </span>
        </div>

        {/* Question count pill */}
        <span className="flex-shrink-0 text-[10px] tracking-widest text-[#AAAAAA] border border-[#EBEBEB] px-2.5 py-0.5 rounded-full select-none hidden md:block">
          {cat.items.length} {cat.items.length === 1 ? "question" : "questions"}
        </span>

        {/* Chevron */}
        <FiChevronDown
          size={16}
          className={`flex-shrink-0 text-[#AAAAAA] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Sub-items */}
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: open ? `${cat.items.length * 400}px` : "0px" }}
      >
        <div className="px-6 pt-1 pb-2 border-t border-[#F0F0F0]">
          {cat.items.map((item, i) => (
            <FAQItem key={i} index={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */

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
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">
            Common Questions
          </h2>
          <svg width="120" height="10" viewBox="0 0 120 10" aria-hidden="true" className="mb-4">
            <path
              d="M0,5 C15,1 30,9 45,5 C60,1 75,9 90,5 C105,1 120,9 120,5"
              stroke="#E0E0E0"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-sm text-[#7A7A7A] max-w-xl leading-relaxed">
            Browse by topic — open a category then expand any question.
          </p>
        </div>

        {/* Category accordions — first one open by default */}
        <div>
          {CATEGORIES.map((cat, i) => (
            <CategoryBlock
              key={cat.id}
              cat={cat}
              catIndex={i}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
