var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { copy, getFile, getJson, putFile, putJson, renameFile, } from "@mongez/fs";
import { colors } from "./cli";
import { confirmAction, multiSelect } from "./confirm-action";
import exec from "./exec";
import { installCommand, startCommand } from "./package-manager";
import path from "path";
import { packageRoot, template } from "./paths";
export function initializeGitRepository(appPath) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield confirmAction("Do you want to initialize a git repository?")) ===
            false)
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
    });
}
export function installDependencies(appPath) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield confirmAction("Do you want to install the project dependencies?")) === false)
            return;
        console.log(colors.yellow("Installing Dependencies..."));
        exec(installCommand(), {
            cwd: appPath,
            stdio: "inherit",
        });
    });
}
export function updateEnvFile(appPath, appName) {
    return __awaiter(this, void 0, void 0, function* () {
        // update package.json file
        const packageJson = getJson(path.resolve(appPath, "package.json"));
        packageJson.name = appName;
        putJson(path.resolve(appPath, "package.json"), packageJson);
        // update env file
        const dotEnv = getFile(path.resolve(appPath, ".env"))
            .replace("AppName", appName)
            .replace("AppCodeName", appName
            .split(/-|_/g)
            .map((word) => word[0])
            .join(""));
        putFile(path.resolve(appPath, ".env"), dotEnv);
        // update .env.production file
        let dotEnvProduction = getFile(path.resolve(appPath, ".env.shared"));
        dotEnvProduction = dotEnvProduction.replace("AppName", appName).replace("AppCodeName", appName
            .split(/-|_/g)
            .map((word) => word[0])
            .join(""));
        putFile(path.resolve(appPath, ".env.shared"), dotEnvProduction);
    });
}
export function copyTemplateFiles(templateName, appPath, appName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(colors.yellow(`Crafting ${colors.cyan(appName)}...`));
        console.log(colors.cyan("Copying Project Files..."));
        // copy project files
        copy(template(templateName), appPath);
        // replace _.gitignore to
        renameFile(path.resolve(appPath, "_.gitignore"), path.resolve(appPath, ".gitignore"));
    });
}
export function allDone(appName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(colors.green("All done, now you're ready to go, type the following or copy/paste it in the terminal to get started."));
        console.log(colors.cyan(`cd ${appName} && ${startCommand()}`));
        console.log(`If you are using VSCode, It's recommended to install the ${colors.yellow(`Generator Z`)} extension, it generates components with a right click.`);
    });
}
export function addStylesDependencies(appPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const stylingTypes = (yield multiSelect("Select what styling method you prefer?", [
            {
                value: "scss",
                name: "Scss",
                checked: true,
            },
            {
                value: "styled",
                name: "Styled Components (Emotion)",
            },
        ]));
        const packagesOptions = {
            scss: ["sass"],
            styled: ["@emotion/react", "@emotion/styled"],
        };
        const packagesVersion = getJson(packageRoot("files/packages-versions.json"));
        const packageJson = getJson(path.resolve(appPath, "package.json"));
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
    });
}
