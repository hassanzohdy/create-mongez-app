import { getJson } from "@mongez/fs";
import { Command, program } from "commander";
import * as path from "path";
import createNewApp from "./commands/create-new-app";
import print, { colors } from "./helpers/cli";

if (typeof global.__dirname === "undefined") {
  // as __dirname is not defined in esm modules, we need to define it manually
  global.__dirname = path.resolve();
}

export default function createApp() {
  const packageJson: any = getJson(
    path.resolve(__dirname, "../", "package.json")
  );

  program.version(packageJson["version"]);

  print(
    `Initializing Mongez Create App ${colors.greenBright.bold(
      "V" + packageJson["version"]
    )}...`
  );

  const command = new Command();
  command
    .arguments("<appName>")
    .description("Create NewApplication")
    .action((appName) => {
      createNewApp(appName);
    })
    .parse();
}
