import { getFile, putFile } from "@mongez/fs";
import phpPlugin from "@prettier/plugin-php/standalone";
import prettier from "prettier";

export default function formatFile(filePath: string) {
  putFile(filePath, formatCode(getFile(filePath)));
}

export function formatCode(code: string) {
  return prettier.format(code, {
    plugins: [phpPlugin],
    parser: "php",
  });
}
