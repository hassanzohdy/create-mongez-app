import chalk from "chalk";
import inquirer from "inquirer";

export default async function selectAppType() {
  return (
    await inquirer.prompt([
      {
        type: "list",
        name: "appType",
        message: "Please Select Your Application Type",
        choices: [
          {
            value: "react",
            name: chalk.cyanBright("React (Typescript)"),
          },
          {
            value: "node",
            name: chalk.green("Node Js (Typescript)"),
          },
          {
            value: "laravel",
            name: chalk.redBright("Laravel (MongoDB)"),
          },
        ],
      },
    ])
  ).appType;
}
