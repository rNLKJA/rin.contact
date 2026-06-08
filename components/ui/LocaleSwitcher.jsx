import React from "react";
import { useRouter } from "next/router";

export default function LocaleSwitcher() {
  const router = useRouter();
  const { locale = "en-AU" } = router;
  const nextLocale = locale === "en-AU" ? "zh-Hans" : "en-AU";
  const label = locale === "en-AU" ? "中文" : "EN";

  const switchLocale = (e) => {
    e.preventDefault();
    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      { locale: nextLocale }
    );
  };

  return (
    <button
      onClick={switchLocale}
      aria-label={`Switch language to ${nextLocale}`}
      className="px-2.5 py-1 text-[11px] tracking-widest uppercase
                 text-[#595959] dark:text-[#AAAAAA] hover:text-black dark:hover:text-white
                 hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A] transition-all duration-200 rounded-full"
    >
      {label}
    </button>
  );
}
