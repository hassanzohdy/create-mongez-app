import {
  RouterConfigurations,
  setRouterConfigurations,
} from "@mongez/react-router";
import URLS from "apps/front-office/utils/urls";
import React from "react";
import { productionBasePath } from "./flags";

const routerConfigurations: RouterConfigurations = {
  strictMode: true,
  basePath: productionBasePath,
  scrollToTop: "smooth",
  localization: {
    // hard reload is recommended if the application is large as it will make a full reload
    changeLanguageReloadMode: "hard",
  },
  lazyLoading: {
    loadingComponent: React.lazy(
      () => import("apps/front-office/design-system/Indicators/ProgressBar"),
    ),
    loaders: {
      app: (app: string) => {
        return import(`./../apps/${app}/${app}-provider.ts`);
      },
      module: (app: string, module: string) => {
        return import(`./../apps/${app}/${module}/provider.ts`);
      },
    },
  },
  notFound: {
    mode: "redirect",
    path: URLS.notFound,
  },
  rootComponent: React.lazy(
    () => import("apps/front-office/design-system/layouts/TopRoot"),
  ),
};

setRouterConfigurations(routerConfigurations);
