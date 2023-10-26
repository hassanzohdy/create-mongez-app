import { installCommand, startCommand } from "./../../helpers/package-manager";
import print, { colors } from "./../../helpers/cli";
import exec from "./../../helpers/exec";
import initializeGit from "./../../helpers/initializeGit";
import { App } from "src/helpers/app";

export async function createBasicNodeApp(app: App) {
  app.init().use("node").updatePackageJson().updateDotEnv();

  await app.install();

  await app.git();

  await app.terminate();
}
