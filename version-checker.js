var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs, { getJsonFile } from "@mongez/fs";
import axios from "axios";
import { colors } from "@mongez/copper";
import { print } from "./src/helpers/cli";
import { packageRoot } from "./src/helpers/paths";
const packagesList = getJsonFile(packageRoot("files/packages-versions.json"));
const registry = "https://registry.npmjs.org/";
function update() {
    return __awaiter(this, void 0, void 0, function* () {
        let hasUpdates = false;
        for (const packageName in packagesList) {
            const currentVersion = packagesList[packageName];
            const response = yield axios.get(registry + packageName);
            const newVersion = response.data["dist-tags"].latest;
            if (currentVersion !== newVersion) {
                print(colors.yellow(`${colors.cyan(packageName)}: ${colors.red(currentVersion)} => ${colors.green(newVersion)}`));
                hasUpdates = true;
                packagesList[packageName] = newVersion;
            }
        }
        if (hasUpdates) {
            fs.putJson("packages-versions.json", packagesList);
            print(colors.green("All packages versions updated successfully!"));
        }
        else {
            print(colors.cyan("Nothing to update!, aborting.."));
        }
    });
}
update();
