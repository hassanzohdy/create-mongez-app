import fs from "@mongez/fs";
import { Command, program } from "commander";
import * as path from "path";
import createNewApp from "./commands/create-new-app";
import print, { colors } from "./helpers/cli";

export default function createApp() {
  const packageJson: any = fs.getJson(
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
