import "./definitions.d.ts";
import "./initial-config";

import { LoadingErrorHandler } from "@mongez/moonlight";
import { ApplicationConfigurations, setAppConfigurations } from "@mongez/react";
import { setPreloadConfiguration } from "@mongez/react-utils";
import { localeCodesList } from "apps/front-office/utils/localization";
import { defaultLocaleCode, fallbackLocaleCode } from "./flags";
import { integrationsConfigurations } from "./integrationsConfigurations";
import routerConfigurations from "./router-configurations";

setPreloadConfiguration({
  cache: false,
  loadingErrorComponent: LoadingErrorHandler,
});

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
  integrations: integrationsConfigurations,
};

setAppConfigurations(appConfigurations);
