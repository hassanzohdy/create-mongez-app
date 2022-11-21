import { RouterConfigurations } from "@mongez/react-router";
import React from "react";
import { productionBasePath } from "./flags";

const routerConfigurations: RouterConfigurations = {
  strict: false,
  basePath: productionBasePath,
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
    mode: "render",
    component: React.lazy(
      () => import("apps/front-office/design-system/layouts/NotFoundPage"),
    ),
  },
  rootComponent: React.lazy(
    () => import("apps/front-office/design-system/layouts/TopRoot"),
  ),
};

export default routerConfigurations;
