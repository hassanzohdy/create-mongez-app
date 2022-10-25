import createLaravelApp from "../create-laravel-app";
import createNodeApp from "../create-node-app";
import createReactApp from "../create-react-app";
import getAppPath from "./get-app-path";
import selectAppType from "./select-app-type";
import { App, Application } from "./types";

let appDetails: App = {
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

  if (appDetails.appType === "react") {
    await createReactApp(applicationData);
  } else if (appDetails.appType === "node") {
    await createNodeApp(applicationData);
  } else if (appDetails.appType === "laravel") {
    await createLaravelApp(applicationData);
  }
}
