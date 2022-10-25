import chalk from "chalk";
import inquirer from "inquirer";

export default async function selectMobileApps() {
  return (
    await inquirer.prompt([
      {
        type: "list",
        name: "mobileApps",
        message: "Please select mobile apps?",
        choices: [
          {
            value: "both",
            name: chalk.cyan("Android + iOS"),
          },
          {
            value: "android",
            name: chalk.greenBright("Android"),
          },
          {
            value: "ios",
            name: chalk.bold("iOS"),
          },
        ],
      },
    ])
  ).mobileApps;
}
