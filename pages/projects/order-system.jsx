/**
 * /projects/order-system: a short case study of the order system Rin built for
 * his mum's meal-prep studio. Copy lives in locales (orderSystem, en and zh).
 * The app and its repository are private because they hold real customer data,
 * so this page deliberately has no source links, no screenshots and no
 * customer, staff or business details: it describes how the system works only.
 * Its one demo link goes to the concept sandbox on made-up members
 * (/projects/order-system-sandbox), not the real app.
 */
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

const PATH = "/projects/order-system";
const TITLE = "Meal-Prep Studio Order System";
// The OG image renderer (pages/api/og.jsx) only loads Latin fonts, so the share
// card stays in English in every locale rather than rendering CJK as blank boxes.
const OG_SUBTITLE = "Members, orders, kitchen and finance in one app";

// Tech tags are proper nouns: single source, identical in every locale.
const STACK = [
  "TypeScript",
  "Expo",
  "React Native",
  "Hono",
  "Turso (libSQL)",
  "Drizzle ORM",
  "Zod",
  "argon2id + JWT",
  "Vitest",
  "Turborepo",
  "Vercel",
  "GitHub Actions",
  "Linear",
];

// JSON-LD is machine-readable structured data (schema.org), kept in English.
const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      headline: `${TITLE}: case study`,
      description:
        "How Rin Huang built the members, prepaid card, ordering and finance system for his mum's meal-prep studio: one Expo app for iOS, Android and the web on a Hono API with Turso and Drizzle.",
      url: `https://rin.contact${PATH}/`,
      inLanguage: "en-AU",
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
          name: TITLE,
          item: `https://rin.contact${PATH}/`,
        },
      ],
    },
  ],
};

function Section({ title, paragraphs }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-[#1A1A1A] dark:text-[#EEEEEE]">
        {title}
      </h2>
      <div className="space-y-4 text-[15px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
        {(paragraphs || []).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

const SECTIONS = ["context", "whatItDoes", "design", "security", "build", "next", "takeaway"];

export default function OrderSystemCaseStudy() {
  const { t, locale = "en-AU" } = useI18n();

  return (
    <>
      <SeoHead
        title={t("orderSystem.metaTitle")}
        description={t("orderSystem.metaDescription")}
        path={PATH}
        ogType="article"
        ogTitle={t("orderSystem.ogTitle")}
        ogImage={{ title: TITLE, subtitle: OG_SUBTITLE, section: "projects" }}
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
          ← {t("orderSystem.back")}
        </Link>

        <p className="text-[10px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] font-mono mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
          {t("orderSystem.label")}
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3 text-[#1A1A1A] dark:text-[#EEEEEE]">
          {t("orderSystem.title")}
        </h1>
        <p className="text-base md:text-lg font-light text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed mb-6">
          {t("orderSystem.tagline")}
        </p>

        {/* Private by design: no source links, said plainly, then the sandbox. */}
        <div className="mb-10 border-l-2 border-[#E0E0E0] dark:border-[#3D3D3D] pl-4">
          <p className="text-sm text-[#595959] dark:text-[#9A9A9A] leading-relaxed">
            {t("orderSystem.privateNote")}
          </p>
          <Link
            href="/projects/order-system-sandbox#demo"
            className="mt-3 inline-block text-[11px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            {t("orderSystem.sandboxLink")} <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* At a glance */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-6 border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
          {(t("orderSystem.glance") || []).map(({ k, v }) => (
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

        {SECTIONS.map((id) => (
          <Section
            key={id}
            title={t(`orderSystem.sections.${id}.title`)}
            paragraphs={t(`orderSystem.sections.${id}.body`)}
          />
        ))}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D] flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#6E6E6E] dark:text-[#AAAAAA]">
            {t("orderSystem.footerNote")}
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-1.5 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            {t("orderSystem.back")}
          </Link>
        </div>
      </div>
    </>
  );
}
