import inquirer from "inquirer";

export default async function selectNodeAppConfigurations(): Promise<
  "warlock" | "basic"
> {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "type",
          message: "Please select your node app type?",
          choices: [
            {
              value: "warlock",
              name: "Warlock (Nodejs Framework With MongoDB)",
            },
            {
              value: "basic",
              name: "Serverless With Hot Reload",
            },
          ],
        },
      ])
      .then(({ type }) => {
        resolve(type);
      });
  });
}
