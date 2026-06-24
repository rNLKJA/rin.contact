import React from "react";
import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";

/**
 * AuthorBio — a short author card at the foot of every post.
 *
 * Someone who has just read a full essay is a warm lead, but the post used to
 * end with only share + related links. This closes the loop: who wrote it, and
 * a direct path to work with him. Built entirely from existing i18n keys
 * (common.siteName / common.siteDescription / nav.*) so it is bilingual without
 * adding any new locale strings.
 */
export default function AuthorBio() {
  const { t } = useI18n();

  return (
    <aside className="mt-14 pt-8 border-t border-[#E0E0E0] dark:border-[#3D3D3D] flex flex-col sm:flex-row gap-5">
      {/* Avatar — matches the digital business card's red "R" mark */}
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF3C3C] text-white font-display text-xl font-semibold flex items-center justify-center select-none"
        aria-hidden="true"
      >
        R
      </div>

      <div className="flex-1">
        <p className="text-base font-semibold tracking-tight text-black dark:text-white mb-1">
          {t("common.siteName")}
        </p>
        <p className="text-sm text-[#6E6E6E] dark:text-[#9A9A9A] leading-relaxed mb-4">
          {t("common.siteDescription")}
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/hire-me"
            className="inline-flex items-center gap-1.5 border border-[#FF3C3C] text-[#FF3C3C] px-4 py-1.5 text-[11px] tracking-widest uppercase rounded-full hover:bg-[#FF3C3C] hover:text-white transition-colors duration-200"
          >
            {t("nav.hireMe")} <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#595959] dark:text-[#AAAAAA] px-4 py-1.5 text-[11px] tracking-widest uppercase rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            {t("nav.about")} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
