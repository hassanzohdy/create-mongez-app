var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createTailwindReactApp } from "src/commands/vite-react/tailwind-css";
import { createHeadlessUIReactApp } from "./headless-ui";
import { createReactMantineMoonlightApp } from "./mantine";
import selectReactAppType from "./select-react-app";
// TODO: add slim feature
// TODO: add mongez.json file in workspace for quick installation
// TODO: add color, api, locales and other dot env details in cli for replacements
export default function createReactApp({ appName, appPath, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { type: appType } = yield selectReactAppType();
        if (appType === "basic") {
            return yield createHeadlessUIReactApp({ appName, appPath });
        }
        else if (appType === "mantine") {
            return yield createReactMantineMoonlightApp({ appName, appPath });
        }
        else if (appType === "tailwind") {
            return yield createTailwindReactApp({ appName, appPath });
        }
    });
}
