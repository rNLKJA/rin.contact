import React, { createContext, useContext } from "react";
import { useRouter } from "next/router";
import en from "@/locales/en-AU.json";
import zh from "@/locales/zh-Hans.json";

const I18nContext = createContext({ t: (k) => k, locale: "en-AU" });

function resolve(obj, path) {
  return path.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), obj);
}

export function I18nProvider({ children }) {
  const { locale = "en-AU" } = useRouter() || {};
  const messages = locale === "zh-Hans" ? zh : en;

  const t = (key) => {
    const val = resolve(messages, key);
    if (val !== undefined) return val;
    const fallback = resolve(en, key);
    return fallback !== undefined ? fallback : key;
  };

  return <I18nContext.Provider value={{ t, locale }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
