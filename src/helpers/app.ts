import {
  copy,
  fileExists,
  getFile,
  getJsonFile,
  putFile,
  putJson,
  rename,
} from "@mongez/fs";
import path from "path";
import { Application } from "src/commands/create-new-app/types";
import print, { colors } from "src/helpers/cli";
import { Template, template } from "src/helpers/paths";
import {
  allDone,
  initializeGitRepository,
  installDependencies,
} from "src/helpers/project-builder-helpers";

export class App {
  public constructor(protected app: Application) {}

  public use(templateName: Template) {
    copy(template(templateName), this.path);

    if (fileExists(this.path + "/.env.example")) {
      rename(this.path + "/.env.example", this.path + "/.env");
    }

    return this;
  }

  public init() {
    print(colors.yellow(`Crafting ${colors.greenBright(this.name)}`));

    print(colors.cyan("Building Project Structure"));

    return this;
  }

  public terminate() {
    allDone(this.name);
  }

  public async install() {
    await installDependencies(this.path);

    return this;
  }

  public async git() {
    await initializeGitRepository(this.path);

    return this;
  }

  public updatePackageJson() {
    this.json("package.json").replace("name", this.name).save();

    return this;
  }

  public updateDotEnv() {
    this.file(".env").replace("appName", this.name).save();

    return this;
  }

  /**
   * Get env file to update
   */
  public get env() {
    return this.file(".env");
  }

  public get name() {
    return this.app.appName;
  }

  public get path() {
    return this.app.appPath;
  }

  public file(relativePath: string) {
    return file(path.resolve(this.path, relativePath));
  }

  public json(relativePath: string) {
    return jsonFile(path.resolve(this.path, relativePath));
  }
}

export function app(app: Application) {
  return new App(app);
}

export class FileManager {
  public content!: string;
  public constructor(protected filePath) {
    this.parseContent();
  }

  protected parseContent() {
    this.content = getFile(this.filePath) as string;
  }

  public replace(search: string, replace: string, replaceAll = true) {
    if (replaceAll) {
      this.content = this.content.replaceAll(search, replace);
    } else {
      this.content = this.content.replace(search, replace);
    }

    return this;
  }

  public save() {
    putFile(this.filePath, this.content);
  }
}

export class JsonFileManager extends FileManager {
  protected parseContent() {
    this.content = getJsonFile(this.filePath);
  }

  public save() {
    putJson(this.filePath, this.content);
  }

  public replace(key: string, value: any) {
    this.content[key] = value;

    return this;
  }
}

export function file(path: string) {
  return new FileManager(path);
}

export function jsonFile(path: string) {
  return new JsonFileManager(path);
}
