// why we have two configuration files? read the comment at the top of the initial config file
import './initial-config';

import { ApplicationConfigurations, setAppConfigurations } from "@mongez/react";
import Root from "design-system/layouts/Root";

const appConfigurations: ApplicationConfigurations = {
  router: {
    basePath: process.env.REACT_APP_PRODUCTION_BASE_PATH,
    notFound: {
      mode: "redirect",
      route: "/404",
    },
    // to set a preloader between the router navigation, pass it to the `preloader` property
    // preloader: Preloader,
    // will wrap the entire application
    rootComponent: Root,
  },
};

setAppConfigurations(appConfigurations);
