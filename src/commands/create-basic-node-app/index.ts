import { App } from "src/helpers/app";

export async function createBasicNodeApp(app: App) {
  app.init().use("node").updatePackageJson().updateDotEnv();

  await app.install();

  await app.git();

  await app.terminate();
}
