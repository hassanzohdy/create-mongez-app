import chalk from "chalk";
import { Application } from "../create-new-app/types";
import exec from "./../../helpers/exec";

export default async function installDependencies(app: Application) {
  console.log(chalk.yellowBright("Installing dependencies"));

  exec(`composer install`, {
    cwd: app.appPath,
    stdio: "inherit",
  });

  console.log(chalk.green("Composer dependencies installed successfully"));

  // generate laravel key
  console.log(chalk.yellowBright("Generating Laravel Key"));
  exec(`php artisan key:generate`, {
    cwd: app.appPath,
    stdio: "inherit",
  });

  console.log(chalk.green("Laravel key generated successfully"));

  // link storage
  console.log(chalk.yellowBright("Linking storage"));
  exec(`php artisan storage:link`, {
    cwd: app.appPath,
    stdio: "inherit",
  });

  console.log(chalk.green("Storage linked successfully"));
}
