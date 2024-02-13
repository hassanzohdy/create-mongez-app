import { getJsonFile } from "@mongez/fs";
import { Command, program } from "commander";
import * as path from "path";
import { fileURLToPath } from "url";
import { print, colors } from "./helpers/cli";
import createNewApp from "./commands/create-new-app";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default function createApp() {
  const packageJson: any = getJsonFile(
    path.resolve(__dirname, "../", "package.json")
  );

  program.version(packageJson["version"]);

  print(
    `Initializing Mongez Create App ${colors.greenBright(
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
