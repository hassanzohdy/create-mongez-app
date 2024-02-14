import inquirer from "inquirer";
export async function confirmAction(message: string) {
  return new Promise(resolve => {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "confirm",
          message,
        },
      ])
      .then(result => {
        resolve(result.confirm);
      });
  });
}

export async function multiSelect(
  message: string,
  choices: (
    | string
    | {
        name: string;
        value: string;
        checked?: boolean;
      }
  )[],
) {
  return new Promise(resolve => {
    inquirer
      .prompt([
        {
          type: "checkbox",
          name: "selected",
          message,
          choices,
        },
      ])
      .then(result => {
        resolve(result.selected);
      });
  });
}
