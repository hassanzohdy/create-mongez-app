import chalk from "chalk";
import inquirer from "inquirer";

export default async function projectApps() {
  return (
    await inquirer.prompt([
      {
        type: "list",
        name: "apps",
        message: "Please select your project apps list?",
        choices: [
          {
            value: "both",
            name: chalk.greenBright("Website + Mobile App"),
          },
          {
            value: "website",
            name: chalk.blueBright("Website"),
          },
          {
            value: "mobile",
            name: chalk.yellowBright("Mobile App"),
          },
        ],
      },
    ])
  ).apps;
}
