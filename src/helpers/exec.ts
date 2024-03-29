import childProcess from "cross-spawn";
import { colors, print } from "./cli";
// import { print, colors } from "./cli";

export default function exec(command: string, options: any = {}): any {
  const [commandName, ...optionsList] = command.split(" ");

  print(
    // `Executing command: ${colors.bold(
    `${colors.bold(commandName + " " + optionsList.join(" "))}`,
  );

  const commandOutput = childProcess.sync(commandName, optionsList, options);

  // it means command didn't end as expected, then stop the rest of the program
  if (commandOutput.error !== null) {
    process.exit(1);
  }

  return commandOutput;
}
