import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useI18n } from "@/contexts/I18nContext";
import Segmented from "@/components/ui/Segmented";

const LOCALES = [
  { value: "en-AU", label: "EN", lang: "en-AU", ariaLabel: "English" },
  { value: "zh-Hans", label: "中文", lang: "zh-Hans" },
];

/** Switch locale on the current route (same asPath, so open UI can persist). */
export function useSwitchLocale() {
  const router = useRouter();
  return useCallback(
    (nextLocale) => {
      if (!nextLocale || nextLocale === router.locale) return;
      router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
        locale: nextLocale,
      });
    },
    [router]
  );
}

/** Compact header button: names the other language in its own script and voice.
 * A 36px square hairline box, matching the theme toggle beside it. */
export default function LocaleSwitcher() {
  const { locale = "en-AU" } = useRouter();
  const switchLocale = useSwitchLocale();
  const nextLocale = locale === "en-AU" ? "zh-Hans" : "en-AU";
  const label = locale === "en-AU" ? "中文" : "EN";

  return (
    <button
      type="button"
      onClick={() => switchLocale(nextLocale)}
      lang={nextLocale}
      aria-label={nextLocale === "zh-Hans" ? "中文" : "English"}
      className="inline-flex items-center justify-center h-9 min-w-9 px-2.5 text-[11px] tracking-widest uppercase
                 border border-[#E0E0E0] dark:border-[#3D3D3D]
                 text-[#595959] dark:text-[#AAAAAA] hover:text-black dark:hover:text-white
                 hover:border-black dark:hover:border-white
                 hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A] transition-colors duration-200"
    >
      {label}
    </button>
  );
}

/** Settings-row variant: EN | 中文 as a segmented radiogroup. Arrows only move
 * focus, so exploring the options never reloads the page in another language. */
export function LocaleSegmented({ labelledBy, size }) {
  const { t, locale } = useI18n();
  const switchLocale = useSwitchLocale();
  return (
    <Segmented
      label={t("locale.label")}
      labelledBy={labelledBy}
      options={LOCALES}
      value={locale}
      onChange={switchLocale}
      activation="manual"
      size={size}
    />
  );
}
