import router from "@mongez/react-router";
import { publicRoutes } from "apps/front-office/utils/router";
import URLS from "apps/front-office/utils/urls";
import React from "react";

router.add(
  "/404",
  React.lazy(
    () => import("apps/front-office/design-system/layouts/NotFoundPage"),
  ),
);

publicRoutes([
  {
    path: URLS.home,
    component: React.lazy(() => import("./components/HomePage")),
  },
]);
