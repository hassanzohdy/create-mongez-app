import { App } from "src/helpers/app";
import selectNodeAppConfigurations from "./selectNodeAppConfigurations";
import { createBasicNodeApp } from "src/commands/create-basic-node-app";
import { createWarlockApp } from "src/commands/create-warlock-app";

export default async function createNodeApp(appDetails: App) {
  const appType = await selectNodeAppConfigurations();

  if (appType === "basic") {
    return createBasicNodeApp(appDetails);
  }

  if (appType === "warlock") {
    return createWarlockApp(appDetails);
  }
}
