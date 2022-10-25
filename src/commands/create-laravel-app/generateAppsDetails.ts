import { capitalize, Random } from "@mongez/reinforcements";

export default function generateAppsDetails(apps: string[]) {
  return apps.map((app) => ({
    apiKey: Random.string(32),
    os: Random.string(4),
    app: app,
    label: app === "ios" ? "iOS" : capitalize(app),
    apiKeyName: `API_KEY_${app.toLocaleUpperCase()}`,
  }));
}
