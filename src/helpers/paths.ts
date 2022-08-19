import * as path from "path";

export function template(templateName: string): string {
  return path.resolve(__dirname, "../", "../", "templates", templateName);
}
