import {
  copy,
  getFile,
  getJson,
  putFile,
  putJson,
  renameFile,
} from "@mongez/fs";
import path from "path";
import { colors } from "./cli";
import { confirmAction, multiSelect } from "./confirm-action";
import exec from "./exec";
import { installCommand, startCommand } from "./package-manager";
import { packageRoot, Template, template } from "./paths";

export async function initializeGitRepository(appPath: string) {
  if (
    (await confirmAction("Do you want to initialize a git repository?")) ===
    false
  )
    return false;

  console.log(colors.magenta("Initializing Git Repository"));

  // initialize git repository
  exec(`git init`, {
    cwd: appPath,
  });

  // switching to `main` branch
  exec(`git checkout -b main`, {
    cwd: appPath,
  });

  return true;
}

export async function installDependencies(appPath: string) {
  if (
    (await confirmAction(
      "Do you want to install the project dependencies?",
    )) === false
  )
    return;

  console.log(colors.yellow("Installing Dependencies..."));
  exec(installCommand(), {
    cwd: appPath,
    stdio: "inherit",
  });
}

export async function updateEnvFile(appPath: string, appName: string) {
  // update package.json file
  const packageJson: any = getJson(path.resolve(appPath, "package.json"));

  packageJson.name = appName;

  putJson(path.resolve(appPath, "package.json"), packageJson);

  // update env file
  const dotEnv = getFile(path.resolve(appPath, ".env"))
    .replace("AppName", appName)
    .replace(
      "AppCodeName",
      appName
        .split(/-|_/g)
        .map(word => word[0])
        .join(""),
    );

  putFile(path.resolve(appPath, ".env"), dotEnv);

  // update .env.production file
  let dotEnvProduction = getFile(path.resolve(appPath, ".env.shared"));

  dotEnvProduction = dotEnvProduction.replace("AppName", appName).replace(
    "AppCodeName",
    appName
      .split(/-|_/g)
      .map(word => word[0])
      .join(""),
  );

  putFile(path.resolve(appPath, ".env.shared"), dotEnvProduction);
}

export async function copyTemplateFiles(
  templateName: Template,
  appPath: string,
  appName: string,
) {
  console.log(colors.yellow(`Crafting ${colors.cyan(appName)}...`));

  console.log(colors.cyan("Copying Project Files..."));

  // copy project files
  copy(template(templateName), appPath);

  // replace _.gitignore to
  renameFile(
    path.resolve(appPath, "_.gitignore"),
    path.resolve(appPath, ".gitignore"),
  );

  renameFile(path.resolve(appPath, "_.env"), path.resolve(appPath, ".env"));
}

export async function allDone(appName: string) {
  console.log(
    colors.green(
      "All done, now you're ready to go, type the following or copy/paste it in the terminal to get started.",
    ),
  );

  console.log(colors.cyan(`cd ${appName} && ${startCommand()}`));

  console.log(
    `If you are using VSCode, It's recommended to install the ${colors.yellow(
      `Generator Z`,
    )} extension, it generates components with a right click.`,
  );
}

export async function addStylesDependencies(appPath: string) {
  const stylingTypes = (await multiSelect(
    "Select what styling method you prefer?",
    [
      {
        value: "scss",
        name: "Scss",
        checked: true,
      },
      {
        value: "styled",
        name: "Styled Components (Emotion)",
      },
    ],
  )) as ("scss" | "styled")[];

  const packagesOptions = {
    scss: ["sass"],
    styled: ["@emotion/react", "@emotion/styled"],
  };

  const packagesVersion = getJson(packageRoot("files/packages-versions.json"));
  const packageJson: any = getJson(path.resolve(appPath, "package.json"));

  if (stylingTypes.includes("scss")) {
    for (const packageName of packagesOptions.scss) {
      packageJson.dependencies[packageName] = packagesVersion[packageName];
    }
  }

  if (stylingTypes.includes("styled")) {
    for (const packageName of packagesOptions.styled) {
      packageJson.dependencies[packageName] = packagesVersion[packageName];
    }
  }

  putJson(path.resolve(appPath, "package.json"), packageJson);
}
