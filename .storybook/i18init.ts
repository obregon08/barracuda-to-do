import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import Backend from "i18next-http-backend"

// @ts-ignore
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    ns: ["common"],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    defaultNS: "common",
    returnObjects: true,
    react: {
      useSuspense: false,
      bindI18n: "languageChanged loaded",
      bindStore: "added removed",
      nsMode: "default",
    },
  })

export { i18n as i18nInit }
