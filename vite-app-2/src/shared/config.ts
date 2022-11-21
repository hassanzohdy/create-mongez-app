import "./definitions.d.ts";
import "./initial-config";

import { ApplicationConfigurations, setAppConfigurations } from "@mongez/react";
import { localeCodesList } from "apps/front-office/utils/localization";
import { defaultLocaleCode, fallbackLocaleCode } from "./flags";
import routerConfigurations from "./router-configurations";

const appConfigurations: ApplicationConfigurations = {
  localization: {
    defaultLocaleCode: defaultLocaleCode,
    fallback: fallbackLocaleCode,
    locales: localeCodesList,
  },
  helmet: {
    appendAppName: true,
    appNameSeparator: " | ",
    translatable: true,
    translateAppName: true,
  },
  router: routerConfigurations,
};

setAppConfigurations(appConfigurations);
