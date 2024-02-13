var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import selectNodeAppConfigurations from "./selectNodeAppConfigurations";
import { createBasicNodeApp } from "src/commands/create-basic-node-app";
import { createWarlockApp } from "src/commands/create-warlock-app";
export default function createNodeApp(appDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const appType = yield selectNodeAppConfigurations();
        if (appType === "basic") {
            return createBasicNodeApp(appDetails);
        }
        if (appType === "warlock") {
            return createWarlockApp(appDetails);
        }
    });
}
