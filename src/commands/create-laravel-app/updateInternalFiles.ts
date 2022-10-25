import { getFile, putFile } from "@mongez/fs";
import { Application } from "../create-new-app/types";
import {
  getAppsConstants,
  getAuthApps,
} from "./builders/application-constants-builder";
import { formatCode } from "./formatter";

export default function updateInternalFiles(app: Application) {
  updateApplicationFile(app);

  updateAuthFile(app);
}

function updateApplicationFile(app: Application) {
  // update app/Modules/General/Services/Application.php
  const applicationFilePath = `${app.appPath}/app/Modules/General/Services/Application.php`;

  let content = getFile(applicationFilePath).replace(
    "const APPS = '';",
    getAppsConstants(app.options.apps)
  );

  putFile(applicationFilePath, formatCode(content));
}

function updateAuthFile(app: Application) {
  // update config/auth.php
  const authFilePath = `${app.appPath}/config/auth.php`;

  let content = getFile(authFilePath).replace(
    '"apps_list"',
    `'apps' => [${getAuthApps(app.options.apps)}]`
  );

  putFile(authFilePath, formatCode(content));
}
