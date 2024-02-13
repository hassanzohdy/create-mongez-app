var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { copy, fileExists, getFile, getJsonFile, putFile, putJson, rename, } from "@mongez/fs";
import path from "path";
import { print, colors } from "src/helpers/cli";
import exec from "src/helpers/exec";
import { template } from "src/helpers/paths";
import { allDone, initializeGitRepository, installDependencies, } from "src/helpers/project-builder-helpers";
export class App {
    constructor(app) {
        this.app = app;
        /**
         * Resolved files
         */
        this.files = {};
    }
    use(templateName) {
        copy(template(templateName), this.path);
        console.log(this.path + "/.env.example", fileExists(this.path + "/.env.example"));
        if (fileExists(this.path + "/.env.example")) {
            rename(this.path + "/.env.example", this.path + "/.env");
        }
        return this;
    }
    init() {
        print(colors.yellow(`Crafting ${colors.greenBright(this.name)}`));
        print(colors.cyan("Building Project Structure"));
        return this;
    }
    terminate() {
        allDone(this.name);
    }
    install() {
        return __awaiter(this, void 0, void 0, function* () {
            yield installDependencies(this.path);
            return this;
        });
    }
    exec(command) {
        return __awaiter(this, void 0, void 0, function* () {
            return exec(command, {
                cwd: this.path,
                stdio: "inherit",
            });
        });
    }
    git() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield initializeGitRepository(this.path);
        });
    }
    updatePackageJson() {
        this.package.replace("name", this.name).save();
        return this;
    }
    /**
     * Get package json file
     */
    get package() {
        return this.json("package.json");
    }
    updateDotEnv() {
        this.file(".env").replace("appName", this.name).save();
        return this;
    }
    /**
     * Get env file to update
     */
    get env() {
        return this.file(".env");
    }
    get name() {
        return this.app.appName;
    }
    get path() {
        return this.app.appPath;
    }
    file(relativePath) {
        const fullPath = path.resolve(this.path, relativePath);
        if (!this.files[fullPath]) {
            this.files[fullPath] = file(fullPath);
        }
        return this.files[fullPath];
    }
    json(relativePath) {
        const fullPath = path.resolve(this.path, relativePath);
        if (!this.files[fullPath]) {
            this.files[fullPath] = jsonFile(fullPath);
        }
        return this.files[fullPath];
    }
}
export function app(app) {
    return new App(app);
}
export class FileManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.parseContent();
    }
    parseContent() {
        this.content = getFile(this.filePath);
    }
    replace(search, replace, replaceAll = true) {
        if (replaceAll) {
            this.content = this.content.replaceAll(search, replace);
        }
        else {
            this.content = this.content.replace(search, replace);
        }
        return this;
    }
    save() {
        putFile(this.filePath, this.content);
    }
}
export class JsonFileManager extends FileManager {
    parseContent() {
        this.content = getJsonFile(this.filePath);
    }
    save() {
        putJson(this.filePath, this.content);
    }
    has(key) {
        return this.content[key] !== undefined;
    }
    replace(key, value) {
        this.content[key] = value;
        return this;
    }
}
export function file(path) {
    return new FileManager(path);
}
export function jsonFile(path) {
    return new JsonFileManager(path);
}
