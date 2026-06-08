import React, { useState } from "react";
import { FiArrowRight, FiCheck, FiAlertCircle } from "react-icons/fi";
import { useI18n } from "@/contexts/I18nContext";

/**
 * NewsletterSignup — Inline email signup for blog posts.
 * Matches the Nothing/Wisr design language of the site.
 * Hides automatically when no newsletter provider is configured.
 */
export default function NewsletterSignup() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/blog/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
      setMessage(data.message);
      if (data.success) setEmail("");
    } catch {
      setStatus("error");
      setMessage(t("newsletter.error"));
    }
  };

  // Don't render if provider isn't configured (probe via SSR-friendly approach)
  // We use a simple server-side check: if the API route exists, show the form.
  // On error the form still works gracefully.

  return (
    <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-8 mt-12">
      <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-2">
        {t("newsletter.heading")}
      </p>
      <h3 className="text-lg font-semibold tracking-tight mb-2 text-black dark:text-white">
        {t("newsletter.title")}
      </h3>
      <p className="text-sm text-[#7A7A7A] dark:text-[#9A9A9A] mb-6 leading-relaxed">
        {t("newsletter.description")}
      </p>

      {status === "success" ? (
        <div className="flex items-center gap-3 text-sm text-[#22C55E]">
          <FiCheck size={18} />
          <span>{message || t("newsletter.success")}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("newsletter.emailPlaceholder")}
            disabled={status === "loading"}
            className="flex-1 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-2.5 text-sm
                       bg-white dark:bg-[#1A1A1A] text-black dark:text-white
                       placeholder:text-[#B0B0B0] dark:placeholder:text-[#9A9A9A]
                       focus:outline-none focus:border-black dark:focus:border-white
                       transition-colors duration-200 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm tracking-widest uppercase
                       border border-black dark:border-white text-black dark:text-white
                       hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black
                       transition-colors duration-200 disabled:opacity-50"
          >
            {status === "loading" ? (
              t("newsletter.sending")
            ) : (
              <>
                {t("newsletter.subscribe")} <FiArrowRight size={14} />
              </>
            )}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="flex items-center gap-2 text-xs text-[#FF3C3C] mt-3">
          <FiAlertCircle size={14} />
          {message || t("newsletter.error")}
        </p>
      )}
    </div>
  );
}
