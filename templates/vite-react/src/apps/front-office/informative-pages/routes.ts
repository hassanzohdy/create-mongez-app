import { publicRoutes } from "apps/front-office/utils/router";
import URLS from "apps/front-office/utils/urls";
import InformativePage from "./components/InformativePage/InformativePage";
import AboutUsPage from "./components/PrimaryPages/AboutUsPage";
import PrivacyPolicyPage from "./components/PrimaryPages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./components/PrimaryPages/TermsAndConditionsPage";

publicRoutes([
  {
    path: URLS.pages.aboutUs,
    component: AboutUsPage,
  },
  {
    path: URLS.pages.termsConditions,
    component: TermsAndConditionsPage,
  },
  {
    path: URLS.pages.privacyPolicy,
    component: PrivacyPolicyPage,
  },
  {
    path: URLS.pages.viewRoute,
    component: InformativePage,
  },
]);
