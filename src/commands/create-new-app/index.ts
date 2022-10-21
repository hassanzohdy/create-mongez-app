import createNodeApp from "../create-node-app";
import createReactApp from "../create-react-app";
import getAppPath from "./get-app-path";
import selectAppType from "./select-app-type";

let appDetails: any = {
  appName: null,
  appType: null,
  appPath: null,
};

export default async function createNewApp(appName: string) {
  appDetails.appName = appName;
  appDetails.appPath = getAppPath(appName);

  if (!appDetails.appPath) return;

  appDetails.appType = await selectAppType();

  if (appDetails.appType === "react") {
    await createReactApp(appDetails);
  } else if (appDetails.appType === "node") {
    await createNodeApp(appDetails);
  }
}
