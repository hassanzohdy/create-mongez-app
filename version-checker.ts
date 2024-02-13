import fs from "@mongez/fs";
import axios from "axios";
import { colors } from "@mongez/copper";
import { print } from "./src/helpers/cli";
import { packageRoot } from "./src/helpers/paths";

const packagesList = fs.getJson(packageRoot("files/packages-versions.json"));

const registry = "https://registry.npmjs.org/";

async function update() {
  let hasUpdates = false;
  for (const packageName in packagesList) {
    const currentVersion = packagesList[packageName];
    const response = await axios.get(registry + packageName);

    const newVersion = response.data["dist-tags"].latest;

    if (currentVersion !== newVersion) {
      print(
        colors.yellow(
          `${colors.cyan(packageName)}: ${colors.red(
            currentVersion
          )} => ${colors.green(newVersion)}`
        )
      );

      hasUpdates = true;
      packagesList[packageName] = newVersion;
    }
  }

  if (hasUpdates) {
    fs.putJson("packages-versions.json", packagesList);

    print(colors.green("All packages versions updated successfully!"));
  } else {
    print(colors.cyan("Nothing to update!, aborting.."));
  }
}

update();
