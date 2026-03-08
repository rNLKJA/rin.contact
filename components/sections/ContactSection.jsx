import React, { useState, useEffect, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedin } from "react-icons/fa";
import { FiGithub, FiMail, FiPhone, FiMapPin, FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useInView } from "@/hooks/useInView";

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
        className="flex-shrink-0 text-[#7A7A7A] hover:text-white transition-colors duration-200 mt-0.5"
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
  const [ref, inView] = useInView();
  const [formRef, formInView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [toast, setToast] = useState(null); // { type: "success" | "error", message }
  const sectionRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: -9999, y: -9999 });

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight({ x: -9999, y: -9999 });
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

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
        {/* Cursor spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,60,60,0.07) 0%, rgba(255,60,60,0.03) 40%, transparent 70%)`,
          }}
        />
        {/* Header */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-600 relative z-10 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">
            05 — Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-white">
            Get in Touch
          </h2>
          <p className="text-base text-[#9A9A9A] max-w-xl leading-relaxed">
            Whether it is a data challenge, a research collaboration, a project
            idea, or just a coffee — I would genuinely love to hear from you.
            I am always open to conversations that push things forward.
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
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiMail size={16} className="text-[#7A7A7A]" aria-hidden="true" />
                <a href="mailto:huang@rin.contact" className="text-sm text-[#C0C0C0] hover:text-white transition-colors duration-200">
                  huang@rin.contact
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone size={16} className="text-[#7A7A7A]" aria-hidden="true" />
                <a href="tel:+61450270703" className="text-sm text-[#C0C0C0] hover:text-white transition-colors duration-200">
                  +61 450 270 703
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin size={16} className="text-[#7A7A7A]" aria-hidden="true" />
                <span className="text-sm text-[#9A9A9A]">Adelaide &amp; Melbourne, Australia</span>
              </div>
            </div>

            <hr className="border-[#3D3D3D]" />

            <div className="space-y-3">
              {SOCIALS.map(({ label, href, icon: Icon, handle }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 group"
                  aria-label={`${label}: ${handle}`}
                >
                  <Icon size={16} className="text-[#7A7A7A] group-hover:text-white transition-colors duration-200" aria-hidden="true" />
                  <span className="text-sm text-[#9A9A9A] group-hover:text-white transition-colors duration-200">{handle}</span>
                </a>
              ))}
            </div>

            <hr className="border-[#3D3D3D]" />

          </div>

          {/* Right — contact form */}
          <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs tracking-widest uppercase text-[#7A7A7A]">Name</label>
              <input
                id="name" name="name" type="text" required autoComplete="name"
                value={form.name} onChange={handleChange} placeholder="Your name"
                className="border border-[#3D3D3D] px-4 py-3 text-sm bg-[#252525] text-white
                           placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#FF3C3C]
                           transition-colors duration-200 rounded-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs tracking-widest uppercase text-[#7A7A7A]">Email</label>
              <input
                id="email" name="email" type="email" required autoComplete="email"
                value={form.email} onChange={handleChange} placeholder="your@email.com"
                className="border border-[#3D3D3D] px-4 py-3 text-sm bg-[#252525] text-white
                           placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#FF3C3C]
                           transition-colors duration-200 rounded-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs tracking-widest uppercase text-[#7A7A7A]">Message</label>
              <textarea
                id="message" name="message" required rows={6}
                value={form.message} onChange={handleChange} placeholder="Leave your message here..."
                className="border border-[#3D3D3D] px-4 py-3 text-sm bg-[#252525] text-white resize-none
                           placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#FF3C3C]
                           transition-colors duration-200 rounded-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={`px-6 py-3 text-sm tracking-widest uppercase transition-colors duration-200
                         disabled:opacity-40 disabled:cursor-not-allowed border
                         ${status === "sent"
                           ? "border-[#22C55E] text-[#22C55E] bg-transparent"
                           : "border-[#FF3C3C] bg-[#FF3C3C] text-white hover:bg-transparent hover:text-[#FF3C3C]"
                         }`}
              aria-live="polite"
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                ? "Message Sent ✓"
                : status === "error"
                ? "Try Again"
                : "Send Message"}
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
