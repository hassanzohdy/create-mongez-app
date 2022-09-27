// The main purpose of this file is to provide a way to configure the application before anything else
// as some other configurations might depend on defining these configurations first.
// For example in the router root, you might need to use the user module which depends on the cache definition
// thus we need to define the cache first before defining the router root.
import { PlainLocalStorageDriver, EncryptedLocalStorageDriver } from "@mongez/cache";
import { ApplicationConfigurations, setAppConfigurations } from "@mongez/react";
import uk from "assets/images/flags/uk.png";
import AES from "crypto-js/aes";

const key = (process.env.REACT_APP_BRANCH_NAME ? process.env.REACT_APP_BRANCH_NAME + '.' : '') + process.env.REACT_APP_CODE_NAME;

const appConfigurations: ApplicationConfigurations = {
  localization: {
    defaultLocaleCode: process.env.REACT_APP_DEFAULT_LOCALE_CODE,
    fallback: process.env.REACT_APP_FALLBACK_LOCALE_CODE,
    locales: {
      en: {
        direction: "ltr",
        name: "English",
        flag: uk, // optional
      },
    },
  },
  encryption: {
    key: key,
    driver: AES,
  },
  cache: {
    // make the cache prefix with the app code name, append the branch name (if exists)
    prefix: key,
    driver: process.env.NODE_ENV === "development" ?  new PlainLocalStorageDriver() : new EncryptedLocalStorageDriver(),
  },
  helmet: {
    appName: process.env.REACT_APP_NAME,
    appendAppName: true,
    appNameSeparator: " | ",
    translatable: true,
    translateAppName: true,
  },
};

setAppConfigurations(appConfigurations);
