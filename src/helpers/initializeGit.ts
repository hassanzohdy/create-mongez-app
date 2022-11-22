import { renameFile } from "@mongez/fs";
import path from "path";
import print, { colors } from "./cli";
import exec from "./exec";

export default function initializeGit(appPath: string) {
  print(colors.magenta("Initializing Git Repository..."));

  // replace _.gitignore to
  renameFile(
    path.resolve(appPath, "_.gitignore"),
    path.resolve(appPath, ".gitignore")
  );

  // initialize git repository
  exec(`git init`, {
    cwd: appPath,
    stdio: "inherit",
  });

  // switching to `main` branch
  exec(`git checkout -b main`, {
    cwd: appPath,
    stdio: "inherit",
  });

  // adding all files to git and make a commit
  exec(`git add .`, {
    cwd: appPath,
    stdio: "inherit",
  });

  exec(`git commit -m Initial`, {
    cwd: appPath,
    stdio: "inherit",
  });
}
