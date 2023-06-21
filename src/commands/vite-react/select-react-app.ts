import inquirer from "inquirer";

export default async function selectReactAppType(): Promise<
  "basic" | "mantine"
> {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "type",
          message: "Please select your React app type?",
          choices: [
            {
              value: "basic",
              name: "Headless UI (React + TS + Vite)",
            },
            {
              value: "mantine",
              name: "Mantine UI (React + TS + Vite + Mantine + Moonlight)",
            },
          ],
        },
      ])
      .then(resolve);
  });
}
