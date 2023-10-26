import { App } from "src/helpers/app";

export async function createWarlockApp(application: App) {
  application.init().use("warlock").updatePackageJson().updateDotEnv();

  application
    .file("src/config/cache.ts")
    .replace("appName", application.name)
    .save();

  await application.install();

  await application.git();

  application.terminate();
}
