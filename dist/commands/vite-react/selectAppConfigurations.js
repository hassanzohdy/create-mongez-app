var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
export default function selectAppConfigurations() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            inquirer
                .prompt([
                {
                    type: "list",
                    name: "styleType",
                    message: "What style type do you prefer to use?",
                    choices: [
                        {
                            value: "scss",
                            name: "Sass (SCSS)",
                        },
                        {
                            value: "styledComponents",
                            name: "Styled Components (Emotion JS)",
                        },
                        {
                            value: "all",
                            name: "Both",
                        },
                    ],
                },
            ])
                .then(resolve);
        });
    });
}
