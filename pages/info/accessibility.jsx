import Head from "next/head";
import Link from "next/link";

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-lg font-semibold tracking-tight text-[#1A1A1A] mb-4">{title}</h2>
    <div className="space-y-3 text-sm text-[#3D3D3D] leading-relaxed">
      {children}
    </div>
  </div>
);

const Item = ({ label, detail }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
    <span className="font-medium text-[#1A1A1A] sm:w-40 flex-shrink-0">{label}</span>
    <span className="text-[#7A7A7A]">{detail}</span>
  </div>
);

export default function AccessibilityPage() {
  return (
    <>
      <Head>
        <title>Accessibility — Rin Huang · rin.contact</title>
        <meta name="description" content="How rin.contact handles accessibility — contrast, focus, screen readers, motion, and keyboard navigation." />
        <link rel="canonical" href="https://rin.contact/info/accessibility" />
      </Head>

      <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28">

        <div className="mb-14">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/info/accessibility</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Accessibility at rin.contact
          </h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed">
            This site aims to be usable by everyone. Here&apos;s what we do — and what we&apos;re still improving.
          </p>
        </div>

        <Section title="Colour & contrast">
          <Item label="Contrast ratios" detail="Text meets WCAG 2.1 AA (4.5:1 for body, 3:1 for large text). Black on white, dark grey on light grey — tested with WebAIM Contrast Checker." />
          <Item label="Colour independence" detail="Information is never conveyed by colour alone. Icons, labels, and text accompany all interactive states." />
          <Item label="Nothing OS palette" detail="Monochromatic design reduces reliance on colour perception. Accent red (#FF3C3C) used sparingly for emphasis." />
        </Section>

        <Section title="Keyboard navigation">
          <Item label="Focus indicators" detail="All interactive elements have a visible :focus-visible outline (2px solid black). Mouse/tap focus is suppressed to avoid clutter; keyboard focus is always shown." />
          <Item label="Tab order" detail="Logical tab sequence follows visual layout. Skip links available where structure benefits (e.g. long pages)." />
          <Item label="Escape & Enter" detail="Modals and overlays can be closed with Escape. Buttons and links activate with Enter/Space." />
        </Section>

        <Section title="Screen readers & semantics">
          <Item label="Semantic HTML" detail="Headings (h1–h6), landmarks (main, nav, section), and ARIA roles used where appropriate. Form labels associated with inputs." />
          <Item label="Alt text" detail="Images have descriptive alt attributes. Decorative images use aria-hidden or empty alt." />
          <Item label="Live regions" detail="Dynamic content (toasts, form status) uses aria-live for announcements without disrupting reading flow." />
        </Section>

        <Section title="Motion & animation">
          <Item label="prefers-reduced-motion" detail="Respecting the user's system preference. Where implemented, animations are disabled or simplified when prefers-reduced-motion: reduce is set." />
          <Item label="Animation duration" detail="Transitions kept to 150–300ms. No auto-playing videos or infinite loops that can't be paused." />
        </Section>

        <Section title="Forms & interaction">
          <Item label="Contact form" detail="Labels, error messages, and success feedback. Required fields marked. Validation before submit." />
          <Item label="Touch targets" detail="Buttons and links sized to at least 44×44px where possible for touch devices." />
        </Section>

        <Section title="Known limitations">
          <Item label="Easter eggs" detail="Some hidden features (Konami code, secret word) are discoverable but not announced. They don't block core tasks." />
          <Item label="Canvas content" detail="Snake game, Matrix rain, and generative art use canvas — not natively accessible. Text alternatives or descriptions provided where feasible." />
          <Item label="Third-party" detail="External embeds (e.g. QR codes, wttr.in) follow their own accessibility. We can't control them." />
        </Section>

        <Section title="Feedback">
          <p className="text-[#7A7A7A]">
            If you encounter a barrier, please reach out.{" "}
            <a href="mailto:huang@rin.contact" className="text-[#1A1A1A] border-b border-[#E0E0E0] hover:border-black transition-colors">
              huang@rin.contact
            </a>
            {" "}— I take accessibility seriously and will do my best to fix issues.
          </p>
        </Section>

        <div className="pt-10 border-t border-[#F0F0F0] flex justify-between items-center">
          <p className="text-[11px] text-[#AAAAAA] font-mono">
            Last updated March 2026
          </p>
          <Link
            href="/"
            className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black
                       border-b border-[#E0E0E0] hover:border-black transition-colors"
          >
            ← Home
          </Link>
        </div>

      </div>
    </>
  );
}
