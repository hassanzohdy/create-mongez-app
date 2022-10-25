import { getFile, putFile } from "@mongez/fs";
import prettier from "prettier/standalone";
const phpPlugin = require("@prettier/plugin-php/standalone");

export default function formatFile(filePath: string) {
  putFile(filePath, formatCode(getFile(filePath)));
}

export function formatCode(code: string) {
  return prettier.format(code, {
    plugins: [phpPlugin],
    parser: "php",
  });
}
