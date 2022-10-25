import { copy } from "@mongez/fs";
import chalk from "chalk";
import { template } from "src/helpers/paths";
import { Application } from "../create-new-app/types";
import installDependencies from "./installDependencies";
import laravelOptions from "./laravelOptions";
import updateDotEnv from "./updateDotEnv";
import updateInternalFiles from "./updateInternalFiles";

export default async function createLaravelApp(app: Application) {
  app.options = await laravelOptions(app);

  // copy template
  console.log(`${chalk.magentaBright("Initializing The Project")}`);
  copy(template("laravel"), app.appPath);

  // update .env file
  updateDotEnv(app);

  // update internal files
  updateInternalFiles(app);

  // install dependencies
  await installDependencies(app);

  console.log(chalk.greenBright.bold("Project has been created successfully!"));

  console.log(chalk.bold("To start the project, run the following command:"));

  console.log(chalk.magentaBright(`cd ${app.appName} && php artisan serve`));
}
