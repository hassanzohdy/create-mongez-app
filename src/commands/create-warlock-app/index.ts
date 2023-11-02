import { Random } from "@mongez/reinforcements";
import { App } from "src/helpers/app";

export async function createWarlockApp(application: App) {
  application.init().use("warlock").updatePackageJson().updateDotEnv();

  application.env.replace("jwtSecretKey", Random.string(64)).save();

  await application.install();

  await application.git();

  application.terminate();
}
