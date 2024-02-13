import URLS from "apps/front-office/utils/urls";
import React from "react";
import { publicRoutes } from "../utils/router";
publicRoutes([
    {
        path: URLS.contactUs,
        component: React.lazy(() => import("./components/ContactUsPage")),
    },
]);
