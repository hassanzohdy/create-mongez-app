import { isDirectory } from "@mongez/fs";
import * as path from "path";
import { colors, print } from "../../helpers/cli";

export default function getAppPath(appName: string) {
  const appPath: string = path.resolve(process.cwd(), appName);

  if (isDirectory(appPath)) {
    print(
      colors.redBright(
        `${process.cwd()} has an existing directory \`${colors.cyan(
          appName,
        )}\`, please choose another app name or another directory to run the command from.`,
      ),
    );

    return;
  }

  return appPath;
}
