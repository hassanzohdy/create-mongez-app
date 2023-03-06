import "./definitions.d.ts";
import "./initial-config";

// keep the previous line to be empty to ignore the import order as `init-config` must be imported first
import { setHelmetConfigurations } from "@mognez/react-helmet";
import { LoadingErrorHandler } from "@mongez/moonlight";
import { ApplicationConfigurations, setAppConfigurations } from "@mongez/react";
import { setPreloadConfiguration } from "@mongez/react-utils";
import { localeCodesList } from "apps/front-office/utils/localization";
import { defaultLocaleCode, fallbackLocaleCode } from "./flags";

setPreloadConfiguration({
  cache: false,
  loadingErrorComponent: LoadingErrorHandler,
});

setHelmetConfigurations({
  appendAppName: true,
  appNameSeparator: " | ",
  translatable: true,
  translateAppName: true,
});

const appConfigurations: ApplicationConfigurations = {
  localization: {
    defaultLocaleCode: defaultLocaleCode,
    fallback: fallbackLocaleCode,
    locales: localeCodesList,
  },
};

setAppConfigurations(appConfigurations);
