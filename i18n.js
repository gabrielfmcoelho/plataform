import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)  // Loads translations from backend (public/locales)
  .use(LanguageDetector)  // Detects language from browser or user settings
  .use(initReactI18next)  // Initializes react-i18next
  .init({
    fallbackLng: 'pt-BR',
    debug: true,
    interpolation: {
      escapeValue: false,  // React already does escaping
    },
    react: {
      useSuspense: false,  // Disable suspense
    },
  });

export default i18n;
