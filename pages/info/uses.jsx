import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

const Section = ({ label, children }) => (
  <div className="mb-12">
    <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-5 font-mono">{label}</p>
    <div className="space-y-0 divide-y divide-[#F5F5F5] dark:divide-[#1E1E1E]">
      {children}
    </div>
  </div>
);

const Row = ({ name, desc, href, badge }) => (
  <div className="py-4 flex items-start justify-between gap-6 group">
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer"
             className="text-sm font-medium text-[#1A1A1A] dark:text-white hover:text-[#FF3C3C] transition-colors border-b border-transparent hover:border-[#FF3C3C]">
            {name}
          </a>
        ) : (
          <span className="text-sm font-medium text-[#1A1A1A] dark:text-white">{name}</span>
        )}
        {badge && (
          <span className="text-[9px] tracking-widest uppercase border border-[#E0E0E0] dark:border-[#3D3D3D] px-2 py-0.5 text-[#7A7A7A] font-mono rounded-full">
            {badge}
          </span>
        )}
      </div>
      {desc && <p className="text-xs text-[#7A7A7A] mt-1 leading-relaxed">{desc}</p>}
    </div>
  </div>
);

export default function UsesPage() {
  return (
    <>
      <Head>
        <title>Uses — Rin Huang · rin.contact</title>
        <meta name="description" content="Tools, hardware, and software Rin Huang uses daily for data science, development, and design." />
        <link rel="canonical" href="https://rin.contact/info/uses" />
      
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og?title=Uses&subtitle=Hardware%2C%20software%2C%20and%20tools%20that%20Rin%20Huang%20uses%20for%20work%20and%20side%20projects&section=info" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Uses" />
        <meta name="twitter:description" content="Hardware, software, and tools that Rin Huang uses for work and side projects." />
        <meta name="twitter:image" content="https://rin.contact/api/og?title=Uses&subtitle=Hardware%2C%20software%2C%20and%20tools%20that%20Rin%20Huang%20uses%20for%20work%20and%20side%20projects&section=info" />
      </Head>

      <SeoHead
        title="Uses — Rin Huang · rin.contact"
        description="Tools, hardware, and software Rin Huang uses daily for data science, development, and design."
        path="/info/uses"
        ogImage={{ title: "Uses", subtitle: "Tools, hardware, and software Rin Huang uses daily for data...", section: "info" }}
      />

      <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono mb-4">/info/uses</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">What I use.</h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed">
            Hardware, software, tools, and setups I rely on daily. Inspired by{" "}
            <a href="https://uses.tech" target="_blank" rel="noreferrer"
               className="border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">
              uses.tech
            </a>.
          </p>
        </div>

        {/* Hardware */}
        <Section label="Hardware">
          <Row name="Mac Mini M4" desc="Primary machine. The M4 chip handles PyTorch training, Docker containers, and 47 browser tabs simultaneously." badge="daily driver" />
          <Row name="LG UltraWide 34'" desc="One wide monitor. No more alt-tabbing between terminals and notebooks." />
          <Row name="Keychron K2" desc="Tactile switches. The clickety-clack is 40% of the productivity." />
          <Row name="AirPods Pro" desc="Active noise cancellation — the second-best productivity tool after good coffee." />
        </Section>

        {/* Editor & Terminal */}
        <Section label="Editor & Terminal">
          <Row name="Cursor" href="https://cursor.sh" desc="VS Code with AI superpowers. This entire website was built in it." badge="you're in it" />
          <Row name="iTerm2" href="https://iterm2.com" desc="With zsh and Oh My Zsh. Theme: minimal. Plugins: git, z, syntax highlighting." />
          <Row name="tmux" desc="Terminal multiplexer. Keeps sessions alive when I inevitably close the wrong window." />
        </Section>

        {/* Languages */}
        <Section label="Languages">
          <Row name="Python" desc="Primary language. NumPy, Pandas, scikit-learn, PyTorch, FastAPI — the whole ecosystem." badge="primary" />
          <Row name="TypeScript" desc="For anything web-facing. Types save future-me from past-me." />
          <Row name="SQL" desc="PostgreSQL day-to-day. BigQuery for large-scale. Still the most underrated skill in data science." />
          <Row name="R" desc="For statistical analysis and publication-quality visualisations. ggplot2 is genuinely beautiful." />
          <Row name="Bash" desc="Automating everything that shouldn't need automating but somehow does." />
        </Section>

        {/* Data & ML */}
        <Section label="Data & ML Stack">
          <Row name="PyTorch" href="https://pytorch.org" desc="Deep learning framework of choice. Dynamic graphs, Pythonic, excellent ecosystem." />
          <Row name="scikit-learn" href="https://scikit-learn.org" desc="Still the gold standard for classical ML. Pipelines are underused." />
          <Row name="dbt" href="https://getdbt.com" desc="SQL transformation layer. Version-controlled data models — finally." />
          <Row name="Jupyter" href="https://jupyter.org" desc="For exploration and sharing analysis. VS Code notebooks for production." />
          <Row name="Tableau" desc="Dashboards for non-technical stakeholders. Sometimes the right tool is the accessible one." />
        </Section>

        {/* Web Dev */}
        <Section label="Web Development">
          <Row name="Next.js 16" href="https://nextjs.org" desc="Framework of choice for web. Pages Router on React 19 — fast, file-based, fantastic DX." badge="this site" />
          <Row name="Tailwind CSS" href="https://tailwindcss.com" desc="Utility-first styling. Initially sceptical. Now converted." />
          <Row name="Vercel" href="https://vercel.com" desc="Deploy → done. Preview URLs on every push. The best CI/CD experience I've used." />
          <Row name="Figma" href="https://figma.com" desc="Design and prototyping. Also for communicating with designers who don't speak code." />
        </Section>

        {/* Productivity */}
        <Section label="Productivity">
          <Row name="Notion" href="https://notion.so" desc="Project notes, research logs, and second brain. Imperfect but flexible." />
          <Row name="Linear" href="https://linear.app" desc="Issue tracking for Mapiva. Fast, minimal, opinionated — very Nothing OS." />
          <Row name="1Password" href="https://1password.com" desc="Password manager. Non-negotiable." />
          <Row name="Rectangle" href="https://rectangleapp.com" desc="Window management on macOS. Free. Simple. Indispensable." />
        </Section>

        {/* Footer */}
        <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] font-mono">
            Last updated June 2026.
          </p>
          <Link href="/"
            className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">
            ← Home
          </Link>
        </div>

      </div>
    </>
  );
}
