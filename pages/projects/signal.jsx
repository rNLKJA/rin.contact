import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

const LIVE = "https://rnlkja--signal-api-api.modal.run";
const REPO = "https://github.com/rNLKJA/signal";

// Tech tags are proper nouns — single source, identical in every locale.
const STACK = [
  "Python",
  "FastAPI",
  "Pydantic v2",
  "NumPy",
  "SciPy",
  "Modal",
  "Docker",
  "LLM",
  "EU AI Act",
  "DTA v2.0",
  "GitHub Actions",
];

// JSON-LD is machine-readable structured data (schema.org) — kept in English.
const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareSourceCode",
      name: "Signal",
      description:
        "A governance layer for AI-assisted government data — tamper-evident audit log and DTA / EU AI Act compliance artefacts generated live from the request path.",
      codeRepository: REPO,
      url: "https://rin.contact/projects/signal",
      programmingLanguage: "Python",
      license: "https://opensource.org/licenses/MIT",
      author: { "@type": "Person", name: "Sunchuangyu (Rin) Huang", url: "https://rin.contact" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://rin.contact/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: "https://rin.contact/projects/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Signal",
          item: "https://rin.contact/projects/signal/",
        },
      ],
    },
  ],
};

// Render *emphasis* markers in localised prose as <em> without trusting raw HTML.
function renderText(text) {
  const parts = String(text).split(/(\*[^*]+\*)/g);
  return parts.map((p, i) =>
    p.startsWith("*") && p.endsWith("*") ? <em key={i}>{p.slice(1, -1)}</em> : p
  );
}

function Section({ title, paragraphs, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-[#1A1A1A] dark:text-[#EEEEEE]">
        {title}
      </h2>
      <div className="space-y-4 text-[15px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
        {(paragraphs || []).map((p, i) => (
          <p key={i}>{renderText(p)}</p>
        ))}
        {children}
      </div>
    </section>
  );
}

export default function SignalCaseStudy() {
  const { t, locale = "en-AU" } = useI18n();
  const S = (id) => ({
    title: t(`signal.sections.${id}.title`),
    paragraphs: t(`signal.sections.${id}.body`),
  });

  return (
    <>
      <SeoHead
        title={t("signal.metaTitle")}
        description={t("signal.metaDescription")}
        path="/projects/signal"
        ogType="article"
        ogTitle={t("signal.ogTitle")}
        ogImage={{ title: "Signal", subtitle: t("signal.ogSubtitle"), section: "projects" }}
        locale={locale}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
      </Head>

      <div className="max-w-[720px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header */}
        <Link
          href="/projects"
          className="inline-block text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors mb-8"
        >
          ← {t("signal.back")}
        </Link>

        <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4 flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] animate-pulse"
            aria-hidden="true"
          />
          {t("signal.flagship")}
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3 text-[#1A1A1A] dark:text-[#EEEEEE]">
          Signal
        </h1>
        <p className="text-base md:text-lg font-light text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed mb-6">
          {t("signal.tagline")}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <a
            href={LIVE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-[#FF3C3C] bg-[#FF3C3C] px-4 py-1.5 text-xs tracking-widest uppercase text-white rounded-full hover:bg-[#E02020] hover:border-[#E02020] transition-colors duration-200"
          >
            {t("signal.liveDemo")}
          </a>
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-1.5 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            {t("signal.viewGithub")}
          </a>
        </div>

        {/* At a glance */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-6 border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
          {(t("signal.glance") || []).map(({ k, v }) => (
            <div key={k} className="bg-white dark:bg-[#0A0A0A] px-4 py-4">
              <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] mb-1">
                {k}
              </p>
              <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE]">{v}</p>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-14">
          {STACK.map((s) => (
            <span
              key={s}
              className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA] rounded-full"
            >
              {s}
            </span>
          ))}
        </div>

        <Section {...S("problem")} />
        <Section {...S("whatItDoes")} />
        <Section {...S("design")} />
        <Section {...S("checking")} />
        <Section {...S("statistics")} />

        <Section title={t("signal.sections.mapping.title")}>
          <p>{t("signal.sections.mapping.intro")}</p>
          <div className="space-y-4 mt-2">
            {(t("signal.artifacts") || []).map(({ t: at, d }) => (
              <div key={at} className="border-l-2 border-[#FF3C3C] pl-4">
                <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE] mb-1">{at}</p>
                <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <p>{t("signal.sections.mapping.eu")}</p>
        </Section>

        <Section {...S("whyData")} />
        <Section {...S("next")} />
        <Section {...S("takeaway")} />

        {/* Further reading — connect the build to the thinking behind it */}
        <div className="mt-14">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-3">
            {t("signal.furtherReading")}
          </p>
          <Link
            href="/blog/put-governance-on-the-request-path/"
            className="group inline-flex items-baseline gap-2 text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE] hover:text-[#FF3C3C] transition-colors duration-200"
          >
            {t("signal.essayTitle")}
            <span
              aria-hidden="true"
              className="text-[#FF3C3C] transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
          <p className="text-xs text-[#7A7A7A] dark:text-[#9A9A9A] mt-1">{t("signal.essayDesc")}</p>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 pt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D] flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#7A7A7A] dark:text-[#AAAAAA]">{t("signal.footerNote")}</p>
          <div className="flex flex-wrap gap-2">
            <a
              href={LIVE}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#FF3C3C] bg-[#FF3C3C] px-4 py-1.5 text-xs tracking-widest uppercase text-white rounded-full hover:bg-[#E02020] hover:border-[#E02020] transition-colors duration-200"
            >
              {t("signal.liveDemo")}
            </a>
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-1.5 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              {t("signal.viewGithub")}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
