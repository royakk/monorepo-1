import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en } from "@/locales/en"; 
import { fa } from "@/locales/fa";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: import.meta.env?.DEV || false,

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        translation: en,
      },
      fa: {
        translation: fa,
      },
    },
  });

export default i18n;
