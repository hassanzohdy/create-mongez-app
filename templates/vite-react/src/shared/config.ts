import "./definitions.d.ts";
import "./initial-config";

// keep the previous line to be empty to ignore the import sort as `initial-config` must be imported first
import { LoadingErrorHandler } from "@mongez/moonlight";
import { ApplicationConfigurations, setAppConfigurations } from "@mongez/react";
import { setHelmetConfigurations } from "@mongez/react-helmet";
import { setRouterConfigurations } from "@mongez/react-router";
import { setPreloadConfiguration } from "@mongez/react-utils";
import { localeCodesList } from "apps/front-office/utils/localization";
import { defaultLocaleCode, fallbackLocaleCode } from "./flags";
import { routerConfigurations } from "./router-configurations.js";

// if you're not using `@mongez/react-utils` for preload function, you can remove the following line
setPreloadConfiguration({
  cache: false,
  loadingErrorComponent: LoadingErrorHandler,
});

// @mongez/react-helmet configurations
setHelmetConfigurations({
  appendAppName: true,
  appNameSeparator: " | ",
  translatable: true,
  translateAppName: true,
});

// keep this for the app handling, just change the values
const appConfigurations: ApplicationConfigurations = {
  localization: {
    defaultLocaleCode: defaultLocaleCode,
    fallback: fallbackLocaleCode,
    locales: localeCodesList,
  },
};

setAppConfigurations(appConfigurations);

// router configurations
setRouterConfigurations(routerConfigurations);
