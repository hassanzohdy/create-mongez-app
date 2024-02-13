var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { App } from "src/helpers/app";
import createNodeApp from "../create-node-app";
import createReactApp from "../vite-react";
import getAppPath from "./get-app-path";
import selectAppType from "./select-app-type";
let appDetails = {
    appName: "",
    appType: "",
    appPath: "",
};
export default function createNewApp(appName) {
    return __awaiter(this, void 0, void 0, function* () {
        appDetails.appName = appName;
        appDetails.appPath = getAppPath(appName);
        if (!appDetails.appPath)
            return;
        appDetails.appType = yield selectAppType();
        const applicationData = appDetails;
        const application = new App(applicationData);
        if (appDetails.appType === "react") {
            yield createReactApp(applicationData);
        }
        else if (appDetails.appType === "node") {
            yield createNodeApp(application);
        }
    });
}
