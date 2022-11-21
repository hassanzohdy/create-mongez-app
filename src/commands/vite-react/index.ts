import fs from "@mongez/fs";
import * as path from "path";
import { installCommand, startCommand } from "src/helpers/package-manager";
import print, { colors } from "../../helpers/cli";
import exec from "../../helpers/exec";
import { packageRoot, template } from "../../helpers/paths";
import { Application } from "../create-new-app/types";
import selectAppConfigurations from "./selectAppConfigurations";

const packagesOptions = {
  scss: ["sass"],
  styledComponents: ["@emotion/react", "@emotion/styled"],
};

const packagesVersion = fs.getJson(packageRoot("files/packages-versions.json"));

// TODO: add slim feature
// TODO: add mongez.json file in workspace for quick installation
// TODO: add color, api, locales and other dot env details in cli for replacements
export default async function createReactApp({
  appName,
  appPath,
}: Required<Application>) {
  const options = await selectAppConfigurations();

  print(colors.yellow(`Crafting ${colors.cyan(appName)}`));

  print(colors.cyan("Building Project Structure"));

  // copy project files
  fs.copy(template("vite-react"), appPath);

  // update package.json file
  const packageJson: any = fs.getJson(path.resolve(appPath, "package.json"));

  packageJson.name = appName;

  if (["scss", "all"].includes(options.styleType)) {
    for (const packageName of packagesOptions.scss) {
      packageJson.dependencies[packageName] = packagesVersion[packageName];
    }
  }

  if (["styledComponents", "all"].includes(options.styleType)) {
    for (const packageName of packagesOptions.styledComponents) {
      packageJson.dependencies[packageName] = packagesVersion[packageName];
    }
  }

  fs.putJson(path.resolve(appPath, "package.json"), packageJson);

  print(colors.yellow("Installing The Project"));

  exec(installCommand(), {
    cwd: appPath,
    stdio: "inherit",
  });

  // update env file
  const dotEnv = fs
    .get(path.resolve(appPath, ".env"))
    .replace("AppName", appName)
    .replace(
      "AppCodeName",
      appName
        .split(/-|_/g)
        .map((word) => word[0])
        .join("")
    );

  fs.put(path.resolve(appPath, ".env"), dotEnv);

  // update .env.production file
  let dotEnvProduction = fs.get(path.resolve(appPath, ".env.production"));

  dotEnvProduction = dotEnvProduction.replace("AppName", appName).replace(
    "AppCodeName",
    appName
      .split(/-|_/g)
      .map((word) => word[0])
      .join("")
  );

  fs.put(path.resolve(appPath, ".env.production"), dotEnvProduction);

  print(colors.magenta("Initializing Git Repository"));

  // replace _.gitignore to
  fs.rename(
    path.resolve(appPath, "_.gitignore"),
    path.resolve(appPath, ".gitignore")
  );

  // initialize git repository
  exec(`git init`, {
    cwd: appPath,
    stdio: "inherit",
  });

  // switching to `main` branch
  exec(`git checkout -b main`, {
    cwd: appPath,
    stdio: "inherit",
  });

  // adding all files to git and make a commit
  exec(`git add .`, {
    cwd: appPath,
    stdio: "inherit",
  });

  exec(`git commit -m Initial`, {
    cwd: appPath,
    stdio: "inherit",
  });

  print(
    colors.green(
      "All done, now you're ready to go, type the following or copy/paste it in the terminal to get started."
    )
  );

  print(colors.cyan(`cd ${appName} && ${startCommand()}`));
}
