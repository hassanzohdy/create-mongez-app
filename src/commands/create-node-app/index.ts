import { copy, getJson, putJson } from "@mongez/fs";
import path from "path";
import { installCommand, startCommand } from "src/helpers/package-manager";
import { Application } from "../create-new-app/types";
import print, { colors } from "./../../helpers/cli";
import exec from "./../../helpers/exec";
import initializeGit from "./../../helpers/initializeGit";
import { template } from "./../../helpers/paths";
import selectNodeAppConfigurations from "./selectNodeAppConfigurations";

export default async function createNodeApp(appDetails: Application) {
  const { appName, appPath } = appDetails;

  appDetails.options = await selectNodeAppConfigurations();

  print(colors.yellow(`Crafting ${colors.greenBright(appName)}`));

  print(colors.cyan("Building Project Structure"));

  // copy project files
  copy(template("node"), appPath);

  // update package.json file
  const packageJson: any = getJson(path.resolve(appPath, "package.json"));

  packageJson.name = appName;

  putJson(path.resolve(appPath, "package.json"), packageJson);

  print(colors.yellow("Installing The Project"));

  exec(installCommand(), {
    cwd: appPath,
    stdio: "inherit",
  });

  initializeGit(appPath);

  print(
    colors.green(
      "All done, now you're ready to go, type the following or copy/paste it to get started."
    )
  );

  print(colors.cyan(`cd ${appName} && ${startCommand()}`));
}
