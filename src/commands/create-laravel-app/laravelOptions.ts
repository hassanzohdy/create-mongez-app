import { Application } from "../create-new-app/types";
import { getDatabaseData } from "./database";
import generateAppsDetails from "./generateAppsDetails";
import projectApps from "./projectApps";
import selectMobileApps from "./selectMobileApps";
import selectWebApps from "./selectWebApps";
import {
  hasMobileApp,
  hasWebsiteApp,
  prepareMobileApps,
  prepareWebApps,
} from "./utils";

export default function laravelOptions(app: Application): Promise<any[]> {
  return new Promise(async (resolve) => {
    const options: any = {};

    let projectAppsList = await projectApps();

    let apps: string[] = [];

    if (hasWebsiteApp(projectAppsList)) {
      apps = [...apps, ...prepareWebApps(await selectWebApps())];
    }

    if (hasMobileApp(projectAppsList)) {
      apps = [...apps, ...prepareMobileApps(await selectMobileApps())];
    }

    options.apps = generateAppsDetails(apps);

    options.database = await getDatabaseData(app);

    resolve(options);
  });
}
