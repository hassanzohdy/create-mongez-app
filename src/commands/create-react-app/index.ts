import fs from "@flk/fs";
import * as path from "path";
import print, { colors } from "../../helpers/cli";
import exec from "../../helpers/exec";
import { packageRoot, template } from "../../helpers/paths";
import selectAppConfigurations from "./selectAppConfigurations";

const packagesOptions = {
  scss: ["sass"],
  styledComponents: ["@emotion/react", "@emotion/styled"],
};

const packagesVersion = fs.getJson(packageRoot("files/packages-versions.json"));

const defaults = {
  styleType: "styledComponents",
};

// TODO: add slim feature
// TODO: add mongez.json file in workspace for quick installation
// TODO: add color, api, locales and other dot env details in cli for replacements
export default async function createReactApp(
  appName: string,
  incomingOptions: any
) {
  const appPath: string = path.resolve(process.cwd(), appName);

  if (fs.isDirectory(appPath)) {
    return print(
      colors.redBright(
        `${process.cwd()} has an existing directory \`${colors.cyan(
          appName
        )}\`, please choose another app name or another directory to run the command from.`
      )
    );
  }

  const options = incomingOptions.defaults
    ? defaults
    : await selectAppConfigurations();

  if (incomingOptions.styleType) {
    options.styleType = incomingOptions.styleType;
  }

  print(colors.yellow("Creating React App..."));

  print(colors.cyan("Building Project Structure..."));

  // copy project files
  fs.copy(template("react"), appPath);

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

  print(colors.yellow("Installing The Project..."));

  exec(`yarn install`, {
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

  print(colors.magenta("Initializing Git Repository..."));

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
      "All done, now you're ready to go, type the following or copy/paste it to get started."
    )
  );

  print(colors.cyan(`cd ${appName} && yarn start`));
}
