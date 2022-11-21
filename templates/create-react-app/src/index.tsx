import startApplication from "@mongez/react";
import "./shared/shared-provider";

startApplication({
  // debug is for development only as it will turn on the web vitals once its enabled
  debug: false,
  detectDarkMode: true,
  detectDeviceAndBrowser: true,
});
