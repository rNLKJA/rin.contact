import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FiGithub, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { useInView } from "@/hooks/useInView";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sunchuangyuhuang/", icon: FaLinkedin, handle: "LinkedIn" },
  { label: "GitHub", href: "https://github.com/rNLKJA", icon: FiGithub, handle: "rNLKJA" },
  { label: "Email", href: "mailto:huang@rin.contact", icon: FiMail, handle: "huang@rin.contact" },
];

export default function ContactSection() {
  const [ref, inView] = useInView();
  const [formRef, formInView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("https://formspree.io/f/xwkgvgkr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24" aria-label="Contact">
      {/* Header */}
      <div
        ref={ref}
        className={`mb-16 transition-all duration-600 ${
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
        className={`grid grid-cols-1 md:grid-cols-2 gap-16 transition-all duration-600 ${
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

          <a
            href="/data/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="border border-white px-6 py-3 text-sm tracking-widest uppercase text-white
                       hover:bg-white hover:text-black transition-colors duration-200 text-center w-fit"
            aria-label="Download resume PDF"
          >
            Download Resume ↗
          </a>
        </div>

        {/* Right — contact form */}
        <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs tracking-widest uppercase text-[#7A7A7A]">Name</label>
            <input
              id="name" name="name" type="text" required autoComplete="name"
              value={form.name} onChange={handleChange} placeholder="Your name"
              className="border border-[#3D3D3D] px-4 py-3 text-sm bg-[#252525] text-white
                         placeholder:text-[#5A5A5A] focus:outline-none focus:border-white
                         transition-colors duration-200 rounded-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs tracking-widest uppercase text-[#7A7A7A]">Email</label>
            <input
              id="email" name="email" type="email" required autoComplete="email"
              value={form.email} onChange={handleChange} placeholder="your@email.com"
              className="border border-[#3D3D3D] px-4 py-3 text-sm bg-[#252525] text-white
                         placeholder:text-[#5A5A5A] focus:outline-none focus:border-white
                         transition-colors duration-200 rounded-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs tracking-widest uppercase text-[#7A7A7A]">Message</label>
            <textarea
              id="message" name="message" required rows={6}
              value={form.message} onChange={handleChange} placeholder="Leave your message here..."
              className="border border-[#3D3D3D] px-4 py-3 text-sm bg-[#252525] text-white resize-none
                         placeholder:text-[#5A5A5A] focus:outline-none focus:border-white
                         transition-colors duration-200 rounded-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="border border-white px-6 py-3 text-sm tracking-widest uppercase text-white
                       hover:bg-white hover:text-black transition-colors duration-200
                       disabled:opacity-40 disabled:cursor-not-allowed"
            aria-live="polite"
          >
            {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent ✓" : status === "error" ? "Try again" : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="text-xs text-[#7A7A7A]" role="status">Thank you — I will get back to you shortly.</p>
          )}
          {status === "error" && (
            <p className="text-xs text-[#FF3C3C]" role="alert">Something went wrong. Please try emailing me directly at huang@rin.contact.</p>
          )}
        </form>
      </div>
    </section>
  );
}
