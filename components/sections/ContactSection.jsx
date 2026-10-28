import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedin } from "react-icons/fa";
import {
  FiGithub,
  FiMail,
  FiMapPin,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiCoffee,
  FiCalendar,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { useInView } from "@/hooks/useInView";
import { useCopy } from "@/hooks/useCopy";
import { useI18n } from "@/contexts/I18nContext";
import { cleanEnv, CALENDLY_URL } from "@/lib/public-env";
import {
  SectionHeader,
  TitleRow,
  EDITORIAL,
  BTN,
  BTN_PRIMARY_ON_DARK,
} from "@/components/home/SectionHeader";

// ─── EmailJS config ───────────────────────────────────────────────
const EMAILJS_SERVICE_ID =
  cleanEnv(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, "NEXT_PUBLIC_EMAILJS_SERVICE_ID") ||
  "service_5uxfc9r";
const EMAILJS_TEMPLATE_ID =
  cleanEnv(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID") ||
  "template_z0hm21b";
const EMAILJS_PUBLIC_KEY =
  cleanEnv(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY") ||
  "U5kNC9fz_evJAiyOb";
// ─────────────────────────────────────────────────────────────────

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sunchuangyuhuang/",
    icon: FaLinkedin,
    handle: "LinkedIn",
  },
  { label: "GitHub", href: "https://github.com/rNLKJA", icon: FiGithub, handle: "rNLKJA" },
  { label: "Email", href: "mailto:huang@rin.contact", icon: FiMail, handle: "huang@rin.contact" },
];

const EMAIL = "huang@rin.contact";

/** Square copy control beside the address: mailto fails for webmail users. */
function CopyEmailButton() {
  const { t } = useI18n();
  const { copied, failed, copy } = useCopy();
  return (
    <>
      <button
        type="button"
        onClick={() => copy(EMAIL)}
        aria-label={t("contact.copyEmail")}
        title={t("contact.copyEmail")}
        className="inline-flex items-center justify-center w-8 h-8 -my-1.5 flex-shrink-0 border border-[#3D3D3D] text-[#9A9A9A] hover:border-white hover:text-white transition-colors duration-200"
      >
        {copied ? (
          <FiCheck size={14} aria-hidden="true" />
        ) : (
          <FiCopy size={14} aria-hidden="true" />
        )}
      </button>
      <span role="status" className="sr-only">
        {copied ? t("contact.emailCopied") : failed ? t("contact.copyFailed") : ""}
      </span>
      {failed && (
        <span aria-hidden="true" className="basis-full pl-7 text-[11px] text-[#B4B4B4]">
          {t("contact.copyFailed")}
        </span>
      )}
    </>
  );
}

function Toast({ type, message, onClose }) {
  const { t } = useI18n();
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      className={`fixed bottom-20 right-6 z-50 flex items-start gap-3 px-5 py-4 max-w-sm w-full
                  border bg-[#1A1A1A] shadow-none animate-slide-right`}
      style={{ borderColor: isSuccess ? "#22C55E" : "#FF3C3C" }}
      role="alert"
      aria-live="assertive"
    >
      {isSuccess ? (
        <FiCheckCircle size={18} className="flex-shrink-0 mt-0.5 text-[#22C55E]" />
      ) : (
        <FiAlertCircle size={18} className="flex-shrink-0 mt-0.5 text-[#FF5C5C]" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">
          {isSuccess ? t("contact.toast.successTitle") : t("contact.toast.errorTitle")}
        </p>
        <p className="text-xs text-[#9A9A9A] mt-0.5">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-[#9A9A9A] hover:text-white transition-colors duration-200 mt-0.5"
        aria-label={t("contact.toast.dismiss")}
      >
        <FiX size={16} />
      </button>

      {/* Auto-dismiss progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{
          backgroundColor: isSuccess ? "#22C55E" : "#FF3C3C",
          animation: "toast-progress 5000ms linear forwards",
        }}
      />
    </div>
  );
}

// ─── Engagement band — "Ways to work together" ───────────────────────────────
// Always-dark surface: pin light-on-dark values, NO `dark:` variants (inverse-
// contrast rule). Maps the Positioning triad (Government · Research · Engineering)
// to concrete, hireable offers, grounded in the career facts already on the site.
function EngagementBand() {
  const { t } = useI18n();
  const [ref, inView] = useInView();
  const label = t("contact.engage.label");
  const items = t("contact.engage.items");
  const safeItems = Array.isArray(items) ? items : [];
  if (!safeItems.length) return null;

  return (
    <div
      ref={ref}
      className={`mb-14 md:mb-20 transition-transform duration-200 ease-out relative z-10 ${
        inView ? "translate-y-0" : "translate-y-1.5"
      }`}
    >
      <p className="flex items-center gap-2.5 text-xs tracking-widest uppercase text-[#9A9A9A] mb-5 m-0">
        <span className="block w-1.5 h-1.5 border border-[#9A9A9A]" aria-hidden="true" />
        {label}
      </p>

      <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 gap-px bg-[#3D3D3D] border border-[#3D3D3D]">
        {safeItems.map((item, i) => (
          <li
            key={item.n || i}
            className="engage-card group relative bg-[#1A1A1A] px-6 py-7 md:px-7 md:py-8 overflow-hidden transition-colors duration-200 hover:bg-[#202020]"
          >
            <div className="relative z-10">
              <p className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#9A9A9A] mb-4 m-0">
                <span className="font-mono tabular-nums text-white">{item.n}</span>
                <span aria-hidden="true">—</span>
                {item.domain}
              </p>
              <h3 className="m-0 font-editorial text-lg md:text-xl font-semibold text-white leading-snug mb-2.5">
                {item.title}
              </h3>
              <p className="m-0 text-sm text-[#B4B4B4] leading-relaxed font-light">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ContactSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView();
  const [formRef, formInView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [toast, setToast] = useState(null); // { type: "success" | "error", message }
  // Honeypot — a field hidden from people. Bots that auto-fill every input trip it,
  // and we drop the submission without emailing. Uncontrolled (ref), so it never
  // enters the payload sent to EmailJS.
  const honeypotRef = useRef(null);
  const magicShownRef = useRef(false);

  const handleChange = (e) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    if (e.target.name === "message" && !magicShownRef.current) {
      const msg = (next.message || "").toUpperCase();
      if (msg.includes("RANDOM_STATE=42") || msg.includes("SELECT * FROM")) {
        magicShownRef.current = true;
        showToast("success", "Easter egg detected. You're a data person. Rin approves.");
      }
    }
  };

  const showToast = (type, message) => setToast({ type, message });
  const closeToast = () => setToast(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Honeypot tripped: a bot filled the hidden field. Mimic success so the bot
    // gets no signal, but send nothing.
    if (honeypotRef.current?.value) {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      showToast("success", t("contact.toast.successMessage"));
      return;
    }
    setStatus("sending");
    const payload = { name: form.name, email: form.email, message: form.message };
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload, EMAILJS_PUBLIC_KEY);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      showToast("success", t("contact.toast.successMessage"));
    } catch {
      setStatus("error");
      showToast("error", t("contact.toast.errorMessage"));
    }
  };

  return (
    <>
      {/* Toast notification */}
      {toast && <Toast type={toast.type} message={toast.message} onClose={closeToast} />}

      <section id="contact" className={`scroll-mt-24 relative ${EDITORIAL}`} aria-label="Contact">
        {/* Header */}
        <div
          ref={ref}
          className={`transition-transform duration-200 ease-out relative z-10 ${
            inView ? "translate-y-0" : "translate-y-1.5"
          }`}
        >
          <SectionHeader index="07" label={t("contact.sectionLabel")} tone="dark" />
          <TitleRow title={t("contact.heading")} intro={t("contact.description")} tone="dark" />
        </div>

        {/* Ways to work together — concrete, hireable offers before the form */}
        <EngagementBand />

        <div
          ref={formRef}
          className={`grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8 transition-transform duration-200 ease-out relative z-10 ${
            formInView ? "translate-y-0" : "translate-y-1.5"
          }`}
        >
          {/* Left — contact details */}
          <div className="md:col-span-5 flex flex-col gap-8">
            {/* address wraps contact info for the page owner — semantic HTML5 + Schema.org microdata */}
            <address
              className="space-y-4 not-italic"
              itemScope
              itemType="https://schema.org/Person"
            >
              <meta itemProp="name" content="Sunchuangyu (Rin) Huang" />
              <meta itemProp="alternateName" content="Rin Huang" />
              <meta itemProp="alternateName" content="黄孙创宇" />
              <meta itemProp="url" content="https://rin.contact/" />

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <FiMail size={16} className="text-[#6B6B6B]" aria-hidden="true" />
                <a
                  href="mailto:huang@rin.contact"
                  itemProp="email"
                  className="text-sm text-[#C0C0C0] hover:text-white transition-colors duration-200"
                >
                  huang@rin.contact
                </a>
                <CopyEmailButton />
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin size={16} className="text-[#6B6B6B]" aria-hidden="true" />
                {/* Visible display text */}
                <span className="text-sm text-[#9A9A9A]">Adelaide &amp; Melbourne, Australia</span>
                {/* Hidden microdata — all locations associated with Rin Huang */}
                <span className="sr-only">
                  <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <span itemProp="addressLocality">Adelaide</span>,{" "}
                    <span itemProp="addressRegion">South Australia</span>,{" "}
                    <span itemProp="addressCountry">Australia</span>
                  </span>
                  <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <span itemProp="addressLocality">Melbourne</span>,{" "}
                    <span itemProp="addressRegion">Victoria</span>,{" "}
                    <span itemProp="addressCountry">Australia</span>
                  </span>
                  <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <span itemProp="addressLocality">Sydney</span>,{" "}
                    <span itemProp="addressRegion">New South Wales</span>,{" "}
                    <span itemProp="addressCountry">Australia</span>
                  </span>
                  <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <span itemProp="addressLocality">Anshun</span>,{" "}
                    <span itemProp="addressRegion" lang="zh-Hans">
                      贵州 (Guizhou)
                    </span>
                    , <span itemProp="addressCountry">China</span>
                  </span>
                  <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <span itemProp="addressCountry">China</span>
                  </span>
                </span>
              </div>
            </address>

            <hr className="border-[#3D3D3D]" />

            <div className="flex flex-wrap gap-2">
              {SOCIALS.map(({ label, href, icon: Icon, handle }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 h-10 border border-[#3D3D3D] px-4
                             text-xs text-[#B4B4B4] hover:border-white hover:text-white transition-colors duration-200"
                  aria-label={`${label}: ${handle}`}
                >
                  <Icon size={13} aria-hidden="true" />
                  {handle}
                </a>
              ))}
            </div>

            {/* Schedule a call — Calendly. Only when the env holds a real http(s) URL. */}
            {CALENDLY_URL && (
              <div className="flex flex-col gap-3">
                <p className="text-xs tracking-widest uppercase text-[#B4B4B4] m-0">
                  {t("contact.schedule")}
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 self-start h-10 border border-[#3D3D3D] px-5
                             text-xs text-[#B4B4B4] hover:border-white hover:text-white transition-colors duration-200"
                  aria-label={t("contact.schedule")}
                >
                  <FiCalendar size={13} aria-hidden="true" />
                  {t("contact.schedule")}
                </a>
              </div>
            )}

            <hr className="border-[#3D3D3D]" />

            {/* Buy Me a Coffee */}
            <div className="flex flex-col gap-3">
              <p className="text-xs tracking-widest uppercase text-[#B4B4B4] m-0">
                {t("contact.support")}
              </p>
              <a
                href="https://www.buymeacoffee.com/rNLKJA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 self-start h-10 border border-[#3D3D3D] px-5
                           text-xs text-[#B4B4B4] hover:border-white hover:text-white
                           transition-colors duration-200"
                aria-label={t("contact.buyMeCoffee")}
              >
                <FiCoffee size={13} aria-hidden="true" />
                {t("contact.buyMeCoffee")}
              </a>
            </div>
          </div>

          {/* Right — contact form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
            className="md:col-start-7 md:col-span-6 flex flex-col gap-5"
          >
            {/* Honeypot — off-screen, hidden from assistive tech, skipped by Tab.
                Real visitors never see or fill it; bots that fill everything do. */}
            <input
              ref={honeypotRef}
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] top-0 h-px w-px opacity-0 pointer-events-none"
            />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs tracking-widest uppercase text-[#B4B4B4]">
                {t("contact.form.name")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t("contact.form.namePlaceholder")}
                className="h-12 border border-[#3D3D3D] px-4 text-sm bg-transparent text-white rounded-none
                           placeholder:text-[#8A8A8A] focus:outline-none focus:border-white
                           transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs tracking-widest uppercase text-[#B4B4B4]">
                {t("contact.form.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t("contact.form.emailPlaceholder")}
                className="h-12 border border-[#3D3D3D] px-4 text-sm bg-transparent text-white rounded-none
                           placeholder:text-[#8A8A8A] focus:outline-none focus:border-white
                           transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs tracking-widest uppercase text-[#B4B4B4]">
                {t("contact.form.message")}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder={t("contact.form.messagePlaceholder")}
                className="min-h-[144px] border border-[#3D3D3D] px-4 py-3 text-sm bg-transparent text-white resize-none rounded-none
                           placeholder:text-[#8A8A8A] focus:outline-none focus:border-white
                           transition-colors duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={`${BTN} ${BTN_PRIMARY_ON_DARK} disabled:cursor-not-allowed`}
              aria-live="polite"
            >
              {status === "sending"
                ? t("contact.form.sending")
                : status === "sent"
                  ? t("contact.form.sent")
                  : t("contact.form.send")}
            </button>
          </form>
        </div>
      </section>

      {/* Toast progress bar keyframe */}
      <style>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </>
  );
}
