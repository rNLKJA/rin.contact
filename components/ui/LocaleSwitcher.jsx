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

/** Compact header button: names the other language in its own script and voice. */
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
      className="px-2.5 py-1 text-[11px] tracking-widest uppercase
                 text-[#595959] dark:text-[#AAAAAA] hover:text-black dark:hover:text-white
                 hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A] transition-colors duration-200 rounded-full"
    >
      {label}
    </button>
  );
}

/** Settings-row variant: EN | 中文 as a segmented radiogroup. */
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
      size={size}
    />
  );
}
