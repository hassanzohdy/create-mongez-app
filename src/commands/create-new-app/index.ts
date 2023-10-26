import { App } from "src/helpers/app";
import createNodeApp from "../create-node-app";
import createReactApp from "../vite-react";
import getAppPath from "./get-app-path";
import selectAppType from "./select-app-type";
import { App as AppType, Application } from "./types";

let appDetails: AppType = {
  appName: "",
  appType: "",
  appPath: "",
};

export default async function createNewApp(appName: string) {
  appDetails.appName = appName;
  appDetails.appPath = getAppPath(appName);

  if (!appDetails.appPath) return;

  appDetails.appType = await selectAppType();

  const applicationData = appDetails as Application;

  const application = new App(applicationData);

  if (appDetails.appType === "react") {
    await createReactApp(applicationData);
  } else if (appDetails.appType === "node") {
    await createNodeApp(application);
  }
}
