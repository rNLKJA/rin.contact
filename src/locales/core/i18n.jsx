import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const en_US = require("../translation/en_US.json");
const zh_CN = require("../translation/zh_CN.json");

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: ["en", "zh"],
    lng: "en",
    resources: {
      en: {
        translation: {
          ...en_US,
        },
      },
      zh: {
        translation: {
          ...zh_CN,
        },
      },
    },
  });

export default i18n;
