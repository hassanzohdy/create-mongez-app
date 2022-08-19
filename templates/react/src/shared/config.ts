import { EncryptedLocalStorageDriver } from "@mongez/cache";
import { ApplicationConfigurations, setAppConfigurations } from "@mongez/react";
import uk from "assets/images/flags/uk.png";
import AES from "crypto-js/aes";

const appConfigurations: ApplicationConfigurations = {
  localization: {
    defaultLocaleCode: process.env.REACT_APP_DEFAULT_LOCALE_CODE,
    fallback: process.env.REACT_APP_FALLBACK_LOCALE_CODE,
    locales: {
      en: {
        direction: "ltr",
        name: "English",
        flag: uk,
      },
    },
  },
  encryption: {
    key: process.env.REACT_APP_CODE_NAME,
    driver: AES,
  },
  cache: {
    prefix: process.env.REACT_APP_CODE_NAME,
    driver: new EncryptedLocalStorageDriver(),
  },
  helmet: {
    appName: process.env.REACT_APP_NAME,
    appendAppName: true,
    appNameSeparator: " | ",
    translatable: true,
    translateAppName: true,
  },
  router: {
    basePath: process.env.REACT_APP_PRODUCTION_BASE_PATH,
    notFound: {
      mode: "redirect",
      route: "/404",
    },
    // preloader: Preloader,
  },
  endpoint: {
    putToPost: true,
    baseUrl: process.env.REACT_APP_API_URL,
    apiKey: process.env.REACT_APP_API_KEY,
  },
};

setAppConfigurations(appConfigurations);
