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
            name: "React (Typescript)",
          },
          {
            value: "node",
            name: "Node Js (Typescript)",
          },
        ],
      },
    ])
  ).appType;
}
