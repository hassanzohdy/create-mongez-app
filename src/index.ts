import commander, { program } from "commander";
import fs from "@flk/fs";
import * as path from "path";
import createReactApp from "./commands/create-react-app";
import print, { colors } from "./helpers/cli";

export default function createApp() {
  const packageJson: any = fs.getJson(
    path.resolve(__dirname, "../", "package.json")
  );

  program.version(packageJson["version"]);

  print(
    `Initializing Mongez Create App V${colors.greenBright.bold(
      packageJson["version"]
    )}...`
  );

  program
    .command("react <appName>")
    .addOption(
      new commander.Option(
        "-st, --styleType",
        "Set the style type to use, available options are: scss, styledComponents, all"
      )
        .choices(["scss", "styledComponents", "all"])
        .default("styledComponents")
    )
    .option(
      "-d, --defaults",
      "Set default configurations and skip the selection"
    )
    .description("Create Typescript React App")
    .action((appName, options) => {
      createReactApp(appName, options);
    });

  program.parse(process.argv);
}
