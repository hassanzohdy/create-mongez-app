import path from "path";
import { fileURLToPath } from "url";

if (typeof global.__dirname === "undefined") {
  // as __dirname is not defined in esm modules, we need to define it manually

  const __filename = fileURLToPath(import.meta.url);

  // 👇️ "/home/john/Desktop/javascript"
  global.__dirname = path.dirname(__filename);
}

export function template(templateName: string): string {
  return path.resolve(__dirname, "../", "../", "templates", templateName);
}

export function packageRoot(...paths: string[]): string {
  return path.resolve(__dirname, "../", "../", ...paths);
}
