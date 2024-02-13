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
export default function selectReactAppType() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            inquirer
                .prompt([
                {
                    type: "list",
                    name: "type",
                    message: "Please select your React app type?",
                    choices: [
                        {
                            value: "basic",
                            name: "Headless UI (TS + Vite + Mongez)",
                        },
                        {
                            value: "tailwind",
                            name: "Tailwind CSS (TS + Vite + Mongez)",
                        },
                        // {
                        //   value: "mantine",
                        //   name: "VinoTine (Vite + Typescript + Moonlight + Mantine UI + Mongez)",
                        // },
                    ],
                },
            ])
                .then(resolve);
        });
    });
}
