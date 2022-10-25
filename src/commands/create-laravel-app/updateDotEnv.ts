import { getFile, putFile, rename } from "@mongez/fs";
import chalk from "chalk";
import { Application } from "../create-new-app/types";

export default function updateDotEnv(app: Application) {
  console.log(`${chalk.yellow("Updating .env file")}`);

  const replacements = [
    {
      find: "Application_name",
      replacement: app.appName,
    },
    {
      find: "databaseName",
      replacement: app.options?.database?.name,
    },
    {
      find: "databaseUserName",
      replacement: app.options?.database?.username,
    },
    {
      find: "databasePassword",
      replacement: app.options?.database?.password,
    },
    {
      find: "APPS_API_KEYS",
      replacement: app.options?.apps
        ?.map((app) => `${app.app.toUpperCase()}_API_KEY=${app.apiKey}`)
        .join("\n"),
    },
  ];

  const filePath = app.appPath + "/.env.example";

  let dotEnvFile = getFile(filePath);

  replacements.forEach((replacement) => {
    dotEnvFile = dotEnvFile.replace(
      new RegExp(replacement.find, "g"),
      replacement.replacement
    );
  });

  putFile(filePath, dotEnvFile);

  rename(filePath, app.appPath + "/.env");
}
