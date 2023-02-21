import { publicRoutes } from "apps/front-office/utils/router";
import URLS from "apps/front-office/utils/urls";
import React from "react";

publicRoutes([
  {
    path: URLS.pages.aboutUs,
    component: React.lazy(
      () => import("./components/PrimaryPages/AboutUsPage"),
    ),
  },
  {
    path: URLS.pages.termsConditions,
    component: React.lazy(
      () => import("./components/PrimaryPages/TermsAndConditionsPage"),
    ),
  },
  {
    path: URLS.pages.privacyPolicy,
    component: React.lazy(
      () => import("./components/PrimaryPages/PrivacyPolicyPage"),
    ),
  },
  {
    path: URLS.pages.viewRoute,
    component: React.lazy(() => import("./components/InformativePage")),
  },
]);
