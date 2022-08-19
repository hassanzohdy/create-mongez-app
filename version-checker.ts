import fs from "@flk/fs";
import axios from "axios";
import chalk from "chalk";
import path from "path";
import print from "./src/helpers/cli";

const packagesList = fs.getJson(
  path.resolve(__dirname, "src/packages-versions.json")
);

const registry = "https://registry.npmjs.org/";

async function update() {
  let hasUpdates = false;
  for (const packageName in packagesList) {
    const currentVersion = packagesList[packageName];
    const response = await axios.get(registry + packageName);

    const newVersion = response.data["dist-tags"].latest;

    if (currentVersion !== newVersion) {
      print(
        chalk.yellow(
          `${chalk.cyan(packageName)}: ${chalk.green(
            currentVersion
          )} => ${chalk.red(newVersion)}`
        )
      );

      hasUpdates = true;
      packagesList[packageName] = newVersion;
    }
  }

  if (hasUpdates) {
    fs.putJson("packages-versions.json", packagesList);

    print(chalk.green("All packages versions updated successfully!"));
  } else {
    print(chalk.cyan("Nothing to update!, aborting.."));
  }
}

update();
