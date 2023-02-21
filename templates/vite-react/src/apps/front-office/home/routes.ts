import { publicRoutes } from "apps/front-office/utils/router";
import URLS from "apps/front-office/utils/urls";
import React from "react";

publicRoutes([
  {
    path: URLS.notFound,
    component: React.lazy(
      () => import("apps/front-office/design-system/layouts/NotFoundPage"),
    ),
  },
  {
    path: URLS.home,
    component: React.lazy(() => import("./components/HomePage")),
  },
]);
