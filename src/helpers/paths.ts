import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export function template(templateName: string): string {
  return path.resolve(__dirname, "../", "../", "templates", templateName);
}

export function packageRoot(...paths: string[]): string {
  return path.resolve(__dirname, "../", "../", ...paths);
}
