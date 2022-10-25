import chalk from "chalk";
import inquirer from "inquirer";

export default async function selectWebApps() {
  return (
    await inquirer.prompt([
      {
        type: "list",
        name: "webApps",
        message: "Please select web apps?",
        choices: [
          {
            value: "both",
            name: chalk.greenBright("Website + Admin Dashboard"),
          },
          {
            value: "website",
            name: chalk.magenta("Website"),
          },
          {
            value: "admin",
            name: chalk.cyanBright("Admin Dashboard"),
          },
        ],
      },
    ])
  ).webApps;
}
