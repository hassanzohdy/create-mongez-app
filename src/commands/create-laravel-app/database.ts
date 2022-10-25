import inquirer from "inquirer";
import { Application } from "../create-new-app/types";

export async function getDatabaseData(app: Application) {
  return await inquirer.prompt([
    {
      type: "input",
      name: "name",
      default: app.appName,
      message: "Database name",
    },
    {
      type: "input",
      name: "username",
      default: "root",
      message: "Database username",
    },
    {
      type: "input",
      name: "password",
      default: "root",
      message: "Database password",
    },
  ]);
}
