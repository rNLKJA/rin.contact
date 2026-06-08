import React, { useState, useEffect, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedin } from "react-icons/fa";
import { FiGithub, FiMail, FiPhone, FiMapPin, FiX, FiCheckCircle, FiAlertCircle, FiCoffee, FiCalendar } from "react-icons/fi";
import { useInView } from "@/hooks/useInView";
import { useI18n } from "@/contexts/I18nContext";

// ─── EmailJS config ───────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || "service_5uxfc9r";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_z0hm21b";
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || "U5kNC9fz_evJAiyOb";
// ─────────────────────────────────────────────────────────────────

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sunchuangyuhuang/", icon: FaLinkedin, handle: "LinkedIn" },
  { label: "GitHub", href: "https://github.com/rNLKJA", icon: FiGithub, handle: "rNLKJA" },
  { label: "Email", href: "mailto:huang@rin.contact", icon: FiMail, handle: "huang@rin.contact" },
];

function Toast({ type, message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 px-5 py-4 max-w-sm w-full
                  border bg-[#1A1A1A] shadow-none animate-slide-right`}
      style={{ borderColor: isSuccess ? "#22C55E" : "#FF3C3C" }}
      role="alert"
      aria-live="assertive"
    >
      {isSuccess
        ? <FiCheckCircle size={18} className="flex-shrink-0 mt-0.5 text-[#22C55E]" />
        : <FiAlertCircle size={18} className="flex-shrink-0 mt-0.5 text-[#FF3C3C]" />
      }
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">
          {isSuccess ? "Message sent" : "Something went wrong"}
        </p>
        <p className="text-xs text-[#9A9A9A] mt-0.5">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-[#9A9A9A] hover:text-white transition-colors duration-200 mt-0.5"
        aria-label="Dismiss notification"
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

export default function ContactSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView();
  const [formRef, formInView] = useInView();
  const [form,   setForm]   = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [toast,  setToast]  = useState(null);   // { type: "success" | "error", message }
  const sectionRef      = useRef(null);
  const spotlightRef    = useRef(null); // direct DOM ref — no React state on mousemove
  const sectionDocTop   = useRef(0);    // absolute document position — constant on scroll
  const sectionDocLeft  = useRef(0);

  // Cache the section's absolute document position — only needs updating on resize.
  // Defer getBCR to rAF so layout reads never cause forced reflow.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let rafScheduled = false;
    const doMeasure = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      sectionDocTop.current  = rect.top  + window.scrollY;
      sectionDocLeft.current = rect.left + window.scrollX;
    };
    const measure = () => {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(() => {
        rafScheduled = false;
        doMeasure();
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    const el = spotlightRef.current;
    if (!el) return;
    // Compute viewport-relative position using only cached values + window.scrollY/X —
    // zero layout reads, zero React re-renders
    const relX = e.clientX - (sectionDocLeft.current - window.scrollX);
    const relY = e.clientY - (sectionDocTop.current  - window.scrollY);
    el.style.background = `radial-gradient(400px circle at ${relX}px ${relY}px, rgba(255,60,60,0.07) 0%, rgba(255,60,60,0.03) 40%, transparent 70%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = spotlightRef.current;
    if (el) el.style.background = "none";
  }, []);

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
    setStatus("sending");
    const payload = { name: form.name, email: form.email, message: form.message };
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload, EMAILJS_PUBLIC_KEY);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      showToast("success", "Message sent! I will get back to you as soon as possible.");
    } catch {
      setStatus("error");
      showToast("error", "Please try emailing huang@rin.contact directly.");
    }
  };

  return (
    <>
      {/* Toast notification */}
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}

      <section id="contact" className="py-24 relative overflow-hidden" aria-label="Contact"
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cursor spotlight — background written directly via spotlightRef, no React state */}
        <div
          ref={spotlightRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        />
        {/* Header */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-600 relative z-10 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">
            {t("contact.sectionLabel")}
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2 text-black dark:text-white">
            {t("contact.heading")}
          </h2>
          {/* Wisr-style wavy accent */}
          <svg width="120" height="10" viewBox="0 0 120 10" aria-hidden="true" className="mb-5">
            <path d="M0,5 C15,1 30,9 45,5 C60,1 75,9 90,5 C105,1 120,9 120,5"
                  className="stroke-[#E0E0E0] dark:stroke-[#3D3D3D]" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
          <p className="text-base text-[#3D3D3D] dark:text-[#9A9A9A] max-w-xl leading-relaxed">
            {t("contact.description")}
          </p>
        </div>

        <div
          ref={formRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-16 transition-all duration-600 relative z-10 ${
            formInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Left — contact details */}
          <div className="flex flex-col gap-8">
            {/* address wraps contact info for the page owner — semantic HTML5 + Schema.org microdata */}
            <address
              className="space-y-4 not-italic"
              itemScope
              itemType="https://schema.org/Person"
            >
              <meta itemProp="name"          content="Sunchuangyu (Rin) Huang" />
              <meta itemProp="alternateName" content="Rin Huang" />
              <meta itemProp="alternateName" content="黄孙创宇" />
              <meta itemProp="url"           content="https://rin.contact/" />

              <div className="flex items-center gap-3">
                <FiMail size={16} className="text-[#B0B0B0] dark:text-[#7A7A7A]" aria-hidden="true" />
                <a
                  href="mailto:huang@rin.contact"
                  itemProp="email"
                  className="text-sm text-[#595959] hover:text-black dark:text-[#C0C0C0] dark:hover:text-white transition-colors duration-200"
                >
                  huang@rin.contact
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone size={16} className="text-[#B0B0B0] dark:text-[#7A7A7A]" aria-hidden="true" />
                <a
                  href="tel:+61450270703"
                  itemProp="telephone"
                  className="text-sm text-[#595959] hover:text-black dark:text-[#C0C0C0] dark:hover:text-white transition-colors duration-200"
                >
                  +61 450 270 703
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin size={16} className="text-[#B0B0B0] dark:text-[#7A7A7A]" aria-hidden="true" />
                {/* Visible display text */}
                <span className="text-sm text-[#7A7A7A] dark:text-[#9A9A9A]">Adelaide &amp; Melbourne, Australia</span>
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
                    <span itemProp="addressRegion" lang="zh-Hans">贵州 (Guizhou)</span>,{" "}
                    <span itemProp="addressCountry">China</span>
                  </span>
                  <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <span itemProp="addressCountry">China</span>
                  </span>
                </span>
              </div>
            </address>

            <hr className="border-[#E0E0E0] dark:border-[#3D3D3D]" />

            <div className="flex flex-wrap gap-2">
              {SOCIALS.map(({ label, href, icon: Icon, handle }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-2 rounded-full
                             text-xs text-[#7A7A7A] dark:text-[#9A9A9A] hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors duration-200"
                  aria-label={`${label}: ${handle}`}
                >
                  <Icon size={13} aria-hidden="true" />
                  {handle}
                </a>
              ))}
            </div>

            {/* Schedule a call — Calendly */}
            {process.env.NEXT_PUBLIC_CALENDLY_URL && (
              <div className="flex flex-col gap-3">
                <p className="text-xs tracking-widest uppercase text-[#7A7A7A] dark:text-[#AAAAAA]">{t("contact.schedule")}</p>
                <a
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 self-start border border-[#FF3C3C] px-5 py-2.5
                             rounded-full text-xs text-[#FF3C3C] hover:bg-[#FF3C3C] hover:text-white
                             transition-colors duration-200"
                  aria-label={t("contact.schedule")}
                >
                  <FiCalendar size={13} aria-hidden="true" />
                  {t("contact.schedule")}
                </a>
              </div>
            )}

            <hr className="border-[#E0E0E0] dark:border-[#3D3D3D]" />

            {/* Buy Me a Coffee */}
            <div className="flex flex-col gap-3">
              <p className="text-xs tracking-widest uppercase text-[#7A7A7A] dark:text-[#AAAAAA]">{t("contact.support")}</p>
              <a
                href="https://www.buymeacoffee.com/rNLKJA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 self-start border border-[#E0E0E0] dark:border-[#3D3D3D] px-5 py-2.5
                           rounded-full text-xs text-[#7A7A7A] dark:text-[#9A9A9A] hover:border-[#F5C542] hover:text-[#F5C542]
                           transition-colors duration-200"
                aria-label={t("contact.buyMeCoffee")}
              >
                <FiCoffee size={13} aria-hidden="true" />
                {t("contact.buyMeCoffee")}
              </a>
            </div>

          </div>

          {/* Right — contact form */}
          <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs tracking-widest uppercase text-[#7A7A7A] dark:text-[#AAAAAA]">{t("contact.form.name")}</label>
              <input
                id="name" name="name" type="text" required autoComplete="name"
                value={form.name} onChange={handleChange} placeholder={t("contact.form.namePlaceholder")}
                className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-5 py-3 text-sm bg-white dark:bg-[#252525] text-black dark:text-white
                           placeholder:text-[#B0B0B0] dark:placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#FF3C3C]
                           transition-colors duration-200 rounded-full"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs tracking-widest uppercase text-[#7A7A7A] dark:text-[#AAAAAA]">{t("contact.form.email")}</label>
              <input
                id="email" name="email" type="email" required autoComplete="email"
                value={form.email} onChange={handleChange} placeholder={t("contact.form.emailPlaceholder")}
                className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-5 py-3 text-sm bg-white dark:bg-[#252525] text-black dark:text-white
                           placeholder:text-[#B0B0B0] dark:placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#FF3C3C]
                           transition-colors duration-200 rounded-full"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs tracking-widest uppercase text-[#7A7A7A] dark:text-[#AAAAAA]">{t("contact.form.message")}</label>
              <textarea
                id="message" name="message" required rows={6}
                value={form.message} onChange={handleChange} placeholder={t("contact.form.messagePlaceholder")}
                className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-5 py-3 text-sm bg-white dark:bg-[#252525] text-black dark:text-white resize-none
                           placeholder:text-[#B0B0B0] dark:placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#FF3C3C]
                           transition-colors duration-200 rounded-2xl"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={`px-8 py-3 text-sm tracking-widest uppercase transition-colors duration-200
                         disabled:opacity-40 disabled:cursor-not-allowed border rounded-full
                         ${status === "sent"
                           ? "border-[#22C55E] text-[#22C55E] bg-transparent"
                           : "border-[#FF3C3C] bg-[#FF3C3C] text-white hover:bg-transparent hover:text-[#FF3C3C]"
                         }`}
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
