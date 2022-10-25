import inquirer from "inquirer";

export default async function selectNodeAppConfigurations(): Promise<any[]> {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "type",
          message: "Please select your node app type?",
          choices: [
            {
              value: "basic",
              name: "Basic (Serverless With Hot Reload)",
            },
          ],
        },
      ])
      .then(resolve);
  });
}
